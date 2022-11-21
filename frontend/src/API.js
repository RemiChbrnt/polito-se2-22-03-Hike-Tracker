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
    console.log("body.fullname " + body.fullName);
    console.log("body " + JSON.stringify(body));
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

async function getAllHikes(filters) {
    // call: GET /api/hikes
    let params = "";
    if (filters !== undefined) {
        params = "?";
        JSON.parse(filters).forEach(filter => {
            params = params + filter.key + "=" + filter.value + "&";
        });
        params = params.slice(0, params.length - 1);
    }
    const response = await fetch(URL + '/hikes' + params, {
        credentials: 'include',
    });
    const hikesJson = await response.json();
    if (response.ok) {
        return hikesJson.map((r) => ({
            id: r.id,
            title: r.title,
            length: r.length,
            expTime: r.expTime,
            ascent: r.ascent,
            difficulty: r.difficulty,
            startPt: r.startPt,
            endPt: r.endPt,
            description: r.description,
            referencePoints: r.refLocations
        }))
    } else {
        throw hikesJson;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}

async function createHike(body) {
    console.log("body " + JSON.stringify(body));
    const response = await fetch(URL + '/hikes', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body)
    });
    const hike = await response.json();
    if (response.ok) {
        console.log(hike)
        return hike;
    } else {
        throw hike;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}

async function createLocation(body) {
    // console.log("body " + JSON.stringify(body));
    const response = await fetch(URL + '/locations', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body)
    });
    const location = await response.json();
    if (response.ok) {
        return location;
    } else {
        throw location;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}

const API = { login, signup, getAllHikes, createHike, createLocation};
export default API;