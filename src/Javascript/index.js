// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js';
import { getDatabase, set, get, update, remove, ref, push, onValue, child, query, limitToFirst, limitToLast, orderByChild, startAt, startAfter, endAt, endBefore, equalTo } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js';
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

// ********************* STEP ONE: Process the html form 📋

// Get reference to the submit button which id = "sendPupil"
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

  // Call to the function writeStudentData, passing the six parameters
  writeStudentData(fname, lname, sID, age, gender, sEmail);

})}


//********************* STEP TWO: Create the function that will write the data on the firebase realtime database ***


// Write the student data that comes from the html form
// We are using six parameters: first name, last name, student ID, age, gender and student email.
function writeStudentData(fname, lname, sID, age, gender, sEmail) {


  // Get a reference to the student list on our firebase realtime database
  const reference = ref(db, '/students/' + sID);

  // Push the data from the html form to the reference to the student list
  set(reference, {
      FirstName: fname,
      LastName: lname,
      StudentID: sID,
      Age: age,
      Gender: gender,
      SchoolEmail: sEmail,
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
  const reference1 = ref(db, '/teachers/' + sIDT);

  // Push the data from the html form to the reference to the student list (see step below)
  set(reference1, {
      FirstName: fnameT,
      LastName: lnameT,
      TeacherID: sIDT,
      Subject: subjectT,
      Gender: genderT,
      SchoolEmail: sEmailT,
  });
}

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
  let cgroup = document.getElementById("cgroup").value;
  let csubject = document.getElementById("csubject").value;
  let teacher = document.getElementById("teacher").value;
  let room = document.getElementById("room").value;
  let modelURL = document.getElementById("modelURL").value;
  let cID = document.getElementById("classID").value;

  // Print the name in the console, for testing purposes
  console.log(classID);

  // Call to the function writeStudentData, passing two parameters: first and last name
  writeClassData(cgroup, csubject, teacher, room, modelURL, cID);

})}

// Write the student data that comes from the html form
// We are using two parameters: first name and last name
function writeClassData(cgroup, csubject, teacher, room, modelURL, cID) {


  // Get a reference to the student list on our firebase realtime database
  
const reference2 = ref(db, '/classes/' + cID);
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
  set(reference2, {
      ClassGroup: cgroup,
      ClassSubject: csubject,
      TeacherName: teacher,
      Room: room,
      machineLearningModelURL: modelURL,
      ClassID: cID,
  });}

//******************************************Finding student */

// function SelectAllData(){
//   ref(db, "/students").once("value",
//   function(AllRecords){
//     AllRecords.forEach(
//       function(CurrentRecord){

//         let fname = document.getElementById("fname").value;
//         let lname = document.getElementById("lname").value;
//         let sID = document.getElementById("sID").value;
//         let age = document.getElementById("age").value;
//         let gender = document.getElementById("gender").value;
//         let sEmail = document.getElementById("sEmail").value;
//         AddItemsToTable(fname, lname, sID, age, gender, sEmail);
//       }
//     )
//   })
// }

// window.onload = SelectAllData;

var stdNo = 0;
var TNo = 0;

function AddItemsToTable(fname, lname, sID, age, gender, sEmail){

  var tbody = document.getElementById("tbody")
  var trow = document.createElement("tr")
  var td1 = document.createElement("td")
  var td2 = document.createElement("td")
  var td3 = document.createElement("td")
  var td4 = document.createElement("td")
  var td5 = document.createElement("td")
  var td6 = document.createElement("td")
  var td7 = document.createElement("td")
  var td8 = document.createElement("td")

  td1.innerHTML= ++stdNo;
  td2.innerHTML= fname;
  td3.innerHTML= lname;
  td4.innerHTML= sID;
  td5.innerHTML= age;
  td6.innerHTML= gender;
  td7.innerHTML= sEmail;
  td8.innerHTML = "<a href='updatePupil.html?sID=" + sID + "&test=123'>Update</a>  <a href='deletePupil.html?sID=" + sID + "&test=123'>Delete</a>";

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3); 
  trow.appendChild(td4); 
  trow.appendChild(td5);
  trow.appendChild(td6);
  trow.appendChild(td7);
  trow.appendChild(td8);

  tbody.appendChild(trow);
}

function AddAllItemsToTable(students){
  stdNo=0;
  tbody.innerHTML="";
  students.forEach(element => {
    AddItemsToTable(element.FirstName, element.LastName, element.StudentID, element.Age, element.Gender, element.SchoolEmail);
  });
}

function GetAllDataOnce(){
  const dbref = ref(db);
  get(child(dbref, "students"))
  .then((snapshot)=>{
    var students = [];
    console.log(snapshot);
    snapshot.forEach(childSnapshot => {
      console.log("test")
      students.push(childSnapshot.val());

    });
    console.log(students)
    AddAllItemsToTable(students);
  })
}

window.onload = GetAllDataOnce;




//********************************************Updating Students */


// Get a refrence to the update pupil button with the id="updatePupil"
const updatePupil = document.getElementById("updatePupil"); 

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
console.log(urlParams)

