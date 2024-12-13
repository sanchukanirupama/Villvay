# Villvay Assessment

## Overview

Welcome to the Villvay Assessment project! This application is designed to allow users with different roles (Admin, User, Guest) to authenticate and access specific endpoints based on their roles. It is fully containerized using Docker, making it easy to clone and set up for local development.

### Features:
- **Role-based Access Control**: The application has 3 roles (Admin, User, Guest) with different levels of access.
- **Role-Specific Endpoints**: Each role has specific endpoints they can access.
- **Easy Setup**: The app is fully containerized with Docker, and you can get it up and running with a single command.
- **Role Update**: Admin users can update the roles of other users.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone <repo_url>
    cd <project_directory>
    ```

2. **Build and start the application with Docker**:
    ```bash
    docker-compose up --build
    ```

3. **Register as a user**:
    - You can register as an Admin, User, or Guest by filling out the registration form in the application.

4. **Login**:
    - Once registered, log in with the credentials for your selected role.

5. **Test the API Endpoints**:
    After logging in, you can test the following API endpoints based on your logged-in role:

    - `GET /api/public`: Accessible to everyone, no authentication required.
    - `GET /api/user-data`: Accessible only to authenticated users with the **USER** or **ADMIN** role.
    - `GET /api/admin-data`: Accessible only to authenticated users with the **ADMIN** role.
    - `GET /api/guest-data`: Accessible only to authenticated users with the **GUEST** role.

6. **Update User Roles**:
    On the right side of the application interface, you will see a form that allows you to update the roles of users. Only **Admin** users can modify roles.

## Technologies Used

- **Node.js** - Backend server to handle API requests.
- **Next.js** - Frontend framework for building the user interface and handling server-side rendering.
- **Docker** - Containerization for easy deployment and scaling.
- **SQLite** - Lightweight SQL database to store user data and other application information.

## Roles and Permissions

- **Admin**: Can access all endpoints, manage user roles, and modify system settings.
- **User**: Can access user data and public endpoints but cannot access admin-specific data.
- **Guest**: Can only access the public endpoint.

## Conclusion

This project showcases how to implement role-based access control in a web application. By running this project, you can learn how roles and permissions are applied in a real-world application.

Feel free to clone and try it out! If you have any questions or feedback, feel free to open an issue.
