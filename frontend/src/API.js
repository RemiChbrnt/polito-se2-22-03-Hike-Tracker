// import { post } from "../../backend";

/**
 * All the API calls
 */
const URL = 'http://localhost:3001/api';


/* user/logIn/logOut/signUp API */

async function login(email, password) {
    const response = await fetch(URL + '/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
            password: password

        })
    });
    const user = await response.json();
    console.log("user " + JSON.stringify(user));
    if (response.ok) {
        return user;
    } else {
        throw user;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}



async function signup(body) {
    const response = await fetch(URL + '/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body)
    });
    const user = await response.json();
    if (response.ok) {
        return user;
    } else {
        throw user;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}


/* hikes API */

async function getAllHikes() {
    // call: GET /api/hikes
    const response = await fetch(URL + '/hikes', { credentials: 'include' });
    const hikesJson = await response.json();
    if (response.ok) {
        return hikesJson.map((r) => ({
            id: r.id,
            title: r.title,
            length: r.length,
            expTime: r.expTime,
            ascent: r.ascent,
            difficulty: r.difficulty,
            startPt: r.startLocation,
            endPt: r.endLocation,
            description: r.description,
            referencePoints: r.refLocations
        }))
    } else {
        throw hikesJson;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}

const API = { login, signup, getAllHikes };
export default API;