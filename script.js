import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const firebaseConfig = {
    // your config
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