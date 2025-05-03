// JavaScript to handle adding items to cart
let cart = [];

function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: productPrice });
  alert(`${productName} تم إضافته إلى السلة`);
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';
  
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - ${item.price} دولار`;
    cartItemsContainer.appendChild(listItem);
  });
}

function completeOrder() {
  if (cart.length > 0) {
    alert('تم إتمام الطلب بنجاح');
    cart = [];
    updateCart();
  } else {
    alert('لا يوجد منتجات في السلة');
  }
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (email === 'test@test.com' && password === 'password123') {
    alert('تم تسجيل الدخول بنجاح');
    window.location.href = 'index.html';
  } else {
    alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  }
}

function searchProducts(event) {
  event.preventDefault();
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  alert(`تم البحث عن: ${searchInput}`);
}
