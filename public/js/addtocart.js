$(document).ready(function(){
  $(document).on("click",".addtocart",function(){
    my();
  });
  $('.shop').click(function(){
        $('.shopdropdown').toggleClass('dropdown_menu_show');
  });  
  $('#sign_in').click(function() {
    window.location = 'http://localhost:3000/index.html';
  });
});

if (localStorage.getItem("uname") != null) {
  $('#sign_in').hide();
  $('#logout').show();
  $('#greeting').show();
  userName.innerHTML = localStorage.getItem("uname")
  $('#userName').show();
}

window.onload = my;
var count = 0;
function my() {
  var arrayFromStorage = JSON.parse(sessionStorage.getItem('item'));
  var count = arrayFromStorage.length
  document.getElementById('cart_count').innerHTML = `(${count})`; 
}

//add to cart
document.addEventListener("DOMContentLoaded", function() {
  var addCarts = document.getElementsByClassName('addtocart');
});

var title;
var price;
var productImg;

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var prodimg = button.parentElement;
  var itemsArr = JSON.parse(sessionStorage.getItem("item"))
  
  if (localStorage.getItem("uname")) {
    if (itemsArr != null) {
    for (var i = 0; i < itemsArr.length; i++) {
      var thetitle = JSON.parse(itemsArr[i])
      if (thetitle.title == shopProducts.getElementsByClassName('product-title')[0].innerText) {
        alert("Item already in cart")
        return;
      }
    }
    }
  var cartItem = {
    title: shopProducts.getElementsByClassName('product-title')[0].innerText,
    price: shopProducts.getElementsByClassName('price')[0].innerText,
    productImg: prodimg.getElementsByClassName("product-img")[0].src
  }
  var cartItemJSON = JSON.stringify(cartItem);

  var cartArray = new Array();
  if (sessionStorage.getItem('item')) {
    cartArray = JSON.parse(sessionStorage.getItem('item'));
  }
    cartArray.push(cartItemJSON);

  var cartJSON = JSON.stringify(cartArray)
  sessionStorage.setItem('item', cartJSON);
  } else {
    alert("Login to shop!!");
    window.location = 'http://localhost:3000/index.html'
  }
}


