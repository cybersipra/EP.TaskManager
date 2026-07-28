# EP Task Manager

A modern Task Management application built using **ASP.NET Core Web API**, **React + TypeScript**, **SQL Server**, and **Clean Architecture**.

The project demonstrates enterprise-level architecture, including the Repository Pattern, service layer, dependency injection, reusable APIs, and a responsive React frontend.

---

# Technology Stack

## Backend

- ASP.NET Core 10 Web API
- C#
- Entity Framework Core
- SQL Server
- Clean Architecture
- Dependency Injection
- Repository Pattern
- Fluent Validation
- ManualMapper

## Frontend

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Axios
- Bootstrap 5
- React Toastify

---

# Project Structure

```
EP.TaskManager
│
├── EP.TaskManager.API
│     ASP.NET Core Web API
│
├── EP.TaskManager.Application
│     Business Logic
│
├── EP.TaskManager.Domain
│     Domain Entities
│
├── EP.TaskManager.Infrastructure
│     Database
│     Repository
│     EF Core
│
├── EP.TaskManager.FrontEnd
│     React + TypeScript
│
└── README.md
```

---

# Features

- Project Management
- Task Management
- CRUD Operations
- Validation
- Clean Architecture
- Repository Pattern
- REST APIs
- Responsive UI
- SQL Server Database

---

# Prerequisites

Install the following software before running the project.

## Backend

- Visual Studio 2022
- .NET SDK 10
- SQL Server

## Frontend

- Node.js 20+
- npm

---

# Clone Repository

```
git clone https://github.com/cybersipra/EP.TaskManager.git

cd EP.TaskManager
```

---

# Database Setup

## Step 1
Set the ConnectionString in the appsettings.json file for .NET Core API
```

Example

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=EP_TaskManager;User Id=sa;Password=yourpassword;TrustServerCertificate=True;"
  }
}
```

---

## Step 2

Run Entity Framework migrations.

Open the Package Manager Console

```
Update-Database
```

or

```
dotnet ef database update
```

This will automatically create all required tables.

---

# Running the Backend

Open

```
EP.TaskManager.sln
```

Set

```
EP.TaskManager.API
```

as the Startup Project.

Run

```
F5
```

or

```
Ctrl + F5
```

Swagger will open.

Example

```
https://localhost:44363/swagger
```

---

# Running the Frontend

Navigate to

```
EP.TaskManager.FrontEnd
```

Install packages

```
npm install
```

Start the development server

```
npm run dev
```

Example

```
http://localhost:5173
```

---

# Frontend Environment

Create

```
.env
```

inside

```
EP.TaskManager.FrontEnd
```

Add

```
VITE_API_URL=https://localhost:44363/api
```

Restart Vite after changing the file.

---

# CORS Configuration

The backend allows the frontend during development.

Example

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

app.UseCors("Frontend");
```

---

---

# Build Frontend

```
npm run build
```

Output

```
dist/
```

---

# Running Production

Backend

```
dotnet publish -c Release
```

Frontend

```
npm run build
```

Deploy

- Backend to IIS / Docker / Linux
- Frontend static files to Nginx / IIS / Apache

---

# Common Issues

## CORS Error

Verify

```
app.UseCors("Frontend");
```

is registered before

```
app.UseAuthorization();
```

---

## API Returns 404

Verify the API URL inside

```
.env
```

```
VITE_API_URL=https://localhost:44363/api
```

---

## Environment Variable Not Updating

Restart Vite

```
Ctrl + C

npm run dev
```

---

## SQL Connection Error

Verify

- SQLServer is running
- Username
- Password
- Database name

---

## Port Already In Use

Kill the running process or specify another port.

```
npm run dev -- --port 5173
```

---

# Development Commands

Backend

```
dotnet restore

dotnet build

dotnet run
```

Frontend

```
npm install

npm run dev

npm run build

npm run preview
```

---

# Architecture

```

                Client (React)
                      │
                      ▼
          ASP.NET Core Web API
                      │
                      ▼
          Application Layer
                      │
                      ▼
            Domain Layer
                      │
                      ▼
        Infrastructure Layer
                      │
                      ▼
               SQL Server

