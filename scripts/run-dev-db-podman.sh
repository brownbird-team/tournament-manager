#!/bin/bash

set -a
source <(node scripts/parse-pg-url.js)
set +a

CONTAINER_ID_FILE=$(mktemp)

podman run --rm -d \
    -e POSTGRES_USER \
    -e POSTGRES_PASSWORD \
    -e POSTGRES_DB= \
    -p "$POSTGRES_PORT:5432" \
    --cidfile "$CONTAINER_ID_FILE" \
    docker.io/library/postgres:trixie

PODMAN_PID="$!"

# Wait podman to write container id
until [ -s "$CONTAINER_ID_FILE" ]; do
    sleep 1;
done

CONTAINER_ID="$(cat "$CONTAINER_ID_FILE")"

# Wait for postgress to be ready
until podman exec "$CONTAINER_ID" pg_isready \
    -U "$DATABASE_USER" \
    -d "$DATABASE_NAME" > /dev/null 2>&1
do
    sleep 1
done

echo "Postgress is ready"
npm run db:migrate

cleanup() {
    podman stop "$CONTAINER_ID"
    exit 0
}

trap cleanup SIGINT SIGTERM

echo "Migrations finished"
podman wait "$CONTAINER_ID"