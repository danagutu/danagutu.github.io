import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    authDomain: "oit-mentorship-programme.firebaseapp.com",
    databaseURL: "https://oit-mentorship-programme-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "oit-mentorship-programme",
    storageBucket: "oit-mentorship-programme.appspot.com",
    messagingSenderId: "688625353223",
    appId: "1:688625353223:web:3d1c805941f96b8bc120a2",
    measurementId: "G-X8WDFZV0M2"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchEvents() {
    try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsContainer = document.getElementById('events-container');
        eventsContainer.innerHTML = ''; // Clear existing content
        querySnapshot.forEach((doc) => {
            const eventData = doc.data();
            const eventElement = document.createElement('div');
            eventElement.textContent = `Event: ${eventData.name}, Date: ${eventData.date}`;
            eventsContainer.appendChild(eventElement);
        });
    } catch (error) {
        console.error("Error fetching events: ", error);
    }
}

fetchEvents();