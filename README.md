# Civic Pulse

Civic Pulse is a civic issue reporting and tracking prototype with a React/Vite frontend, Express/MongoDB backend, Leaflet map, role-aware login, chatbot, and camera evidence capture.

## Structure

```text
Civic-Pulse/
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── CivicChatbot.jsx
│   │   ├── CivicMap.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── .env.example
│   └── package.json
├── database/
│   └── seed/
└── .gitignore
```

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env` if needed:

```env
VITE_API_URL=http://localhost:5000/api
```

## Run backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and set a real MongoDB URI and JWT secret.

Then:

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

## Seed MongoDB

From `backend`:

```bash
npm run seed
```

Demo accounts created by the seed script:

- Citizen: `citizen@civicpulse.local` / `Citizen@123`
- Authority: `authority@civicpulse.local` / `Authority@123`

Change these credentials before using the project outside a demo.

## Camera evidence

The report page uses `navigator.mediaDevices.getUserMedia()` for a real camera capture. Browsers allow camera access on `localhost` and HTTPS. The captured image is previewed before the report is submitted.

## Map

The project uses Leaflet + OpenStreetMap-compatible tiles, so no Google Maps API key is required.

## Security notes

- `.env` files are excluded from Git/ZIP.
- Authority issue updates require a valid JWT with the `authority` role.
- MongoDB credentials must never be committed.
- The demo authority registration option is suitable for a prototype only; production deployments should restrict authority account creation.
