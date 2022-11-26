const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { INTERNAL } = require('sqlite3')
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

    it('POST /api/parking with erroneous latitude', async () => {
        const result = await agent
            .post('/api/parking')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
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

    it('POST /api/parking with negative lotsNumber', async () => {
        const result = await agent
            .post('/api/parking')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
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

    it('POST /api/parking', async () => {
        const result = await agent
            .post('/api/parking')
            .set('content-type', 'application/json')
            .send({
                name: 'Test',
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
        expect(result.body).deep.equal({})
    })
})