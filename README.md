# OpenCart Cypress Test Suite

Automated end-to-end tests for the OpenCart e-commerce platform using Cypress.

## Prerequisites

- Node.js v18+
- npm or yarn
- A running OpenCart instance (local or staging)

## Setup

```bash
git clone <repo-url>
cd opencart-cypress
npm install
```

Configure your environment in `cypress.config.js` or `cypress.env.json`:

```json
{
  "baseUrl": "http://localhost:8080",
  "adminUrl": "http://localhost:8080/admin",
  "adminUser": "admin",
  "adminPassword": "your_password"
}
```

## Running Tests

```bash
# Open Cypress Test Runner (interactive)
npx cypress open

# Run all tests headlessly
npx cypress run

# Run a specific suite
npx cypress run --spec "cypress/e2e/checkout/**"
```

## Folder Structure
cypress/

├── e2e/

│   ├── auth/          # Login, logout, registration

│   ├── catalog/       # Product browsing and search

│   ├── cart/          # Add to cart, update, remove

│   ├── checkout/      # Guest and registered checkout flows

│   └── admin/         # Admin panel smoke tests

├── fixtures/          # Test data (users, products)

├── support/

│   ├── commands.js    # Custom Cypress commands

│   └── e2e.js         # Global hooks
## Key Test Coverage

- User registration and login
- Product search and filtering
- Add to cart and cart management
- Checkout flow (guest and logged-in)
- Order confirmation
- Admin login and basic dashboard checks

## Custom Commands

| Command | Description |
|---|---|
| `cy.login(email, pass)` | Log in as a registered user |
| `cy.adminLogin()` | Log in to the admin panel |
| `cy.addToCart(productName)` | Search and add a product to cart |

## Notes

- Tests assume a clean or seeded OpenCart DB. Use fixtures for consistent test data.
- Admin tests are tagged `@admin` and can be excluded in CI if needed.
- Screenshots and videos on failure are saved to `cypress/screenshots/` and `cypress/videos/`.