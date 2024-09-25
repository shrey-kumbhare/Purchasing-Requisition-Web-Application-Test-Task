from app import db, Category, Location, Product, app

# Ensure tables are created
with app.app_context():
    db.create_all()

def populate_categories():
    categories = [
        {'name': 'Electronics'},
        {'name': 'Furniture'},
        {'name': 'Clothing'},
        {'name': 'Stationery'}
    ] 

    for category in categories:
        existing_category = Category.query.filter_by(name=category['name']).first()
        if not existing_category:
            new_category = Category(name=category['name'])
            db.session.add(new_category)
    
    db.session.commit()
    print("Categories populated successfully.")

def populate_locations():
    locations = [
        {'name': 'New York'},
        {'name': 'Los Angeles'},
        {'name': 'San Francisco'},
        {'name': 'Chicago'}
    ]

    for location in locations:
        existing_location = Location.query.filter_by(name=location['name']).first()
        if not existing_location:
            new_location = Location(name=location['name'])
            db.session.add(new_location)
    
    db.session.commit()
    print("Locations populated successfully.")

def populate_products():
    products = [
        {
            'name': 'Smartphone',
            'description': 'Latest model smartphone with advanced features',
            'price': 699.99,
            'supplier_name': 'Tech Supplier',
            'product_info': '64GB storage, 5G, 6.1-inch display',
            'category': 'Electronics',
            'quantity': 50,
            'timeline': 'Q4 2024',
            'location': 'New York',
            'required_for': 'Retail sales'
        },
        {
            'name': 'Table Fan',
            'description': 'Ergonomic Table Fan',
            'price': 100,
            'supplier_name': 'Furniture Supplier',
            'product_info': 'Adjustable height ',
            'category': 'Electronic',
            'quantity': 100,
            'timeline': 'Q2 2024',
            'location': 'San Francisco',
            'required_for': 'Personal Use'
        },
        {
            'name': 'Office Chair',
            'description': 'Ergonomic office chair with lumbar support',
            'price': 129.99,
            'supplier_name': 'Furniture Supplier',
            'product_info': 'Adjustable height, 360-degree swivel',
            'category': 'Furniture',
            'quantity': 200,
            'timeline': 'Q3 2024',
            'location': 'San Francisco',
            'required_for': 'Office setup'
        }
    ]

    for product in products:
        category = Category.query.filter_by(name=product['category']).first()
        location = Location.query.filter_by(name=product['location']).first()

        if category and location:
            new_product = Product(
                name=product['name'],
                description=product['description'],
                price=product['price'],
                supplier_name=product['supplier_name'],
                product_info=product['product_info'],
                category=category.name,
                quantity=product['quantity'],
                timeline=product['timeline'],
                location=location.name,
                required_for=product['required_for']
            )
            db.session.add(new_product)
    
    db.session.commit()
    print("Sample products populated successfully.")

if __name__ == '__main__':
    with app.app_context():
        populate_categories()
        populate_locations()
        populate_products()
