# Stock Portfolio Management Application

## Overview
The Stock Portfolio Management Application is a comprehensive system for tracking, managing, and visualizing stock portfolios. It features a secure backend with RESTful APIs, a dynamic frontend with real-time data, and a reliable database for persistence. 

---

## Key Components
1. **Frontend**: Angular-based, dynamic dashboard with responsive charts using Chart.js.
2. **Backend**: Spring Boot REST APIs with Swagger documentation.
3. **Database**: MySQL for data persistence, supporting CRUD operations.
4. **Third-Party Integration**: Fetch real-time stock prices using APIs like Finnhub.

---

## Features
- **Portfolio Management**: Add, update, delete, and view stocks.
- **Live Stock Data**: Real-time updates of stock prices.
- **Visual Analytics**: Pie charts to display portfolio distribution.
- **Secure Authentication**: User login and token-based session management.

---

## Endpoints

### Backend APIs
- **User Authentication**
  - `POST /api/v1/auth/register` - Register a new user.
  - `POST /api/v1/auth/login` - Authenticate and get JWT.
- **Portfolio Operations**
  - `GET /api/v1/portfolio/{userId}` - Fetch portfolio details.
  - `POST /api/v1/portfolio` - Add stock to portfolio.
  - `PUT /api/v1/portfolio/{stockId}` - Update stock details.
  - `DELETE /api/v1/portfolio/{stockId}` - Remove stock from portfolio.
- **Stock Data**
  - `GET /api/v1/stock/{ticker}` - Fetch live stock price.
- **API Documentation**
  - Swagger: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## Setup Instructions

### Prerequisites
- **Node.js** & **npm** for frontend.
- **Java 17+** for backend.
- **MySQL** for database.

---

### Backend Setup
1. Clone the backend repo and navigate to its folder.
   ```bash
   git clone <backend-repo-url>
   cd backend
   ```
2. Configure the application.properties file:
   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/stock_portfolio
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
3. Run Spring Boot Server
   ```bash
   mvn spring-boot:run
   ```
4. Access Swagger at http://localhost:8080/swagger-ui/index.html.

---

### Frontend Setup
1. Clone the frontend repo and navigate to its folder.
   ```bash
   git clone <frontend-repo-url>
   cd frontend
   ```
2. Install Dependencies.
   ```bash
   npm install
   ```
3. Update environment.ts
   ```bash
   export const environment = {
   apiUrl: 'http://localhost:8080/api/v1',
   production: false
   };
   ```
4. Run the angular APP
    ```bash
    ng serve
    ```
5. Open http://localhost:4200.

---

## Database Setup
1. Create the Database:
```sql
CREATE DATABASE stock_portfolio;
```
2. Use the schema from schema.sql in the backend folder, or let JPA auto-generate it.
3. Verify the following tables.
   - users
   - stocks

---
  
## Running The Application
1. Start the backend using Spring Boot.
2. Launch the frontend using Angular.
3. Navigate to http://localhost:4200 and start managing your portfolio.

---

## How to Use
1. **Login**: Enter your credentials to access the dashboard.
2. **View Portfolio**: Navigate to the dashboard to view your stock portfolio details.
3. **Fetch Real-time Prices**: The application dynamically updates the current stock prices using the Finnhub API.
4. **Visualize Portfolio**: View portfolio distribution through an interactive pie chart.
5. **Logout**: Securely log out from the application. Any back navigation attempts will redirect to the home page.

---

## Deployment
1. Backend: Deploy the Spring Boot .jar on AWS EC2, Heroku, or similar platforms.
2. Frontend: Use ng build --prod to generate static files, then host on platforms like Nginx, Firebase Hosting, or Vercel.

---

## Screenshots
### Dashboard
![Dashboard Screenshot](path/to/dashboard-screenshot.png)

### Portfolio Chart
![Chart Screenshot](path/to/chart-screenshot.png)

---

## Future Enhancements
- **Add Authentication**: Integrate OAuth or JWT-based authentication.
- **Enhanced Stock Details**: Include more metrics like market cap, daily changes, and P/E ratio.
- **Historical Data**: Display historical price trends using line charts.
- **Push Notifications**: Notify users about significant portfolio changes.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
- [Finnhub API](https://finnhub.io/) for providing stock market data.
- [Angular](https://angular.io/) for the framework.
- [Chart.js](https://www.chartjs.org/) for chart visualization.

---

Feel free to contribute or report issues for improvement!
   
