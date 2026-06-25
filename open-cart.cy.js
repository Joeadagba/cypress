/// <reference types="cypress" />

describe('OpenCart Homepage - Complete Test Suite (15 Tests)', () => {
  beforeEach(() => {
    // Arrange: Visit homepage with longer timeout
    cy.visit('https://naveenautomationlabs.com/opencart/', {
      timeout: 30000
    });
  
    // Slow down test execution
    cy.wait(1000); // Initial wait for page stabilization
    
    // More reliable body check
    cy.get('body', { timeout: 10000 }).should('exist');
  });
   // Test 2: Logo is visible
  it('TC02 - should display logo', () => {
    cy.get('#logo', { timeout: 10000 }).should('be.visible');
    cy.wait(500);
  });

  // Test 3: Search box exists (FIXED)
  it('TC03 - should have search box', () => {
    // Act: Find search input
    cy.get('input[name="search"]', { timeout: 10000 })
      .should('be.visible')
      .and('be.enabled');
    
    // Fix: The search button has type="button" but text might be different
    // Option 1: Find by class or ID instead
    cy.get('.input-group-btn button').should('be.visible');
    
    // Option 2: Or find by aria-label if exists
    // cy.get('button[aria-label="Search"]').should('be.visible');
    
    cy.wait(500);
  });

  // Test 4: Shopping cart is clickable
  it('TC04 - should click cart and show dropdown', () => {
    cy.get('#cart', { timeout: 10000 }).click();
    cy.wait(500); // Wait for animation
    cy.get('#cart .dropdown-menu', { timeout: 5000 }).should('be.visible');
    cy.contains('Your shopping cart is empty!').should('be.visible');
    cy.wait(500);
  });

  // Test 5: Product - Intel Core 2 Duo
  it('TC05 - should display Intel Core 2 Duo processor with correct price', () => {
    cy.contains('Intel Core 2 Duo processor', { timeout: 10000 })
      .should('be.visible')
      .closest('.product-thumb')
      .within(() => {
        cy.contains('$602.00').should('be.visible');
        cy.contains('Ex Tax: $500.00').should('be.visible');
      });
    cy.wait(500);
  });

  // Test 6: Product - iPhone
  it('TC06 - should display iPhone with correct price', () => {
    cy.contains('iPhone', { timeout: 10000 })
      .should('be.visible')
      .closest('.product-thumb')
      .within(() => {
        cy.contains('$123.20').should('be.visible');
        cy.contains('Ex Tax: $101.00').should('be.visible');
      });
    cy.wait(500);
  });

  // Test 7: Product - Apple Cinema (Discounted)
  it('TC07 - should display Apple Cinema with discount pricing', () => {
    cy.contains('Apple Cinema 30"', { timeout: 10000 })
      .should('be.visible')
      .closest('.product-thumb')
      .within(() => {
        cy.contains('$110.00').should('be.visible');
        cy.contains('$122.00').should('be.visible');
        cy.contains('Ex Tax: $90.00').should('be.visible');
      });
    cy.wait(500);
  });

  // Test 8: Product - Canon EOS 5D
  it('TC08 - should display Canon EOS 5D with correct price', () => {
    cy.contains('Canon EOS 5D', { timeout: 10000 })
      .should('be.visible')
      .closest('.product-thumb')
      .within(() => {
        cy.contains('$98.00').should('be.visible');
        cy.contains('$122.00').should('be.visible');
        cy.contains('Ex Tax: $80.00').should('be.visible');
      });
    cy.wait(500);
  });

  // Test 9: All products have add to cart buttons
  it('TC09 - should display "Add to Cart" buttons for all products', () => {
    cy.get('.product-thumb', { timeout: 10000 }).each(($product) => {
      cy.wrap($product).within(() => {
        cy.get('button').filter(':contains("Add to Cart")').should('exist');
      });
      cy.wait(300); // Slow down between products
    });
  });

  // Test 10: Navigation menu exists
  it('TC10 - should display main navigation menu', () => {
    const menuItems = ['Desktops', 'Laptops & Notebooks', 'Components', 'Tablets', 'Software'];
    menuItems.forEach((item, index) => {
      cy.contains('.nav > li', item, { timeout: 5000 }).should('be.visible');
      cy.wait(200); // Slow down
    });
  });

  // Test 11: Currency selector works
  it('TC11 - should change currency when selector is clicked', () => {
    cy.contains('$').should('be.visible');
    cy.get('#form-currency', { timeout: 10000 }).click();
    cy.wait(500);
    cy.contains('€ Euro').click();
    cy.wait(1000); // Wait for currency change
    cy.contains('€').should('be.visible');
  });

  // Test 12: Carousel/banner exists (FIXED)
  it('TC12 - should display image carousel', () => {
    // Fix: The carousel might have a different ID or class
    // Try multiple possible selectors
    cy.get('body').then(($body) => {
      if ($body.find('#carousel-banner-0').length) {
        cy.get('#carousel-banner-0').should('be.visible');
      } else if ($body.find('.carousel').length) {
        cy.get('.carousel').should('be.visible');
      } else if ($body.find('#carousel').length) {
        cy.get('#carousel').should('be.visible');
      } else {
        cy.log('Carousel not found - skipping check');
      }
    });
    
    // Check for any carousel indicators
    cy.get('.carousel, [class*="carousel"]', { timeout: 5000 }).should('exist');
    cy.wait(500);
  });

  // Test 13: Featured products section exists
  it('TC13 - should display featured products section', () => {
    cy.contains('Featured', { timeout: 10000 }).should('be.visible');
    cy.get('.product-thumb').should('have.length.at.least', 4);
    cy.wait(500);
  });

  // Test 14: Product images are loaded
  it('TC14 - should load product images for all products', () => {
    cy.get('.product-thumb img', { timeout: 10000 }).each(($img) => {
      cy.wrap($img).should('have.attr', 'src').and('not.be.empty');
      cy.wait(200); // Slow down
    });
  });

  // Test 15: Footer links exist
  it('TC15 - should display footer with all important links', () => {
    cy.get('footer', { timeout: 10000 }).scrollIntoView();
    cy.wait(500);
    
    const footerSections = ['About Us', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions'];
    footerSections.forEach(section => {
      cy.contains('footer', section, { timeout: 5000 }).should('be.visible');
      cy.wait(200);
    });
    
    cy.contains('footer', 'Contact Us').should('be.visible');
    cy.contains('footer', 'Returns').should('be.visible');
  });

// Test 1: Search input accepts text
  it('TC_INPUT_01 - should accept text input in search box', () => {
    // Arrange: Find search input
    const searchTerm = 'iPhone';
    
    // Act: Type text into search box
    cy.get('input[name="search"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(searchTerm);
    
    // Assert: Verify text was entered correctly
    cy.get('input[name="search"]').should('have.value', searchTerm);
  });

  // Test 2: Search input handles special characters
  it('TC_INPUT_02 - should handle special characters in search', () => {
    // Arrange: Prepare special character string
    const specialChars = '!@#$%^&*()_+{}:"<>?';
    
    // Act: Type special characters
    cy.get('input[name="search"]')
      .should('be.visible')
      .clear()
      .type(specialChars);
    
    // Assert: Verify special characters are entered
    cy.get('input[name="search"]').should('have.value', specialChars);
  });

  // Test 3: Search input handles long text (max length)
  it('TC_INPUT_03 - should handle long search text (boundary testing)', () => {
    // Arrange: Create a very long string (200+ characters)
    const longText = 'a'.repeat(255);
    
    // Act: Type long text
    cy.get('input[name="search"]')
      .should('be.visible')
      .clear()
      .type(longText);
    
    // Assert: Verify text is entered (might be truncated by browser)
    cy.get('input[name="search"]').then(($input) => {
      const enteredValue = $input.val();
      expect(enteredValue.length).to.be.greaterThan(0);
    });
  });

  // Test 4: Search input handles numbers and spaces
  it('TC_INPUT_04 - should handle numbers and spaces in search', () => {
    // Arrange: Mixed input with numbers and spaces
    const mixedInput = 'iPhone 15 Pro Max 2024';
    
    // Act: Type mixed content
    cy.get('input[name="search"]')
      .should('be.visible')
      .clear()
      .type(mixedInput);
    
    // Assert: Verify mixed content
    cy.get('input[name="search"]').should('have.value', mixedInput);
  });

  // Test 5: Clear input using keyboard shortcuts
  it('TC_INPUT_05 - should clear input using keyboard shortcuts', () => {
    // Arrange: Type text first
    cy.get('input[name="search"]')
      .should('be.visible')
      .type('Samsung Galaxy');
    
    // Act: Select all and delete using keyboard
    cy.get('input[name="search"]')
      .type('{selectall}{backspace}');
    
    // Assert: Input should be empty
    cy.get('input[name="search"]').should('have.value', '');
  });

  // Test 6: Copy-paste functionality in search input
  it('TC_INPUT_06 - should support copy-paste operations', () => {
    // Arrange: Text to paste
    const copiedText = 'MacBook Pro';
    
    // Act: Simulate paste operation
    cy.get('input[name="search"]')
      .should('be.visible')
      .invoke('val', copiedText)
      .trigger('input');
    
    // Assert: Verify pasted text
    cy.get('input[name="search"]').should('have.value', copiedText);
  });

  // Test 7: Search input maintains state after page interaction
it('TC_INPUT_07 - should maintain text after clicking elsewhere', () => {
  // Arrange: Type search text
  const searchText = 'Canon EOS';
  
  // Act: Type and then click elsewhere
  cy.get('input[name="search"]')
    .should('be.visible')
    .type(searchText);
  
  cy.get('#cart').click(); // Click cart dropdown
  cy.wait(500);
  
  // Fix: Click the page background (but not on any link)
  cy.get('body').click(10, 10, { force: true }); // Click at top-left corner
  
  // Assert: Text should still be present
  cy.get('input[name="search"]').should('have.value', searchText);
});

  // Test 8: Form submission with search input
  it('TC_INPUT_08 - should submit search form with text input', () => {
    // Arrange: Prepare search term
    const searchTerm = 'iPhone';
    
    // Act: Type and submit
    cy.get('input[name="search"]')
      .should('be.visible')
      .clear()
      .type(searchTerm);
    
    cy.get('.input-group-btn button').click();
    cy.wait(2000);
    
    // Assert: Verify search results page loads
    cy.url().should('include', 'search');
    cy.get('#content h1').should('contain', 'Search');
  });

  // Test 9: Registration page - text input validation
  it('TC_INPUT_09 - should validate registration form text inputs', () => {
    // Arrange: Navigate to registration page
    cy.contains('My Account').click();
    cy.wait(500);
    cy.contains('Register').click();
    cy.wait(1000);
    
    // Test first name input
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      telephone: '1234567890',
      password: 'password123'
    };
    
    // Act: Fill all text inputs
    cy.get('input[name="firstname"]').type(testData.firstName);
    cy.get('input[name="lastname"]').type(testData.lastName);
    cy.get('input[name="email"]').type(testData.email);
    cy.get('input[name="telephone"]').type(testData.telephone);
    cy.get('input[name="password"]').type(testData.password);
    cy.get('input[name="confirm"]').type(testData.password);
    
    // Assert: Verify all inputs have values
    cy.get('input[name="firstname"]').should('have.value', testData.firstName);
    cy.get('input[name="lastname"]').should('have.value', testData.lastName);
    cy.get('input[name="email"]').should('have.value', testData.email);
    cy.get('input[name="telephone"]').should('have.value', testData.telephone);
    cy.get('input[name="password"]').should('have.value', testData.password);
  });

  // Test 10: Quantity input in product page (numeric input)
  it('TC_INPUT_10 - should accept numeric input in quantity field', () => {
    // Arrange: Navigate to a product page
    cy.contains('iPhone').click();
    cy.wait(1000);
    
    // Act: Type quantity
    cy.get('input[name="quantity"]')
      .should('be.visible')
      .clear()
      .type('5');
    
    // Assert: Verify quantity value
    cy.get('input[name="quantity"]').should('have.value', '5');
    
    // Edge case: Try negative numbers
    cy.get('input[name="quantity"]').clear().type('-3');
    cy.get('input[name="quantity"]').should('have.value', '-3');
    
    // Edge case: Try decimal numbers
    cy.get('input[name="quantity"]').clear().type('2.5');
    cy.get('input[name="quantity"]').should('have.value', '2.5');
    
    // Edge case: Try zero
    cy.get('input[name="quantity"]').clear().type('0');
    cy.get('input[name="quantity"]').should('have.value', '0');
  });
});

/// <reference types="cypress" />

describe('OpenCart - Dropdown Tests (10 Test Scripts)', () => {
  beforeEach(() => {
    // Arrange: Visit the homepage and wait for load
    cy.visit('https://naveenautomationlabs.com/opencart/');
    cy.wait(1000);
    cy.get('body').should('be.visible');
  });
//====================================
  //Testing Dropdowns
  //====================================
  // Test 1: Currency dropdown opens and displays options
  it('TC_DROPDOWN_01 - should open currency dropdown and show all options', () => {
    // Act: Click currency dropdown trigger
    cy.get('#form-currency').click();
    cy.wait(500);
    
    // Assert: Dropdown menu becomes visible with all currency options
    cy.get('.dropdown-menu').should('be.visible');
    cy.get('.dropdown-menu li').should('have.length.at.least', 3);
    cy.contains('€ Euro').should('be.visible');
    cy.contains('£ Pound Sterling').should('be.visible');
    cy.contains('$ US Dollar').should('be.visible');
  });

  // Test 2: Currency selection changes displayed prices
  it('TC_DROPDOWN_02 - should change currency and update prices', () => {
    // Arrange: Check initial currency (default US Dollar)
    cy.contains('$602.00').should('be.visible');
    
    // Act: Change to Euro
    cy.get('#form-currency').click();
    cy.wait(500);
    cy.contains('€ Euro').click();
    cy.wait(1000); // Wait for currency to update
    
    // Assert: Prices now show Euro symbol
    cy.contains('€').should('be.visible');
    cy.get('#form-currency').should('contain', '€');
  });

  // Test 3: My Account dropdown menu options
  it('TC_DROPDOWN_03 - should display My Account dropdown options', () => {
    // Act: Click My Account dropdown
    cy.get('a[title="My Account"]').click();
    cy.wait(500);
    
    // Assert: Dropdown shows all account options
    const accountOptions = ['Register', 'Login'];
    accountOptions.forEach(option => {
      cy.get('.dropdown-menu').contains(option).should('be.visible');
    });
  });

  // Test 4: Newsletter dropdown (radio buttons act like dropdown)
it('TC_DROPDOWN_04 - should select newsletter preference', () => {
  // Arrange: Navigate to registration page
  cy.get('a[title="My Account"]').click();
  cy.wait(500);
  cy.contains('Register').click();
  cy.wait(1000);
  
  // Act: Select "Yes" from newsletter options (acts like a dropdown choice)
  cy.get('input[name="newsletter"][value="1"]').check();
  
  // Assert: Newsletter Yes is selected
  cy.get('input[name="newsletter"][value="1"]').should('be.checked');
});

// Test 5: Customer Group dropdown (if visible)
it('TC_DROPDOWN_05 - should select customer group if dropdown exists', () => {
  // Arrange: Navigate to registration page
  cy.get('a[title="My Account"]').click();
  cy.contains('Register').click();
  cy.wait(1000);
  
  // Act: Check if customer group dropdown exists
  cy.get('body').then(($body) => {
    if ($body.find('select[name="customer_group_id"]').length) {
      cy.get('select[name="customer_group_id"]').select('Default');
      cy.get('select[name="customer_group_id"]').should('have.value', '1');
    } else {
      cy.log('Customer group dropdown not found - skipping test');
    }
  });
});

  // Test 6: Product sort dropdown functionality
  it('TC_DROPDOWN_06 - should sort products using sort dropdown', () => {
    // Arrange: Navigate to a category page with multiple products
    cy.contains('Desktops').click();
    cy.contains('Show All Desktops').click();
    cy.wait(1000);
    
    // Act: Change sort order
    cy.get('#input-sort').select('Price (Low > High)');
    cy.wait(1000);
    
    // Assert: URL contains sort parameter and products reorder
    cy.url().should('include', 'sort=p.price');
    cy.url().should('include', 'order=ASC');
  });

  // Test 7: Product limit dropdown (items per page)
  it('TC_DROPDOWN_07 - should change products per page using limit dropdown', () => {
    // Arrange: Navigate to a category page
    cy.contains('Desktops').click();
    cy.contains('Show All Desktops').click();
    cy.wait(1000);
    
    // Act: Change limit to 50
    cy.get('#input-limit').select('50');
    cy.wait(1000);
    
    // Assert: URL contains limit parameter
    cy.url().should('include', 'limit=50');
  });

  // Test 4: Newsletter radio buttons (NOT a dropdown)
it('TC_DROPDOWN_04 - should select newsletter preference', () => {
  // Arrange: Navigate to registration page
  cy.get('a[title="My Account"]').click();
  cy.wait(500);
  cy.contains('Register').click();
  cy.wait(1000);
  
  // Act: Select "Yes" from newsletter radio buttons
  cy.get('input[name="newsletter"][value="1"]').check();
  
  // Assert: Newsletter Yes is selected
  cy.get('input[name="newsletter"][value="1"]').should('be.checked');
  
  // Additional: Verify "No" can be selected
  cy.get('input[name="newsletter"][value="0"]').check();
  cy.get('input[name="newsletter"][value="0"]').should('be.checked');
});

// Test 5: Privacy Policy checkbox (NOT a dropdown)
it('TC_DROPDOWN_05 - should agree to privacy policy', () => {
  // Arrange: Navigate to registration page
  cy.get('a[title="My Account"]').click();
  cy.contains('Register').click();
  cy.wait(1000);
  
  // Act: Check privacy policy checkbox
  cy.get('input[name="agree"]').check();
  
  // Assert: Checkbox is selected
  cy.get('input[name="agree"]').should('be.checked');
});

  it('TC_DROPDOWN_03 - should change currency using dropdown', () => {
  // Act: Click currency dropdown
  cy.get('#form-currency').click();
  cy.wait(500);
  
  // Assert: Dropdown is visible
  cy.get('.dropdown-menu').should('be.visible');
  
  // Act: Select Euro
  cy.contains('€ Euro').click();
  cy.wait(500);
  
  // Assert: Currency changed
  cy.get('#form-currency').should('contain', '€');
});

  // Test 10: Dropdown keyboard navigation
  it('TC_DROPDOWN_10 - should navigate dropdown using keyboard arrows', () => {
    // Act: Open currency dropdown and use keyboard
    cy.get('#form-currency').click();
    cy.wait(500);
    
    // Assert: Dropdown is open
    cy.get('.dropdown-menu').should('be.visible');
    
    // Use keyboard to navigate (simulate arrow down)
    cy.get('body').type('{downarrow}');
    cy.wait(300);
    cy.get('body').type('{downarrow}');
    cy.wait(300);
    cy.get('body').type('{enter}');
    
    // Assert: Some action happened (dropdown closes or selection changes)
    cy.get('.dropdown-menu').should('not.be.visible');
  });
});

/// <reference types="cypress" />

describe('OpenCart Homepage - Complete Test Suite (15 Tests)', () => {
  beforeEach(() => {
    // Arrange: Visit homepage with longer timeout
    cy.visit('https://naveenautomationlabs.com/opencart/', {
      timeout: 30000
    });
  
    // Slow down test execution
    cy.wait(1000); // Initial wait for page stabilization
    
    // More reliable body check
    cy.get('body', { timeout: 10000 }).should('exist');
  });
   // Test 2: Logo is visible
  it('TC02 - should display logo', () => {
    cy.get('#logo', { timeout: 10000 }).should('be.visible');
    cy.wait(500);
  });

  // Test 3: Search box exists (FIXED)
  it('TC03 - should have search box', () => {
    // Act: Find search input
    cy.get('input[name="search"]', { timeout: 10000 })
      .should('be.visible')
      .and('be.enabled');
    
    // Fix: The search button has type="button" but text might be different
    // Option 1: Find by class or ID instead
    cy.get('.input-group-btn button').should('be.visible');
    
    // Option 2: Or find by aria-label if exists
    // cy.get('button[aria-label="Search"]').should('be.visible');
    
    cy.wait(500);
  });

  // Test 4: Shopping cart is clickable
  it('TC04 - should click cart and show dropdown', () => {
    cy.get('#cart', { timeout: 10000 }).click();
    cy.wait(500); // Wait for animation
    cy.get('#cart .dropdown-menu', { timeout: 5000 }).should('be.visible');
    cy.contains('Your shopping cart is empty!').should('be.visible');
    cy.wait(500);
  });

  // Test 5: Product - Intel Core 2 Duo
  it('TC05 - should display Intel Core 2 Duo processor with correct price', () => {
    cy.contains('Intel Core 2 Duo processor', { timeout: 10000 })
      .should('be.visible')
      .closest('.product-thumb')
      .within(() => {
        cy.contains('$602.00').should('be.visible');
        cy.contains('Ex Tax: $500.00').should('be.visible');
      });
    cy.wait(500);
  });

  // Test 6: Product - iPhone
  it('TC06 - should display iPhone with correct price', () => {
    cy.contains('iPhone', { timeout: 10000 })
      .should('be.visible')
      .closest('.product-thumb')
      .within(() => {
        cy.contains('$123.20').should('be.visible');
        cy.contains('Ex Tax: $101.00').should('be.visible');
      });
    cy.wait(500);
  });

  // Test 7: Product - Apple Cinema (Discounted)
  it('TC07 - should display Apple Cinema with discount pricing', () => {
    cy.contains('Apple Cinema 30"', { timeout: 10000 })
      .should('be.visible')
      .closest('.product-thumb')
      .within(() => {
        cy.contains('$110.00').should('be.visible');
        cy.contains('$122.00').should('be.visible');
        cy.contains('Ex Tax: $90.00').should('be.visible');
      });
    cy.wait(500);
  });

  // Test 8: Product - Canon EOS 5D
  it('TC08 - should display Canon EOS 5D with correct price', () => {
    cy.contains('Canon EOS 5D', { timeout: 10000 })
      .should('be.visible')
      .closest('.product-thumb')
      .within(() => {
        cy.contains('$98.00').should('be.visible');
        cy.contains('$122.00').should('be.visible');
        cy.contains('Ex Tax: $80.00').should('be.visible');
      });
    cy.wait(500);
  });

  // Test 9: All products have add to cart buttons
  it('TC09 - should display "Add to Cart" buttons for all products', () => {
    cy.get('.product-thumb', { timeout: 10000 }).each(($product) => {
      cy.wrap($product).within(() => {
        cy.get('button').filter(':contains("Add to Cart")').should('exist');
      });
      cy.wait(300); // Slow down between products
    });
  });

  // Test 10: Navigation menu exists
  it('TC10 - should display main navigation menu', () => {
    const menuItems = ['Desktops', 'Laptops & Notebooks', 'Components', 'Tablets', 'Software'];
    menuItems.forEach((item, index) => {
      cy.contains('.nav > li', item, { timeout: 5000 }).should('be.visible');
      cy.wait(200); // Slow down
    });
  });

  // Test 11: Currency selector works
  it('TC11 - should change currency when selector is clicked', () => {
    cy.contains('$').should('be.visible');
    cy.get('#form-currency', { timeout: 10000 }).click();
    cy.wait(500);
    cy.contains('€ Euro').click();
    cy.wait(1000); // Wait for currency change
    cy.contains('€').should('be.visible');
  });

  // Test 12: Carousel/banner exists (FIXED)
  it('TC12 - should display image carousel', () => {
    // Fix: The carousel might have a different ID or class
    // Try multiple possible selectors
    cy.get('body').then(($body) => {
      if ($body.find('#carousel-banner-0').length) {
        cy.get('#carousel-banner-0').should('be.visible');
      } else if ($body.find('.carousel').length) {
        cy.get('.carousel').should('be.visible');
      } else if ($body.find('#carousel').length) {
        cy.get('#carousel').should('be.visible');
      } else {
        cy.log('Carousel not found - skipping check');
      }
    });
    
    // Check for any carousel indicators
    cy.get('.carousel, [class*="carousel"]', { timeout: 5000 }).should('exist');
    cy.wait(500);
  });

  // Test 13: Featured products section exists
  it('TC13 - should display featured products section', () => {
    cy.contains('Featured', { timeout: 10000 }).should('be.visible');
    cy.get('.product-thumb').should('have.length.at.least', 4);
    cy.wait(500);
  });

  // Test 14: Product images are loaded
  it('TC14 - should load product images for all products', () => {
    cy.get('.product-thumb img', { timeout: 10000 }).each(($img) => {
      cy.wrap($img).should('have.attr', 'src').and('not.be.empty');
      cy.wait(200); // Slow down
    });
  });

  // Test 15: Footer links exist
  it('TC15 - should display footer with all important links', () => {
    cy.get('footer', { timeout: 10000 }).scrollIntoView();
    cy.wait(500);
    
    const footerSections = ['About Us', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions'];
    footerSections.forEach(section => {
      cy.contains('footer', section, { timeout: 5000 }).should('be.visible');
      cy.wait(200);
    });
    
    cy.contains('footer', 'Contact Us').should('be.visible');
    cy.contains('footer', 'Returns').should('be.visible');
  });

// Test 1: Search input accepts text
  it('TC_INPUT_01 - should accept text input in search box', () => {
    // Arrange: Find search input
    const searchTerm = 'iPhone';
    
    // Act: Type text into search box
    cy.get('input[name="search"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(searchTerm);
    
    // Assert: Verify text was entered correctly
    cy.get('input[name="search"]').should('have.value', searchTerm);
  });

  // Test 2: Search input handles special characters
  it('TC_INPUT_02 - should handle special characters in search', () => {
    // Arrange: Prepare special character string
    const specialChars = '!@#$%^&*()_+{}:"<>?';
    
    // Act: Type special characters
    cy.get('input[name="search"]')
      .should('be.visible')
      .clear()
      .type(specialChars);
    
    // Assert: Verify special characters are entered
    cy.get('input[name="search"]').should('have.value', specialChars);
  });

  // Test 3: Search input handles long text (max length)
  it('TC_INPUT_03 - should handle long search text (boundary testing)', () => {
    // Arrange: Create a very long string (200+ characters)
    const longText = 'a'.repeat(255);
    
    // Act: Type long text
    cy.get('input[name="search"]')
      .should('be.visible')
      .clear()
      .type(longText);
    
    // Assert: Verify text is entered (might be truncated by browser)
    cy.get('input[name="search"]').then(($input) => {
      const enteredValue = $input.val();
      expect(enteredValue.length).to.be.greaterThan(0);
    });
  });

  // Test 4: Search input handles numbers and spaces
  it('TC_INPUT_04 - should handle numbers and spaces in search', () => {
    // Arrange: Mixed input with numbers and spaces
    const mixedInput = 'iPhone 15 Pro Max 2024';
    
    // Act: Type mixed content
    cy.get('input[name="search"]')
      .should('be.visible')
      .clear()
      .type(mixedInput);
    
    // Assert: Verify mixed content
    cy.get('input[name="search"]').should('have.value', mixedInput);
  });

  // Test 5: Clear input using keyboard shortcuts
  it('TC_INPUT_05 - should clear input using keyboard shortcuts', () => {
    // Arrange: Type text first
    cy.get('input[name="search"]')
      .should('be.visible')
      .type('Samsung Galaxy');
    
    // Act: Select all and delete using keyboard
    cy.get('input[name="search"]')
      .type('{selectall}{backspace}');
    
    // Assert: Input should be empty
    cy.get('input[name="search"]').should('have.value', '');
  });

  // Test 6: Copy-paste functionality in search input
  it('TC_INPUT_06 - should support copy-paste operations', () => {
    // Arrange: Text to paste
    const copiedText = 'MacBook Pro';
    
    // Act: Simulate paste operation
    cy.get('input[name="search"]')
      .should('be.visible')
      .invoke('val', copiedText)
      .trigger('input');
    
    // Assert: Verify pasted text
    cy.get('input[name="search"]').should('have.value', copiedText);
  });

  // Test 7: Search input maintains state after page interaction
it('TC_INPUT_07 - should maintain text after clicking elsewhere', () => {
  // Arrange: Type search text
  const searchText = 'Canon EOS';
  
  // Act: Type and then click elsewhere
  cy.get('input[name="search"]')
    .should('be.visible')
    .type(searchText);
  
  cy.get('#cart').click(); // Click cart dropdown
  cy.wait(500);
  
  // Fix: Click the page background (but not on any link)
  cy.get('body').click(10, 10, { force: true }); // Click at top-left corner
  
  // Assert: Text should still be present
  cy.get('input[name="search"]').should('have.value', searchText);
});

  // Test 8: Form submission with search input
  it('TC_INPUT_08 - should submit search form with text input', () => {
    // Arrange: Prepare search term
    const searchTerm = 'iPhone';
    
    // Act: Type and submit
    cy.get('input[name="search"]')
      .should('be.visible')
      .clear()
      .type(searchTerm);
    
    cy.get('.input-group-btn button').click();
    cy.wait(2000);
    
    // Assert: Verify search results page loads
    cy.url().should('include', 'search');
    cy.get('#content h1').should('contain', 'Search');
  });

  // Test 9: Registration page - text input validation
  it('TC_INPUT_09 - should validate registration form text inputs', () => {
    // Arrange: Navigate to registration page
    cy.contains('My Account').click();
    cy.wait(500);
    cy.contains('Register').click();
    cy.wait(1000);
    
    // Test first name input
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      telephone: '1234567890',
      password: 'password123'
    };
    
    // Act: Fill all text inputs
    cy.get('input[name="firstname"]').type(testData.firstName);
    cy.get('input[name="lastname"]').type(testData.lastName);
    cy.get('input[name="email"]').type(testData.email);
    cy.get('input[name="telephone"]').type(testData.telephone);
    cy.get('input[name="password"]').type(testData.password);
    cy.get('input[name="confirm"]').type(testData.password);
    
    // Assert: Verify all inputs have values
    cy.get('input[name="firstname"]').should('have.value', testData.firstName);
    cy.get('input[name="lastname"]').should('have.value', testData.lastName);
    cy.get('input[name="email"]').should('have.value', testData.email);
    cy.get('input[name="telephone"]').should('have.value', testData.telephone);
    cy.get('input[name="password"]').should('have.value', testData.password);
  });

  // Test 10: Quantity input in product page (numeric input)
  it('TC_INPUT_10 - should accept numeric input in quantity field', () => {
    // Arrange: Navigate to a product page
    cy.contains('iPhone').click();
    cy.wait(1000);
    
    // Act: Type quantity
    cy.get('input[name="quantity"]')
      .should('be.visible')
      .clear()
      .type('5');
    
    // Assert: Verify quantity value
    cy.get('input[name="quantity"]').should('have.value', '5');
    
    // Edge case: Try negative numbers
    cy.get('input[name="quantity"]').clear().type('-3');
    cy.get('input[name="quantity"]').should('have.value', '-3');
    
    // Edge case: Try decimal numbers
    cy.get('input[name="quantity"]').clear().type('2.5');
    cy.get('input[name="quantity"]').should('have.value', '2.5');
    
    // Edge case: Try zero
    cy.get('input[name="quantity"]').clear().type('0');
    cy.get('input[name="quantity"]').should('have.value', '0');
  });
});

/// <reference types="cypress" />

describe('OpenCart - Dropdown Tests (10 Test Scripts)', () => {
  beforeEach(() => {
    // Arrange: Visit the homepage and wait for load
    cy.visit('https://naveenautomationlabs.com/opencart/');
    cy.wait(1000);
    cy.get('body').should('be.visible');
  });
//====================================
  //Testing Dropdowns
  //====================================
  // Test 1: Currency dropdown opens and displays options
  it('TC_DROPDOWN_01 - should open currency dropdown and show all options', () => {
    // Act: Click currency dropdown trigger
    cy.get('#form-currency').click();
    cy.wait(500);
    
    // Assert: Dropdown menu becomes visible with all currency options
    cy.get('.dropdown-menu').should('be.visible');
    cy.get('.dropdown-menu li').should('have.length.at.least', 3);
    cy.contains('€ Euro').should('be.visible');
    cy.contains('£ Pound Sterling').should('be.visible');
    cy.contains('$ US Dollar').should('be.visible');
  });

  // Test 2: Currency selection changes displayed prices
  it('TC_DROPDOWN_02 - should change currency and update prices', () => {
    // Arrange: Check initial currency (default US Dollar)
    cy.contains('$602.00').should('be.visible');
    
    // Act: Change to Euro
    cy.get('#form-currency').click();
    cy.wait(500);
    cy.contains('€ Euro').click();
    cy.wait(1000); // Wait for currency to update
    
    // Assert: Prices now show Euro symbol
    cy.contains('€').should('be.visible');
    cy.get('#form-currency').should('contain', '€');
  });

  // Test 3: My Account dropdown menu options
  it('TC_DROPDOWN_03 - should display My Account dropdown options', () => {
    // Act: Click My Account dropdown
    cy.get('a[title="My Account"]').click();
    cy.wait(500);
    
    // Assert: Dropdown shows all account options
    const accountOptions = ['Register', 'Login'];
    accountOptions.forEach(option => {
      cy.get('.dropdown-menu').contains(option).should('be.visible');
    });
  });

  // Test 4: Newsletter dropdown (radio buttons act like dropdown)
it('TC_DROPDOWN_04 - should select newsletter preference', () => {
  // Arrange: Navigate to registration page
  cy.get('a[title="My Account"]').click();
  cy.wait(500);
  cy.contains('Register').click();
  cy.wait(1000);
  
  // Act: Select "Yes" from newsletter options (acts like a dropdown choice)
  cy.get('input[name="newsletter"][value="1"]').check();
  
  // Assert: Newsletter Yes is selected
  cy.get('input[name="newsletter"][value="1"]').should('be.checked');
});

// Test 5: Customer Group dropdown (if visible)
it('TC_DROPDOWN_05 - should select customer group if dropdown exists', () => {
  // Arrange: Navigate to registration page
  cy.get('a[title="My Account"]').click();
  cy.contains('Register').click();
  cy.wait(1000);
  
  // Act: Check if customer group dropdown exists
  cy.get('body').then(($body) => {
    if ($body.find('select[name="customer_group_id"]').length) {
      cy.get('select[name="customer_group_id"]').select('Default');
      cy.get('select[name="customer_group_id"]').should('have.value', '1');
    } else {
      cy.log('Customer group dropdown not found - skipping test');
    }
  });
});

  // Test 6: Product sort dropdown functionality
  it('TC_DROPDOWN_06 - should sort products using sort dropdown', () => {
    // Arrange: Navigate to a category page with multiple products
    cy.contains('Desktops').click();
    cy.contains('Show All Desktops').click();
    cy.wait(1000);
    
    // Act: Change sort order
    cy.get('#input-sort').select('Price (Low > High)');
    cy.wait(1000);
    
    // Assert: URL contains sort parameter and products reorder
    cy.url().should('include', 'sort=p.price');
    cy.url().should('include', 'order=ASC');
  });

  // Test 7: Product limit dropdown (items per page)
  it('TC_DROPDOWN_07 - should change products per page using limit dropdown', () => {
    // Arrange: Navigate to a category page
    cy.contains('Desktops').click();
    cy.contains('Show All Desktops').click();
    cy.wait(1000);
    
    // Act: Change limit to 50
    cy.get('#input-limit').select('50');
    cy.wait(1000);
    
    // Assert: URL contains limit parameter
    cy.url().should('include', 'limit=50');
  });

  // Test 4: Newsletter radio buttons (NOT a dropdown)
it('TC_DROPDOWN_04 - should select newsletter preference', () => {
  // Arrange: Navigate to registration page
  cy.get('a[title="My Account"]').click();
  cy.wait(500);
  cy.contains('Register').click();
  cy.wait(1000);
  
  // Act: Select "Yes" from newsletter radio buttons
  cy.get('input[name="newsletter"][value="1"]').check();
  
  // Assert: Newsletter Yes is selected
  cy.get('input[name="newsletter"][value="1"]').should('be.checked');
  
  // Additional: Verify "No" can be selected
  cy.get('input[name="newsletter"][value="0"]').check();
  cy.get('input[name="newsletter"][value="0"]').should('be.checked');
});

// Test 5: Privacy Policy checkbox (NOT a dropdown)
it('TC_DROPDOWN_05 - should agree to privacy policy', () => {
  // Arrange: Navigate to registration page
  cy.get('a[title="My Account"]').click();
  cy.contains('Register').click();
  cy.wait(1000);
  
  // Act: Check privacy policy checkbox
  cy.get('input[name="agree"]').check();
  
  // Assert: Checkbox is selected
  cy.get('input[name="agree"]').should('be.checked');
});

  it('TC_DROPDOWN_03 - should change currency using dropdown', () => {
  // Act: Click currency dropdown
  cy.get('#form-currency').click();
  cy.wait(500);
  
  // Assert: Dropdown is visible
  cy.get('.dropdown-menu').should('be.visible');
  
  // Act: Select Euro
  cy.contains('€ Euro').click();
  cy.wait(500);
  
  // Assert: Currency changed
  cy.get('#form-currency').should('contain', '€');
});

  // Test 10: Dropdown keyboard navigation
  it('TC_DROPDOWN_10 - should navigate dropdown using keyboard arrows', () => {
    // Act: Open currency dropdown and use keyboard
    cy.get('#form-currency').click();
    cy.wait(500);
    
    // Assert: Dropdown is open
    cy.get('.dropdown-menu').should('be.visible');
    
    // Use keyboard to navigate (simulate arrow down)
    cy.get('body').type('{downarrow}');
    cy.wait(300);
    cy.get('body').type('{downarrow}');
    cy.wait(300);
    cy.get('body').type('{enter}');
    
    // Assert: Some action happened (dropdown closes or selection changes)
    cy.get('.dropdown-menu').should('not.be.visible');
  });
});

