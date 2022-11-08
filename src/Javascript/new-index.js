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

// ********************* STEP ONE: Define variables to reference html elements

var mainBody = document.getElementById("main-body");
var linkPupils = document.getElementById("pupils");
var stdNo = 0;
var TNo = 0;



linkPupils.onclick = function(e) { 
  return pupils(e); 
};

// ********************* STEP TWO: Define actions

function pupils(e) {    
  mainBody.innerHTML = "\
  <div>\
    <button id='addPupil'>Add Pupil</button>\
  </div>\
  <table>\
    <thead>\
      <th>Student Number</th>\
      <th>First Name</th>\
      <th>Last Name</th>\
      <th>Student Id</th>\
      <th>Age</th>\
      <th>Gender</th>\
      <th>School Email</th>\
      <th>Operations</th>\
    </thead>\
    <tbody id='tbody'></tbody>\
  </table>";
  var tbody = document.getElementById("tbody");

  var btn = document.getElementById("addPupil");
  console.log('This is btn ')
  console.log(btn)

  GetAllDataOnce();

  // Modal
  // Get the modal
  var modal = document.getElementById("myModal");
  var modalContent = document.getElementById("modalContent");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];


  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
    modalContent.innerHTML = "\
        <div>Add a new Pupil</div>\
        <label for='fname' class='feilds'>First name:</label>\
        <input type='text' id='fname' name='fname'><br><br><br>\
        <label for='lname' class='feilds'>Last Name:</label>\
        <input type='text' id='lname' name='lname'><br><br><br>\
        <label for='sID' class='feilds'>Student ID:</label>\
        <input type='text' id='sID' name='sID'><br><br><br>\
        <label for='age' class='feilds'>Age:</label>\
        <input type='number' id='age' name='age'><br><br><br>\
        <label for='gender' class='feilds'>Gender:</label>\
        <select id='gender' name='gender'>\
          <option value='please select'>Please Select</option>\
          <option value='Male'>Male</option>\
          <option value='Female'>Female</option>\
          <option value='Prefer not to say'>Prefer not to say</option>\
        </select><br><br><br>\
        <label for='sEmail' class='feilds'>Email (School):</label>\
        <input type='email' id='sEmail' name='sEmail'><br><br><br><br><br><br>\
        <input id='sendPupil' type='submit' value='Submit' >\
    ";

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

  modal.style.display = "none";
  GetAllDataOnce();
})
}

  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  // prevent execution of the a href
  return false;
}

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
  td8.innerHTML = "<a href='updatePupil.html?sID=" + sID + "&test=123'>Update</a>  <a href='#' onclick=deletePupil('" + sID + "')>Delete</a>";

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
  var tbody = document.getElementById('tbody')
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
    snapshot.forEach(childSnapshot => {
      console.log("test")
      students.push(childSnapshot.val());

    });
    console.log(students)
    AddAllItemsToTable(students);
  })
}




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


  //************************************Delete Pupil */
deletePupil('S-2');

  // Add an event listenter that will work when the remove pupil button is pressed

    function deletePupil(sID) {
  
      // Remove the data from the specified branch
      remove(ref(db, "/students/"+ sID))
  
        .then (()=>{
          alert("data removed succesfully")
        })
  
        .catch((error)=>{
          alert("error"+error)
        })

        GetAllDataOnce();
    }


      







// if Add pupil link clicked add this to main div
      // <div><a href='#'>Add new Pupil</a></div>
      // <table>

      //   <thead>
      //   <th>Student Number</th>
      //   <th>First Name</th>
      //   <th>Last Name</th>
      //   <th>Student Id</th>
      //   <th>Age</th>
      //   <th>Gender</th>
      //   <th>School Email</th>
      //   <th>Operations</th>
      //   </thead>

      //   <tbody id="tbody">
          

      //   </tbody>
      // </table>