#!/bin/bash

echo "🔍 Checking environment variables..."

# Load .env file if it exists
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
  echo "📄 Loaded .env file"
else
  echo "⚠️  No .env file found, checking system environment variables only"
fi

# Required variables
required=(
  VITE_SUPABASE_URL
  VITE_SUPABASE_PUBLISHABLE_KEY
  VITE_SUPABASE_PROJECT_ID
)

# Optional but recommended
optional=(
  VITE_PAYU_KEY
  VITE_PAYU_SALT
  VITE_PAYU_ENV
  VITE_CASHFREE_APP_ID
  VITE_CASHFREE_SECRET
  VITE_CASHFREE_ENV
  VITE_GOOGLE_CLIENT_ID
)

missing=()
missing_optional=()

# Check required variables
for var in "${required[@]}"; do
  if [ -z "${!var}" ]; then
    missing+=("$var")
  else
    echo "✅ $var is set"
  fi
done

# Check optional variables
for var in "${optional[@]}"; do
  if [ -z "${!var}" ]; then
    missing_optional+=("$var")
  else
    echo "✅ $var is set"
  fi
done

# Report results
if [ ${#missing[@]} -gt 0 ]; then
  echo ""
  echo "❌ Missing required environment variables:"
  for var in "${missing[@]}"; do
    echo "   - $var"
  done
  exit 1
fi

if [ ${#missing_optional[@]} -gt 0 ]; then
  echo ""
  echo "⚠️  Missing optional environment variables:"
  for var in "${missing_optional[@]}"; do
    echo "   - $var"
  done
  echo ""
  echo "These are optional but recommended for full functionality."
fi

echo ""
echo "✅ All required environment variables are present!"

