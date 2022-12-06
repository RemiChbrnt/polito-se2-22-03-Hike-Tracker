const HikeDao = require('../../api/DAOs/hikeDAO');
const { resetHikes } = require('../../db/dbreset');
const SECONDS = 1000;
jest.setTimeout(20 * SECONDS);

describe('Hikes API tests', () => {
    beforeEach(async () => {
        await resetHikes();
    });

    test('createHike should create a new entry in the Db and return status 201', async () => {
        const newHike = {
            "id": 3,
            "title": "testingHikeCreation",
            "length": 1273.2,
            "expTime": 10.2,
            "ascent": 1000.0,
            "difficulty": "pro",
            "startPt": 1,
            "endPt": 2,
            "description": "test description",
            "author": "maurizio.merluzzo@donkeykong.com"
        };
        const res = await HikeDao.createHike(newHike);
        return expect(res.id !== undefined).toBe(true)
    });

    test('getHikes should retrieve the complete list of hikes in the database', async () => {
        const newHike = {
            "id": 2,
            "title": "testingHikeCreation",
            "length": 1273.2,
            "expTime": 10.2,
            "ascent": 1000.0,
            "difficulty": "pro",
            "startPt": 1,
            "endPt": 2,
            "description": "test description",
            "author": "maurizio.merluzzo@donkeykong.com"
        };

        await HikeDao.createHike(newHike);
        const hikes = await HikeDao.getHikes({});
        return expect(hikes.length).toBe(2);
    })

    test('getHikesByHutId should retrieve the correct hike related to the hutworker', async () => {
        const hikelist = [{
            "description": "mud slide on the main bridge",
            "id": 1,
            "status": "closed",
            "title": "testingHikeCreation"
        }];

        const hikes = await HikeDao.getHikesByHutId(1, "jen.shiro@chiocciola.it");
        return expect(hikes).toEqual(hikelist);
    })

    test('updateStatus should correctly update the status of a hike related to a hut, but only if the user owns it', async () => {
        const status = {
            "description": "mud slide on the main bridge",
            "status": "closed",
        };

        const res = await HikeDao.updateStatus(status, 1, 1, "jen.shiro@chiocciola.it");
        return expect(res).toBe(200);
    })

    test('updateStatus should return 404 if the user doesn\'t own it', async () => {
        const status = {
            "description": "mud slide on the main bridge",
            "status": "closed",
        };

        await HikeDao.updateStatus(status, 1, 1, "not the owner's email").catch((e)=>{
            return expect(e).toBe(404);
        });
    })
})