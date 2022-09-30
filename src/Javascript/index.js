// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js';
// Initialize the FirebaseUI Widget using Firebase.
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

// Get the database from our firebase app
const db = getDatabase(app);

// ********************* STEP ONE: Process the html form 

// Get reference to the submit button which id = "send"
let submitButton = document.getElementById("sendPupil");

// Add an event listener, which will work when the submit button is clicked
if (submitButton != null) {
submitButton.addEventListener("click", (e) => {
  
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  // Get the value of the name field in the form
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let sID = document.getElementById("sID").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let sEmail = document.getElementById("sEmail").value;
  
  // Print the name in the console, for testing purposes
  console.log(fname);

  // Call to the function writeStudentData, passing two parameters: first and last name
  writeStudentData(fname, lname, sID, age, gender, sEmail);

})}


//********************* STEP TWO: Create the function that will write the data on the firebase realtime database ***


// Write the student data that comes from the html form
// We are using two parameters: first name and last name
function writeStudentData(fname, lname, sID, age, gender, sEmail) {



  // Get a reference to the student list on our firebase realtime database
  const reference = ref(db, '/students');

  // Push the data from the html form to the reference to the student list (see step below)
  push(reference, {
      firstName: fname,
      lastName: lname,
      studentID: sID,
      age: age,
      gender: gender,
      schoolEmail: sEmail,
  });

}

//************************************ */ Adding Teacher


// Get reference to the submit button which id = "send"
let submitButton1 = document.getElementById("sendTeacher");

// Add an event listener, which will work when the submit button is clicked
if (submitButton1 != null) {
submitButton1.addEventListener("click", (e) => {
  
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  // Get the value of the name field in the form
  let fnameT = document.getElementById("fnameT").value;
  let lnameT = document.getElementById("lnameT").value;
  let sIDT = document.getElementById("sIDT").value;
  let subjectT = document.getElementById("subjectT").value;
  let genderT = document.getElementById("genderT").value;
  let sEmailT = document.getElementById("sEmailT").value;
  
  // Print the name in the console, for testing purposes
  console.log(fnameT);

  // Call to the function writeStudentData, passing two parameters: first and last name
  writeTeacherData(fnameT, lnameT, sIDT, subjectT, genderT, sEmailT);

})}

// Write the student data that comes from the html form
// We are using two parameters: first name and last name
function writeTeacherData(fnameT, lnameT, sIDT, subjectT, genderT, sEmailT) {


  // Get a reference to the student list on our firebase realtime database
  const reference1 = ref(db, '/teachers');

  // Push the data from the html form to the reference to the student list (see step below)
  push(reference1, {
      firstName: fnameT,
      lastName: lnameT,
      studentID: sIDT,
      subject: subjectT,
      gender: genderT,
      schoolEmail: sEmailT,
  });}

//************************************ */ Adding Class


// Get reference to the submit button which id = "send"
let submitButton2 = document.getElementById("sendClass");

// Add an event listener, which will work when the submit button is clicked
if (submitButton2 != null) {
submitButton2.addEventListener("click", (e) => {
  
  //Prevent Default Form Submission Behavior
  e.preventDefault();
  console.log("Test");
  // Get the value of the name field in the form
  let cname = document.getElementById("cname").value;
  let teacher = document.getElementById("teacher").value;
  let modelURL = document.getElementById("modelURL").value;
  
  // Print the name in the console, for testing purposes
  console.log(cname);

  // Call to the function writeStudentData, passing two parameters: first and last name
  writeClassData(cname, teacher, modelURL);

})}

// Write the student data that comes from the html form
// We are using two parameters: first name and last name
function writeClassData(cname, teacher, modelURL) {


  // Get a reference to the student list on our firebase realtime database
  const reference2 = ref(db, '/classes');
  onValue(reference2, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      console.log(childKey);
  console.log(childData);
    });
  }, {
    onlyOnce: true
  });


  // Push the data from the html form to the reference to the student list (see step below)
  push(reference2, {
      ClassName: cname,
      TeacherName: teacher,
      machineLearningModelURL: modelURL,
  });}






