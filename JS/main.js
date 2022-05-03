//Productos
const products = [
  {
    id: 1,
    img: 'img/gd5480_app_photo_front-center_white.jpg',
    title: 'CAMPERA ADIDAS ORIGINALS',
    price: '$20000',
  },
  {
    id: 2,
    img: 'img/converseChuckTylor.jpg',
    title: 'CONVERSE CHUCKTYLOR',
    price: '$12500',
  },
  {
    id: 3,
    img: 'img/adidasForumMid.jpg',
    title: 'ADIDAS FORUM MID',
    price: '$28997',
  },
  {
    id: 4,
    img: 'img/gorraAdidasOriginals.jpg',
    title: 'GORRA ORIGINALS',
    price: '$6000',
  },
  {
    id: 5,
    img: 'img/product1.jpg',
    title: 'REMERA AEROREADY',
    price: '$5997',
  },
  {
    id: 6,
    img: 'img/product4.jpg',
    title: 'BOTELLA DEPORTIVA',
    price: '$3799',
  },
  {
    id: 7,
    img: 'img/headphonesAdidas.jpg',
    title: 'HEADSET ADIDAS',
    price: '$32799',
  },
  {
    id: 8,
    img: 'img/Maleta_Deportiva_Tiro_Primegreen_Mediana_Azul_GH7267_01_standard.jpg',
    title: 'MALETA DEPORTIVA',
    price: '$10799',
  },
];

let cartProducts = [];
if (window.localStorage.getItem('chCart')) {
  cartProducts = JSON.parse(window.localStorage.getItem('chCart'));
  renderCart();
  updateTotal();
}

const shopContent = document.querySelector('.shop-content');

//Cargar productos
document.addEventListener('DOMContentLoaded', () => {
  showProducts();
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
    title: "Muchas gracias por su compra!",
    text: "La transacción se realizó con éxito",
    icon: "success",
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
  let cartBoxContent = `<img src="${product.img}" alt="" class="cart-img" />
                        <div class="detail-box">
                          <div class="cart-product-title">${product.title}</div>
                          <div class="cart-price">${product.price}</div>
                          <input type="number" value=${product.quantity} class="cart-quantity" />
                        </div>
                        <i class="bx bxs-trash-alt cart-remove"></i> `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', () => removeCartItem(i));
  cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', (event) => quantityChanged(event, product));
}

////////////////////////Actualizar total
function updateTotal() {
  let total = cartProducts.reduce((acumulador, product) => {
    const price = +product.price.replace('$', '');
    return acumulador + price * product.quantity;
  }, 0);

  //Redondear precios
  total = Math.round(total * 100) / 100;
  //console.log(total);
  document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}

function updateLocalStorage() {
  window.localStorage.setItem('chCart', JSON.stringify(cartProducts));
}
