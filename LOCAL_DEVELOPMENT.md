# Local Development Setup

## Prerequisites
- Node.js 16+ (Frontend)
- Java 11+ (Backend)
- Maven (Backend)

## Running Locally

### Backend (Spring Boot)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Configure local environment:**
   - The `.env.local` file in the root directory is used for backend configuration
   - Uses the same **Neon PostgreSQL database** as production
   - No additional database setup needed - connected to cloud database
   - All data syncs between local development and production

3. **Run the backend:**
   ```bash
   mvn spring-boot:run
   ```
   Or:
   ```bash
   ./mvnw spring-boot:run
   ```

   Backend will start on: `http://localhost:8000`

### Frontend (React + Vite)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure local environment:**
   - The `frontend/.env.local` file is already configured for local development
   - API will point to: `http://localhost:8000/api`
   - Frontend will run on: `http://localhost:3000`

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Or:
   ```bash
   npm start
   ```

   Frontend will start on: `http://localhost:3000`

## Environment Files

### `.env.local` (Root Directory)
Used by backend for database and OAuth configuration. Contains:
- **PostgreSQL (Neon) database credentials** - Same as production
- JWT secret
- Google OAuth credentials
- API URLs

All data is stored in the cloud database and synced across local and production environments.

### `frontend/.env.local`
Used by React app for API configuration. Contains:
- Backend API URL: `http://localhost:8000/api`
- Frontend URL: `http://localhost:3000`

## Database Setup

The local development uses the **same Neon PostgreSQL database** as production:
- **Database**: Cloud-based (Neon)
- **Host**: `ep-mute-dew-amwf3q9p-pooler.c-5.us-east-1.aws.neon.tech`
- **Port**: 5432
- **Name**: `neondb`

**No local setup needed** - just run the backend and it connects to the cloud database.

### ⚠️ Important Notes:
- Local development data **syncs with production** (same database)
- Changes made locally are reflected in production
- Test data will be visible to deployed app
- For isolated testing, consider creating a separate Neon project

## Testing OAuth Locally

To test Google OAuth locally:

1. Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local` with your own credentials
2. Add `http://localhost:3000` to authorized redirect URIs in Google Cloud Console
3. Restart both backend and frontend

## Troubleshooting

**Port already in use:**
- Backend (8000): `lsof -i :8000` on Mac/Linux
- Frontend (3000): `lsof -i :3000` on Mac/Linux
- Windows: `netstat -ano | findstr :8000`

**Database connection errors:**
- Verify PostgreSQL is running (if using PostgreSQL)
- Check credentials in `.env.local`
- H2 in-memory database doesn't require setup

**API connection errors:**
- Ensure backend is running on `http://localhost:8000`
- Check `VITE_API_BASE_URL` in `frontend/.env.local`
- Browser console will show the API endpoint being used

## Build for Production

### Backend:
```bash
cd backend
mvn clean package
java -jar target/skill-exchange-platform-1.0.0.jar
```

### Frontend:
```bash
cd frontend
npm run build
# Outputs to frontend/build directory
```
