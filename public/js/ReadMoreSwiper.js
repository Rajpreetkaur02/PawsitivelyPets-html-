// for swiper js
import { getFirestore, collection, getDocs, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const db = getFirestore();
const blogSection = document.querySelector('.blogs-section');
const colRef = collection(db, 'blogs');

// getDocs(colRef)
// .then((snapshot) => {
//     let arr = []
//     snapshot.docs.forEach((doc) => {
//         arr.push(doc.data())
//     })
//     console.log(arr)
// })
// data.forEach(function(i)  {
//     console.log(i.title);
// })
const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML = `
    <div class="swiper mySwiper container">
            <div class="swiper-wrapper content">
            <div class="swiper-slide blog-card">
                <img src="${data.bannerImage}" class="blog-img" alt="blog1"/>
                <h1 class="blog-title">${data.title.substring(0,100)+ '...'}</h1>
                <p class="blog-overview">${data.article.substring(0,200)+ '...'}</p>
                <a href="/${blog.id}" class="blog-btn"><button>Read</button></a>
            </div>
            <div class="swiper-slide blog-card">
                <img src="${data.bannerImage}" class="blog-img" alt="blog1"/>
                <h1 class="blog-title">${data.title.substring(0,100)+ '...'}</h1>
                <p class="blog-overview">${data.article.substring(0,200)+ '...'}</p>
                <a href="/${blog.id}" class="blog-btn"><button>Read</button></a>
            </div>
            <div class="swiper-slide blog-card">
                <img src="${data.bannerImage}" class="blog-img" alt="blog1"/>
                <h1 class="blog-title">${data.title.substring(0,100)+ '...'}</h1>
                <p class="blog-overview">${data.article.substring(0,200)+ '...'}</p>
                <a href="/${blog.id}" class="blog-btn"><button>Read</button></a>
            </div>
            <div class="swiper-slide blog-card">
                <img src="${data.bannerImage}" class="blog-img" alt="blog1"/>
                <h1 class="blog-title">${data.title.substring(0,100)+ '...'}</h1>
                <p class="blog-overview">${data.article.substring(0,200)+ '...'}</p>
                <a href="/${blog.id}" class="blog-btn"><button>Read</button></a>
            </div>
        </div>
    </div>
    `;
}
const querySnapshot = await getDocs(collection(db,"blogs"));
querySnapshot.forEach((blog) => {
    if(blog.id != decodeURI(location.pathname.split("/").pop())){
        createBlog(blog)
    }
})

