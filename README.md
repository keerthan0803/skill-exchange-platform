# Skill Exchange Platform

A full-stack skill sharing platform with:

- `backend`: Spring Boot API (Java, Maven)
- `frontend`: React app (Vite)

## Project Structure

```text
Skill Exchange Platform/
  backend/   # Spring Boot service
  frontend/  # React + Vite client
```

## Prerequisites

- Java 17+
- Maven 3.9+ (or use the included Maven wrapper)
- Node.js 18+
- npm 9+

## Backend Setup

From the `backend` directory:

```bash
# Windows
mvnw.cmd spring-boot:run

# macOS/Linux
./mvnw spring-boot:run
```

The backend uses Spring profiles with these files:

- `src/main/resources/application.properties`
- `src/main/resources/application-dev.properties`
- `src/main/resources/application-prod.properties`

Run with a specific profile:

```bash
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
```

## Frontend Setup

From the `frontend` directory:

```bash
npm install
npm run dev
```

The Vite dev server starts on a local port (typically `5173`).

## Build Commands

Backend build:

```bash
cd backend
mvnw.cmd clean package
```

Frontend build:

```bash
cd frontend
npm run build
```

## Notes

- Root-level `.gitignore` is configured for both backend and frontend artifacts.
- Keep secrets in environment variables or local config files that are not committed.
