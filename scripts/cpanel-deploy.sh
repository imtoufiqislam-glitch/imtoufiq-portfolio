#!/usr/bin/env bash
# ==============================================================================
# Toufiq Portfolio (https://imtoufiq.xyz) — cPanel Production Deployment Script
# Executed automatically by .cpanel.yml during cPanel Git Version Control deploy
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DEPLOYPATH="${DEPLOYPATH:-$HOME/public_html}"
DEPLOYPATH="${DEPLOYPATH%/}"
LOG_FILE="${DEPLOY_LOG:-$HOME/imtoufiq-deploy.log}"

log() {
  printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S %Z')" "$*"
}

fail() {
  printf '[%s] ERROR: %s\n' "$(date '+%Y-%m-%d %H:%M:%S %Z')" "$*" >&2
  exit 1
}

find_node_bin() {
  local candidate
  local -a candidates=()

  # 1. Prefer cPanel CloudLinux Node.js Selector virtual environments (Node 22 first, then 20)
  shopt -s nullglob
  candidates+=(
    "$HOME"/nodevenv/*/22/bin
    "$HOME"/nodevenv/*/*/22/bin
    /opt/cpanel/ea-nodejs22/bin
    "$HOME"/.nvm/versions/node/v22*/bin
    "$HOME"/nodevenv/*/20/bin
    "$HOME"/nodevenv/*/*/20/bin
    /opt/cpanel/ea-nodejs20/bin
    "$HOME"/.nvm/versions/node/v20*/bin
    /usr/local/bin
    /usr/bin
  )
  shopt -u nullglob

  for candidate in "${candidates[@]}"; do
    if [ -x "$candidate/node" ] && [ -x "$candidate/npm" ]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done

  return 1
}

run_deploy() {
  log "================================================================"
  log "Starting cPanel deployment for imtoufiq.xyz"
  log "Repository directory: $REPO_DIR"
  log "Target publish path:  $DEPLOYPATH"
  log "Deployment log file:  $LOG_FILE"

  # 1. Always operate inside the actual Git repository root (never inside nodevenv/.../lib)
  cd "$REPO_DIR" || fail "Cannot change directory to repository root: $REPO_DIR"
  test -f "$REPO_DIR/package.json" || fail "package.json not found in $REPO_DIR"

  # 2. Prevent cPanel Node.js Selector env vars from redirecting npm into nodevenv/.../lib
  unset npm_config_prefix NPM_CONFIG_PREFIX NODE_PATH || true

  # 3. Dynamically locate Node.js and npm without hardcoding a single environment path
  local node_bin=""
  if node_bin="$(find_node_bin)"; then
    export PATH="$node_bin:$PATH"
    log "Detected Node.js bin directory: $node_bin"
  fi

  command -v node >/dev/null 2>&1 || fail "Node.js executable not found in PATH or cPanel virtual environments."
  command -v npm >/dev/null 2>&1 || fail "npm executable not found in PATH or cPanel virtual environments."

  local node_version node_major npm_version
  node_version="$(node -v)"
  npm_version="$(npm -v)"
  node_major="${node_version#v}"
  node_major="${node_major%%.*}"

  log "Using node: $(command -v node) ($node_version)"
  log "Using npm:  $(command -v npm) (v$npm_version)"
  log "Working dir: $(pwd)"

  if [ "${node_major:-0}" -lt 20 ]; then
    fail "Node.js >= 20 is required to build this Vite 8 project (found $node_version)."
  fi

  # 4. Remove any previous build output so every deployment compiles fresh code
  log "Cleaning previous dist/ build directory..."
  /bin/rm -rf "$REPO_DIR/dist"

  # 5. Install dependencies deterministically inside the repository root
  if [ -f "$REPO_DIR/package-lock.json" ]; then
    log "Installing dependencies with npm ci (package-lock.json detected)..."
    npm ci --no-audit --no-fund
  else
    log "Installing dependencies with npm install..."
    npm install --no-audit --no-fund
  fi

  # 6. Build the production static bundle
  log "Building production bundle with npm run build..."
  npm run build

  # 7. Verify compiled output BEFORE modifying public_html (preserves live site on failure)
  test -s "$REPO_DIR/dist/index.html" || fail "Build verification failed: dist/index.html is missing or empty."
  test -d "$REPO_DIR/dist/assets" || fail "Build verification failed: dist/assets directory is missing."

  # 8. Publish ONLY compiled dist/ files to public_html while preserving .htaccess & cPanel system files
  /bin/mkdir -p "$DEPLOYPATH" || fail "Cannot create target directory: $DEPLOYPATH"
  test -w "$DEPLOYPATH" || fail "Target directory is not writable: $DEPLOYPATH"

  log "Refreshing compiled asset directories in $DEPLOYPATH..."
  /bin/rm -rf "$DEPLOYPATH/assets" "$DEPLOYPATH/src/assets"

  log "Copying compiled build output from dist/ to $DEPLOYPATH/..."
  shopt -s nullglob
  local item base_name
  for item in "$REPO_DIR"/dist/*; do
    base_name="$(basename "$item")"
    /bin/cp -a "$item" "$DEPLOYPATH/$base_name"
  done
  shopt -u nullglob

  # Preserve existing cPanel .htaccess if present; otherwise install the portfolio .htaccess
  if [ -f "$DEPLOYPATH/.htaccess" ]; then
    log "Preserved existing $DEPLOYPATH/.htaccess untouched."
  elif [ -f "$REPO_DIR/dist/.htaccess" ]; then
    /bin/cp -a "$REPO_DIR/dist/.htaccess" "$DEPLOYPATH/.htaccess"
    log "Installed default .htaccess into $DEPLOYPATH/.htaccess."
  fi

  # 9. Final post-deployment verification
  test -s "$DEPLOYPATH/index.html" || fail "Post-deploy verification failed: $DEPLOYPATH/index.html missing."
  test -d "$DEPLOYPATH/assets" || fail "Post-deploy verification failed: $DEPLOYPATH/assets missing."

  log "Deployment completed successfully! Live entry point: $DEPLOYPATH/index.html"
  log "================================================================"
}

# Stream output to both cPanel deployment logs and $LOG_FILE while preserving failure exit codes
if touch "$LOG_FILE" 2>/dev/null; then
  run_deploy 2>&1 | tee -a "$LOG_FILE"
else
  run_deploy
fi
