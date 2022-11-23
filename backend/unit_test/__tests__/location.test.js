const LocationDao = require('../../api/DAOs/locationDao');
const SECONDS = 1000;
jest.setTimeout(20 * SECONDS);

describe('User API tests', () => {
    beforeEach(async () => {
        await LocationDao.clearDatabase();
    });

    test('The operation of creating a new parking should complete without errors', async () => {
        const newParking = {
            "name":"Park La Maria",
            "latitude":45,
            "longitude":17,
            "altitude":1300,
            "country":"Italy",
            "province":"TO",
            "town":"fakeTown",
            "address":null,
            "description":"bla bla bla",
            "lotsNumber":14
        };
        const res=await LocationDao.addParking(newParking);
        expect(res).toBe(201);
    });

    test('The operation of creating a new parking should fail in case of missing coordinates', async () => {
        const newParking = {
            "name":"Park La Maria",
            "latitude":45,
            "longitude":null,
            "altitude":1300,
            "country":"Italy",
            "province":"TO",
            "town":"fakeTown",
            "address":null,
            "description":"bla bla bla",
            "lotsNumber":14
        };
        await LocationDao.addParking(newParking).catch((err)=>{
            expect(err).toBe(400);
        });
    });
})