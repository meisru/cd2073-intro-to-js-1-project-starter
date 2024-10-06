/* An array to add all of product object literals that will be created. */
const products = [];

/* product objects using object literal notation 
   All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/
const product1 = {
  name: "cherry",
  price: 2,
  quantity: 0,
  productId: 1,
  image: "./images/cherry.jpg"
};

const product2 = {
  name: "orange",
  price: 1,
  quantity: 0,
  productId: 2,
  image: "./images/orange.jpg"
};

const product3 = {
  name: "strawberry",
  price: 3,
  quantity: 0,
  productId: 3,
  image: "./images/strawberry.jpg"
};

/* Add each product object to the products array */
products.push(product1, product2, product3);

/* An empty array to hold the items in the cart */
const cart = [];

/**
* @description get the correct product based on the productId
* @param {array} productsList - list of products
* @param {number} productId - id of the product
* @returns {object} product object
*/
function getProductById(productsList, productId) {
  return productsList.find((product) => product.productId === productId);
}

/**
* @description get the correct product based on the productId,
  - increase the product's quantity,
  - if the product is not already in the cart, add it to the cart
* @param {number} productId
*/
function addProductToCart(productId) {
  const product = getProductById(products, productId);

  // terminate the function if the product doesn't exist
  // or if the "product" object is undefined
  if (!product) return;

  // otherwise, increase the quantity of the product
  product.quantity++;

  // if the product is not already in the cart, add it to the cart
  if (!cart.includes(product)) {
    cart.push(product);
  }
}

/**
* @description get the correct product based on the productId,
then increase the product's quantity
* @param {number} productId
*/
function increaseQuantity(productId) {
  const product = getProductById(products, productId);
  if (!product) return;
  product.quantity++;
}

/**
* @description get the correct product based on the productId
  - decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
* @param {number} productId
*/
function decreaseQuantity(productId) {
  const product = getProductById(products, productId);
  if (!product) return;
  product.quantity--;
  if (product.quantity === 0) {
    cart.splice(cart.indexOf(product), 1); // Remove the product from the cart
  }
}

/**
* @description get the correct product based on the productId
  - update the product quantity to 0
  - remove the product from the cart
* @param {number} productId
*/
function removeProductFromCart(productId) {
  const product = getProductById(products, productId);
  if (!product) return;
  product.quantity = 0;
  cart.splice(cart.indexOf(product), 1); // Remove the product from the cart
}

/**
* @description calculates the total cost of all products
* @returns {number} total cost of the products in the cart
*/
function cartTotal() {
  const initialValue = 0;
  const total = cart.reduce((accumulator, product) => 
    accumulator + product.price * product.quantity, 
    initialValue
  );
  return total;
}

/**
* @description empties the cart from products
*/
function emptyCart() {
  cart.length = 0;
}

/**
* @description checks the amount paid by the customer
* @param {number} amount - amount paid by the customer
* @returns {number} negative number if there is a remaining balance, positive number if money should be returned to customer
*/
let totalPaid = 0;
function pay(amount) {
  totalPaid += amount; 
  let remainingBalance = totalPaid - cartTotal();
  if (remainingBalance >= 0) {
    totalPaid = 0;
    emptyCart();
  }
  return remainingBalance;
}

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay,
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
  // currency
}