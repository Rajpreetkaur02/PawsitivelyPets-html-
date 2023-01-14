// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// const app = initializeApp(firebaseConfig);
const db = getFirestore();
// const colRef = collection(db, 'blogs');

// var blogTitleField = document.querySelector('.title');
// var articleField = document.querySelector('.article');

//banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', ()=> {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', ()=> {
    uploadImage(uploadInput, "image");
})

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload',{
            method: 'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            }else{
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url(${bannerPath})`;
            } 
        })
    }else{
        alert("upload image only!");
    }
}

var articleField = document.querySelector('.article');

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let texttoInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + texttoInsert + articleField.value.slice(curPos);
}

let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

publishBtn.addEventListener('click', async () => {
    var blogTitleField = document.querySelector('.title');
    var articleField = document.querySelector('.article');

    if(articleField.value.length && blogTitleField.value.length){
    // if(blogTitleField.length){
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogtitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for(let i=0;i<4;i++){
            id += letters[Math.floor(Math.random()*letters.length)];
        }

        //setting up docName
        //we need docName for database
        let docName = `${blogtitle}-${id}`;
        let date = new Date(); //we need to store publish time

        //access database here
        
        var blogTitleField = document.querySelector('.title');
        var articleField = document.querySelector('.article');
        setDoc(doc(db, "blogs", docName), {
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })

        
        //banner
        // var bannerImage = document.querySelector('#banner-upload');
        // var banner = document.querySelector(".banner");
        // addDoc(doc(db, "blogs"), {
        //     title: blogTitleField.value,
        //     article: articleField.value,
        //     bannerImage: bannerPath,
        //     publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        //   })
        .then(() => {
            console.log('data entered');
            location.href = `/${docName}`;
        })
        .catch((err) => {
            console.error(err);
        })
    } 
});