# Restaurant Backend API - Postman Collection

## Quick Import to Postman

1. Open Postman
2. Click "Import" button
3. Copy and paste this JSON
4. Start testing!

## Collection JSON

```json
{
  "info": {
    "name": "Restaurant Backend API",
    "description": "Simple restaurant management API for AWS deployment learning",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["health"]
        },
        "description": "Check if the API server is running"
      }
    },
    {
      "name": "Get All Menu Items",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/menu",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "menu"]
        },
        "description": "Retrieve all menu items from the restaurant"
      }
    },
    {
      "name": "Get Menu Item by ID",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/menu/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "menu", "1"]
        },
        "description": "Get a specific menu item by its ID"
      }
    },
    {
      "name": "Create Menu Item",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Pasta Carbonara\",\n  \"description\": \"Creamy pasta with bacon and parmesan cheese\",\n  \"price\": 14.99,\n  \"category\": \"Main Course\",\n  \"is_available\": true\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/menu",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "menu"]
        },
        "description": "Add a new menu item to the restaurant"
      }
    },
    {
      "name": "Get All Reservations",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/reservations",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "reservations"]
        },
        "description": "Retrieve all restaurant reservations"
      }
    },
    {
      "name": "Create Reservation",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"customer_name\": \"Jane Smith\",\n  \"customer_email\": \"jane.smith@example.com\",\n  \"customer_phone\": \"+1987654321\",\n  \"party_size\": 2,\n  \"reservation_date\": \"2025-01-20\",\n  \"reservation_time\": \"18:30:00\",\n  \"special_requests\": \"Window seat for anniversary dinner\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/reservations",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "reservations"]
        },
        "description": "Create a new restaurant reservation"
      }
    },
    {
      "name": "API Root (Documentation)",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": [""]
        },
        "description": "View API documentation and available endpoints"
      }
    }
  ]
}
```

## Manual Testing Guide

### 1. Health Check
**Endpoint:** `GET /health`  
**Expected Response:**
```json
{
  "success": true,
  "message": "Restaurant Backend API is running",
  "timestamp": "2025-12-31T11:08:50.000Z",
  "uptime": 123.45
}
```

### 2. Get All Menu Items
**Endpoint:** `GET /api/menu`  
**Expected Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

### 3. Get Menu Item by ID
**Endpoint:** `GET /api/menu/1`  
**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Margherita Pizza",
    "price": 12.99,
    ...
  }
}
```

### 4. Create Menu Item
**Endpoint:** `POST /api/menu`  
**Body:**
```json
{
  "name": "Tiramisu",
  "description": "Italian coffee-flavored dessert",
  "price": 6.99,
  "category": "Dessert"
}
```

### 5. Get All Reservations
**Endpoint:** `GET /api/reservations`  
**Expected Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [...]
}
```

### 6. Create Reservation
**Endpoint:** `POST /api/reservations`  
**Body:**
```json
{
  "customer_name": "Alice Johnson",
  "customer_email": "alice@example.com",
  "customer_phone": "+1122334455",
  "party_size": 3,
  "reservation_date": "2025-01-25",
  "reservation_time": "20:00:00"
}
```

---

## Testing Checklist

- [ ] Health check returns 200 OK
- [ ] GET /api/menu returns sample menu items
- [ ] GET /api/menu/1 returns specific item
- [ ] POST /api/menu creates new menu item
- [ ] GET /api/reservations returns sample reservation
- [ ] POST /api/reservations creates new reservation
- [ ] Error handling works (try invalid data)

## Notes

- Base URL: `http://localhost:3000`
- For AWS deployment, replace with your EC2 public IP or load balancer URL
- All endpoints return JSON responses
- No authentication required (simplified for learning)
