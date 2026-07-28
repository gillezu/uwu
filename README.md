# uwu

Conway's Game of Life: a React client and a Flask + Socket.IO server that owns
the simulation state.

## Run it

Docker is the only prerequisite — no Node, no Python, no virtualenv, no version
juggling, nothing to configure:

```bash
git clone https://github.com/gillezu/uwu.git
cd uwu
docker compose up --build
```

Then open **http://localhost:5001**. `Ctrl+C` stops it.

The first build takes a couple of minutes (npm install + pip install). After
that the layers are cached and it starts in seconds.

The image builds the client into static files and serves them from the same
server that hosts the API and the websocket, so it is one container on one port
with a single origin — no CORS, no API hostname to set, no second terminal.

### What works out of the box

Drawing cells, randomize, play/pause, the FPS slider, spells and levels all work
with zero setup.

**Library / Save / Load Pattern will not do anything.** Those need a Supabase
project, which is not included — see [the pattern library](#optional-the-pattern-library)
below. Nothing else is affected.

### If port 5001 is already taken

Change the host side of the mapping in `docker-compose.yml` and use that URL:

```yaml
ports:
  - "8080:5001" # → http://localhost:8080
```

> Do **not** resolve a conflict by switching to port 5000 on macOS. AirPlay
> Receiver already listens there and answers every request with HTTP 403, so the
> server never binds and the app looks broken with no useful error. This is the
> single most confusing failure mode in this project.

### Heads up: the simulation is shared

The grid is one global in-memory board on the server. Everyone who opens the app
sees and edits the *same* field, so two people at once will overwrite each
other's cells. State resets whenever the container restarts.

## Run it for development

Two terminals, with hot reload.

**Server** — needs Python 3.12 (the pinned deps have no wheels for 3.13/3.14):

```bash
cd server
python3.12 -m venv .venv          # or: uv venv --python 3.12 .venv
./.venv/bin/pip install -r requirements.txt
cd app && ../.venv/bin/python server.py    # http://localhost:5001
```

**Client:**

```bash
cd client
npm install
npm run dev                       # http://localhost:5173
```

In dev the client reads `VITE_API_BASE_URL` from `client/.env` to reach the
server cross-origin. Leaving it empty (as production builds do, via
`client/.env.production`) makes the client talk to its own origin instead.

Set `PORT` to move the server off 5001 — but not to 5000, for the AirPlay reason
above.

## Optional: the pattern library

Library / Save / Load Pattern need a Supabase project with a `Patterns` table
(columns `Name`, `Code`). Set `SUPABASE_URL` and `SUPABASE_KEY` — in `.env` for
Docker (`cp .env.example .env`), or `server/.env` for local dev. Without them
the simulation runs normally and the library is just empty.

Seed a fresh table with the built-in patterns:

```bash
cd server/app && ../.venv/bin/python pattern_library.py
```

## Optional: the pygame desktop version

```bash
cd server
./.venv/bin/pip install -r requirements-desktop.txt
cd app && ../.venv/bin/python main.py
```

## Future Ideas:
- Zooming
- Level-based, playable game (2 level)
- Predator, explosive, healer, virus cells
- Constants for Spells
- Background Gioele
- Achievements Richard
  - Stable Patterns
- Navbar styling Gioele
- Morphing blob in sidebar Gioele
- merge main.py and test.py 
- modularize main.py
- update pygame
- (more statistics)
- background music
- Heatmap for activity
- glow effects + spell fx gioele
- 3d Grids
- Gravity
