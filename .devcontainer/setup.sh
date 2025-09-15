#!/usr/bin/env bash

set -euo pipefail

echo "🚀 Setting up development environment..."

# Ensure we're in workspace root
cd "$(dirname "$0")/.."

echo "📦 Installing dependencies (root, backend, frontend)..."
npm install --silent || true
(cd backend && npm install --silent)
(cd frontend && npm install --silent)

echo "⏳ Waiting for PostgreSQL service to be ready..."
until pg_isready -h postgres -p 5432 -U dev >/dev/null 2>&1; do
  echo "   … postgres not ready yet, retrying in 2s"
  sleep 2
done

# Backend environment
BACKEND_PORT=${PORT:-8081}
cat > backend/.env <<EOF
NODE_ENV=development
PORT=${BACKEND_PORT}
POSTGRES_HOST=postgres
POSTGRES_DB=app
POSTGRES_USER=dev
POSTGRES_PASSWORD=dev
POSTGRES_PORT=5432
CODESPACES=${CODESPACES:-}
CODESPACE_NAME=${CODESPACE_NAME:-}
GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN=${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-}
EOF

# Frontend environment
if [ "${CODESPACES:-}" = "true" ] && [ -n "${CODESPACE_NAME:-}" ]; then
  DOMAIN=${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-app.github.dev}
  API_URL="https://${CODESPACE_NAME}-${BACKEND_PORT}.${DOMAIN}/api"
  echo "🌐 Detected Codespaces. Using API_URL=${API_URL}"
  cat > frontend/.env <<EOF
REACT_APP_CODESPACES=true
REACT_APP_CODESPACE_NAME=${CODESPACE_NAME}
REACT_APP_GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN=${DOMAIN}
REACT_APP_API_URL=${API_URL}
EOF
else
  echo "💻 Local/devcontainer environment. Using localhost API URL."
  cat > frontend/.env <<EOF
REACT_APP_CODESPACES=false
REACT_APP_API_URL=http://localhost:${BACKEND_PORT}/api
EOF
fi

echo "🗄️ Initializing database seed..."
(cd backend && npm run db:init)

echo "✅ Setup complete. You can now run 'npm run dev'."

#!/usr/bin/env bash

set -euo pipefail

echo "🚀 Setting up development environment..."

# Ensure we're in workspace root
cd "$(dirname "$0")/.."

echo "📦 Installing dependencies (root, backend, frontend)..."
npm install --silent || true
(cd backend && npm install --silent)
(cd frontend && npm install --silent)

echo "⏳ Waiting for PostgreSQL service to be ready..."
until pg_isready -h postgres -p 5432 -U dev >/dev/null 2>&1; do
  echo "   … postgres not ready yet, retrying in 2s"
  sleep 2
done

# Backend environment
BACKEND_PORT=${PORT:-8081}
cat > backend/.env <<EOF
NODE_ENV=development
PORT=${BACKEND_PORT}
POSTGRES_HOST=postgres
POSTGRES_DB=app
POSTGRES_USER=dev
POSTGRES_PASSWORD=dev
POSTGRES_PORT=5432
CODESPACES=${CODESPACES:-}
CODESPACE_NAME=${CODESPACE_NAME:-}
GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN=${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-}
EOF

# Frontend environment
if [ "${CODESPACES:-}" = "true" ] && [ -n "${CODESPACE_NAME:-}" ]; then
  DOMAIN=${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-app.github.dev}
  API_URL="https://${CODESPACE_NAME}-${BACKEND_PORT}.${DOMAIN}/api"
  echo "🌐 Detected Codespaces. Using API_URL=${API_URL}"
  cat > frontend/.env <<EOF
REACT_APP_CODESPACES=true
REACT_APP_CODESPACE_NAME=${CODESPACE_NAME}
REACT_APP_GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN=${DOMAIN}
REACT_APP_API_URL=${API_URL}
EOF
else
  echo "💻 Local/devcontainer environment. Using localhost API URL."
  cat > frontend/.env <<EOF
REACT_APP_CODESPACES=false
REACT_APP_API_URL=http://localhost:${BACKEND_PORT}/api
EOF
fi

echo "🗄️ Initializing database seed..."
(cd backend && npm run db:init)

echo "✅ Setup complete. You can now run 'npm run dev'."

#!/bin/bash

echo "🚀 Setting up development environment..."

# Wait for PostgreSQL
until pg_isready -h postgres -U dev; do
  echo "⏳ Waiting for PostgreSQL..."
  sleep 2
done

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment variables for Codespaces
if [ -n "$CODESPACES" ] && [ "$CODESPACES" = "true" ]; then
  echo "🌐 Detected GitHub Codespaces - setting up dynamic URLs..."

  # Backend environment
  cat > backend/.env << EOF
NODE_ENV=development
PORT=8081
DATABASE_URL=postgresql://dev:dev@postgres:5432/app
JWT_SECRET=devsecret
CODESPACES=true
EOF

  # Frontend environment with dynamic Codespaces URLs
  cat > frontend/.env << EOF
REACT_APP_CODESPACES=true
REACT_APP_CODESPACE_NAME=${CODESPACE_NAME}
REACT_APP_GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN=${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}
EOF

  echo "✅ Codespaces environment configured"
else
  echo "💻 Local development environment"
fi

# Initialize database
echo "🗄️ Initializing database..."
cd backend && npm run db:init

echo "✅ Setup complete! Run 'npm run dev' to start."