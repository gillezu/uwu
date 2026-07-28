# One image that builds the React client to static files and serves them from
# the Flask/Socket.IO server, so the whole app is a single origin on one port.
#
#   docker compose up --build   ->   http://localhost:5001

# ---------- Stage 1: build the client ----------
FROM node:22-alpine AS client-build

WORKDIR /client

# Dependencies first, so this layer is reused when only source files change.
COPY client/package.json client/package-lock.json ./
RUN npm ci

COPY client/ ./

# Empty means "talk to whatever origin served this page", so no API hostname is
# compiled into the bundle. Vite inlines VITE_* variables at build time, which is
# why this is a build-time concern rather than a runtime one. client/.env.production
# already sets this; repeated here so the image does not depend on that file.
ENV VITE_API_BASE_URL=""
RUN npm run build


# ---------- Stage 2: runtime ----------
FROM python:3.12-slim AS runtime

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=5001 \
    FLASK_DEBUG=0 \
    CLIENT_DIST=/app/client/dist

WORKDIR /app

# Again: dependencies before source, for layer caching.
COPY server/requirements.txt ./server/requirements.txt
RUN pip install --no-cache-dir -r server/requirements.txt

COPY server/ ./server/

# Only the compiled assets cross over — no node_modules, no client source.
COPY --from=client-build /client/dist ./client/dist

# Don't run as root.
RUN useradd --create-home --uid 10001 app && chown -R app:app /app
USER app

WORKDIR /app/server/app

EXPOSE 5001
CMD ["python", "server.py"]
