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
    region: "Piemonte",
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
    region: "Piemonte",
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
    region: "Piemonte",
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
    region: "Piemonte",
    town: 111,
    address: "address z",
    altitude: "asdvAR",
    numberOfBeds: 0,
    food: "i don't know",
    description: 1
}];




describe("Hut tests", () => {
    beforeEach(async () => {
        await resetLocations();
    })


    test('Create valid hut 1', async () => {
        const result = await LocationDao.addLocation(validHuts[0], "antonio.fracassa@live.it");
        return expect(result).toEqual(validHuts[0]);
    });

    test('Create valid hut 2', async () => {
        const result = await LocationDao.addLocation(validHuts[1], "antonio.fracassa@live.it");
        return expect(result).toEqual(validHuts[1]);
    });


    test('Valid get all valid huts', async () => {

        const result = await LocationDao.getHuts({page:0});

        return expect(result.length).toEqual(1);
    });

    test('Valid get valid hut 1', async () => {
        const result1 = await LocationDao.addLocation(validHuts[0], "antonio.fracassa@live.it");
        expect(result1).toEqual(validHuts[0]);
        const result = await LocationDao.getHuts({...validHuts[0], page:0}, "antonio.fracassa@live.it");
        return expect(result[0]).toEqual(expect.objectContaining(validHuts[0]), "antonio.fracassa@live.it");
    });

    test('Valid get valid hut 2', async () => {
        const result1 = await LocationDao.addLocation(validHuts[1], "antonio.fracassa@live.it");
        expect(result1).toEqual(validHuts[1]);
        const result = await LocationDao.getHuts({...validHuts[1], page:0}, "antonio.fracassa@live.it");
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


    test('Link a hut to a hike', async () => {
        try {
            const location = await LocationDao.getHutsByUserId("antonio.fracassa@live.it");
            const locationToLink = location[0].id;
            const result = await LocationDao.linkHut(1, locationToLink);
            expect(result.id !== undefined).toBe(true);

        } catch (err) {
            console.log("err " + err);
        }
    });

    test('Link a hut to a hike with non existing hike', async () => {
        try {
            const locationToLink = 4316;
            await LocationDao.linkHut(1, locationToLink);
        } catch (err) {
            expect(err).toBe(400);
        }
    });


    //testing status related functions

    test('get hut by worker email', async () => {
        try {
            const result = await LocationDao.getHutbyWorkerId("jen.shiro@chiocciola.it");
            expect(result).toEqual(1);
        } catch (err) {
            console.log(err)
        }
    });

    test('get hut by wrong worker email', async () => {
        try {
            await LocationDao.getHutbyWorkerId("jen.shiro1719@chiocciola.it");
        } catch (err) {
            expect(err).toBe(404);
        }
    });


    // Testing hut photos related functions


    test('add invalid hut photo - not existing hut', async () => {

        await expect(LocationDao.addHutPhoto(20, "fileName.png")).rejects.toEqual(400);

    });

    test('add valid hut photo', async () => {

        const result = await LocationDao.addHutPhoto(1, "fileName.png")
        expect(result).toEqual(201);
    });



    test('get hut by id - invalid id', async () => {

        await expect(LocationDao.getHutById("hut x")).rejects.toEqual(400);
    });


    test('get hut by id - not existing id', async () => {
        await expect(LocationDao.getHutById(20)).rejects.toEqual(400);
    });


    test('get hut by id - valid id', async () => {
        const result = await LocationDao.getHutById(1);
        expect(result.id !== undefined).toEqual(true);
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
        "region": "Piemonte",
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
        "region": "Piemonte",
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
        "region": "Piemonte",
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
            await LocationDao.addLocation(invalidParkingLot, "antonio.fracassa@live.it");
        } catch (err) {
            return expect(err).toEqual(400);
        }
    });


})

