/**
 * All the API calls
 */
const URL = 'http://localhost:3001/api';




async function login() {

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

const API = { getAllRiddles };
export default API;