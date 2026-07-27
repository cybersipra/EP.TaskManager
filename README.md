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
- AutoMapper

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
- PostgreSQL Database

---

# Prerequisites

Install the following software before running the project.

## Backend

- Visual Studio 2022
- .NET SDK 9
- PostgreSQL 16+

## Frontend

- Node.js 20+
- npm

---

# Clone Repository

```
git clone https://github.com/yourusername/EP.TaskManager.git

cd EP.TaskManager
```

---

# Database Setup

## Step 1

Create a PostgreSQL database.

Example

```
Database Name

EP_TaskManager
```

---

## Step 2

Update the connection string inside

```
EP.TaskManager.API/appsettings.json
```

Example

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=EP_TaskManager;Username=postgres;Password=yourpassword"
  }
}
```

---

## Step 3

Run Entity Framework migrations.

Open Package Manager Console

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

as Startup Project.

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

Start development server

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

# API Endpoints

## Projects

| Method | Endpoint |
|---------|----------|
| GET | /api/project |
| GET | /api/project/{id} |
| POST | /api/project |
| PUT | /api/project |
| DELETE | /api/project/{id} |

---

## Tasks

| Method | Endpoint |
|---------|----------|
| GET | /api/task |
| GET | /api/task/{id} |
| POST | /api/task |
| PUT | /api/task |
| DELETE | /api/task/{id} |

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

## PostgreSQL Connection Error

Verify

- PostgreSQL is running
- Username
- Password
- Database name
- Port number

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
Presentation
      │
      ▼
Application
      │
      ▼
Infrastructure
      │
      ▼
Database
```

---

# Author

Developed as a Clean Architecture sample project using ASP.NET Core, React, TypeScript, and PostgreSQL.
