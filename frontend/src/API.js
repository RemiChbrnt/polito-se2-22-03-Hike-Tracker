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

const getUserInfo = async () => {
    const response = await fetch(URL + '/session/current', {
        credentials: 'include'
    });
    const user = await response.json();
    if (response.ok) {
        return user;
    } else {
        throw user;
    }
};

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



async function setHikeStartPoint(id, startPt) {
    // call: PUT /api/:hike/:startPt
    const response = await fetch(URL + '/hike-startPt/' + id + '/' + startPt, {
        credentials: 'include',
    });
    const result = await response.json();
    if (response.ok)
        return result;
    else
        throw result;

}



async function setHikeEndPoint(id, endPt) {
    // call: PUT /api/:hike/:endPt    
    const response = await fetch(URL + '/hike-endPt/' + id + '/' + endPt, {
        credentials: 'include',
    });
    const result = await response.json();
    if (response.ok)
        return result;
    else
        throw result;

}








/* hut API */

async function getHuts(filters) {
    // call: GET /api/hut    
    let params = "";
    if (filters !== undefined) {
        params = "?";
        JSON.parse(filters).forEach(filter => {
            params = params + filter.key + "=" + filter.value + "&";
        });
        params = params.slice(0, params.length - 1);
    }
    const response = await fetch(URL + '/huts' + params, {
        credentials: 'include',
    });
    const hutsJson = await response.json();
    if (response.ok) {
        return hutsJson.map((r) => ({
            id: r.id,
            name: r.name,
            latitude: r.latitude,
            longitude: r.longitude,
            country: r.country,
            province: r.province,
            town: r.town,
            address: r.address,
            altitude: r.altitude
        }))
    } else {
        throw hutsJson;
    }
}






async function addHut(params) {
    const response = await fetch(URL + '/addHut', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: params
    });
    let res = await response.json();
    if (response.ok) {
        return res;
    } else {
        throw res;
    }
}

async function getPreferences(email) {
    const response = await fetch(URL + '/user?role=hiker', {
        credentials: 'include'
    });
    let res = await response.json();
    if (response.ok)
        return res;
    else
        throw res;
}

async function createPreferences(preferences) {
    const response = await fetch(URL + '/user?role=hiker', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(preferences)
    });
    let res = await response.json();
    if (response.ok)
        return res;
    else
        throw res;
}

const API = { login, signup, getUserInfo, getAllHikes, setHikeStartPoint, setHikeEndPoint, getHuts, addHut, getPreferences, createPreferences };
export default API;