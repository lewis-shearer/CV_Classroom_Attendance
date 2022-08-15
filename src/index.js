// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtlYMju2Du8NDX2h0JVjKrLTg3FzRPv08",
  authDomain: "beta-project-d59ae.firebaseapp.com",
  databaseURL: "https://beta-project-d59ae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "beta-project-d59ae",
  storageBucket: "beta-project-d59ae.appspot.com",
  messagingSenderId: "718213421744",
  appId: "1:718213421744:web:42ba0a3951cf4ca2e7f975"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ********************* STEP ONE: Process the html form 

// Get reference to the submit button which id = "send"
let submitButton = document.getElementById("send");

// Add an event listener, which will work when the submit button is clicked
submitButton.addEventListener("click", (e) => {
  
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  // Get the value of the name field in the form
  let fname = document.getElementById("fname").value;
  
  // Print the name in the console, for testing purposes
  console.log(fname);

  // Call to the function writeStudentData, passing two parameters: name and the value for the profile picture (which is not being used at th emoment)
  writeStudentData(fname,'image_url');

})


//********************* STEP TWO: Create the function that will write the data on the firebase realtime database ***


// Write the student data that comes from the html form
// We are using two parameters: name and the profile picture (which is not being used at the moment)
function writeStudentData(fname, imageUrl) {

  // Get the database from our firebase app
  const db = getDatabase(app);

  // Get a reference to the student list on our firebase realtime database
  const reference = ref(db, '/students');

  // Push the data from the html form to the reference to the student list (see step below)
  push(reference, {
      name: fname,
      profile_picture: imageUrl
  });

}

