//Productos
let products = [];

let cartProducts = [];
if (window.localStorage.getItem('chCart')) {
  cartProducts = JSON.parse(window.localStorage.getItem('chCart'));
  renderCart();
  updateTotal();
}

const shopContent = document.querySelector('.shop-content');

//Cargar productos
document.addEventListener('DOMContentLoaded', () => {
  // fetch products -> showProducts
  fetch('/data.json')
    .then((res) => res.json())
    .then((productsFetched) => {
      products = productsFetched;
      showProducts();
    });
});

//Funcion showProducts
function showProducts() {
  products.forEach((product) => {
    //Scripting
    const productBox = document.createElement('div');
    productBox.classList.add('product-box');

    const productImg = document.createElement('img');
    productImg.src = product.img;
    productImg.classList.add('product-img');

    const productTitle = document.createElement('h2');
    productTitle.textContent = product.title;
    productTitle.classList.add('product-title');

    const productPrice = document.createElement('span');
    productPrice.textContent = product.price;
    productPrice.classList.add('price');

    const productButton = document.createElement('i');
    productButton.className = 'bx bx-shopping-bag add-cart';
    productButton.id = 'add-animation';
    productButton.addEventListener('click', () => addCartCLicked(product));

    productBox.appendChild(productImg);
    productBox.appendChild(productTitle);
    productBox.appendChild(productPrice);
    productBox.appendChild(productButton);

    shopContent.appendChild(productBox);
  });
}

//Carrito
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//Abrir Carrito
cartIcon.onclick = () => {
  cart.classList.add('active');
};

//Cerrar Carrito
closeCart.onclick = () => {
  cart.classList.remove('active');
};

//Carrito funcionando

// if (document.readyState == 'loading') {
//   document.addEventListener('DOMContentLoaded', ready);
// } else {
//   ready();
// }
document.readyState == 'loading'
  ? document.addEventListener('DOMContentLoaded', ready)
  : ready();

//Funcion ready
function ready() {
  //Boton Comprar ahora
  document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked);
}

//Funcion buyButtonClicked
function buyButtonClicked() {
  swal({
    title: 'Muchas gracias por su compra!',
    text: 'La transacción se realizó con éxito',
    icon: 'success',
  });
  cartProducts = [];
  renderCart();
  updateLocalStorage();
  updateTotal();
}

/////////////////////Funcion removeCartItem
function removeCartItem(index) {
  cartProducts.splice(index, 1);
  renderCart();
  updateLocalStorage();
  updateTotal();
}

//////////////////////Cambios de cantidad
function quantityChanged(event, product) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 1) {
    input.value = 1;
  }
  product.quantity = +input.value;
  updateLocalStorage();
  updateTotal();
}

////////////////////Funcion addCartClicked
function addCartCLicked(product) {
  product.quantity = 1;
  if (cartProducts.find((productInCart) => productInCart.id === product.id)) {
    alert('Ya agregaste este item al carrito');
  } else {
    cartProducts.push(product);
    renderCart();
    updateLocalStorage();
    updateTotal();
  }
}

///////////////// Agregar productos al carrito

function renderCart() {
  
  
  const cartItems = document.getElementsByClassName('cart-content')[0];
  cartItems.innerHTML = '';
  cartProducts.forEach((product, index) => {
   
    renderProduct(product, index);
  });
  
}

function renderProduct(product, i) {
  let cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  const cartItems = document.getElementsByClassName('cart-content')[0];

  let productImg = document.createElement('img');
  productImg.classList.add('cart-img');
  productImg.src = product.img;

  let detailBox = document.createElement('div');
  detailBox.classList.add('detail-box');

  let cartProductTitle = document.createElement('div');
  cartProductTitle.classList.add('cart-product-title');
  cartProductTitle.innerText = product.title

  let cartPrice = document.createElement('div');
  cartPrice.classList.add('cart-price');
  cartPrice.innerText = product.price;

  let cartQtyInput = document.createElement('input');
  cartQtyInput.classList.add('cart-quantity');
  cartQtyInput.type = 'number';
  cartQtyInput.value = +product.quantity;
  cartQtyInput.addEventListener('change', (event) => quantityChanged(event, product));

  let icon = document.createElement('i');
  icon.classList.add('bx');
  icon.classList.add('bxs-trash-alt');
  icon.classList.add('cart-remove');
  icon.addEventListener('click', () => removeCartItem(i));

  detailBox.append(cartProductTitle)
  detailBox.append(cartPrice)
  detailBox.append(cartQtyInput)

  cartShopBox.append(productImg)
  cartShopBox.append(detailBox)
  cartShopBox.append(icon)

  cartItems.append(cartShopBox);

}

////////////////////////Actualizar total
function updateTotal() {
  const cartQty = document.getElementById('cartQty');

  let quantity = cartProducts.reduce((acumulator, product) =>{
    return acumulator + product.quantity;
  }, 0)
  let total = cartProducts.reduce((acumulator, product) => {
    const price = +product.price.replace('$', '');
    return acumulator + price * product.quantity;
  }, 0);
  
  cartQty.innerText = quantity;
  //Redondear precios
  total = Math.round(total * 100) / 100;
  //console.log(total);
  document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}

function updateLocalStorage() {
  window.localStorage.setItem('chCart', JSON.stringify(cartProducts));
}
