const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { INTERNAL } = require('sqlite3')
const { resetLocations } = require('../db/dbreset.js')
chai.use(chaiHttp)
chai.should()

const app = require('../index')
var agent = chai.request.agent(app)


describe('Testing all the operations on locations', function () {
    before(async () => {
        //signup needed 
        // await agent
        //     .post('/api/signup')
        //     .set('content-type', 'application/json')
        //     .send({
        //         email: 'antonio.fracassa@live.it',
        //         password: 'testPassword2',
        //         fullName: 'test',
        //         role: 'guide',
        //         phoneNumber: '2313124214'
        //     })
        //login
        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'antonio.fracassa@live.it',
                password: 'testPassword2'
            })
        await resetLocations()
    })
    after(async () => {
        //maybe delete

    })

    it('POST /api/locations with erroneous latitude', async () => {
        const result = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'parkinglot',
                latitude: 'a',
                longitude: '11',
                country: 'Italy',
                region: 'Piemonte',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: '1000',
                description: 'description (optional)',
                lotsNumber: '10'
            })
        result.should.have.status(422)
    })

    it('POST /api/locations with negative lotsNumber', async () => {
        const result = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'parkinglot',
                latitude: 'a',
                longitude: '11',
                country: 'Italy',
                region: 'Piemonte',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: '1000',
                description: 'description (optional)',
                lotsNumber: '-10'
            })
        result.should.have.status(422)
    })

    it('POST /api/locations', async () => {
        const result = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'parkinglot',
                latitude: '11',
                longitude: '11',
                country: 'Italy',
                region: 'Piemonte',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: '1000',
                description: 'description (optional)',
                lotsNumber: '10'
            })
        result.should.have.status(201)
        expect(result.body.id !== undefined).deep.equal(true)
    })

    it('POST /api/locations - Creating a valid Hut', async () => {
        const result = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'hut',
                latitude: '11.12',
                longitude: '11.12931',
                country: 'Italy',
                region: 'Piemonte',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: '1000',
                numberOfBeds: '10',
                food: 'none'
            });
        result.should.have.status(201);
        expect(result.body.id !== undefined).deep.equal(true);
    });

    it('POST /api/locations - Creating a invalid Hut - Invalid coordinates', async () => {
        const result = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'hut',
                latitude: '-11.12',
                longitude: 'dasfsdafasd',
                country: 'Italy',
                region: 'Piemonte',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: 'werf',
                description: 'description (optional)',
                numberOfBeds: '10',
                food: 'none'
            });
        result.should.have.status(422);
    });

    it('POST /api/locations - Creating a invalid Hut - Invalid number of beds', async () => {
        const result = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'hut',
                latitude: '11.12',
                longitude: '13121.12',
                country: 'Italy',
                region: 'Piemonte',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: '1000',
                description: 'description (optional)',
                numberOfBeds: 'invalid',
                food: 'none'
            });
        result.should.have.status(422);
    });

    it('POST /api/locations - Creating a invalid Hut - Invalid food type (not none, buffet or restaurant)', async () => {
        const result = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'hut',
                latitude: '11.12',
                longitude: '13121.12',
                country: 'Italy',
                region: 'Piemonte',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: '1000',
                description: 'description (optional)',
                numberOfBeds: '12',
                food: 'invalid'
            });
        result.should.have.status(422);
    });

    it('POST /api/linkHut - Linking a valid hut to an existing hike', async () => {
        const p1 = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'P1',
                type: 'generic',
                latitude: 45.178734750000004,
                longitude: 7.081576685703124,
                country: 'Italy',
                region: 'Piemonte',
                town: 'Mompantero',
                address: 'La Riposa, GTA / 529 / SI, Trucco, Mompantero, Torino, Piedmont, 10059, Italy',
                altitude: null
            })

        const p2 = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'P2',
                type: 'generic',
                latitude: 45.2034457,
                longitude: 7.077260064028688,
                country: 'Italy',
                region: 'Piemonte',
                town: 'Novalesa',
                address: 'Nostra Signora del Rocciamelone, 585, Novalesa, Torino, Piedmont, 10059, Italy',
                altitude: null
            })
        const hikeResult = await agent
            .post('/api/hikes')
            .set('content-type', 'application/json')
            .send({
                title: 'TestingInsertion',
                length: '4',
                expTime: '4',
                ascent: '2131',
                difficulty: 'tourist',
                startPt: p1.body.id,
                endPt: p2.body.id,
                description: '',
                track: null,
                author: 'antonio.fracassa@live.it'
            });

        const hutResult = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'hut',
                latitude: '11.12',
                longitude: '11.12931',
                country: 'Italy',
                region: 'Piemonte',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: '1000',
                numberOfBeds: '10',
                food: 'none'
            });

        const hikeId = hikeResult.body.id;
        const hutId = hutResult.body.id;

        const linkResult = await agent
            .post('/api/linkHut')
            .set('content-type', 'application/json')
            .send({
                hikeId: hikeId,
                locationId: hutId
            });
        linkResult.should.have.status(201);
    });

    it('POST /api/linkHut - Linking a hut to a hike - Invalid hut/hike ID', async () => {
        const linkResult = await agent
            .post('/api/linkHut')
            .set('content-type', 'application/json')
            .send({
                hikeId: 'invalid',
                hutId: 'invalid'
            });
        linkResult.should.have.status(422);
    })


    /* ----- Testing /hutsList/:userId ----- */


    it('GET /api/hutsList/:userId - valid GET hut', async () => {
        const result = await agent
            .get('/api/hutsList/antonio.fracassa@live.it')
            .set('content-type', 'application/json');
        result.should.have.status(200);

        expect(result.body[1]).to.include({
            name: 'Test',
            latitude: 11.12,
            longitude: 11.12931,
            country: 'Italy',
            region: 'Piemonte',
            town: 'Riva presso Chieri',
            address: 'Via giacomo puccini 4',
            altitude: 1000,
            food: "none",
            description: null,
            openingTime: null,
            closingTime: null,
            cost: null
        })
    })



    it('GET /api/hutsList/:userId - unauthorized', async () => {
        const result = await agent
            .get('/api/hutsList/maurizio.merluzzo@donkeykong.com')
            .set('content-type', 'application/json');
        result.should.have.status(400);
    })



    /* ----- Testing api/huts-and-parking-lots ----- */



    it('GET /api/huts-and-parking-lots - valid', async () => {
        const result = await agent
            .get('/api/huts-and-parking-lots')
            .set('content-type', 'application/json');
        result.should.have.status(200);

        result.body.map((r) => {
            expect(r).to.have.keys(
                "id",
                "name",
                "type",
                "latitude",
                "longitude",
                "country",
                "region",
                "town",
                "address",
                "altitude",
            );

            expect(r).should.satisfy(() => {

                if (r.type === "hut" || r.type === "parkinglot")
                    return true;
                return false;
            })
        });
    })

})



