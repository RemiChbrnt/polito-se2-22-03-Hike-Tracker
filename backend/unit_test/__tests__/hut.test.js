const HutDAO = require('../../api/DAOs/hutDAO');
const HutService = require('../../api/services/hutService');
const service = new HutService(HutDAO);

const SECONDS = 1000;
jest.setTimeout(20 * SECONDS);

const hutsLocation = [{
    id: 1,
    name: "Rifugio La Riposa",
    type: "hut",
    latitude: 45.1788097585636,
    longitude: 7.08152295397762,
    country: "Italy",
    province: "TO",
    town: "Mompantero",
    address: "Frazione La Riposa",
    altitude: "2185.0"
}];

const huts = [{
    locationId,
    numberOfBeds,
    food,
    description,
    openingTime,
    closingTime,
    cost
}];


describe("Hut tests", () => {
    beforeEach(async () => {
        await HutDAO.clearDatabase();


    })


    test('Create new hut', async () => {

    });






});