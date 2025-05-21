#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Linux and macOS you can run this script directly - `./start-database.sh`

DB_CONTAINER_NAME="sge2-postgres"

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  exit 0
fi

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing database container '$DB_CONTAINER_NAME' started"
  exit 0
fi

# import env variables from .env
set -a
source .env

DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')

if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please set a password in the .env file and try again"
    exit 1
  fi
  # Generate a random URL-safe password
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
fi

read -p "Do you have an initialization SQL script to mount? (provide full path or leave empty): " INIT_SCRIPT

# If it's just a filename (no slashes), prepend './'
if [[ -n "$INIT_SCRIPT" && "$INIT_SCRIPT" != */* ]]; then
  INIT_SCRIPT="./$INIT_SCRIPT"
fi

DOCKER_CMD="docker run -d \
  --name \"$DB_CONTAINER_NAME\" \
  -e POSTGRES_PASSWORD=\"$DB_PASSWORD\" \
  -e POSTGRES_DB=sge2 \
  -p \"$DB_PORT\":5432"

if [ -n "$INIT_SCRIPT" ]; then
  if [ -f "$INIT_SCRIPT" ]; then
    DOCKER_CMD+=" -v \"$INIT_SCRIPT\":/docker-entrypoint-initdb.d/init.sql"
    echo "Mounting $INIT_SCRIPT to /docker-entrypoint-initdb.d/init.sql"
  else
    echo "Provided script path '$INIT_SCRIPT' does not exist."
    exit 1
  fi
fi

DOCKER_CMD+=" postgres:17-alpine"

# Run the final command
eval "$DOCKER_CMD" && echo "Database container '$DB_CONTAINER_NAME' was successfully created"
