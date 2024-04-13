#!/usr/bin/python3

from werkzeug.security import check_password_hash, generate_password_hash
from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId
import os
from flask_jwt_extended import create_access_token, JWTManager


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'key@rms'

URI = os.environ.get('RMS_DATABASE_URI')
client = MongoClient(URI)

jwt = JWTManager(app)

db = client.rms_db


@app.errorhandler(404)
def not_found(error=None):
    """handle 404 errors"""
    message = {
        'status': 404,
        'message': 'Resource not found: ' + request.url,
    }
    return jsonify(message), 404


@app.route('/', methods=["GET"])
def welcome():
    """welcomming"""
    return jsonify({'Welcome': 'welcome to RMS API service'})


@app.route('/login', methods=['POST'])
def login():
    """handle login"""
    data = request.json
    name = data['name']
    email = data['email']
    password = data['password']

    if email and password and name:
        user = db.customers.find_one({'email': email})

        if user and check_password_hash(user['password'], password):
            access_token = create_access_token(identity=str(user['_id']))
            message = {
                'status': 200,
                'message': 'Login successful',
                'token': access_token,  # Include the JWT token in the response
                'id': str(user['_id'])
            }
            return jsonify(message), 200
        else:
            # Invalid credentials
            message = {
                'status': 401,
                'message': 'email or password incorrect'
            }
            return jsonify(message), 401
    else:
        return not_found()


# payment endpoints
@app.route('/pay', methods=['POST'])
def pay():
    """hadle online payments"""
    email = request.json.get('email', None)
    menu = request.json.get('menu')
    price = request.json.get('price')

    if not email:
        return jsonify({'message': 'missing email'}), 400

    db.orders.insert_one({
        "email": email,
        "menu": menu,
        "price": price,
        })

    return {"message": 'payment successful'}, 200


# Menu endpoints
@app.route('/menu', methods=["GET"])
def get_menus():
    """retrieve all menu list"""
    data = db.menu.find()
    data_list = []

    for v in data:
        v['_id'] = str(v['_id'])
        data_list.append(v)

    return jsonify(data_list)


@app.route('/menu/<id>', methods=["GET"])
def get_menu(id):
    """retrieve a specific menu by its id"""
    id = db.menu.find_one({
        '_id': ObjectId(id)
    })

    id['_id'] = str(id['_id'])

    return jsonify(id)


@app.route('/menu', methods=["POST"])
def post_menu():
    """create a new menu by admin"""
    data = request.json

    if data is None:
        return jsonify({'Error': 'Missing Parameters'})

    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    item_ids = data.get('item_ids')
    image = data.get('image_url')

    if name is None or price is None:
        return jsonify({'Error': 'Missing Name or Price'})

    if not item_ids:
        return jsonify({'message': 'item ids missing'})

    for obj in item_ids:
        obj = ObjectId(obj)

    db.menu.insert_one({
        'name': name,
        'description': description,
        'price': price,
        'image_url': image,
        'item_ids': item_ids
    })

    return jsonify({"Message": "Addition successful"})


@app.route('/menu/<id>', methods=["PUT"])
def update_menu(id):
    """update a specific menu action by admin"""
    if id is None:
        return jsonify({'Error': 'Missing id'})

    update_list = {}
    update = request.json
    name = update.get('name')
    description = update.get('description')
    price = update.get('price')
    item_ids = update.get('item_ids')
    image = update.get('image_url')

    if name:
        update_list["name"] = name
    if description:
        update_list["description"] = description
    if price:
        update_list["price"] = price
    if image:
        update_list['image_url'] = image
    if item_ids:
        for obj in item_ids:
            obj = ObjectId(obj)
        update_list['item_ids'] = item_ids

    db.menu.update_one({'_id': ObjectId(id)}, {'$set': update_list})
    return jsonify({'Message': 'Update successful'})


app.route('/menu/<id>', methods=["DELETE"])


def delete_menu(id):
    """delete a specific menu by admin"""
    result = db.menu.delete_one({'_id': ObjectId(id)})

    if result > 0:
        return jsonify({"status": 200, "message": "Menu deleted sucessfully"})

    return jsonify({'status': 404, 'message': 'Menu Not Found'})


# customer endpoint
@app.route('/customers', methods=["GET"])
def get_customers():
    """retrieve all customer list"""
    data = db.customers.find()
    data_list = []

    for v in data:
        v['_id'] = str(v['_id'])
        data_list.append(v)

    return jsonify(data_list)


@app.route('/customers/<id>', methods=["GET"])
def get_customer(id):
    """retrieve a specific customers by its id"""
    id = db.customers.find_one({
        '_id': ObjectId(id)
    })

    id['_id'] = str(id['_id'])

    return jsonify(id)