/* ----- Testing /api/huts ----- */

describe('Testing operations on locations requiring a hiker', function () {
    before(async () => {
        //login
        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'maurizio.merluzzo@donkeykong.com',
                password: 'testPassword1'
            });
    })



    // it('GET /api/huts - valid get Hut', async () => {
    //     const result = await agent
    //         .get('/api/huts')
    //         .set('content-type', 'application/json')
    //         .query({
    //             name: 'Test',
    //             country: 'Italy',
    //             region: 'Piemonte',
    //             town: 'Mompantero',
    //             address: 'Frazione La Riposa',
    //             minAltitude: '900',
    //             maxAltitude: '3100'
    //         });
    //     result.should.have.status(200);
    //     expect(result.body[0]).to.include({
    //         name: 'Test',
    //         latitude: 11.12,
    //         longitude: 11.12931,
    //         country: 'Italy',
    //         region: 'Piemonte',
    //         town: 'Riva presso Chieri',
    //         address: 'Via giacomo puccini 4',
    //         altitude: 1000,
    //         food: "none",
    //         description: null,
    //         openingTime: null,
    //         closingTime: null,
    //         cost: null
    //     })
    // })



    it('GET /api/huts - invalid get Hut - not existing', async () => {
        const result = await agent
            .get('/api/huts')
            .set('content-type', 'application/json')
            .query({
                name: 'wrong testing',
                country: 'Italy',
                region: 'Piemonte',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                minAltitude: '900',
                maxAltitude: '1100'
            });
            expect(result.body).deep.equal([])
    })


    it('GET /api/huts - invalid get Hut - wrong query', async () => {
        const result = await agent
            .get('/api/huts')
            .set('content-type', 'application/json')
            .query({
                name: 'Test',
                country: 'Italy',
                region: 'Piemonte',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                minAltitude: 'altitude x',
                maxAltitude: 'altitude y'
            });

        result.should.have.status(400);
    })


    it('GET /api/huts-and-parking-lots - unauthorized', async () => {
        const result = await agent
            .get('/api/huts-and-parking-lots')
            .set('content-type', 'application/json');
        result.should.have.status(400);
    })

})