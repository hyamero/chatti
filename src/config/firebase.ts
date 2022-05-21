import { initializeApp } from "firebase/app";

export const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_APP_ID!,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID!,
  });


// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCmDdDlKISaw6e_gd4tgcw5S5Jp-mghXfI",
//   authDomain: "chatti-dd943.firebaseapp.com",
//   projectId: "chatti-dd943",
//   storageBucket: "chatti-dd943.appspot.com",
//   messagingSenderId: "924210502515",
//   appId: "1:924210502515:web:0050469b18afe0eb514306",
//   measurementId: "G-26K9SHRS6J"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// console.log(app)