# Classroom attendance tracker

A school attendance web app I started in 2022. Teachers can add, update and delete pupils, teachers and classes, which are stored in a Firebase Realtime Database. I also started on taking attendance from a webcam using an image classification model trained in Google's Teachable Machine. That part was never finished, and the project is incomplete.

It is plain HTML, CSS and JavaScript using the Firebase JavaScript SDK (version 9, loaded from Google's CDN), with Firebase Hosting config.

## How it works

There are two versions of the front end in the repo.

The first is a set of separate pages in `src/HTML/` that all load `src/Javascript/index.js`. The forms write records with `set`, `update` and `remove` to three paths in the database:

| Path | Fields |
|---|---|
| `students/<student ID>` | first name, last name, student ID, age, gender, school email |
| `teachers/<teacher ID>` | first name, last name, teacher ID, subject, gender, school email |
| `classes/<class ID>` | class group, subject, teacher name, room, machine learning model URL, class ID |

`databaseP.html` reads every pupil once and shows them in a table with update and delete links. `updatePupil.html` takes the student ID from the query string and fills the form from the database.

The second is a single page dashboard (`src/index.html` with `src/Javascript/new-index.js`), which I started in November 2022 as a refactor. The sidebar links replace the contents of the main panel instead of loading new pages. It has the pupil table, an add pupil pop-up and a delete action, plus an attendance panel. It does not yet cover teachers, classes or updates, so it only partly replaces `index.js`.

For attendance, `take-attendance.html` loads TensorFlow.js 1.3.1 and the `@teachablemachine/image` library. It downloads a Teachable Machine image model from a hard-coded URL, reads frames from the webcam at 200 by 200 pixels, and shows the model's probability for each class under the video. The model has three classes, labelled `S-1`, `S-2` and `S-3`. It classifies the whole frame. There is no separate face detection step, and nothing is written back to the database, so no attendance is actually recorded.

The login page checks the username and password against a fixed pair in `src/Javascript/ui.js`. It does not use Firebase Authentication.

## Repository layout

| Path | What it is |
|---|---|
| `src/HTML/` | Multi-page version: login, dashboard, add/update/delete forms for pupils, teachers and classes, database tables, attendance |
| `src/index.html` | Single page dashboard (later refactor) |
| `src/Javascript/index.js` | Firebase reads and writes used by the multi-page version |
| `src/Javascript/new-index.js` | Code for the single page dashboard |
| `src/Javascript/ui.js` | Login form check |
| `src/CSS/styles.css` | Styles |
| `src/Images/` | Sidebar icons and school logo |
| `firebase.json`, `.firebaserc` | Firebase Hosting config, serving the `src` folder |

## Running it

The pages use ES modules, so they need to be served over HTTP rather than opened as files:

```
python3 -m http.server --directory src 8000
```

Then open `http://localhost:8000/HTML/login.html`. With the Firebase CLI installed, `firebase serve --only hosting` serves the same folder. The Firebase config in the JavaScript points at my own Firebase project, so to use your own database you would replace `firebaseConfig` in both `index.js` and `new-index.js`.

## Limitations

- Attendance is not recorded. `predict()` in `take-attendance.html` calls `findStudent(className)`, but `className` is never defined and `findStudent` lives inside the `index.js` module, so it throws on the first frame.
- In `new-index.js`, the attendance button handler is attached when the page loads, before the button exists, and the model is loaded without `await`. The delete link calls `deletePupil` from an inline `onclick`, which cannot see functions inside a module.
- `src/index.html` links to `../javascript/`, `../css/` and `../images/` in lower case, but the folders are `Javascript`, `CSS` and `Images`, so it breaks on a case-sensitive server such as Firebase Hosting.
- The login is a client-side placeholder, and there are no database security rules in the repo.
- The dashboard, past attendance and settings pages are empty.
