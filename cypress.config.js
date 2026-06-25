// cypress.config.js
const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {


    // baseUrl: All cy.visit("/login") calls become https://yourapp.com/login
    baseUrl: "https://naveenautomationlabs.com/opencart/",


    // How long Cypress waits for an element before failing (milliseconds)
    defaultCommandTimeout: 20000,    // 6 seconds


    // How long to wait for page loads
    pageLoadTimeout: 30000,          // 30 seconds

    defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  responseTimeout: 30000,
  execTimeout: 60000,
  taskTimeout: 60000,
  
  // Add slow down between commands
  setupNodeEvents(on, config) {
    on('task', {
      log(message) {
        console.log(message);
        return null;
      }
    })
  }}
});
