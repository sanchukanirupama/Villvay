# Villvay Assessment

## Overview
This project demonstrates a comprehensive approach to authentication and authorization with a focus on role-based access control, API accessibility based on roles, dynamic role assignments, and role-based redirection. It includes the following key features:

### Features
- **Role-Based Access Control**: Supports three roles—Admin, User, and Guest—each with defined access levels.
- **Role-Specific API Endpoints**: Dedicated API endpoints tailored to each role.
- **Simple Deployment**: Fully containerized with Docker for a seamless setup using a single command.

## Getting Started

Follow these steps to set up and run the project:

### Using Docker (Recommended)
1. **Clone the repository**:
    ```bash
    git clone <repo_url>
    cd <project_directory>
    ```

2. **Build and start the application**:
    ```bash
    docker-compose up --build
    ```

3. Alternatively, use the Makefile command:
    ```bash
    make up
    ```

4. Access the application and interact with its features, such as registering users, logging in, and managing roles.

---

### Running Backend and Frontend Separately

If you prefer to run the backend and frontend independently without Docker:

1. **Backend Setup**:
    - Navigate to the backend folder:
      ```bash
      cd <project_directory>/backend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the backend server:
      ```bash
      npm run dev
      ```

2. **Frontend Setup**:
    - Navigate to the frontend folder:
      ```bash
      cd <project_directory>/frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the frontend server:
      ```bash
      npm run dev
      ```

Now, the backend and frontend servers will run independently, and you can access the application through your browser.

---

### Register as a User
- You can register as an Admin, User, or Guest by filling out the registration form in the application.

### Login
- Once registered, log in with the credentials for your selected role.

### Test the API Endpoints
After logging in, you can test the following API endpoints based on your logged-in role:

- `GET /api/public`: Accessible to everyone, no authentication required.
- `GET /api/user-data`: Accessible only to authenticated users with the **USER** or **ADMIN** role.
- `GET /api/admin-data`: Accessible only to authenticated users with the **ADMIN** role.
- `GET /api/guest-data`: Accessible only to authenticated users with the **GUEST** role.

### Update User Roles
On the right side of the application interface, you will see a form that allows you to update the roles of users. Only **Admin** users can modify roles.

## Technologies Used

- **Node.js** - Backend server to handle API requests.
- **Next.js** - Frontend framework for building the user interface and handling server-side rendering.
- **Docker** - Containerization for easy deployment and scaling.
- **SQLite** - Lightweight SQL database to store user data and other application information.


## API Endpoints
- **Public Endpoint**: 
  - `GET /api/public`: Accessible to everyone, no authentication required.
- **User Endpoint**:
  - `GET /api/user-data`: Accessible only to authenticated users with the **USER** or **ADMIN** role.
- **Admin Endpoint**:
  - `GET /api/admin-data`: Accessible only to authenticated users with the **ADMIN** role.
- **Guest Endpoint**:
  - `GET /api/guest-data`: Accessible only to authenticated users with the **GUEST** role.