---
---

# Technical Decisions & Design Choices

## 1. Frontend and Backend Separation

Two architectural approaches were considered during development:

### Option 1
- React frontend hosted inside the ASP.NET Core project.

### Option 2 (Chosen)
- ASP.NET Core Web API as an independent backend project.
- React application as a standalone frontend project.
- Both projects maintained within the same solution directory and Git repository.

### Why this approach?

This architecture provides several advantages:

- Independent development of frontend and backend.
- Frontend can be developed using Visual Studio Code.
- Backend can be developed using Visual Studio.
- Independent build and deployment pipelines.
- Easier maintenance and debugging.
- Frontend can later be replaced (Angular, Vue, Mobile App, etc.) without changing the backend.
- Backend APIs can be consumed by multiple clients such as Web, Mobile, Desktop, or third-party applications.
- Both projects remain organized inside a single repository for easier project management.

---

## 2. Latest Stable Technology Stack

The project was built using the latest stable technologies available during development.

### Backend

- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server

### Frontend

- React 19
- TypeScript
- Vite

Using the latest stable framework versions provides:

- Long-term Microsoft support (.NET LTS)
- Better performance
- Improved security
- Modern language features
- Easier future maintenance

---

## 3. Feature-Oriented Modular Architecture

The backend follows **Clean Architecture** with clear separation of responsibilities.

```
API
│
├── Domain
│
├── Application
│
└── Infrastructure
```

Within the Application and Domain layers, the solution is organized by business modules.

Example:

```
Application
│
├── Projects
│     ├── DTOs
│     ├── Interfaces
│     ├── Services
│     └── Validators
│
└── Tasks
      ├── DTOs
      ├── Interfaces
      ├── Services
      └── Validators
```

This modular structure keeps each feature isolated and easier to maintain.

---

## 4. Microservice Ready Design

Although this project is implemented as a Modular Monolith, each business feature is isolated from the others.

For example:

- Project module
- Task module

Each module contains its own:

- DTOs
- Services
- Validators
- Business Logic
- Repository Interfaces

If the application grows in the future, these modules can be extracted into independent microservices with minimal refactoring.

---

## 5. Reusable Frontend Architecture

The React application was designed using reusable components instead of duplicating UI code.

Reusable components include:

- Button
- Input
- TextArea
- Modal
- Card
- Loader
- Page Header
- Confirmation Dialog
- Toast Notifications

These shared components are used throughout both the Project and Task modules.

Benefits include:

- Less duplicated code
- Easier maintenance
- Consistent UI
- Faster development

---

## 6. Centralized API Communication

A reusable API layer was implemented for all HTTP communication.

The frontend includes:

- Axios Client
- Request/Response Interceptors
- Environment-based API configuration

This approach avoids repetitive API code and simplifies future module development.

---

## 7. Scalable Folder Structure

Both frontend and backend follow a feature-based folder structure instead of organizing files solely by type.

Example:

```
features
│
├── projects
│
└── tasks
```

Each feature contains its own:

- Components
- Pages
- Hooks
- Types
- API Integration

This makes it easier to add new modules without affecting existing functionality.

---

## 8. Deployment

Both the frontend and backend have been deployed on a personal development environment using a personal domain for demonstration and testing purposes.

Deployment includes:

- ASP.NET Core Web API
- React Production Build
- SQL Server Database

The deployed application has been tested to validate:

- CRUD operations
- API communication
- Routing
- Validation
- Production deployment

The deployment URL and demonstration video are shared separately for review.

---

## 9. Testing

The application was tested before submission to verify:

- Project CRUD operations
- Task CRUD operations
- Form validation
- API responses
- Error handling
- Navigation
- Production deployment

Testing was also performed by an independent tester to validate the application's functionality before submission.

---
# Author
Ehsan Raza
Developed as a Clean Architecture sample project using ASP.NET Core, React, TypeScript, and SQL Server.
