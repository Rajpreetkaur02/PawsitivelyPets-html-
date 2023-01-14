if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

var itemCount = 0;
var productHTML = "";
// if (sessionStorage.getItem('item')) {
    var shoppingCart = JSON.parse(sessionStorage.getItem('item'));
    itemCount = shoppingCart.length;
    console.log(shoppingCart)
    //Iterate javascript shopping cart array
    shoppingCart.forEach(function(item) {
        var cartItem = JSON.parse(item);
        
        var rate = cartItem.price;
        var title = cartItem.title;
        var image = cartItem.productImg;

		productHTML += '<tr class="cartBox"><td class="addedItem">'+
					'<img class="cartItemImg" src=' + image + ' alt="">'+
					'<h2 class="itemName">' + title + '</h2></td>' +
					'<td class="price">' + rate + '</td>' +
					'<td><input type="number" value="1" class="quantity" id="input"></td>'+
						'<td class="totalAmt">' + rate + '</td>'+
						'<td class="delete"><span class="material-symbols-outlined">'+
					'delete'+
				'</span></td></tr>';
	});
    var carthtml = '<tr class="cartHead">' +
    '<th class="headItems">Items</th>' +
    '<th>Price</th>' +
    '<th>Quantity</th>' +
    '<th>Total</th>' +
    '</tr>';
    $('.cartItems').html(carthtml + productHTML);
// }
document.getElementById('cartheading').innerHTML = "Your Cart ("+ itemCount + " Items)";


//Making Fucntion
function ready() {
    //Remove items from cart
    window.onload = subtotal;
    var removeCartButtons = document.getElementsByClassName('delete')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItems)
    }
    var quantityInputs = document.getElementsByClassName('quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
}

const item = document.getElementsByClassName('cartBox');

function removeCartItems(event) {
    
    var buttonClicked = event.target;
    // buttonClicked.parentElement.parentElement.remove();
    // updateTotal();
    const tar = buttonClicked.parentElement.parentElement
    console.log(tar)
    removeItem(tar);
    window.location = 'http://localhost:3000/html/cart.html'
    subtotal();   
}

//quantity changes
function quantityChanged(event) {
    
    var input = event.target;
    const targetId = event.target.parentElement.parentElement
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal(targetId);
    subtotal();
}

// Update total
function updateTotal(targetId) {
    var cartContent = document.getElementsByClassName('cartItems')[0];
    var cartBoxes = document.getElementsByClassName('cartBox');
    var total = 0;
        
        var priceElement = targetId.getElementsByClassName('price')[0];
        console.log(priceElement)
        var quantityElement = targetId.getElementsByClassName('quantity')[0];
        console.log(quantityElement)
        var price = parseFloat(priceElement.innerText.replace("Rs. ", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        console.log(price, quantity)
        targetId.getElementsByClassName("totalAmt")[0].innerText = "Rs. " + total;
    // }
}

function removeItem(e) {
    // const del = shoppingCart.find(ele => e.getElementsByClassName('itemName').value == ele.title);
    // console.log(del)
    const del = e.getElementsByClassName('addedItem')[0].getElementsByClassName('itemName')[0].innerHTML
    console.log(del)
    console.log(shoppingCart[0].title)
    const ite = shoppingCart.filter(function (ele) {
        let cart = JSON.parse(ele);
        console.log(cart.title)
        return cart.title != del
    });
    
    console.log(ite)
    var newArr = JSON.stringify(ite)
    sessionStorage.setItem('item', newArr);
}

function subtotal() {
    var cartContent = document.getElementsByClassName('cartItems')[0];
    var cartBoxes = document.getElementsByClassName('cartBox');
    console.log(cartBoxes)
    var totalsum = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('totalAmt')[0];
        var price = parseFloat(priceElement.innerText.replace("Rs. ", ""));
        totalsum = totalsum + price
        console.log(totalsum)
        document.getElementsByClassName("total-price")[0].innerText = "Rs. " + totalsum;
    }
}

//add to cart
// function addProductToCart(title, price, productImg) {
//     var cartShopBox = document.createElement('tr');
//     cartShopBox.classList.add('cartBox');
//     var cartItems = document.getElementsByClassName('cartItems');
//     var cartItemsNames = document.getElementsByClassName('itemName');
//     for (var i = 0; i < cartItemsNames.length; i++) {
//       if(cartItemsNames[i].innerText == title) {
//         alert("You have already added this item to cart");
//         return;
//       }
//     } 
  

// var cartBoxContent = ``;
// var cartShopBox = document.createElement('tr');
//         var cartShopBox = document.createElement('tr');
//         cartShopBox.classList.add('cartBox');
//         var cartItems = document.getElementsByClassName('cartItems');
//         var cartItemsNames = document.getElementsByClassName('itemName');
//         for (var i = 0; i < cartItemsNames.length; i++) {
//             if(cartItemsNames[i].innerText == title) {
//                 alert("You have already added this item to cart");
//             }
//         }
