import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const auth = getAuth();

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
      location.reload();
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  
  });