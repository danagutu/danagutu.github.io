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
            const eventsContainer = document.getElementById('events-container');


            for (const eventId in events) {
                const eventData = events[eventId];

                if (eventData.free_stuff.free_alch_drinks === true || eventData.free_stuff.free_food === true || eventData.free_stuff.free_soft_drinks === true) {

                    // Create the event card container
                    const eventCard = document.createElement('div');
                    eventCard.className = 'event-card';


                    // Create the card inner container
                    const cardInner = document.createElement('div');
                    cardInner.className = 'card-inner';


                    // Create the front face of the card (event image and title)
                    const cardFront = document.createElement('div');
                    cardFront.className = 'card-face';
                    cardFront.innerHTML += `
                        <img src=${eventData.image} alt="Event Image">
                        <h2>${eventData.title}</h2>
                    `;


                    // Create the back face of the card (event information)
                    const cardBack = document.createElement('div');
                    cardBack.className = 'card-face card-back';
                    cardBack.innerHTML += `
                        <a class="event-link" href="${eventData.url}" target="_blank">${eventData.title}></a>
                        <p>Date & Time: ${eventData.date_time}</p>
                        <p>Location: ${eventData.location}</p>
                    `;


                    // Append the front and back faces to the card inner container
                    cardInner.appendChild(cardFront);
                    cardInner.appendChild(cardBack);


                    // Append the card inner container to the event card
                    eventCard.appendChild(cardInner);


                    // Append the event card to the events container
                    eventsContainer.appendChild(eventCard);


                /*     // Add event listener to each card for hover effect
                    eventCard.addEventListener('mouseenter', () => {
                        cardInner.style.transform = 'rotateY(180deg)';
                    });


                    eventCard.addEventListener('mouseleave', () => {
                        cardInner.style.transform = 'rotateY(0deg)';
                    });
                } */


                // Add event listener to each card for click effect
                    eventCard.addEventListener('click', () => {
                        cardInner.classList.toggle('flipped');
                    });
                }
            }
           
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
