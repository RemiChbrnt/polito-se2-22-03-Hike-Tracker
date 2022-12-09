const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { INTERNAL } = require('sqlite3')
const { resetUsers } = require('../db/dbreset.js')

const { MailSlurp } = require('mailslurp-client');
const api = new MailSlurp({ apiKey: process.env.API_KEY });
chai.use(chaiHttp)
chai.should()

const app = require('../index')
var agent = chai.request.agent(app)

describe('Testing user signup', () => {
    it('can sign up as a new user', async () => {
        const inbox = await generateNewEmailAddress();
        await agent
            .post('/api/signup')
            .set('content-type', 'application/json')
            .send({
                email: inbox.email,
                password: 'password',
                fullName: 'test',
                role: 'hiker'
            });

        
    })
})

describe('Testing all the operations on users', function () {
    before(async () => {
        await resetUsers()
        //signup 
        await agent
            .post('/api/signup')
            .set('content-type', 'application/json')
            .send({
                email: 'test@live.it',
                password: 'testPassword',
                fullName: 'test',
                role: 'hiker',
                phoneNumber: '2313124214'
            })
        //login
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

    it('POST /api/preferences to add the preference', async () => {
        const result = await agent
            .post('/api/preferences')
            .set('content-type', 'application/json')
            .send({
                email:'test@live.it',
                ascent: '12',
                duration: '12',
              })
        result.should.have.status(201)
    })

    it('POST /api/preferences with already existing preferences should give 503', async () => {
        const result = await agent
            .post('/api/preferences')
            .set('content-type', 'application/json')
            .send({
                email:'test@live.it',
                ascent: '12',
                duration: '12',
              })
        result.should.have.status(503)
    })

    it('GET /api/preferences', async () => {
        const result = await agent
            .get('/api/preferences')
        result.should.have.status(200)
    })
})