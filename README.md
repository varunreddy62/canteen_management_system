# CampusBite - Canteen Management System

A Full-Stack Canteen Management System designed for colleges/universities to handle student food orders and canteen administration.

## 🚀 Tech Stack

**Frontend:** React.js, React Router, Axios, CSS / Bootstrap (Icons)
**Backend:** Java Spring Boot, Spring Web, Spring Data JPA, Lombok, Maven
**Database:** MySQL

## 📁 Project Structure

```
root/
├── frontend/          # React.js application
├── backend/           # Spring Boot application
└── database/          # SQL scripts
```

## 🛠️ Step-by-Step Setup Guide

### 1. Database Setup (MySQL)

1. Open MySQL Workbench or your preferred MySQL client.
2. Run the provided database script to create the database, tables, and sample data.
   - You can copy the contents of `database/canteen_db.sql` and run it.
3. Verify that the database `canteen_db` and tables (`food_items`, `orders`, `order_items`, `admins`) are created.

### 2. Backend Setup (Spring Boot)

1. Ensure you have **Java 17+** and **Maven** installed.
2. Open the `backend/` folder in your IDE (IntelliJ IDEA, Eclipse, VS Code).
3. Ensure MySQL is running on port `3306`.
4. Open the `backend/src/main/resources/application.properties` file and verify your MySQL credentials:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=root
   ```
   *(Update the password if yours is different)*
5. **Run the backend application:**
   You can run it from your IDE by executing the `CanteenApplication.java` main class, or use Maven from the terminal inside the `backend` folder:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.

### 3. Frontend Setup (React.js)

1. Ensure you have **Node.js** (v16+) installed.
2. Open a terminal and navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will automatically open at `http://localhost:3000`.

## 📌 Usage & Features

### Student/User Flow
- **Menu:** Browse food, filter by category (Breakfast, Lunch, Snacks, Drinks), or search.
- **Cart:** Add items, change quantities, view total.
- **Checkout:** Provide your name and place the order.
- **Orders:** View your placed orders and their status (Pending, Preparing, Completed).

### Admin Flow
- Go to `Admin` in the navigation bar.
- Use the Demo Credentials:
  - **Username:** `admin`
  - **Password:** `admin123`
- Inside the Dashboard, you can:
  - **Manage Menu:** Add new foods, edit prices/descriptions, delete items.
  - **Manage Orders:** View recent orders and update their status (e.g., from 'Pending' to 'Preparing' to 'Completed').

---
*Created for College Project Submission*