@app.route('/customers', methods=["POST"])
def post_customer():
    """create a new customer"""
    data = request.json

    if data is None:
        return jsonify({'Error': 'Missing Parameters'})

    name = data.get('name')
    email = data.get('email')
    address = data.get('address')
    password = data.get('password')
    pwd = generate_password_hash(password)

    if name is None or password is None:
        return jsonify({'Error': 'Missing Name or password or email'})

    verif = db.customers.find_one({'email': 'email'})

    if verif is email:
        return jsonify({
            'message': 'user email already exist',
            'status': 409
            })

    db.customers.insert_one({
        'name': name,
        'email': email,
        'address': address,
        "password": pwd
    })

    return jsonify({"Message": "Addition successful"})


@app.route('/customers/<id>', methods=["PUT"])
def update_customer(id):
    """update a specific customers"""
    if id is None:
        return jsonify({'Error': 'Missing id'})

    update_list = {}
    data = request.json

    name = data.get('name')
    address = data.get('address')
    email = data.get('email')
    password = data.get('password')
    pwd = generate_password_hash(password)

    if name:
        update_list["name"] = name
    if email:
        update_list["email"] = email
    if address:
        update_list['address'] = address
    if password:
        update_list["password"] = pwd
    else:
        return jsonify({"Message": "Updates must reset Password too"})

    db.customers.update_one({'_id': ObjectId(id)}, {'$set': update_list})

    return jsonify({'Message': 'Update successful'})


app.route('/customers/<id>', methods=["DELETE"])


def delete_customer(id):
    """delete a specific user"""
    result = db.customers.delete_one({'_id': ObjectId(id)})

    if result > 0:
        return jsonify({"status": 200, "message": "User deleted sucessfully"})

    return jsonify({'status': 404, 'message': 'User Not Found'})


# restaurant table endpoints
@app.route('/table', methods=["GET"])
def get_tables():
    """retrieve all restaurant tables list"""
    data = db.table.find()
    data_list = []

    for v in data:
        v['_id'] = str(v['_id'])
        data_list.append(v)

    return jsonify(data_list)


@app.route('/table/<id>', methods=["GET"])
def get_table(id):
    """retrieve a specific table by its id"""
    id = db.table.find_one({
        '_id': ObjectId(id)
    })

    id['_id'] = str(id['_id'])

    return jsonify(id)


@app.route('/table', methods=["POST"])
def post_table():
    """create a new table value"""
    data = request.json

    if data is None:
        return jsonify({'Error': 'Missing Parameters'})

    mode = data.get('mode')
    seat_number = data.get('seat_number')
    available = data.get('available')
    customer_id = data.get('customer_id')

    if mode is None or available is None:
        return jsonify({'Error': 'Missing mode or availability'})

    db.table.insert_one({
        'mode': mode,
        'seat_number': seat_number,
        'available': available,
        'customer_id': ObjectId(customer_id)
    })

    return jsonify({"Message": "Addition successful"})


@app.route('/table/<id>', methods=["PUT"])
def update_table(id):
    """update a specific table value"""
    if id is None:
        return jsonify({'Error': 'Missing id'})

    update_list = {}
    data = request.json

    mode = data.get('mode')
    seat_number = data.get('seat_number')
    available = data.get('available')
    customer_id = data.get('customer_id')

    if seat_number:
        update_list["seat_number"] = seat_number
    if available:
        update_list["available"] = available
    if customer_id:
        update_list['customer_id'] = ObjectId(customer_id)
    if mode:
        update_list['mode'] = mode

    db.table.update_one({'_id': ObjectId(id)}, {'$set': update_list})

    return jsonify({'Message': 'Update successful'})


app.route('/table/<id>', methods=["DELETE"])


def delete_table(id):
    """delete a specific table value"""
    result = db.table.delete_one({'_id': ObjectId(id)})

    if result > 0:
        return jsonify({"status": 200, "message": "table deleted sucessfully"})

    return jsonify({'status': 404, 'message': 'Table Not Found'})


# Menu item endpoints
@app.route('/item', methods=["GET"])
def get_items():
    """retrieve all menu item list"""
    data = db.item.find()
    data_list = []

    for v in data:
        v['_id'] = str(v['_id'])
        data_list.append(v)

    return jsonify(data_list)


@app.route('/item/<id>', methods=["GET"])
def get_item(id):
    """retrieve a specific item by its id"""
    id = db.item.find_one({
        '_id': ObjectId(id)
    })

    id['_id'] = str(id['_id'])

    return jsonify(id)


