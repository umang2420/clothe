let totalSelectedItems = 0;
let totalPrice = 0;

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => displayProducts(data));

function displayProducts(products) {
    let productdata = document.getElementById('products');
    productdata.innerHTML = '';

    products.forEach(product => {
        let div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.image}" width="150" onclick="ProductDescription('${product.description}', '${product.image}', '${product.price}')">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <p>
                <button class="btn-color" onclick="addToCart('${product.title}', ${product.price})">Add to Cart</button>
                <button class="btn-color" onclick="removeFromCart('${product.title}', ${product.price})">Remove</button>
                <input type="number" id="productQuantity_${product.title}" value="0" min="0" max="10" readonly>
            </p>
        `;
        productdata.appendChild(div);
    });

    updateTotalPriceDisplay();
}

function ProductDescription(description, imageUrl, price) {
    window.location.href = `view.html?description=${encodeURIComponent(description)}&imageUrl=${encodeURIComponent(imageUrl)}&price=${encodeURIComponent(price)}`;
}

function search() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            let filteredProducts = data.filter(product => product.title.toLowerCase().includes(searchInput));
            displayProducts(filteredProducts);
        });
}

function addToCart(productTitle, productPrice) {
    let quantityInput = document.getElementById(`productQuantity_${productTitle}`);
    let currentQuantity = parseInt(quantityInput.value);

    if (currentQuantity < 10 && totalSelectedItems < 10) {
        currentQuantity++;
        quantityInput.value = currentQuantity;
        totalSelectedItems++;
        totalPrice += productPrice; 

        try {
            const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
            selectedItems.push({ title: productTitle, quantity: currentQuantity });
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            localStorage.setItem('totalPrice', totalPrice);
        } catch (error) {
            console.error('Error storing data in local storage:', error);
        }
    } else if (currentQuantity >= 10) {
        alert('You can select a maximum of 10 items.');
    } else {
        alert('Maximum selection is 10 items.');
    }

    updateTotalPriceDisplay();
}

function removeFromCart(productTitle, productPrice) {
    let quantityInput = document.getElementById(`productQuantity_${productTitle}`);
    let currentQuantity = parseInt(quantityInput.value);

    if (currentQuantity > 0) {
        currentQuantity--;
        quantityInput.value = currentQuantity;
        totalSelectedItems--;
        totalPrice -= productPrice; 

        try {
            const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
            const index = selectedItems.findIndex(item => item.title === productTitle);
            if (index !== -1) {
                selectedItems[index].quantity = currentQuantity;
                localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
                localStorage.setItem('totalPrice', totalPrice);
            }
        } catch (error) {
            console.error('Error updating data in local storage:', error);
        }
    } else {
        alert('Quantity already at minimum (0).');
    }

    updateTotalPriceDisplay();
}

function goToCart() {
    try {
        const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
        const totalSavedPrice = localStorage.getItem('totalPrice') || 0;
        console.log('Selected Items:', selectedItems);
        console.log('Total Price:', totalSavedPrice);

        window.location.href = `cart.html?selectedItems=${encodeURIComponent(JSON.stringify(selectedItems))}&totalPrice=${totalSavedPrice}`;
    } catch (error) {
        console.error('Error retrieving data from local storage:', error);
    }
}

function updateTotalPriceDisplay() {
    document.getElementById('totalPriceDisplay').innerText = totalPrice.toFixed(2);
}

updateTotalPriceDisplay();
