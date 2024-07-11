const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productDescriptionInput = document.getElementById('product-description');
const productPriceInput = document.getElementById('product-price');
const productList = document.getElementById('product-list');
const productSelect = document.getElementById('product-select');

const orderForm = document.getElementById('order-form');
const orderQuantityInput = document.getElementById('order-quantity');
const orderList = document.getElementById('order-list');

const productApiUrl = 'http://localhost:8081/products';
const orderApiUrl = 'http://localhost:8082/orders';

// Fetch products and populate product list and select options
function fetchProducts() {
    fetch(productApiUrl)
        .then(response => response.json())
        .then(products => {
            productList.innerHTML = '';
            productSelect.innerHTML = '';
            products.forEach(product => {
                const li = document.createElement('li');
                li.textContent = `${product.name} - ${product.description} - $${product.price}`;
                productList.appendChild(li);

                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = product.name;
                productSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Fetch orders and populate order list
function fetchOrders() {
    fetch(orderApiUrl)
        .then(response => response.json())
        .then(orders => {
            orderList.innerHTML = '';
            orders.forEach(order => {
                const li = document.createElement('li');
                li.textContent = `Order for Product ID: ${order.productId} - Quantity: ${order.quantity}`;
                orderList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching orders:', error));
}

// Handle product form submission
productForm.addEventListener('submit', event => {
    event.preventDefault();
    const newProduct = {
        name: productNameInput.value,
        description: productDescriptionInput.value,
        price: productPriceInput.value
    };
    fetch(productApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
        .then(response => response.json())
        .then(product => {
            productNameInput.value = '';
            productDescriptionInput.value = '';
            productPriceInput.value = '';
            fetchProducts();
        })
        .catch(error => console.error('Error creating product:', error));
});

// Handle order form submission
orderForm.addEventListener('submit', event => {
    event.preventDefault();
    const newOrder = {
        productId: productSelect.value,
        quantity: orderQuantityInput.value
    };
    fetch(orderApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
    })
        .then(response => response.json())
        .then(order => {
            orderQuantityInput.value = '';
            fetchOrders();
        })
        .catch(error => console.error('Error creating order:', error));
});

// Initial fetch
fetchProducts();
fetchOrders();
