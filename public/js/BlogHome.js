import { getFirestore, collection, getDocs, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const db = getFirestore();

const blogSection = document.querySelector('.blogs-section');



const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
        <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-img" alt="blog1"/>
        <h1 class="blog-title">${data.title.substring(0,100)+ '...'}</h1>
        <p class="blog-overview">${data.article.substring(0,200)+ '...'}</p>
        <a href="/${blog.id}" class="blog-btn"><button>Read</button></a>
        </div>
    `;
}
const querySnapshot = await getDocs(collection(db,"blogs"));
querySnapshot.forEach((blog) => {
    if(blog.id != decodeURI(location.pathname.split("/").pop())){
        createBlog(blog);
    }
})

$(document).ready(function(){
    $('.shop').click(function(){
          $('.shopdropdown').toggleClass('dropdown_menu_show');
      });  
});