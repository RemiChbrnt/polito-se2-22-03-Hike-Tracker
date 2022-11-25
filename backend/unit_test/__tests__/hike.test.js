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
            "id": 1,
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
            "id": 1,
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
        return expect(hikes.length).toBe(1);
    })
})