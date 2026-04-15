# Campus Work

Campus Work is a full-stack MERN job portal for campus hiring. Admins can create and manage jobs, review applicants, and update application status. Students can sign up, browse jobs, apply, and track progress from a dashboard.

## Project Structure

```text
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
frontend/
  src/
    components/
    context/
    pages/
    services/
```

## Setup

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

## Quick Commands

From the repo root:

```bash
npm run backend
npm run frontend
npm run build
```
