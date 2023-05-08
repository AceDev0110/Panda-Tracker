import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyDJCJbCDUe-wDy6KrxbFMpU1pdRxZoit2w',
  authDomain: 'pandatracker-7185d.firebaseapp.com',
  databaseURL: 'https://pandatracker-7185d.firebaseio.com/',
  projectId: 'pandatracker-7185d',
  storageBucket: 'unkown',
  messagingSenderId: '671817699511'
};
let app = Firebase.initializeApp(config);
export const firebaseDB = app.database();