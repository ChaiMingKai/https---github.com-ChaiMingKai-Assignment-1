function loadHeader() {
    var headerContainer = document.querySelector('header');
    headerContainer.innerHTML = '<h1>Wild West Bite</h1>         <p>Explore the Flavors of the Wild West</p>';
}

function loadFooter() {
    var footerContainer = document.querySelector('footer');
    footerContainer.innerHTML = '        <p>&copy; 2023 Wild West Bite. All rights reserved.</p>';
}

function validateForm(event) {
    event.preventDefault();

    var emailInput = document.getElementById('email');
    var emailValue = emailInput.value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!emailRegex.test(emailValue)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Validate rating
    var ratingInput = document.getElementById('rating');
    var ratingValue = parseInt(ratingInput.value, 10);

    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
        alert('Please enter a valid rating below 5.');
        return false;
    }

    // Clear the form on successful submission
    event.target.reset();

    // Open the modal
    openModal();

    return true;
}



function highlightCurrentPage() {
    var currentPage = window.location.href;
    var links = document.querySelectorAll('nav a');
    links.forEach(function (link) {
        if (currentPage.includes(link.href)) {
            link.classList.add('active');
        }
    });
}

function addToCart(itemName) {

    document.getElementById('remarksModal').style.display = 'block';

    document.getElementById('remarks').setAttribute('data-item', itemName);
}

function closeModal() {
    document.getElementById('remarksModal').style.display = 'none';
}

function submitOrder() {

    const itemName = document.getElementById('remarks').getAttribute('data-item');
    const remarks = document.getElementById('remarks').value.trim();
    const price = getPriceForItem(itemName);

    const listItem = document.createElement('li');


    listItem.textContent = remarks !== ''
    ? `${itemName} - ${price} - Remarks: ${remarks}`
    : `${itemName} - ${price}`;


    const cartItemsList = document.getElementById('cartItems');
    cartItemsList.appendChild(listItem);

    saveCartToStorage();


    closeModal();
}

function getPriceForItem(itemName) {

    const menuItems = document.querySelectorAll('.menu-item');
    for (const menuItem of menuItems) {
        const name = menuItem.querySelector('h3').textContent;
        if (name === itemName) {
            return menuItem.querySelector('.price').textContent;
        }
    }
    return 'N/A'; 
}


function loadCartFromStorage() {

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


    const cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = ''; 

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        cartItemsList.appendChild(listItem);
    });
}

function saveCartToStorage() {

    const cartItemsList = document.getElementById('cartItems');
    const cartItems = Array.from(cartItemsList.children).map(item => item.textContent);

 
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

document.addEventListener('DOMContentLoaded', function () {
    loadCartFromStorage();
});

function clearAll() {

    const cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = '';


    saveCartToStorage();
}

function openModal() {
    document.getElementById('feedback-modal').style.display = 'block';
}

function closeModal2() {
    document.getElementById('feedback-modal').style.display = 'none';
}

function addToCart2(button) {
    var menuItem = button.closest('.menu-item');
    var itemName = menuItem.querySelector('h3').innerText;

    addToCart(itemName);
}
