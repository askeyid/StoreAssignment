# Automate Product and Addon Addition to Cart using Playwright
## Task Overview 
````
The goal of this task is to automate the process of adding a product and an addon to the cart on the cPanel Store website ( Portal Home - cPanel Store ) using Playwright. Your tests should ensure that the product and the addon are added to the cart correctly, contain the correct information, and do not disappear on step 3 of the checkout. Additionally, verify that the payment options appear along with the registration form. Please note that creating an account and submitting a paid order is unnecessary. 
````
## Prerequisites 
````
Create a private GitHub repository. 
TypeScript project initialized. 
Playwright installed. 
(Optional) For better formatting, npm: prettier npm: eslint npm: eslint-plugin-playwright can be installed (not required). 
````
## Technical Requirements 
````
Use a Page Object Model: Structure your code using the page object model.
Create a Spec File: Organize your test(s) inside a spec file.
Passing Tests: Ensure that your tests pass. 
Readable Code: Write readable and documented code. 
GitHub Repository: Push your code to a private GitHub repository.
````
## Automation Steps to Cover and Verify 
````
1. Navigate to the cPanel store: 
Open Shopping Cart - cPanel Store (ensure you are not logged in). 
2. Order a Product: 
Click 'Order Now' for any product. 
3. Enter IP Address: 
On the new page, enter an IP address (e.g., 2.2.2.2 ). 
4. Select Addons: 
Choose any addon(s). 
5. Continue to Checkout: 
a. Verify the 'Order Summary' is updated. 
b. Click on the 'Continue' button. 
6. Verify Product and Price: 
In Step 2 Review & Checkout: 
Verify the expected products and addons are present (names). 
Ensure prices are correct. 
Bonus, not required: Ensure prorated prices are correct. 
7. Proceed to Checkout: 
Click on the 'Checkout' button.
8. Verify Checkout Information: 
Ensure the information in the product table is correct 
The license name is correct. 
The IP address is shown. 
The monthly price is correct. 
Bonus: The “Due Today“ prices are correct. 
Verify that the ‘Personal Information', 'Billing Address', 'Account Security', 'Terms & Conditions' and 'Payment Details’ sections are visible (filling out the form is not required). 
Verify that the ‘Complete Order' button is visible but disabled. 
Note: You don’t need to create a new account and complete the checkout process. 
````
## Submission Instructions 
````
1. Push your code to the private repository created in the 'Prerequisites'. 
2. Share the repository link with us for review Permission levels for a personal account repository - GitHub Docs . The list of usernames to add: @mpspahr @Chromeshades @aytik @philstark 
3. Prepare a report with issues/problems you faced (can be in a text file). In code, you can use test.skip() if you found a bug.
````