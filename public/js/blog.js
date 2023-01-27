import { getFirestore, doc, getDoc, collection} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const db = getFirestore();
const blogId = decodeURI(location.pathname.split("/").pop());
const docRef = doc(db,"blogs", blogId);
const docSnap = await getDoc(docRef);

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    data.forEach(item => {
        if(item[0] == '#'){
            let hcount = 0;
            let i = 0;
            while(item[i] == '#'){
                hcount++;
                i++;
            }
            let tag = `h${hcount}`;
            ele.innerHTML += `<${tag}>${item.slice(hcount,item.length)}</${tag}>`
        }
        else if(item[0] == '!' && item[1] == '['){
            let seperator;

            for(let i=0;i<=item.length;i++){
                if(item[i] == "]" && item[i+1] == "(" && item[item.length-1] == ")"){
                    seperator = i;
                }
            }
            
            //this is to extract alt and src of the image
            let alt = item.slice(2,seperator);
            let src = item.slice(seperator+2, item.length-1);
            ele.innerHTML += `
                <img src="${src}" alt="${alt}" class="article-image">
            `;
        }
        else{
            ele.innerHTML += `<p>${item}</p>`
        }
    })
}

const setupBlog = (data) => {
    const banner = document.querySelector(".banner");
    const blogTitle = document.querySelector(".title");
    const titleTag = document.querySelector(".title");
    const publish = document.querySelector(".published");

    banner.style.backgroundImage = `url(${data.bannerImage})`;
    
    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;

    const article = document.querySelector(".article");
    addArticle(article, data.article);
}

if (docSnap.exists()) {
    setupBlog(docSnap.data());
} else {
    location.replace("/");
}

$(document).ready(function(){
    $('.shop').click(function(){
        $('.shopdropdown').toggleClass('dropdown_menu_show');
    });  
});

if (localStorage.getItem("uname") != null) {
    $('#sign_in').hide();
    $('#logout').show();
    $('#greeting').show();
    userName.innerHTML = localStorage.getItem("uname")
    $('#userName').show();
}
