// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js';
import { getDatabase, set, get, update, remove, ref, push, onValue, child, query } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js';
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

console.log("test2")

  // Get a reference to the student list on our firebase realtime database
  const reference = ref(db, '/students/' + sID);

  // Push the data from the html form to the reference to the student list (see step below)
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

let findFName = document.getElementById("findFName");
let findLName = document.getElementById("findLName");
let findSID = document.getElementById("findSID");  
let findAge = document.getElementById("findAge");
let findSubject = document.getElementById("findSubject");
let findGender = document.getElementById("findGender");
let findSEmail = document.getElementById("findSEmail");
let findBtn = document.getElementById("findBtn");
let findPupil = document.getElementById("findPupil");
let findcsubject = document.getElementById("findcsubject");
let findcgroup = document.getElementById("findcgroup");
let findcteacher = document.getElementById("findcteacher");
let findcroom = document.getElementById("findcroom");
let findcmodelurl = document.getElementById("findcmodelurl");
let findcid = document.getElementById("findcid");

// if (findBtn != null) {
// findBtn.addEventListener('click', FindPData())





if (findBtn != null) {
  findBtn.addEventListener("click", (e) => {
    console.log("test")
    const dbref = ref(db, '/students/');
  
    // get(child(dbref, "/students/" + findPupil.value))
    // .then((snapshot) => {
    //    if (snapshot.exists()) {
    //     findFName.innerHTML = "First Name: " + snapshot.val().FirstName;
    //     findLName.innerHTML = "Last Name: " + snapshot.val().LastName;
    //     findSID.innerHTML = "Student ID: " + snapshot.val().StudentID;
    //     findAge.innerHTML = "Age: " + snapshot.val().Age;
    //     findGender.innerHTML = "Gender: " + snapshot.val().Gender;
    //     findSEmail.innerHTML = "School Email: " + snapshot.val().SchoolEmail;
    //    }
  
    // })
  
    const studentsRef = query(dbref);
  
    get(studentsRef).then((snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key, child.val().uid);
      });
    }).catch((error) => {
      console.error(error);
    });
   
  })}



// function FindPData() {
//   console.log("test")
const dbref = ref(db, '/students/');

//   // get(child(dbref, "/students/" + findPupil.value))
//   // .then((snapshot) => {
//   //    if (snapshot.exists()) {
//   //     findFName.innerHTML = "First Name: " + snapshot.val().FirstName;
//   //     findLName.innerHTML = "Last Name: " + snapshot.val().LastName;
//   //     findSID.innerHTML = "Student ID: " + snapshot.val().StudentID;
//   //     findAge.innerHTML = "Age: " + snapshot.val().Age;
//   //     findGender.innerHTML = "Gender: " + snapshot.val().Gender;
//   //     findSEmail.innerHTML = "School Email: " + snapshot.val().SchoolEmail;
//   //    }

//   // })



const studentsRef = query(dbref);

get(studentsRef).then((snapshot) => {
 snapshot.forEach((child) => {
 console.log(child.key, child.val().uid);
});
}).catch((error) => {
  console.error(error);
 });

//******************************************Finding teachers */

if (findBtn != null) {
  findBtn.addEventListener('click', (e)=> {
  
  
    const dbref = ref(db);
  
    get(child(dbref, "/teachers/" + findPupil.value))
    .then((snapshot) => {
       if (snapshot.exists()) {
        findFName.innerHTML = "First Name: " + snapshot.val().FirstName;
        findLName.innerHTML = "Last Name: " + snapshot.val().LastName;
        findSID.innerHTML = "Student ID: " + snapshot.val().TeacherID;
        findSubject.innerHTML = "Subject : " + snapshot.val().Subject;
        findGender.innerHTML = "Gender: " + snapshot.val().Gender;
        findSEmail.innerHTML = "School Email: " + snapshot.val().SchoolEmail;
       } 
  
    })
  })}

//******************************************Finding classes */

if (findBtn != null) {
  findBtn.addEventListener('click', (e) => {
  

    console.log("test1")
    const dbref = ref(db);
  
    get(child(dbref, "/classes/" + findPupil.value))
    .then((snapshot) => {
       if (snapshot.exists()) {
        findcgroup.innerHTML = "Group : " + snapshot.val().ClassGroup;
        findcsubject.innerHTML = "Subject : " + snapshot.val().ClassSubject;
        findcteacher.innerHTML = "Teacher : " + snapshot.val().TeacherName;
        findcroom.innerHTML = "Room : " + snapshot.val().Room;
        findcmodelurl.innerHTML = "Model URL : " + snapshot.val().machineLearningModelURL;
        findcid.innerHTML = "Class ID : " + snapshot.val().ClassID;
       } 
  
    })
  })}

//********************************************Updating Students */



const updatePupil = document.getElementById("updatePupil"); 

if (updatePupil != null) {
  updatePupil.addEventListener("click", (e) => {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let sID = document.getElementById("sID").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let sEmail = document.getElementById("sEmail").value;
    //Prevent Default Form Submission Behavior
    console.log(fname)
    e.preventDefault();

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


    


  const removePupil = document.getElementById("removePupil"); 

  if (removePupil != null) {
    removePupil.addEventListener("click", (e) => {


      let sID = document.getElementById("sID").value;
      //Prevent Default Form Submission Behavior

      e.preventDefault();
  
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



