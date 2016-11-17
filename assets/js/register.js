// Initialize Firebase
var config = {
	apiKey: "AIzaSyBsuVxINUL-UnlxBQ-vTRRZbn-fO-VY0ko",
	authDomain: "campsite-b596f.firebaseapp.com",
	databaseURL: "https://campsite-b596f.firebaseio.com",
	storageBucket: "campsite-b596f.appspot.com",
	messagingSenderId: "855786603725"
};
firebase.initializeApp(config);

// Get element
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var btnLogin = document.getElementById('btnLogin');
var btnSignUp = document.getElementById('btnSignUp');
var btnLogOut = document.getElementById('btnLogOut');
var btnGoogle = document.getElementById('btnGoogle');
  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');

var database = firebase.database();

// Google Sign in

btnGoogle.addEventListener('click', function () {

	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/plus.login');

	firebase.auth().signInWithPopup(provider).then(function (result) {
		
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
	}).catch(function (error) {
		
		console.log(error)
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
	})
});

// Add login event
btnLogin.addEventListener('click', e => {
	var email = txtEmail.value;
	var pass = txtPassword.value;
	var auth = firebase.auth();
	
	var userInfo = {
		email: email,
		pass: pass,
		
	}
	database.ref().push(userInfo);
	// Sign in
	var promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));

});

// Add signup event
btnSignUp.addEventListener('click', e => {
	var email = txtEmail.value;
	var pass = txtPassword.value;
	var auth = firebase.auth();
	
	var userInfo = {
		email: email,
		pass: pass,
		
	}
	database.ref().push(userInfo);
	// Create User
	var promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));
});

// Store User into Database
database.ref().on("child_added", function (childSnapshot) {
	
	var email = childSnapshot.val().email;
	var pass = childSnapshot.val().pass;
});


// Logout
btnLogOut.addEventListener('click', e => {
	firebase.auth().signOut();
});


// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		console.log(firebaseUser);
		var profilePicUrl = firebaseUser.photoURL;   // TODO(DEVELOPER): Get profile pic.
    var userName = firebaseUser.displayName;        // TODO(DEVELOPER): Get user's name.

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
		
		btnLogOut.classList.remove('hide');
		//		window.close();
	} else {
		console.log('not logged in');
		btnLogOut.classList.add('hide');
	}
});
