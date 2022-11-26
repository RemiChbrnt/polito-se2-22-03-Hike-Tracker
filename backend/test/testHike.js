const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { INTERNAL } = require('sqlite3')

chai.use(chaiHttp)
chai.should()

const app = require('../index')
var agent = chai.request.agent(app)

describe('Testing all the operations on hikes', function () {
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
        // await agent
        //     .post('/api/login')
        //     .set('content-type', 'application/json')
        //     .send({
        //         email: 'antonio.fracassa@live.it',
        //         password: 'testPassword2'
        //     })
    })
    after(async () => {
        //maybe delete
    })

    it('POST /api/hikes', async () => {
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

        const result = await agent
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
            })
        result.should.have.status(201)
        expect(result.body.id).not.equal(undefined)
    })

    it('GET /api/hikes', async () => {
        const result = await agent
            .get('/api/hikes')
        expect(result.body.length >= 1).equal(true)
    })
})