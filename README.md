# Job Postings API

## Project Info
This project provides a RESTful API for managing job postings using:

- **Backend Framework**: Starter template for Express.js made by me
- **Database**: MySQL with TypeORM for ORM and migrations
- **Containerization**: Docker and Docker Compose for easy setup and deployment
- **Soft Deletion**: Implemented using `deletedAt` column with TypeORM for safe record removal

### Features
- CRUD operations for job postings (Create, Read, Update, Delete)
- Soft delete for safe deletion
- RESTful API design
- Seeders for initial data population
- Fully containerized for ease of setup

## Project Stack
- **Programming Language**: TypeScript
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: TypeORM
- **Containerization**: Docker
- **Environment Management**: dotenv

## Setup Instructions

### Prerequisites
1. Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).
2. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) if running locally without Docker.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vasudeogaichor/job-board-backend.git
   cd job-board-backend
   ```

2. **Setup Environment Variables**:
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   DB_HOST=mysql
   DB_PORT=3306
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_database
   ```

   Also update the same variables in `docker-compose.yml` if you wish to use docker

3. **Start Services with Docker**:
   ```bash
   docker-compose up --build
   ```
   This will set up:
   - MySQL database
   - The Express.js server

<!-- 4. **Run Migrations**:
   After services are up, apply migrations:
   ```bash
   docker exec -it <container_name> npx typeorm migration:run -d ./src/data-source.ts
   ``` -->

4. **Seed Initial Data** (Optional):
   ```bash
   docker exec -it <container_name> ts-node src/seeders/seedJobs.ts
   ```

5. **Access the API**:
   The API will be available at `http://localhost:3005`.

### Local Setup Without Docker (Optional)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```

## Base URL (deployed): `https://vasudeogaichor.site/job-board-backend/api`
## API Endpoints

### Job Postings
1. **Create a Job**
   ```http
   POST /jobs
   ```
   Payload:
   ```json
   {
     "title": "Software Engineer",
     "company": "Tech Corp",
     "location": "Remote",
     "salary": 100000,
     "description": "Develop and maintain software applications."
   }
   ```

2. **Get All Jobs**
   ```http
   GET /jobs
   ```

3. **Get Job by ID**
   ```http
   GET /jobs/:id
   ```

4. **Update a Job**
   ```http
   PUT /jobs/:id
   ```
   Payload:
   ```json
   {
     "title": "Senior Software Engineer",
     "salary": 120000
   }
   ```

5. **Delete a Job (Soft Delete)**
   ```http
   DELETE /jobs/:id
   ```

6. **Restore a Job** (Optional)
   ```http
   POST /jobs/:id/restore
   ```

## Notes on Design Decisions

1. **Soft Delete**:
   - A `deletedAt` column was added to enable soft deletion.
   - This ensures data integrity and allows restoration of records.

2. **TypeORM**:
   - Chosen for its support for migrations and ease of use with TypeScript.

3. **Containerization**:
   - Docker was used for a consistent environment setup and ease of deployment.

4. **Separation of Concerns**:
   - Controllers handle business logic.
   - Entities define the database structure.
   - Routes manage API endpoints.

5. **Scalability**:
   - The project structure is designed to scale with additional features or modules.

## Future Enhancements
- Authentication and authorization (e.g., JWT)
- Enhanced query filters (e.g., by salary range, location)
- Pagination for large datasets
- Unit and integration tests

---

Feel free to reach out if you have any questions or suggestions for improvement!

