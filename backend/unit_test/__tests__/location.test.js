const LocationDao = require('../../api/DAOs/locationDao');
const LocationService = require('../../api/services/locationService');
const { resetLocations } = require('../../db/dbreset');
const service = new LocationService(LocationDao);

const SECONDS = 1000;
jest.setTimeout(5 * SECONDS);

const validHuts = [{
    name: "hut 1",
    type: "hut",
    latitude: 45,
    longitude: 45,
    country: "Italy",
    province: "TO",
    town: "X",
    address: "address x",
    altitude: 1000,
    numberOfBeds: 10,
    food: "none",
    description: "good"
},
{
    name: "hut 2",
    type: "hut",
    latitude: 24.8439,
    longitude: 12.294552,
    country: "England",
    province: "LO",
    town: "oehbfva<e",
    address: "address y39485",
    altitude: 630,
    numberOfBeds: 0,
    food: "buffet",
    description: "very good"
}];

const invalidHuts = [{
    name: "hut 3",
    type: "hut",
    latitude: "spifbvsptdifszè",
    longitude: 0.68654,
    country: "Germany",
    province: "DU",
    town: 111,
    address: "address z",
    altitude: "asdvAR",
    numberOfBeds: "soudfhbvaoe",
    food: "spithbspzitfgb",
    description: 1
},
{
    name: "hut 3",
    type: "hut",
    latitude: "sohfbos",
    longitude: 0.68654,
    country: 239829,
    province: "DU",
    town: 111,
    address: "address z",
    altitude: "asdvAR",
    numberOfBeds: 0,
    food: "i don't know",
    description: 1
}];




describe("Hut tests", () => {
    beforeAll(async () => {
        await resetLocations();
    })


    test('Create valid hut 1', async () => {
        const result = await LocationDao.addLocation(validHuts[0], "antonio.fracassa@live.it");
        console.log("result " + JSON.stringify(result));
        return expect(result).toEqual(validHuts[0]);
    });

    test('Create valid hut 2', async () => {
        const result = await LocationDao.addLocation(validHuts[1], "antonio.fracassa@live.it");
        return expect(result).toEqual(validHuts[1]);
    });


    test('Valid get all valid huts', async () => {

        const result = await LocationDao.getHuts({}, "antonio.fracassa@live.it");

        console.log("result " + JSON.stringify(result));



        return expect(result).toEqual(expect.arrayContaining([expect.objectContaining({
            name: expect.any(String),
            type: expect.stringMatching("hut"),
            latitude: expect.any(Number),
            longitude: expect.any(Number),
            country: expect.any(String),
            province: expect.any(String),
            town: expect.any(String),
            address: expect.any(String),
            altitude: expect.any(Number),
            author: expect.stringMatching("antonio.fracassa@live.it"),
            numberOfBeds: expect.any(Number),
            food: expect.any(String),
            description: expect.any(String)
        })]));
    });

    test('Valid get valid hut 1', async () => {
        const result = await LocationDao.getHuts(validHuts[0], "antonio.fracassa@live.it");
        return expect(result[0]).toEqual(expect.objectContaining(validHuts[0]), "antonio.fracassa@live.it");
    });

    test('Valid get valid hut 2', async () => {
        const result = await LocationDao.getHuts(validHuts[1], "antonio.fracassa@live.it");
        return expect(result[0]).toEqual(expect.objectContaining(validHuts[1]), "antonio.fracassa@live.it");
    });

    test('Invalid get hut 2', async () => {
        try {
            const result = await LocationDao.getHuts(invalidHuts[0], "antonio.fracassa@live.it");
        } catch (err) {
            console.log("err " + err);
            return expect(err).toEqual(400);
        }

    });
});





describe('Parking lot tests', () => {
    beforeAll(async () => {
        await resetLocations();
    });

    const validParkingLot = [{
        "name": "Park La Maria",
        "type": "parkinglot",
        "latitude": 45,
        "longitude": 17,
        "altitude": 1300,
        "country": "Italy",
        "province": "TO",
        "town": "fakeTown",
        "address": null,
        "description": "bla bla bla",
        "lotsNumber": 14
    },
    {
        "name": "Park x",
        "type": "parkinglot",
        "latitude": 43,
        "longitude": 18,
        "altitude": 130,
        "country": "Italy",
        "province": "TO",
        "town": "town fake",
        "address": null,
        "description": "goo description",
        "lotsNumber": 10
    }];

    const invalidParkingLot = {
        "name": "Park La Maria",
        "type": "parkinglot",
        "latitude": 45,
        "longitude": null,
        "altitude": 1300,
        "country": "Italy",
        "province": "TO",
        "town": "fakeTown",
        "address": null,
        "description": "bla bla bla",
        "lotsNumber": 14
    };



    test('Create valid parking lot 1', async () => {
        const res = await LocationDao.addLocation(validParkingLot[0], "antonio.fracassa@live.it");
        return expect(res).toEqual(expect.objectContaining(validParkingLot[0]));
    });

    test('Create valid parking lot 2', async () => {
        const res = await LocationDao.addLocation(validParkingLot[1], "antonio.fracassa@live.it");
        return expect(res).toEqual(expect.objectContaining(validParkingLot[1]));
    });

    test('Create invalid parking lot (missing coordinates)', async () => {
        try {
            const result = await LocationDao.addLocation(invalidParkingLot, "antonio.fracassa@live.it");
        } catch (err) {
            console.log("err " + err);
            return expect(err).toEqual(400);
        }
    });


})

