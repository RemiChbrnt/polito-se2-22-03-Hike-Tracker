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
        //         email: 'test@live.it',
        //         password: 'testPassword',
        //         fullName: 'test',
        //         role: 'hiker',
        //         phoneNumber: '2313124214'
        //     })
        // login
        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'test@live.it',
                password: 'testPassword'
            })
    })
    after(async () => {
        //maybe delete
    })

    it('POST /api/user?role=hiker with already existing preferences should give 503', async () => {
        const result = await agent
            .post('/api/user?role=hiker')
            .set('content-type', 'application/json')
            .send({
                email:'test@live.it',
                ascent: '12',
                duration: '12',
              })
        result.should.have.status(503)
    })

    it('GET /api/user?role=hiker', async () => {
        const result = await agent
            .get('/api/user?role=hiker')
        result.should.have.status(200)
    })
})