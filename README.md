# Headless CMS

A modern headless content management system built with Spring Boot and Vue 3, featuring JWT authentication, role-based access control, and a responsive admin interface.

## 🚀 Features

- **Secure Authentication**: RSA-signed JWT tokens with role-based access control
- **User Management**: Complete CRUD operations with avatar uploads and role assignments
- **Multi-language Support**: English and French internationalization
- **Responsive Design**: Modern UI built with Vue 3 and Tailwind CSS
- **RESTful API**: Comprehensive API with OpenAPI/Swagger documentation
- **Production Ready**: Docker containerization and CI/CD pipeline with Jenkins

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.4.5** with Java 21
- **PostgreSQL** database with JPA/Hibernate
- **JWT Authentication** with RSA key pair encryption
- **OpenAPI 3** documentation and Swagger UI
- **Maven** for dependency management

### Frontend
- **Vue 3** with Composition API and TypeScript
- **Vite** for fast development and building
- **Tailwind CSS 4.1.7** for styling
- **Reka UI** components library
- **Pinia** for state management
- **Vue Router** with authentication guards
- **Vue i18n** for internationalization

### DevOps & Deployment
- **Docker** and Docker Compose
- **NGINX** reverse proxy
- **Jenkins** CI/CD with SonarQube analysis
- **HashiCorp Vault** for secrets management

## 📋 Prerequisites

- **Java 21** or higher
- **Node.js 18+** and npm/pnpm
- **PostgreSQL** database
- **Docker** and Docker Compose (for containerized setup)
- Your preferred IDE (IntelliJ IDEA, VS Code, etc.)

## ⚡ Quick Start

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd headless-cms
```

2. Start all services with Docker Compose:
```bash
docker compose up --build -d
```

3. Access the application:
   - **Frontend**: http://localhost:8094
   - **Backend API**: http://localhost:8092
   - **API Documentation**: http://localhost:8092

### Manual Development Setup

#### Backend Setup

1. Ensure PostgreSQL is running and create a database
2. Update database configuration in `src/main/resources/application-dev.yaml`
3. Start the backend:
```bash
./mvnw spring-boot:run
```

The backend will be available at http://localhost:8092

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:8094

## 🏗️ Project Structure

### Backend (`/src/main/java/dev/alphasow/headless_cms/`)
```
├── authentication/          # JWT authentication controllers and services
├── authority/              # Role and permission management
├── user/                   # User domain with CRUD operations
├── configuration/          # Security, OpenAPI, and RSA key configuration
├── model/                  # Shared models and DTOs
└── service/               # Shared services (file upload, etc.)
```

### Frontend (`/frontend/src/`)
```
├── components/            # Reusable Vue components
├── views/                 # Page components
├── services/              # API service layer
├── stores/                # Pinia state management
├── models/                # TypeScript interfaces
├── router/                # Vue Router configuration
├── locales/               # i18n translation files
└── lib/                   # Utility functions
```

## 🔐 Authentication

The application uses JWT authentication with RSA key pair signing:

1. **Login**: Send credentials to `/api/credential` with Basic Auth
2. **Token**: Receive RSA-signed JWT token
3. **Authorization**: Include token in `Authorization: Bearer <token>` header
4. **Roles**: Access control based on user authorities (ADMIN, USER)

### Default Credentials
- Username: `admin`
- Password: `admin`

## 📡 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8092
- **OpenAPI JSON**: http://localhost:8092/v3/api-docs

### Key Endpoints

- `POST /api/credential` - Authentication
- `GET /api/users` - List users (Admin only)
- `POST /api/users` - Create user (Admin only)
- `PUT /api/users/{id}` - Update user
- `GET /api/authorities` - List available authorities

## 🚀 Development Commands

### Backend
```bash
./mvnw spring-boot:run      # Start development server
./mvnw clean package        # Build JAR
./mvnw test                 # Run tests
```

### Frontend
```bash
npm run dev                 # Start dev server with hot reload
npm run build               # Build for production
npm run preview             # Preview production build
```

### Docker
```bash
docker compose up --build -d    # Start all services
docker compose down             # Stop all services
docker compose logs -f          # View logs
```

## 🌐 Production Deployment

The application includes:
- **Jenkins CI/CD pipeline** with SonarQube analysis
- **Docker containers** for both frontend and backend
- **NGINX reverse proxy** serving frontend and proxying API calls
- **Vault integration** for secure secret management

Environment-specific configurations are in:
- `src/main/resources/application-{dev,prod}.yaml`
- `docker-compose.yaml` for container orchestration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
