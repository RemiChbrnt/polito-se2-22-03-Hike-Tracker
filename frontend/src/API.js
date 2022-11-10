// import { post } from "../../backend";

/**
 * All the API calls
 */
const URL = 'http://localhost:3001/api';




async function login(email, password) {
    const response = await fetch(URL + '/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
            password: password

        })
    });
    const user = await response.json();
    console.log("user " + user);
    if (response.ok) {
        return user;
    } else {
        throw user;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}



async function signup() {
    const response = await fetch(URL + '/signup', { credentials: 'include' });
    const user = await response.json();
    console.log("user " + user);
    if (response.ok) {
        return user;
    } else {
        throw user;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}





async function getAllRiddles() {
    // call: GET /api/riddles
    const response = await fetch(URL + '/hikes', { credentials: 'include' });
    const hikesJson = await response.json();
    if (response.ok) {
        return hikesJson.map((r) => ({ hikeid: r.hikeid, title: r.title, length: r.length, expTime: r.expTime, ascent: r.ascent, difficulty: r.difficulty, startPt: r.startPt, endPt: r.endPt, description: r.description }))
    } else {
        throw hikesJson;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}

const API = { login, signup };
export default API;