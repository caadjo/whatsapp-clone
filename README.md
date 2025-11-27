# WhatsApp Clone - Full-Stack

This repository contains the source code for a full-stack WhatsApp clone, featuring a Java-based backend (Spring Boot) and a modern frontend built with React. The project leverages Keycloak for authentication, PostgreSQL for data persistence, and WebSockets for real-time messaging.

## Architecture Overview

The project is designed with a decoupled, service-oriented architecture, containerized with Docker for easy setup and deployment.

- **Backend (Spring Boot):** A robust RESTful API that handles business logic, user management, chat services, and message persistence.
- **Frontend (React):** A responsive single-page application (SPA) that provides the user interface, built with Vite for a fast development experience.
- **Authentication (Keycloak):** Centralized identity and access management, securing both the backend API and the frontend application.
- **Database (PostgreSQL):** A powerful, open-source relational database for storing user data, chat history, and messages.
- **Real-Time Communication (WebSockets):** STOMP over WebSockets is used for instant message delivery and real-time notifications.

---

## Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3**
- **Spring Security (OAuth2 & JWT)**
- **Spring Data JPA (Hibernate)**
- **Spring WebSockets (STOMP)**
- **PostgreSQL**
- **Maven**

### Frontend
- **React 18**
- **Vite**
- **Zustand** (State Management)
- **Axios** (HTTP Client)
- **StompJS & SockJS** (WebSocket Client)
- **Material-UI** (Component Library)

### Infrastructure & Authentication
- **Docker & Docker Compose**
- **Keycloak**

---

## Getting Started

### Prerequisites
- **Docker** and **Docker Compose** must be installed and running.
- **Java 17+** and **Maven** for running the backend locally.
- **Node.js 18+** and **npm** for running the frontend locally.

### 1. Docker-Based Setup (Recommended)

This is the simplest way to get the entire application stack (Backend, Frontend, Database, Keycloak) up and running.

**Step 1: Configure Keycloak Realm**

The project requires a pre-configured Keycloak realm.

1.  Start the core services:
    ```sh
    docker-compose up -d postgres keycloak
    ```
2.  Wait for Keycloak to initialize (approx. 1-2 minutes).
3.  Access the Keycloak admin console at `http://localhost:9090` and log in with `admin` / `admin`.
4.  In the top-left corner, hover over the "master" realm and click **Create Realm**.
5.  Select **Import** and choose the `keycloak-realm-config.json` file from the root of this project.
6.  Click **Create**. This will create the `whatsapp-clone` realm with the necessary client and a test user (`testuser` / `password`).

**Step 2: Run the Full Application**

Once the realm is configured, you can start the backend and frontend services.

```sh
# Build and start all services in detached mode
docker-compose up --build -d
```

The application will be available at `http://localhost:5173`.

### 2. Local Development Setup

For active development, you may want to run the backend and frontend on your local machine for features like hot-reloading.

**Step 1: Run Infrastructure Services**

The database and Keycloak must still run in Docker.

```sh
docker-compose up -d postgres keycloak
```
Ensure you have imported the Keycloak realm as described in the Docker-based setup.

**Step 2: Run the Backend (IDE)**

1.  Open the `whatsappclone` directory in your favorite IDE (e.g., IntelliJ IDEA).
2.  Ensure your IDE is configured to use Java 17.
3.  The `application.yml` is pre-configured to connect to the PostgreSQL container at `localhost:5432`.
4.  Run the `WhatsAppCloneApiApplication` main class. The backend will start on `http://localhost:8088`.

**Step 3: Run the Frontend (Terminal)**

1.  Navigate to the frontend directory:
    ```sh
    cd whatsapp-frontend
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Start the development server:
    ```sh
    npm run dev
    ```
The frontend will be available at `http://localhost:5173`.
