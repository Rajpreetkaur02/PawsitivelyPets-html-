import { getDatabase, set, ref, update, get, child, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


const database = getDatabase();
const auth = getAuth();
const dbRef = ref(getDatabase());

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    const uid = user.uid;
    document.getElementById('userName').innerHTML = localStorage.getItem("uname");
    $('#greeting').show();
    $('#userName').show();
    // ...
  } else {
    // User is signed out
    // ...
    //bla bla bla
  }
});

if(localStorage.getItem("uname") == null) {
  $('#logout').hide();
  $('#sign_in').show();
}

logout.addEventListener('click',(e)=>{

    signOut(auth).then(() => {
      // Sign-out successful.
      alert('User Logged Out!');
      $('#greeting').hide();
      $('#userName').hide();
      $('#logout').hide();
      $('#sign_in').show();
      localStorage.clear();
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
  
         alert(errorMessage);
    });
  
  });