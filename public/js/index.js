$(document).ready(function(){
    $('.shop').click(function(){
          $('.shopdropdown').toggleClass('dropdown_menu_show');
      });  

    $('#sign_in').click(function(){
      $('.sign-in').addClass('sign_in_focus');
      $('.home').addClass('opacity');
      $('.navbar').addClass('opacity');
      $('body').css('overflow', "hidden");
      $('.sign-up').css('overflow-y', "visible");
    });  

    $('#cross1').click(function(){
      $('.sign-in').removeClass('sign_in_focus');
      $('.home').removeClass('opacity');
      $('.navbar').removeClass('opacity');
      $('body').css('overflow', "visible");
    });

    $('#signbtn').click(function(){
      $('.sign-up').removeClass('sign_up_focus');
      $('.sign-in').addClass('sign_in_focus');
    });

    $('#signupbtn').click(function(){
      $('.sign-up').addClass('sign_up_focus');
      $('.sign-in').removeClass('sign_in_focus');
    });

    $('#cross').click(function(){
      $('.sign-up').removeClass('sign_up_focus');
      $('.home').removeClass('opacity');
      $('.navbar').removeClass('opacity');
      $('body').css('overflow', "visible");
    });
});

var currentSlide = 0;
var slides = document.querySelectorAll('.slide');

setInterval(function() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.left = (i - currentSlide) * 500 + 'px';
  }
  currentSlide = (currentSlide + 1) % slides.length;
}, 2000);


// firebase

if(typeof(localStorage.getItem("uname")) == 'undefined') {
  $('#logout').hide();
  $('#sign_in').show();
}

import { getDatabase, set, ref, update, get, child, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


const database = getDatabase();
const auth = getAuth();
const dbRef = ref(getDatabase());

var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
var name = document.getElementById('name').value;

function Validation() {
    if (email.length == 0) {
        alert("Enter Email!");
    }
    if (name.length == 0) {
        alert("Enter Name!");
    }
    if (password.length < 6) {
        alert("Password must contain 6 letters!");
    }
}

register.addEventListener('click',(e) => {
    // Validation();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('name').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    set(ref(database, 'users/' + user.uid),{
      name: name,
      email: email,
      password: password
    })

    alert('User registered successfully!');
      // ...
    $('.sign-up').removeClass('sign_up_focus');
    $('.sign-in').addClass('sign_in_focus');  
  })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });    

});

sign.addEventListener('click',(e)=>{
  var email = document.getElementById('login-email').value;
  var password = document.getElementById('login-password').value;

     signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       // Signed in 
       const user = userCredential.user;
      
       const dt = new Date();
        update(ref(database, 'users/' + user.uid),{
         last_login: dt,
       })

      //  get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
      //   if (snapshot.exists()) {
      //     snapshot.val().name;
      //   } else {
      //     console.log("No data available");
      //   }
      // })
      const starCountRef = ref(database, 'users/' + user.uid + '/name');
      onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          document.getElementById('userName').innerHTML = data;
          localStorage.setItem("uname", data);
        // updateStarCount(postElement, data);
          console.log(data);
      });
        alert('User logged in!');
       // ...
       $('.sign-in').removeClass('sign_in_focus');
      $('.home').removeClass('opacity');
      $('.navbar').removeClass('opacity');
      $('body').css('overflow', "visible");
      $('#userName').show();
      $('#greeting').show();
      $('#sign_in').hide();
      $('#logout').show();
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;

       alert(errorMessage);
 });

});

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
    //bla bla bla
  }
});

logout.addEventListener('click',(e)=>{

  signOut(auth).then(() => {
    // Sign-out successful.
    alert('User Logged Out!');
    $('#greeting').hide();
    $('#userName').hide();
    $('#logout').hide();
    $('#sign_in').show();
    localStorage.clear();
    sessionStorage.clear();
  }).catch((error) => {
    // An error happened.
    const errorCode = error.code;
    const errorMessage = error.message;

       alert(errorMessage);
  });

});