const sID = urlParams.get('sID')
console.log(sID);


findStudent(sID)


// Add an event listener that will work when the updatePupil button is clicked
if (updatePupil != null) {

  updatePupil.addEventListener("click", (e) => {

    // Get a refrence for all the forms feilds
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let sID = document.getElementById("sID").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let sEmail = document.getElementById("sEmail").value;

    // Prevent Default Form Submission Behavior
    e.preventDefault();

    // Update the data from the HTML form to the students list
    update(ref(db, "/students/"+ sID),{
      FirstName: fname,
      LastName: lname,
      Age: age,
      Gender: gender,
      SchoolEmail: sEmail,
  })

  .then (()=>{
    alert("data updated succesfully")
  })

  .catch((error)=>{
    alert("error"+error)
  })
    
  })}


  //********************************************Updating Teacher */



const updateTeacher = document.getElementById("updateTeacher"); 

if (updateTeacher != null) {
updateTeacher.addEventListener("click", (e) => {
  let fnameT = document.getElementById("fnameT").value;
  let lnameT = document.getElementById("lnameT").value;
  let sIDT = document.getElementById("sIDT").value;
  let subjectT = document.getElementById("subjectT").value;
  let genderT = document.getElementById("genderT").value;
  let sEmailT = document.getElementById("sEmailT").value;

  //Prevent Default Form Submission Behavior
  e.preventDefault();

  update(ref(db, "/teachers/"+ sIDT),{
    FirstName: fnameT,
    LastName: lnameT,
    Subject: subjectT,
    Gender: genderT,
    SchoolEmail: sEmailT,
})

.then (()=>{
  alert("data updated succesfully")
})

.catch((error)=>{
  alert("error"+error)
})

})}

 //********************************************Updating classes */



const updateClass = document.getElementById("updateClass"); 

if (updateClass != null) {
updateClass.addEventListener("click", (e) => {
  let cgroup = document.getElementById("cgroup").value;
  let csubject = document.getElementById("csubject").value;
  let teacher = document.getElementById("teacher").value;
  let room = document.getElementById("room").value;
  let modelURL = document.getElementById("modelURL").value;
  let cID = document.getElementById("classID").value;
  
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  update(ref(db, "/classes/"+ cID),{
    ClassGroup: cgroup,
    ClassSubject: csubject,
    TeacherName: teacher,
    Room: room,
    machineLearningModelURL: modelURL,
})

.then (()=>{
  alert("data updated succesfully")
})

.catch((error)=>{
  alert("error"+error)
})
  
})}






  //************************************Delete Pupil */


    

// Get a refrence to the remove pupil button with the ID="removePupil"
  const removePupil = document.getElementById("removePupil"); 

  // Add an event listenter that will work when the remove pupil button is pressed
  if (removePupil != null) {
    removePupil.addEventListener("click", (e) => {

// Get a refrence to the student ID feild
      let sID = document.getElementById("sID").value;

      //Prevent Default Form Submission Behavior
      e.preventDefault();
  
      // Remove the data from the specified branch
      remove(ref(db, "/students/"+ sID))
  
    .then (()=>{
      alert("data removed succesfully")
    })
  
    .catch((error)=>{
      alert("error"+error)
    })
      
    })}

    //************************************Delete Teacher */


    


  const removeTeacher = document.getElementById("removeTeacher"); 

  if (removeTeacher != null) {
    removeTeacher.addEventListener("click", (e) => {


      let sIDT = document.getElementById("sIDT").value;
      //Prevent Default Form Submission Behavior

      e.preventDefault();
  
      remove(ref(db, "/teachers/"+ sIDT))
  
    .then (()=>{
      alert("data removed succesfully")
    })
  
    .catch((error)=>{
      alert("error"+error)
    })
      
    })}

    //************************************Delete Class */


    


  const removeClass = document.getElementById("removeClass"); 

  if (removeClass != null) {
    removeClass.addEventListener("click", (e) => {


      let cID = document.getElementById("classID").value;
      //Prevent Default Form Submission Behavior

      e.preventDefault();
  
      remove(ref(db, "/classes/"+ cID))
  
    .then (()=>{
      alert("data removed succesfully")
    })
  
    .catch((error)=>{
      alert("error"+error)
    })
      
    })}



function findStudent(sID){
  const updateP = ref(db, '/students/' + sID);

onValue(updateP, (snapshot) => {
  const studentData = snapshot.val();
 console.log(studentData.Age)
 let studentFName = studentData.FirstName
 let studentSName = studentData.LastName
 let studentAge = studentData.Age
 let studentGender = studentData.Gender
 let studentID = studentData.StudentID 
 let studentsEmail = studentData.SchoolEmail
document.getElementById("fname").value = studentFName
document.getElementById("lname").value = studentSName
document.getElementById("age").value = studentAge
document.getElementById("gender").value = studentGender
document.getElementById("sID").value = studentID
document.getElementById("sEmail").value = studentsEmail

});
}