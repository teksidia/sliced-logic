# Home page

Analyse the instructions below and build a incremental plan to construct the page and/or components using the standards outlined in github-instructions.md.

This a specification for the home page of the app, which displays Projects.

## Instructions

This is a web page where the user can browse coding challenges.

They see 3 dropdowns to filter results (single select filter)

- Category - e.g. Monitoring, UI/UX, APIs, Security 
- Industry - e.g. Financial, Insurance, Health 
- Difficulty - e.g. Easy, Medium, Hard 

The project data will come from a API call

- /api/projects

The projects will display as nicely designed horizontal tiles, and each tile should display:

- Title
- Summary
- Categories (as pills)
- Premium (pill) - only if project requires premium membership

Clicking on a tile will take the user to a Detail page. This is NOT withing the scope of this instruction but a dummy link can be added for now.

## Filters

The filters data will come from:

- Category - /api/projects/categories
- Industry -  /api/projects/industries
- Difficulty -  /api/projects/difficulty-levels

The projects data will come from an API (this will be deployed to Azure SWA so api calls will be proxied, and locally too via the SWA CLI)

## API

The API is active and can be used directly - no mocks are needed.

## UI Components

We are using shadcn so you should plan to add/install any common UI components e.g. Card, Button, Combobox etc and use those

### Sample data for /api/projects

```json
[
  {
    "slug": "support-ticket-triage",
    "meta": {
      "title": "Support Ticket Triage",
      "description": "Create a function that analyzes incoming support ticket subject lines and automatically routes them to the correct department",
      "difficulty": "intermediate",
      "exampleBusiness": "Monzo",
      "industry": "financial/banking",
      "createdAt": "2025-10-01T00:00:00",
      "category": [
        "ai-automation"
      ],
      "tags": [
        "support-tickets",
        "nlp",
        "routing",
        "automation"
      ],
      "series": "customer-service-automation",
      "isSeries": false,
      "accessLevel": 0
    }
  },
  {
    "slug": "transaction-categorization-assistant",
    "meta": {
      "title": "Transaction Categorization Assistant",
      "description": "Build a service that takes raw transaction descriptions and uses a simple classification model to assign user-friendly categories",
      "difficulty": "intermediate",
      "exampleBusiness": "Monzo",
      "industry": "financial/banking",
      "createdAt": "2025-10-01T00:00:00",
      "category": [
        "ai-automation"
      ],
      "tags": [
        "transactions",
        "classification",
        "machine-learning",
        "api"
      ],
      "series": "customer-service-automation",
      "isSeries": false,
      "accessLevel": 0
    }
  },
  {
    "slug": "infrastructure-cost-optimization-bot",
    "meta": {
      "title": "Infrastructure Cost Optimization Bot",
      "description": "Develop a script or basic API that monitors simulated cloud resource utilization and suggests or automatically implements simple scaling-down actions",
      "difficulty": "intermediate",
      "exampleBusiness": "saas-company",
      "industry": "tech/saas",
      "createdAt": "2025-10-01T00:00:00",
      "category": [
        "ai-automation"
      ],
      "tags": [
        "cloud",
        "optimization",
        "automation",
        "monitoring",
        "cost-management"
      ],
      "series": "",
      "isSeries": false,
      "accessLevel": 1
    }
  },
  {
    "slug": "simple-data-aggregation-pipeline",
    "meta": {
      "title": "Simple Data Aggregation Pipeline",
      "description": "Build a script that reads raw log-like data, aggregates it by key fields, calculates statistics, and outputs a summary report",
      "difficulty": "intermediate",
      "exampleBusiness": "gaming-studio",
      "industry": "gaming/media",
      "createdAt": "2025-10-01T00:00:00",
      "category": [
        "analytics"
      ],
      "tags": [
        "data-processing",
        "aggregation",
        "statistics",
        "reporting",
        "etl"
      ],
      "series": "",
      "isSeries": false,
      "accessLevel": 1
    }
  },
  {
    "slug": "event-driven-notification-service",
    "meta": {
      "title": "Event-Driven Notification Service",
      "description": "Create a lightweight microservice that listens for events on a mock message queue and sends notifications via third-party APIs",
      "difficulty": "intermediate",
      "exampleBusiness": "saas-platform",
      "industry": "tech/saas",
      "createdAt": "2025-10-01T00:00:00",
      "category": [
        "apis-microservices"
      ],
      "tags": [
        "microservices",
        "event-driven",
        "message-queue",
        "notifications",
        "email-api"
      ],
      "series": "",
      "isSeries": false,
      "accessLevel": 1
    }
  },
  {
    "slug": "rate-limiting-gateway-stub",
    "meta": {
      "title": "Rate Limiting Gateway Stub",
      "description": "Implement a middleware or service that acts as a simple API Gateway stub, enforcing a basic token-bucket rate limit",
      "difficulty": "intermediate",
      "exampleBusiness": "e-commerce-platform",
      "industry": "ecommerce",
      "createdAt": "2025-10-01T00:00:00",
      "category": [
        "apis-microservices"
      ],
      "tags": [
        "api-gateway",
        "rate-limiting",
        "middleware",
        "token-bucket"
      ],
      "series": "product-catalogue-api",
      "isSeries": false,
      "accessLevel": 1
    }
  },
  {
    "slug": "read-only-product-service",
    "meta": {
      "title": "Read-Only Product Service",
      "description": "Build a simple REST API that serves product details from a mock or in-memory database with clean routing and response models",
      "difficulty": "beginner",
      "exampleBusiness": "e-commerce-platform",
      "industry": "ecommerce",
      "createdAt": "2025-10-01T00:00:00",
      "category": [
        "apis-microservices"
      ],
      "tags": [
        "rest-api",
        "spring-boot",
        "fastapi",
        "database"
      ],
      "series": "product-catalogue-api",
      "isSeries": false,
      "accessLevel": 1
    }
  }
]  
```

### Sample data for the filters


#### Categories

```json
[
  "ai-automation",
  "analytics",
  "apis-microservices",
  "business-logic",
  "cloud-infrastructure",
  "data-persistence",
  "devops",
  "frameworks",
  "messaging",
  "observability",
  "optimization",
  "quality",
  "security",
  "ux-frontend"
]
```

#### Industries

```json
[
  "ecommerce",
  "financial/banking",
  "fintech",
  "gaming/media",
  "general/consultancy",
  "government/public sector",
  "healthcare/pharma",
  "logistics/supply chain",
  "marketing/agency",
  "media/publishing",
  "tech/infra",
  "tech/saas",
  "telecommunications",
  "travel/airline"
]
```

#### Difficulty Levels

```json
[
  "advanced",
  "beginner",
  "intermediate"
]
```