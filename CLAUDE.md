# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Backend (Spring Boot + Maven)
```bash
# Development
./mvnw spring-boot:run     # Start backend on port 8092
./mvnw clean package       # Build JAR
./mvnw test               # Run tests

# Docker
docker build -t headless-cms-backend .
```

### Frontend (Vue 3 + TypeScript + Vite)
```bash
cd frontend/
npm run dev               # Start dev server on port 8094
npm run build             # Build for production (includes TypeScript check)
npm run preview           # Preview production build
```

### Full Stack
```bash
docker compose up --build -d    # Start both services with PostgreSQL
```

## Architecture Overview

### Backend Structure
- **Framework**: Spring Boot 3.4.5 with Java 21
- **Security**: JWT authentication with RSA keys, role-based access control
- **Database**: PostgreSQL with JPA/Hibernate
- **API**: RESTful endpoints with OpenAPI/Swagger documentation at `/`
- **File Uploads**: Avatar management service storing to `/uploads`

**Key Packages**:
- `authentication/` - JWT auth controllers and services
- `authority/` - Role/permission management
- `user/` - User domain with CRUD operations
- `configuration/` - Security, OpenAPI, RSA key setup

### Frontend Structure  
- **Framework**: Vue 3 with Composition API + TypeScript
- **UI**: Tailwind CSS 4.1.7 with Reka UI components
- **State**: Pinia stores for authentication
- **Routing**: Vue Router with auth guards
- **API**: Axios services with automatic JWT headers
- **i18n**: English/French translations

**Key Directories**:
- `components/` - Reusable Vue components
- `views/` - Page components
- `services/` - API service layer
- `stores/` - Pinia state management

### Key Configuration Files
- Backend config: `src/main/resources/application-{dev,prod}.yaml`
- Database schema: `src/main/resources/schema.sql`
- JWT keys: `src/main/resources/certs/`
- Frontend proxy: `frontend/vite.config.ts` (proxies `/api` to backend)

### Authentication Flow
1. Login via `/api/credential` with Basic Auth
2. Receive RSA-signed JWT token
3. Frontend stores token and includes in API requests
4. Role-based access control with `@IsAdmin` annotations

### Development Workflow
- Backend runs on port 8092 with hot reload (DevTools)
- Frontend dev server on port 8094 with Vite hot reload
- API calls proxied from frontend to backend during development
- PostgreSQL database required for backend operation

### Deployment
- Jenkins CI/CD pipeline with SonarQube analysis
- Docker Compose setup with NGINX reverse proxy for frontend
- Secrets managed via HashiCorp Vault
- Production backend serves API, NGINX serves frontend static files