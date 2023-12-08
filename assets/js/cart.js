const urlParams = new URLSearchParams(window.location.search);
const selectedItemsParam = urlParams.get('selectedItems');
const selectedItems = selectedItemsParam ? JSON.parse(decodeURIComponent(selectedItemsParam)) : [];
console.log('Selected Items in Cart:', selectedItems);

const storedItems = localStorage.getItem('cartItems');
const localStorageItems = storedItems ? JSON.parse(storedItems) : [];

const allItems = [...localStorageItems, ...selectedItems];

const cartItemsContainer = document.getElementById('cartItems');
allItems.forEach((item, index) => {
    let itemDiv = document.createElement('div');
    itemDiv.innerHTML = `<p>${item.title}: ${item.quantity}</p>`;
    
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeItem(index));
   itemDiv.appendChild(removeButton);

   cartItemsContainer.appendChild(itemDiv);
});

let checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', checkout);

function checkout() {
   window.location.href = 'invoice.html';
}

function removeItem(index) {
   allItems.splice(index, 1);
   updateCartDisplay();
}

function updateCartDisplay() {
   cartItemsContainer.innerHTML = '';

   allItems.forEach((item, index) => {
      let itemDiv = document.createElement('div');
      itemDiv.innerHTML = `<p>${item.title}: ${item.quantity}</p>`;
      
      let removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removeItem(index));
      itemDiv.appendChild(removeButton);

      cartItemsContainer.appendChild(itemDiv);
   });
}

