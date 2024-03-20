Restaurant Management System
This System is intended to Manage the sales and services of a restaurant equally providing remote reservations.
Teams
Membres: ALHADJI OUMATE.
All the tasks in this project will be done by ALHADJI OUMATE(me) alone to improve my skills to be a full-stack Software Engineer which is my vision.
Technologies
in this project, I will make use of these technologies

Frontend: HTML, CSS, JavaScript, React.js
API (Application Programming Interface): REST APIs, External APIs, Flask
Backend: MYSQL, SQLalchemy, Python

Challenge
Problem: my project aims to solve the problem of managing a restaurant's operations manually, which can be inefficient, time-consuming, and prone to errors.
Non-solutions: my project won't directly address issues like:
Food preparation or cooking procedures.
Staff training or interpersonal dynamics.
Restaurant marketing or customer acquisitions
Users: my project will primarily help:
Restaurant owners or managers by automating tasks, improving data management, and potentially streamlining operations.
Restaurant staff by providing an efficient and user-friendly platform for handling orders, managing inventory, and accessing relevant information.
Restaurant Clients: facilitating the ordering of the service/product of the restaurants
Local Dependency: my project is not inherently dependent on a specific locale since restaurant management are generally universal/

APIs and Methods
		Routes:
/api/menu:
GET: Retrieve the complete menu list.
POST: Create a new menu item. (Requires authentication for authorized personnel)

/api/menu/<id>:
GET: Retrieve a specific menu item by its ID.
PUT: Update an existing menu item. (Requires authentication for authorized personnel)
DELETE: Delete a menu item. (Requires authentication for authorized personnel)
	
/api/inventory:
GET: Retrieve a list of inventory items with current stock levels.
POST: Create a new inventory item. (Requires authentication for authorized personnel)

/api/inventory/<id>:
GET: Retrieve details of a specific inventory item.
PUT: Update the stock level of an inventory item. (Requires authentication for authorized personnel)


/api/customers:
GET: Retrieve a list of customers (Requires authentication for authorized personnel with appropriate permissions)
POST: Create a new customer account.

/api/customers/<id>:
GET: Retrieve details of a specific customer by their ID. (Requires authentication for authorized personnel with appropriate permissions)
PUT: Update customer information. (May require customer authentication or specific user role)

Methods
def get_menus():
Retrieves all the menu items, No parameters are required
def post_menu(name, description=None, price):
This method creates a new menu item with the following parameters
name(required): String representing the name of the menu
description(not required): String giving more details on the menu item to create
price(required): Number representing the price of the newly created menu item.
def get_menu(menu_id):
Retrieve a particular menu item by its id, with this parameter
id(required): String representing the id of the menu

def put_menu(id, name, description=None, price):
this method updates an existing menu item, it has the following parameters
id(required): String representing the id of the menu
name(required): String representing the name of the menu
description(not required): String giving more details on the menu item to create
price(required): Number representing the price of the newly created menu item.

def del_menu(id):
This method deletes a menu item and requires a parameter
id(required): String representing the id of the menu

def get_inventories():
Method to retrieve all the inventories of the system, it requires no parameter

def post_inventory(name, description=None, unit=None,  stock_level, unit_price):
This method creates a new inventory item, it has the following parameters
name(required): String representing the name of the new inventory item
description(optional): String representing more details about the inventory item
unit(optional): String representing the unit of measurement of the item
stock_level(required): Number representing the current stock level of the item
unit_price(required): Number representing the price per unit of the item



def get_inventories(inv_id):
Method to retrieve a particular inventory item, requires a parameter
inv_id(required): String representing the id of the inventory

def put_inventory(inv_id,  stock_level, unit_price):
This method updates a particular inventory item, it has the following parameters
inv_id(required): String representing the id of the inventory
stock_level(required): Number representing the current stock level of the item
unit_price(required): Number representing the price per unit of the item

def get_customers():
This method retrieves a list of all customers, it requires no parameter

def post_customer(name, email, password):
This method creates a new customer and involves the following parameters
name(required): String representing the name of new customer
email(required): String representing the email of the new customer
password(required): String representing the password of the new customer

def get_customer(cust_id):
This method retrieves a particular customer identified by an id
id(required): String representing the id of the customer

def put_customer(cust_id, name=None, email=None, password=None):
This method updates the information of a customer identified by an id, it uses these parameters
cust_id(required): String representing the id of a customer
name(optional): String representing the name of the customer
email(optional): String representing the email of the customer
password(optional): String representing the password of the customer

Third-Party APIs
	https://developer.paypal.com/docs/api/payments/v2/
GET: /v2/payments/payment
GET: /v2/checkout/orders
POST: /v2/payments/payment
POST: /v2/checkout/orders
POST: /v2/payments/payment/:payment_id/captures

User Stories 
As a Customer of this restaurant, I can make online reservations of tables, to be sure of its availability.
As the Restaurant manager, i can view the inventory stock levels, to uptate the store before reaching critical points.
As the Restaurant manager, it automates the boring stuff, such as free table searching, to avoid time wastage.
