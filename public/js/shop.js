if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

const setOpacityOver1 = () => {
    const womenImage = document.getElementById("womens_img");
    womenImage.style.transform = "scale(1.3)";
  }
  
  const setOpacityOut1 = () =>{
    const womenImage = document.getElementById("womens_img");
    womenImage.style.transform = "scale(1)";
  }
  
  const setOpacityOver2 = () =>{
    const womenImage = document.getElementById("mens_img");
    womenImage.style.transform = "scale(1.3)";
  }
  
  const setOpacityOut2 = () =>{
    const womenImage = document.getElementById("mens_img");
    womenImage.style.transform = "scale(1)";
  }
  
  const setOpacityOver3 = () =>{
    const womenImage = document.getElementById("accessories_img");
    womenImage.style.transform = "scale(1.3)";
  }
  
  const setOpacityOut3 = () =>{
    const womenImage = document.getElementById("accessories_img");
    womenImage.style.transform = "scale(1)";
  }


$(document).ready(function(){
  $(document).on("click",".addtocart",function(){
    my();
  });
  $('.shop').click(function(){
        $('.shopdropdown').toggleClass('dropdown_menu_show');
    });  
  //   $(".addtocart").click(function() {
  //     my();
  // });
});
window.onload = my;
// var count = 0;
function my() {
  var arrayFromStorage = JSON.parse(sessionStorage.getItem('item'));
  var count = arrayFromStorage.length
  document.getElementById('cart_count').innerHTML = `(${count})`; 
}

//add to cart
function ready() {
  var addCart = document.getElementsByClassName('addtocart');
  console.log(addCart)
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }
}
var title;
var price;
var productImg;

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var prodimg = button.parentElement;
  var cartItem = {
    title: shopProducts.getElementsByClassName('product-title')[0].innerText,
    price: shopProducts.getElementsByClassName('price')[0].innerText,
    productImg: prodimg.getElementsByClassName("productimg")[0].src
  }
  var cartItemJSON = JSON.stringify(cartItem);

  var cartArray = new Array();
  if (sessionStorage.getItem('item')) {
    cartArray = JSON.parse(sessionStorage.getItem('item'));
  }
    cartArray.push(cartItemJSON);
  // addProductToCart(title, price, productImg);
  // updateTotal();
  var cartJSON = JSON.stringify(cartArray)
 sessionStorage.setItem('item', cartJSON);
 
}



