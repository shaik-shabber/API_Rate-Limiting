# API Rate Limiting System

A backend rate limiting system built with **Node.js, Express, and Redis** with a real-time dashboard to visualize allowed and blocked requests.

This project demonstrates how different **rate limiting algorithms** control API traffic and prevent abuse.

---

## Features

* Multiple rate limiting algorithms

  * Token Bucket
  * Fixed Window Counter
  * Sliding Window Log
  * Leaky Bucket
* Redis based request tracking
* Interactive dashboard with real-time statistics
* Load testing simulation
* Visualization using Chart.js
* REST API based architecture

---

## Tech Stack

Backend

* Node.js
* Express.js
* Redis

Frontend

* HTML
* CSS
* JavaScript
* Chart.js

---

## Project Structure

```
api-rate-limiter
│
├── algorithms
│   ├── tokenBucket.js
│   ├── slidingWindowLog.js
│   ├── fixedWindow.js
│   └── leakyBucket.js
│
├── routes
│   └── apiRoutes.js
│
├── config
│   └── redisClient.js
│
├── dashboard
│   ├── index.html
│   ├── style.css
│   └── dashboard.js
│
├── server.js
├── package.json
└── README.md
```

---

## How It Works

Each request is checked against a rate limiting algorithm before reaching the API.

Example flow:

1. Client sends request
2. Server checks rate limiter
3. Redis stores request data
4. If limit exceeded → request blocked (HTTP 429)
5. Dashboard updates allowed and blocked requests

---

## Rate Limiting Algorithms

### Token Bucket

Allows bursts of traffic while controlling the average request rate using tokens.

### Fixed Window Counter

Counts requests within a fixed time window.

### Sliding Window Log

Stores request timestamps and checks the number of requests within the moving window.

### Leaky Bucket

Processes requests at a constant rate and queues incoming requests.

---

## Dashboard

The dashboard allows you to:

* Select rate limiting algorithm
* Send API requests manually
* Run load tests
* View real-time statistics
* Visualize request distribution using charts

---

## Installation

Clone the repository

```
git clone https://github.com/YOUR_USERNAME/api-rate-limiter.git
```

Navigate to the project folder

```
cd api-rate-limiter
```

Install dependencies

```
npm install
```

Start Redis server.

Run the application

```
node server.js
```

Open in browser

```
http://localhost:3000
```

---

## Example API Response

Allowed request

```
200 OK
```

Blocked request

```
429 Too Many Requests
```

---

## Future Improvements

* Redis Lua scripts for atomic operations
* Distributed rate limiting support
* User based rate limiting
* API authentication
* Production deployment

---

## Author

Shabber Shaik

---

## License

This project is for educational and demonstration purposes.
