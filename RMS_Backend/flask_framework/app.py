#!/usr/bin/python3

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime



app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


#relationship between Customer and table
Reservation = db.Table('Reservation',
                          db.Column('customer_id', db.Integer, db.ForeignKey('Customer.customerID')),
                          db.Column('table_id', db.Integer, db.ForeignKey('RestaurantTable.tableID')),
                          date = db.Column(db.DateTime, default=datetime.utcnow)
                          )

#relationship between customer and menu
Order = db.Table('Order',
                 db.Column('customer_id', db.Integer, db.ForeingKey('Customer.customerID')),
                 db.Column('menu_id', db.Integer, db.ForeignKey('Menu.menuID')),
                 orderDate = db.Column(db.DateTime, default=datetime.utcnow)
                 )

#relationship between menu items and inventory
inventory_menu_items = db.Table('inventory_menu_items',
    db.Column('inventory_id', db.Integer, db.ForeignKey('inventory.InvID')),
    db.Column('menu_item_id', db.Integer, db.ForeignKey('menuItem.itemID'))
)


class Customer(db.Model):
    """database table representint the customers"""
    customerID = db.Column(db.Integer, primary_key=True)
    customerName = db.Column(db.String(100))
    customerAddress = db.Column(db.String(100))
    customerEmail = db.Column(db.String(50))

    def __init__(self, name, address, customerEmail):
        self.name = name
        self.address = address
        self.customerEmail = customerEmail


class RestaurantTable(db.Model):
    """db Table representing the restaurant table"""
    tableID = db.Column(db.Integer, primary_key=True)
    talbeMode = db.Column(db.String(20))
    seatNumber = db.Column(db.Integer, nullable=False)
    available = db.Column(db.Boolean, default=True)

    customer = db.relationship('Customer', secondary='Reservation', backref='RestaurantTable')

    def __init__(self, tableMode, seatNumber):
        self.tableMode = tableMode
        self.seatNumber = seatNumber


class Menu(db.Model):
    """database table representing the Menu"""
    menuID = db.Column(db.Integer, primary_key=True)
    menuName = db.Column(db.String(100))
    menuDescription = db.Column(db.Text())

    items = db.relationship('MenuItem', backref='menu')
    customer = db.relationship('Customer', secondary='Order', backref='menu')

    def __init__(self, menuName, menuDescription):
        self.menuName = menuName
        self.menuDescription = menuDescription


class Inventory(db.Model):
    """database table representing the inventory"""
    InvID = db.Column(db.Integer, primary_key=True)
    InvName = db.Column(db.String(100))
    InvDescription = db.Column(db.Text())
    InvUnit = db.Column(db.String(20))
    InvUnitPrice = db.Column(db.Float)
    InvStockLevel = db.Column(db.Integer)

    menu_items = db.relationship('MenuItem', secondary=inventory_menu_items, backref='inventory')

    def __init__(self, InvName, InvUnitPrice, InvStockLevel,
                 InvDescription=None, InvUnit=None):
        self.InvName = InvName
        self.InvDescription = InvDescription
        self.InvUnit = InvUnit
        self.InvUnitPrice = InvUnitPrice
        self.InvStockLevel = InvStockLevel


class MenuItem(db.Model):
    """database table representing the menu items"""
    ItemID = db.Column(db.Integer, primary_key=True)
    ItemName = db.Column(db.String(100))
    ItemDescription = db.Column(db.Text())
    ItemUnitPrice = db.Column(db.Float)

    menu_id = db.relationship(db.Integer, db.ForeignKey('menu.menuID'))

    def __init__(self, ItemName, ItemUnitPrice, ItemDescription=None):
        self.ItemName = ItemName
        self.ItemDescription = ItemDescription
        self.ItemUnitPrice = ItemUnitPrice




@app.route('/', methods=["GET"])
def get_article():
    return jsonify({'greetings': "hello there"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
