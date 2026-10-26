from django.shortcuts import render

def home(request):
    products = [
        {"name": "Modern armchair", "type": "Armchair", "price": "$420.00", "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85"},
        {"name": "Oak side table", "type": "Tables", "price": "$180.00", "image": "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=85"},
        {"name": "Daisy coffee table", "type": "Tables", "price": "$260.00", "image": "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=85"},
    ]
    return render(request, "store/home.html", {"products": products})
