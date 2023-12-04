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

        if (snapshot.exists()) {
            const events = snapshot.val();
            for (const eventId in events) {
                const eventData = events[eventId];
                const eventsContainer = document.getElementById('events-container');
                const eventElement = document.createElement('div');
                eventElement.className = 'event';

                const eventImageDiv = document.createElement('div');
                eventImageDiv.className = 'event-image';
                eventImageDiv.innerHTML += `
                <img src=${eventData.image}></img>
                `;
                
                const eventInfoDiv = document.createElement('div');
                eventInfoDiv.className = 'event-info'

                const titleLink = document.createElement('a');
                titleLink.href = '#'; 
                titleLink.innerHTML = `<h2>${eventData.title}</h2>`;
                eventInfoDiv.append(titleLink);

                eventInfoDiv.innerHTML += `
                <p>Date & Time: ${eventData.date_time}</p>
                <p>Location: ${eventData.location}</p>
                <hr>
            `;

                eventElement.appendChild(eventImageDiv);
                eventElement.appendChild(eventInfoDiv);

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

//take event url from bristol su and add that to the clickable title
//add title that looks like the Figma title 
//explore with the cards 
//align figma and the website for easier changes in the future
//UX course for design 
//read material design article 