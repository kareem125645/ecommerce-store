// إدارة حالة السلة وتسجيل الدخول
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// وظيفة إضافة منتج للسلة
function addToCart(productName, productPrice) {
  if (!isLoggedIn) {
    alert('يجب تسجيل الدخول أولاً');
    window.location.href = 'login.html';
    return;
  }
  cart.push({ name: productName, price: productPrice });
  updateCartStorage();
  alert(`${productName} تم إضافته إلى السلة`);
}

// تسجيل الدخول
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (email === 'test@test.com' && password === 'password123') {
    localStorage.setItem('isLoggedIn', 'true');
    isLoggedIn = true;
    alert('تم تسجيل الدخول بنجاح');
    window.location.href = 'index.html';
  } else {
    alert('بيانات الدخول غير صحيحة');
  }
}

// تسجيل الخروج
function logout() {
  localStorage.removeItem('isLoggedIn');
  isLoggedIn = false;
  cart = [];
  updateCartStorage();
  window.location.href = 'login.html';
}

// التحقق من الصلاحيات
function checkAuth() {
  const currentPage = window.location.pathname.split('/').pop();
  
  if (!isLoggedIn && currentPage !== 'login.html' && currentPage !== 'signup.html') {
    window.location.href = 'login.html';
  }
}

// تحديث السلة في التخزين المحلي
function updateCartStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// عرض محتويات السلة
function displayCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - ${item.price} دولار`;
      cartItemsContainer.appendChild(listItem);
      total += item.price;
    });

    const totalElement = document.createElement('li');
    totalElement.style.fontWeight = 'bold';
    totalElement.textContent = `المجموع: ${total} دولار`;
    cartItemsContainer.appendChild(totalElement);
  }
}

// وظيفة إتمام الطلب
function completeOrder() {
  if (cart.length === 0) {
    alert('سلة التسوق فارغة!');
    return;
  }
  
  if (confirm('هل تريد إتمام الطلب؟')) {
    alert('تم إتمام الطلب بنجاح! شكراً لشرائك من متجرنا');
    cart = [];
    updateCartStorage();
    displayCart();
  }
}

// تهيئة الصفحة عند التحميل
window.onload = function() {
  checkAuth();
  displayCart();
  
  // تحديث رابط تسجيل الدخول/الخروج
  const loginLink = document.getElementById('loginLink');
  if (loginLink) {
    if (isLoggedIn) {
      loginLink.textContent = 'تسجيل الخروج';
      loginLink.onclick = function(e) {
        e.preventDefault();
        logout();
      };
    } else {
      loginLink.textContent = 'تسجيل الدخول';
      loginLink.onclick = null;
    }
  }
};