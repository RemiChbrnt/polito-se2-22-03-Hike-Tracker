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
                province: 'Torino',
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
                province: 'Torino',
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
                province: 'Torino',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: '1000',
                description: 'description (optional)',
                lotsNumber: '10'
              })
        result.should.have.status(201)
        expect(result.body.id!==undefined).deep.equal(true)
    })

    it('POST /api/locations - Creating a valid Hut', async() => {
        const result = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'hut',
                latitude: '11.12',
                longitude: '11.12931',
                country: 'Italy',
                province: 'Torino',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: '1000',
                numberOfBeds: '10',
                food: 'none'
            });
        result.should.have.status(201);
        expect(result.body.id!==undefined).deep.equal(true);
    });

    it('POST /api/locations - Creating a invalid Hut - Invalid coordinates', async() => {
        const result = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'hut',
                latitude: '-11.12',
                longitude: 'dasfsdafasd',
                country: 'Italy',
                province: 'Torino',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: 'werf',
                description: 'description (optional)',
                numberOfBeds: '10',
                food: 'none'
            });
        result.should.have.status(422);
    });
    
    it('POST /api/locations - Creating a invalid Hut - Invalid number of beds', async() => {
        const result = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'hut',
                latitude: '11.12',
                longitude: '13121.12',
                country: 'Italy',
                province: 'Torino',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: '1000',
                description: 'description (optional)',
                numberOfBeds: 'invalid',
                food: 'none'
            });
        result.should.have.status(422);
    });

    it('POST /api/locations - Creating a invalid Hut - Invalid food type (not none, buffet or restaurant)', async() => {
        const result = await agent
            .post('/api/locations')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
                type: 'hut',
                latitude: '11.12',
                longitude: '13121.12',
                country: 'Italy',
                province: 'Torino',
                town: 'Riva presso Chieri',
                address: 'Via giacomo puccini 4',
                altitude: '1000',
                description: 'description (optional)',
                numberOfBeds: '12',
                food: 'invalid'
            });
        result.should.have.status(422);
    });

    it('POST /api/linkHut - Linking a valid hut to an existing hike', async() => {
        const p1 = await agent
        .post('/api/locations')
        .set('content-type', 'application/json')
        .send({
            name: 'P1',
            type: 'generic',
            latitude: 45.178734750000004,
            longitude: 7.081576685703124,
            country: 'Italy',
            province: 'Torino',
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
            province: 'Torino',
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
                province: 'Torino',
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

    it('POST /api/linkHut - Linking a hut to a hike - Invalid hut/hike ID', async() => {
        const linkResult = await agent
            .post('/api/linkHut')
            .set('content-type', 'application/json')
            .send({
                hikeId: 'invalid',
                hutId: 'invalid'
            });
        linkResult.should.have.status(422);
    })
})