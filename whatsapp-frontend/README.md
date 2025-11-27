# 🎨 WhatsApp Clone - Frontend

This directory contains the React-based frontend for the WhatsApp Clone application, built with Vite for a lightning-fast development experience.

## ✨ Overview

The frontend is a modern Single-Page Application (SPA) that provides a responsive and real-time user interface for the chat service. It communicates with the backend via a RESTful API for data and uses WebSockets for instant messaging.

---

## 🛠️ Tech Stack & Libraries

-   **⚛️ Framework:** React 18
-   **⚡ Build Tool:** Vite
-   **🐻 State Management:** Zustand
-   **🌐 HTTP Client:** Axios
-   **🔌 WebSocket Client:** StompJS & SockJS-Client
-   **🎨 UI Components:** Material-UI (MUI)
-   **🔐 Authentication:** `@react-keycloak/web`
-   **🗺️ Routing:** `react-router-dom`

---

## 📂 Project Structure

The project follows a feature-oriented structure to keep the codebase organized and maintainable.

```
/src
|
|-- /components       # 🧩 Reusable UI components (e.g., layout, chat bubbles)
|-- /config           # ⚙️ Configuration files (e.g., Keycloak client)
|-- /hooks            # 🎣 Custom React hooks (e.g., useWebSocket)
|-- /pages            # 📄 Top-level page components (e.g., Chat, Login)
|-- /services         # 📡 Modules for API communication
|-- /store            # 🏪 Zustand store for global state management
|-- App.jsx           # 🌍 Main application component with routing
|-- main.jsx          # 🚀 Entry point of the application
```

---

## 💻 Local Development

### ✅ Prerequisites
-   **Node.js 18+** and **npm**.
-   The backend server and infrastructure (PostgreSQL, Keycloak) must be running. Refer to the main project `README.md` for instructions.

### 🚀 Running the Application

1.  **Navigate to the directory:**
    ```sh
    cd whatsapp-frontend
    ```

2.  **Install dependencies:**
    This command downloads all the necessary packages.
    ```sh
    npm install
    ```

3.  **Start the development server:**
    This starts the Vite dev server with hot-reloading.
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

### 📜 Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Bundles the application for production.
-   `npm run preview`: Serves the production build locally for testing.
-   `npm run lint`: Lints the codebase to check for errors.
