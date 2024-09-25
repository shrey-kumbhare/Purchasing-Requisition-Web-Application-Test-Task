from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import or_

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:/// products.db'


db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    supplier_name = db.Column(db.String(100), nullable=False)
    product_info = db.Column(db.Text, nullable=False)
    website_url = db.Column(db.String(200))
    category = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    timeline = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    required_for = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'supplier_name': self.supplier_name,
            'product_info': self.product_info,
            'website_url': self.website_url,
            'category': self.category,
            'quantity': self.quantity,
            'timeline': self.timeline,
            'location': self.location,
            'required_for': self.required_for
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

@app.route('/api/products', methods=['GET'])
def search_products():
    query = request.args.get('query', '')

    if query:
        # Filter products based on search query (case-insensitive search)
        products = Product.query.filter(
            or_(
                Product.name.ilike(f'%{query}%'),
                Product.description.ilike(f'%{query}%'),
                Product.supplier_name.ilike(f'%{query}%'),
                Product.category.ilike(f'%{query}%'),
                Product.location.ilike(f'%{query}%'),
                Product.required_for.ilike(f'%{query}%')
            )
        ).all()
    else:
        # Return all products if no query is provided
        products = Product.query.all()

    # Convert the products to dictionaries before returning
    return jsonify([product.to_dict() for product in products])

@app.route('/api/products', methods=['POST'])
def add_product():
    try:
        data = request.get_json()
        
        required_fields = ['name', 'description', 'price', 'supplierName', 'productInfo', 
                           'websiteUrl', 'category', 'quantity', 'timeline', 'location', 'requiredFor']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required.'}), 400
        
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            supplier_name=data['supplierName'],
            product_info=data['productInfo'],
            website_url=data['websiteUrl'],
            category=data['category'],
            quantity=data['quantity'],
            timeline=data['timeline'],
            location=data['location'],
            required_for=data['requiredFor']
        )
        
        db.session.add(new_product)
        db.session.commit()
        
        return jsonify({'message': 'Product added successfully', 'product': new_product.to_dict()}), 201
    
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        print(f'Error adding product: {e}')
        return jsonify({'error': str(e)}), 500  # Return the error message

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all() 
    return jsonify([{'id': cat.id, 'name': cat.name} for cat in categories])

@app.route('/api/locations', methods=['GET'])
def get_locations():
    locations = Location.query.all()
    return jsonify([{'id': loc.id, 'name': loc.name} for loc in locations])

if __name__ == '__main__':
    app.run(debug=True, port=5000)    
