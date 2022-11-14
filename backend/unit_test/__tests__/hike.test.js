const { createHike, getHikes, clearDatabase } = require('../__mocks__/mockHikeDAO')
const SECONDS = 1000;
jest.setTimeout(20 * SECONDS);

describe('Hikes API tests', () => {
    beforeEach(() => {
        clearDatabase();
    });

    test('createHike should create a new entry in the Db and return status 201', async () => {
        const newHike = {
            "id" : 1,
            "title" : "testingHikeCreation",
            "length" : 1273.2,
            "expTime" : 10.2,
            "ascent" : 1000.0,
            "difficulty" : "pro",
            "startPt" : 1,
            "endPt" : 2,
            "description" : "test description",
            "author" : "maurizio.merluzzo@donkeykong.com"
        };

        return createHike(newHike).then(status => expect(status).toBe(201));
    });

    test('getHikes should retrieve the complete list of hikes in the database', async () => {
        const newHike = {
            "id" : 1,
            "title" : "testingHikeCreation",
            "length" : 1273.2,
            "expTime" : 10.2,
            "ascent" : 1000.0,
            "difficulty" : "pro",
            "startPt" : 1,
            "endPt" : 2,
            "description" : "test description",
            "author" : "maurizio.merluzzo@donkeykong.com"
        };

        await createHike(newHike);
        const hikes = await getHikes();
        return expect(hikes.length).toBe(1);
    })
})