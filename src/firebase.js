import * as fireBase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBobiCuiEoXqR5nrfRTDgwWM1pqbl6YOMQ",
  authDomain: "react-js-basics.firebaseapp.com",
  databaseURL: "https://react-js-basics.firebaseio.com",
  projectId: "react-js-basics",
  storageBucket: "react-js-basics.appspot.com",
  messagingSenderId: "244043444812",
  appId: "1:244043444812:web:4b7ea67eb747f4cdd3fae9"

};

fireBase.initializeApp(firebaseConfig);
export default fireBase;