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
        const result = await LocationDao.addLocation(validHuts[0]);
        return expect(result).toEqual(201);
    });

    test('Create valid hut 2', async () => {
        const result = await LocationDao.addLocation(validHuts[1]);
        return expect(result).toEqual(201);
    });


    test('Valid get all valid huts', async () => {

        const result = await LocationDao.getHuts({});

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
            numberOfBeds: expect.any(Number),
            food: expect.any(String),
            description: expect.any(String)
        })]));
    });

    test('Valid get valid hut 1', async () => {
        const result = await LocationDao.getHuts(validHuts[0]);
        return expect(result[0]).toEqual(expect.objectContaining(validHuts[0]));
    });

    test('Valid get valid hut 2', async () => {
        const result = await LocationDao.getHuts(validHuts[1]);
        return expect(result[0]).toEqual(expect.objectContaining(validHuts[1]));
    });

    test('Invalid get hut 2', async () => {
        try {
            const result = await LocationDao.getHuts(invalidHuts[0]);
        } catch (err) {
            console.log("err " + err);
            return expect(err).toEqual(400);
        }

    });
});


describe('Parking lot tests', () => {
    beforeEach(async () => {
        await resetLocations();
    });

    test('The operation of creating a new parking should complete without errors', async () => {
        const newParking = {
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
        };
        const res = await LocationDao.addLocation(newParking);
        expect(res).toBe(201);
    });

    test('The operation of creating a new parking should fail in case of missing coordinates', async () => {
        const newParking = {
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
        try {
            const result = await LocationDao.addLocation(newParking);
        } catch (err) {
            console.log("err " + err);
            return expect(err).toEqual(400);
        }
    });
})



// const validParkingLots = [{
//     name: "parking lot 1",
//     latitude: 45,
//     longitude: 45,
//     country: "Italy",
//     province: "TO",
//     town: "A",
//     address: "address xyz",
//     altitude: 500,
//     lotsNumber: 20,
//     description: "not good"
// },
// {
//     name: "parking lot 2",
//     latitude: 70,
//     longitude: 54.438953,
//     country: "Italy",
//     province: "TO",
//     town: "B",
//     address: "address abc",
//     altitude: 1000,
//     lotsNumber: 50,
//     description: "good"
// }];


// const invalidParkingLots = [{
//     name: "parking lot 1",
//     latitude: "latitude x",
//     longitude: 4.35472,
//     country: "Italy",
//     province: "TO",
//     town: "A",
//     address: "address xyz",
//     altitude: "abcdef",
//     lotsNumber: 20,
//     description: "not good"
// },
// {
//     name: "parking lot 2",
//     latitude: 70,
//     longitude: 54.438953,
//     country: 111,
//     province: "TO",
//     town: "B",
//     address: "address abc",
//     altitude: -1000,
//     lotsNumber: "abc",
//     description: "good"
// }]



// // describe("Parking lot tests", () => {
//     beforeAll(async () => {
//         await LocationDao.clearDatabase();
//     })

//     test('Create valid parking lot 1', async () => {
//         const result = await LocationDao.addParkingLot(validParkingLots[0]);
//         return expect(result).toEqual(201);
//     });

//     test('Create valid parking lot 2', async () => {
//         const result = await LocationDao.addParkingLot(validParkingLots[1]);
//         return expect(result).toEqual(201);
//     });

//     test('Create invalid parking lot 1', async () => {
//         try {
//             const result = await LocationDao.addParkingLot(invalidParkingLots[0]);
//         } catch (err) {
//             return expect(err).toEqual(400);
//         }
//     });

//     test('Create invalid parking lot 2', async () => {
//         try {
//             const result = await LocationDao.addParkingLot(invalidParkingLots[1]);
//         } catch (err) {
//             return expect(err).toEqual(400);
//         }

//     });


//     test('Valid get all valid huts', async () => {

//         const result = await LocationDao.getParkingLots({});

//         let retrievedValidParkingLots = validParkingLots;
//         retrievedValidHuts[0].type = "parkinglot";
//         retrievedValidHuts[1].type = "parkinglot";

//         return expect(result).toEqual(expect.arrayContaining([expect.objectContaining({
//             name: expect.any(String),
//             type: expect.stringMatching("hut"),
//             latitude: expect.any(Number),
//             longitude: expect.any(Number),
//             country: expect.any(String),
//             province: expect.any(String),
//             town: expect.any(String),
//             address: expect.any(String),
//             altitude: expect.any(Number),
//             numberOfBeds: expect.any(Number),
//             food: expect.any(String),
//             description: expect.any(String)
//         })]));
//     });

//     test('Valid get valid parking lot 1', async () => {
//         const result = await LocationDao.getHuts(validHuts[0]);
//         return expect(result[0]).toEqual(expect.objectContaining(validHuts[0]));
//     });

//     test('Valid get valid parking lot 2', async () => {
//         const result = await LocationDao.getHuts(validHuts[1]);
//         return expect(result[0]).toEqual(expect.objectContaining(validHuts[1]));
//     });

//     test('Invalid get parking lot 2', async () => {
//         try {
//             const result = await LocationDao.getHuts(invalidHuts[0]);
//         } catch (err) {
//             console.log("err " + err);
//             return expect(err).toEqual(400);
//         }

//     });
// });
