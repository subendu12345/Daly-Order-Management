
## Daly Order Management
Daly Order Management is a web application designed for sweet shops to manage products, orders, and inventory efficiently. The application uses Spring Boot for the backend, MySQL for database management, and React.js with Material-UI (MUI) for the frontend.

## Features
- Product Management: Create, update, and delete products.
- Order Management: Create, update, delete orders, and add items to existing orders.
- Order Tracking: View upcoming and delivered orders.
- User Interface: Responsive and user-friendly interface using Material-UI.

## Technologies Used

- Backend: Spring Boot
- Database: MySQL
- Frontend: React.js
- UI Framework: Material-UI (MUI)

# Installation
## Prerequisites
    Java 8 or higher
    Node.js and npm
    MySQL server
    Backend Installation

#### Clone the repository: 
    git clone https://github.com/subendu12345/Daly-Order-Management

    cd daly-order-management.
    cd backend

### Build the project:
    ./mvnw clean install

### Set up the database:
    CREATE DATABASE daly_order_management;

### Configure database settings:

Update the application.properties file in ```src/main/resources``` with your MySQL database configurations:
```
spring.datasource.url=jdbc:mysql://localhost:3306/daly_order_management
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```
## Frontend Installation
   - Navigate to the frontend directory:
    cd frontend
  - Install the dependencies: ``` npm install```
## Running the Application
  - Backend: ```cd/backend ./mvnw spring-boot:run```
  - Frontend: ```cd/frontend npm start ```
  
    





