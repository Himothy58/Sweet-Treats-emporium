const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
});

// Prices are in Kenyan Shillings (KES)
let products = [
    { id: 1, name: 'Bell full Cupy', image: 'images-phone.png', price: 3000 },
    { id: 2, name: 'Vanilla Cup Special', image: 'images-airpods.png', price: 1870},
    { id: 3, name: 'Three Mint Cupcakes', image: 'images-headphones.png', price: 1350 },
    { id: 4, name: 'Pink Pile', image: 'images-watch.png', price: 1000 },
    { id: 5, name: 'Blackjack', image: 'images-Transcend.png', price: 5450 },
    { id: 6, name: 'Ice creamy', image: 'img(3).png', price: 1000 },
    { id: 7, name: 'Dessert', image: 'images-pad1.png', price: 800 },
    { id: 8, name: 'Blackjack coffee', image: 'images-shoes2.png', price: 2000 },
];

let listCards = [];

// Initialize the product list
const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="images/${value.image}"/>
            <div class="title">${value.name}</div>
            <div class="price">KSh ${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>
        `;
        list.appendChild(newDiv);
    });
};

initApp();

const addToCard = (key) => {
    if (listCards[key] == null) {
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    } else {
        listCards[key].quantity += 1; // Increment quantity if already in cart
    }

    reloadCard();
};

// Function to change quantity of a product in the cart
const changeQuantity = (key, newQuantity) => {
    if (newQuantity <= 0) {
        delete listCards[key]; // Remove item if quantity is 0
    } else {
        listCards[key].quantity = newQuantity; // Update quantity
    }
    reloadCard();
};

// Function to reload the cart display
const reloadCard = () => {
    listCard.innerHTML = "";
    let totalPrice = 0;
    let totalQuantity = 0;

    listCards.forEach((value) => {
        if (value != null) {
            totalPrice += value.price * value.quantity; // Calculate total price
            totalQuantity += value.quantity; // Calculate total quantity

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="images/${value.image}"/></div>
                <div class ="cardTitle">${value.name}</div>
                <div class ="cardPrice">KSh ${ (value.price * value.quantity).toLocaleString() }</div>
                <div>
                    <button onclick="changeQuantity(${value.id - 1}, ${value.quantity - 1})">-</button>
                    <div class ="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${value.id - 1}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = `KSh ${totalPrice.toLocaleString()}`;
    quantity.innerText = totalQuantity;
};

// Function to handle product search
const searchProducts = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );

    // Clear the list and display filtered products
    list.innerHTML = "";
    
    if (filteredProducts.length === 0) {
        list.innerHTML = `<div class="no-results">No products found.</div>`;
    } else {
        filteredProducts.forEach((value, key) => {
            let newDiv = document.createElement("div");
            newDiv.classList.add("item");
            newDiv.innerHTML = `
                <img src="images/${value.image}"/>
                <div class="title">${value.name}</div>
                <div class="price">KSh ${value.price.toLocaleString()}</div>
                <button onclick="addToCard(${key})">Add To Cart</button>
            `;
            list.appendChild(newDiv);
        });
    }
};

// Placeholder for checkout function
const checkout = () => {
    // Implement checkout logic here
    alert("Checkout functionality is not implemented yet. You can order via WhatsApp we have a WHATSAPP BUSSINESS NUMBER 0724 740 740")
     alert("DO NOT FORGET TO SIGN IN OR SIGN UP TO TRACK YOUR ORDER");
};