@app.route('/item', methods=["POST"])
def post_item():
    """create a new item"""
    data = request.json

    if data is None:
        return jsonify({'Error': 'Missing Parameters'})

    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    menu_ids = data.get('menu_ids')

    if name is None or price is None:
        return jsonify({'Error': 'Missing Name or Price'})

    for obj in menu_ids:
        obj = ObjectId(obj)

    db.item.insert_one({
        'name': name,
        'description': description,
        'price': price,
        'menu_ids': menu_ids
    })

    return jsonify({"Message": "Addition successful"})


@app.route('/item/<id>', methods=["PUT"])
def update_item(id):
    """update a specific item"""
    if id is None:
        return jsonify({'Error': 'Missing id'})

    update_list = {}
    update = request.json
    name = update.get('name')
    description = update.get('description')
    price = update.get('price')
    menu_ids = update.get('menu_ids')

    if name:
        update_list["name"] = name
    if description:
        update_list["description"] = description
    if price:
        update_list["price"] = price
    if menu_ids:
        for obj in menu_ids:
            obj = ObjectId(obj)
        update_list['menu_ids'] = menu_ids

    db.item.update_one({'_id': ObjectId(id)}, {'$set': update_list})

    return jsonify({'Message': 'Update successful'})


app.route('/item/<id>', methods=["DELETE"])


def delete_item(id):
    """delete a specific item"""
    result = db.item.delete_one({'_id': ObjectId(id)})

    if result > 0:
        return jsonify({"status": 200, "message": "Item deleted sucessfully"})

    return jsonify({'status': 404, 'message': 'Item Not Found'})


# Inventory endpoints
@app.route('/inventory', methods=["GET"])
def get_inventories():
    """retrieve all inventory list"""
    data = db.inventory.find()
    data_list = []

    for v in data:
        v['_id'] = str(v['_id'])
        data_list.append(v)

    return jsonify(data_list)


@app.route('/inventory/<id>', methods=["GET"])
def get_inventory(id):
    """retrieve a specific inventory by its id"""
    id = db.inventory.find_one({
        '_id': ObjectId(id)
    })

    id['_id'] = str(id['_id'])

    return jsonify(id)


@app.route('/inventory', methods=["POST"])
def post_inventory():
    """create a new inventory"""
    data = request.json

    if data is None:
        return jsonify({'Error': 'Missing Parameters'})

    name = data.get('name')
    description = data.get('description')
    unit_price = data.get('unit_price')
    unit = data.get('unit')
    stock_level = data.get('stock_level')

    if name is None or unit_price is None:
        return jsonify({'Error': 'Missing Name or Price'})

    db.inventory.insert_one({
        'name': name,
        'description': description,
        'unit_price': unit_price,
        'unit': unit,
        'stock_level': stock_level
    })

    return jsonify({"Message": "Addition successful"})


@app.route('/inventory/<id>', methods=["PUT"])
def update_inventory(id):
    """update a specific inventory"""
    if id is None:
        return jsonify({'Error': 'Missing id'})

    update_list = {}
    update = request.json

    name = update.get('name')
    description = update.get('description')
    unit_price = update.get('unit_price')
    unit = update.get('unit')
    stock_level = update.get('stock_level')

    if name:
        update_list["name"] = name
    if description:
        update_list["description"] = description
    if unit_price:
        update_list["unit_price"] = unit_price
    if unit:
        update_list['unit'] = unit
    if stock_level:
        update_list['stock_level'] = stock_level

    db.inventory.update_one({'_id': ObjectId(id)}, {'$set': update_list})

    return jsonify({'Message': 'Update successful'})


app.route('/inventory/<id>', methods=["DELETE"])


def delete_inventory(id):
    """delete a specific inventory"""
    result = db.inventory.delete_one({'_id': ObjectId(id)})

    if result > 0:
        return jsonify({
            "status": 200,
            "message": "Inventory deleted sucessfully"
            })

    return jsonify({'status': 404, 'message': 'Inventory Not Found'})


# order many to many relationships
@app.route('/orders', methods=["GET"])
def get_orders():
    """retrieve all restaurant order list"""
    data = db.orders.find()
    data_list = []

    for v in data:
        v['_id'] = str(v['_id'])
        data_list.append(v)

    return jsonify(data_list)


@app.route('/orders/<id>', methods=["GET"])
def get_order(id):
    """retrieve a specific order by its id"""
    id = db.orders.find_one({
        '_id': ObjectId(id)
    })

    id['_id'] = str(id['_id'])

    return jsonify(id)


app.route('/orders/<id>', methods=["DELETE"])


def delete_order(id):
    """delete a specific orders"""
    result = db.orders.delete_one({'_id': ObjectId(id)})

    if result > 0:
        return jsonify({"status": 200, "message": "Order deleted sucessfully"})

    return jsonify({'status': 404, 'message': 'order Not Found'})


if __name__ == '__main__':
    app.run(debug=True)
