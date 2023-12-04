import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

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
const db = getDatabase(app);

async function fetchEvents() {
    const eventsRef = ref(db, 'events/');
    try {
        const snapshot = await get(eventsRef);
        const eventsContainer = document.getElementById('events-container');
        eventsContainer.innerHTML = ''; // Clear existing content

        if (snapshot.exists()) {
            const events = snapshot.val();
            for (const eventId in events) {
                const eventData = events[eventId];
                const eventsContainer = document.getElementById('events-container');
                const eventElement = document.createElement('div');

                const eventImage = document.createElement('a');
                eventImage.innerHTML = `<h2>${eventData.image}</h2>`;
                eventImage.addEventListener('click', () => {
                    console.log(`Title clicked for event ID: ${eventId}`);
                });

                const titleLink = document.createElement('a');
                titleLink.href = '#'; 
                titleLink.innerHTML = `<h2>${eventData.title}</h2>`;
                titleLink.addEventListener('click', () => {
                    console.log(`Title clicked for event ID: ${eventId}`);
                });
    
                eventElement.appendChild(eventImage);
                eventElement.appendChild(titleLink);
                eventElement.innerHTML += `
                <p>Date & Time: ${eventData.date_time}</p>
                <p>Location: ${eventData.location}</p>
                <img src=${eventData.image}>
                <hr>
            `;
            eventsContainer.appendChild(eventElement);
            };

        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error("Error fetching events: ", error);
    }
}

fetchEvents();


// create a test mode (like in python) with a snapshot of an event in the database