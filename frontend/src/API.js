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
    } else if (response.status === 412)
        /* User email not verified */
        return 412;
    else if (response.status === 403) {
        /* Account not yet approved by manager */
        return 403;
    } else {
        throw user;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}

async function logOut() { //API di logout
    await fetch(URL + '/session/current', { method: 'DELETE', credentials: 'include' });
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

async function getPendingUsers() {
    const response = await fetch(URL + '/get-pending-users', {
        credentials: 'include'
    });

    const users = await response.json();
    if (response.ok) {
        return users;
    } else {
        throw users;
    }
}

async function approveUser(email) {
    const response = await fetch(URL + '/approve', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(email)
    });

    const result = await response.json();
    if (response.ok) {
        return result;
    } else {
        throw result;
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
    console.log(hikesJson)
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
            track: r.track,
            author: r.author,
            referencePoints: r.refLocations,
            statusList:r.statusList,
        }))
    } else {
        throw hikesJson;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}


/**
 * Function to get a specific hike from the database
 * @param {*} id: the hike's id
 * @returns hike corresponding to ID if succesful, 400 otherwise
 */
async function getHikeFromID(id) {
    let params = `/hikeFromID?id=${id}`;

    const response = await fetch(URL + params, {
        credentials: 'include',
    });

    const hikeJson = await response.json();
    console.log(hikeJson);
    if (response.ok) {
        return hikeJson;
    } else {
        throw hikeJson;
    }
}

async function getHikesList() {
    // call: GET /api/hikes
    const response = await fetch(URL + '/hikes', {
        credentials: 'include',
    });
    const hikesJson = await response.json();
    if (response.ok) {
        return hikesJson.map((r) => ({
            id: r.id,
            title: r.title,
        }))
    } else {
        throw hikesJson;
    }
}

async function createHike(body) {

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

/**
 * Function to set the StartPt field of an hike in the database
 * @param {*} id: the hike's id
 * @param {*} startPt: the location's id that it has to be set as the StartPt
 * @returns status 200 if succesful, 400 otherwise
 */
async function setHikeStartPoint(id, startPt) {
    // call: PUT /api/:hike/:startPt

    const response = await fetch(URL + '/hike-startPt/' + id + '/' + startPt, {
        method: "PUT",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok)
        return null;
    else {
        const result = await response.json();
        throw result;
    }

}


/**
 * Function to set the EndPt field of an hike in the database
 * @param {*} id: the hike's id
 * @param {*} endPt: the location's id that it has to be set as the EndPt
 * @returns status 200 if succesful, 400 otherwise
 */

async function setHikeEndPoint(id, endPt) {
    // call: PUT /api/:hike/:endPt    
    const response = await fetch(URL + '/hike-endPt/' + id + '/' + endPt, {
        method: "PUT",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok)
        return null;
    else {
        const result = await response.json();
        throw result;
    }

}





/* location API */

/**
 * Function to get the huts, based on some filtering 
 * @param {*} filters object containing the key-value pairs for filtering
 * @returns array of "hut" objects, containing the fields id, name, country, region, town, address, altitude
 */
async function getHuts(filters) {
    // call: GET /api/huts    
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
            region: r.region,
            town: r.town,
            address: r.address,
            altitude: r.altitude,
            numberOfBeds: r.numberOfBeds,
            cost: r.cost,
            food: r.food,
            openingTime: r.openingTime,
            closingTime: r.closingTime,
            description: r.description
        }))
    } else {
        throw hutsJson;
    }
}

/**
 * Function to get all the huts and the parking lots
 * @returns array of "location" objects, containing the fields id, name, type, country, region, town, address, altitude
 */
async function getHutsAndParkingLots() {
    // call: GET /api/huts-and-parking-lots
    const response = await fetch(URL + '/huts-and-parking-lots', {
        credentials: 'include',
    });
    const resultsJson = await response.json();
    if (response.ok) {
        return resultsJson.map((r) => ({
            id: r.id,
            name: r.name,
            type: r.type,
            latitude: r.latitude,
            longitude: r.longitude,
            country: r.country,
            region: r.region,
            town: r.town,
            address: r.address,
            altitude: r.altitude
        }))
    } else {
        throw resultsJson;
    }
}

/**
 * 
 * @param none; 
 * @returns all existing locations, 400 on error
 */
async function getLocations() {
    // call: GET /api/hikes
    const response = await fetch(URL + '/locations', {
        credentials: 'include',
    });
    const locationsJson = await response.json();
    if (response.ok) {
        return locationsJson.map((r) => ({
            id: r.id,
            name: r.name,
            type: r.type,
            latitude: r.latitude,
            longitude: r.longitude,
            country: r.country,
            region: r.region,
            town: r.town,
            address: r.address,
            altitude: r.altitude,
            author: r.author
        }))
    } else {
        throw locationsJson;
    }
}


/**
 * 
 * @param {*} body contains the body to add a new location; depending on the type it creates either just a location or a huts or a parking lot
 * @returns the location created on success, 401 on error
 */
async function createLocation(body) {

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

async function getHutsByUserId(userId) {
    const response = await fetch(URL + `/hutsList/` + userId, { method: 'GET', credentials: 'include' });
    const hutsJson = await response.json();
    if (response.ok) {
        return hutsJson.map((r) => ({
            id: r.id,
            name: r.name,
            latitude: r.latitude,
            longitude: r.longitude,
            country: r.country,
            region: r.region,
            town: r.town,
            altitude: r.altitude,
            numberOfBeds: r.numberOfBeds,
            food: r.food,
            description: r.description
        }))
    } else {
        throw hutsJson;
    }

}

async function getPreferences() {
    const response = await fetch(URL + '/preferences', {
        credentials: 'include'
    });
    let res = await response.json();
    if (response.ok)
        return res;
    else
        throw res;
}

async function createPreferences(preferences) {
    const response = await fetch(URL + '/preferences', {
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

async function linkHut(params) {
    const response = await fetch(URL + '/linkHut', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(params)
    });
    if (response.ok) {
        return true;
    } else {
        throw false;
    }
}

async function getHutIdByUserId() {
    const response = await fetch(URL + `/huts/myhut`, { method: 'GET', credentials: 'include' });
    const hutId = await response.json();
    if (response.ok) {
        return hutId;
    } else {
        throw hutId;
    }

}

async function updateStatus(params) {
    const response = await fetch(URL + '/hikes/' + params.hikeId + '/status/'+ params.hutId, {
        method: "PUT",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({status: params.status, description: params.description})
    });
    if (response.ok)
        return true;
    else {
        const result = await response.json();
        throw result;
    }

}

async function getHikesByHutId(hutId) {
    const response = await fetch(URL + `/hikesList/` + hutId, { method: 'GET', credentials: 'include' });
    const hikesJson = await response.json();
    if (response.ok) {
        return hikesJson.map((r) => ({
            id: r.id, //hikeId
            name: r.name,
            status:r.status, 
            description: r.description //status description
        }))
    } else {
        throw hikesJson;
    }

}

const API = { login, logOut, signup, getUserInfo, getAllHikes, getLocations, setHikeStartPoint, setHikeEndPoint, getHuts, getHutsAndParkingLots, getPreferences, createPreferences, createHike, createLocation, linkHut, getHutsByUserId, getHikesList, getHutIdByUserId, updateStatus,getHikesByHutId, getHikeFromID, approveUser, getPendingUsers};

export default API;