# 📱 WhatsApp Clone - Full-Stack Project

A comprehensive, full-stack WhatsApp clone featuring a Java/Spring Boot backend and a modern React frontend. This project implements real-time messaging, secure authentication via Keycloak, and a scalable, containerized architecture with Docker.

---

## 🏛️ Architecture Overview

The application is designed with a decoupled, service-oriented architecture, ensuring maintainability and scalability.

-   **🚀 Backend (Spring Boot):** A robust RESTful API handling business logic, user management, and real-time services.
-   **🎨 Frontend (React):** A responsive Single-Page Application (SPA) providing a fluid user interface.
-   **🔐 Authentication (Keycloak):** Centralized identity and access management, securing the entire platform.
-   **🗃️ Database (PostgreSQL):** A powerful, open-source relational database for all data persistence.
-   **⚡ Real-Time (WebSockets):** STOMP over WebSockets for instant message delivery and notifications.

---

## 🛠️ Tech Stack

### Backend
-   **☕ Java 17**
-   **🍃 Spring Boot 3**
-   **🛡️ Spring Security (OAuth2 & JWT)**
-   **🗄️ Spring Data JPA (Hibernate)**
-   **🔌 Spring WebSockets (STOMP)**
-   **🐘 PostgreSQL**
-   **🛠️ Maven**

### Frontend
-   **⚛️ React 18**
-   **⚡ Vite**
-   **🐻 Zustand** (State Management)
-   **🌐 Axios** (HTTP Client)
-   **🔌 StompJS & SockJS** (WebSocket Client)
-   **🎨 Material-UI** (Component Library)

### Infrastructure & Authentication
-   **🐳 Docker & Docker Compose**
-   **🔑 Keycloak**

---

## 🚀 Getting Started

### ✅ Prerequisites
-   **Docker** and **Docker Compose** installed and running.
-   **Java 17+** & **Maven** (for local backend development).
-   **Node.js 18+** & **npm** (for local frontend development).

### 1. Docker-Based Setup (Recommended)

The simplest way to get the entire application stack running.

**Step 1: Configure Keycloak Realm**

1.  Start the core infrastructure services:
    ```sh
    docker-compose up -d postgres keycloak
    ```
2.  Wait for Keycloak to initialize (approx. 1-2 minutes).
3.  Access the Keycloak admin console at `http://localhost:9090` (login with `admin` / `admin`).
4.  Hover over the **master** realm, click **Create Realm**, and select the **Import** option.
5.  Choose the `keycloak-realm-config.json` file from the project root and click **Create**. This sets up the realm, client, and a test user (`testuser` / `password`).

**Step 2: Run the Full Application**

```sh
# Build and start all services in detached mode
docker-compose up --build -d
```

The application will be available at `http://localhost:5173`.

### 2. Local Development Setup

For active development with hot-reloading.

**Step 1: Run Infrastructure**

The database and Keycloak must still run in Docker.
```sh
docker-compose up -d postgres keycloak
```
(Ensure the Keycloak realm is imported as described above).

**Step 2: Run the Backend (IDE)**

1.  Open the `whatsappclone` directory in your IDE.
2.  Run the `WhatsAppCloneApiApplication` main class. The backend will start on `http://localhost:8088`.

**Step 3: Run the Frontend (Terminal)**

1.  Navigate to the frontend directory: `cd whatsapp-frontend`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`

The frontend will be available at `http://localhost:5173`.
