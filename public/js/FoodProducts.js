import { getFirestore, collection, getDocs, doc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const db = getFirestore();

const blogSection = document.querySelector('.shop-content');

// var htm = ``;
const createBlog = (blog) => {
    // let data = blog.data();
    // htm += `
    //         <div class="product-card">
    //         <img src="${data.ItemImage}" alt="food1" class="product-img">
    //         <h2 class="product-title">${data.name}</h2>
    //         <span class="price">Rs. ${data.price}</span>
    //         <p>${data.description}</p>
    //         <div class="stars">
    //             <span class="material-symbols-outlined">grade</span>
    //             <span class="material-symbols-outlined">grade</span>
    //             <span class="material-symbols-outlined">grade</span>
    //             <span class="material-symbols-outlined">grade</span>
    //             <span class="material-symbols-outlined">grade</span>
    //         </div>
    //         <button class="addtocart">Add to cart</button> 
    //     </div>
    // `;
    // $(blogSection).html(htm);
    // blogSection.innerHTML = htm;
}

var htm = ``;
const querySnapshot = await getDocs(collection(db,"food"));
querySnapshot.forEach((blog) => {
    if(blog.id != decodeURI(location.pathname.split("/").pop())){
        // createBlog(blog);
        let data = blog.data();
         htm += `
            <div class="product-card">
            <img src="${data.ItemImage}" alt="food1" class="product-img">
            <h2 class="product-title">${data.name}</h2>
            <span class="price">Rs. ${data.price}</span>
            <p>${data.description}</p>
            <div class="stars">
                <span class="material-symbols-outlined">grade</span>
                <span class="material-symbols-outlined">grade</span>
                <span class="material-symbols-outlined">grade</span>
                <span class="material-symbols-outlined">grade</span>
                <span class="material-symbols-outlined">grade</span>
            </div>
            <button class="addtocart">Add to cart</button> 
        </div>
    `;
    }
});
$(blogSection).html(htm)



$(document).ready(function(){
    $('.shop').click(function(){
          $('.shopdropdown').toggleClass('dropdown_menu_show');
      });  
  });