const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { INTERNAL } = require('sqlite3')

chai.use(chaiHttp)
chai.should()

const app = require('../index')
var agent = chai.request.agent(app)

describe('Testing all the operations on hikes',function(){
    before(async()=>{
        //maybe create
    })
    after(async()=>{
        //maybe delete
    })

    it('POST /api/hikes', async()=>{
        const result =await agent
        .post('/api/hikes')
        .set('content-type','application/json')
        .send({
            //???
        })
        result.should.not.equal(undefined) //here you would need a real condition
        //like result.should.have.status(201)
        //or expect(result.body).to.deep.equal( {...} )
    })

    it('GET /api/hikes', async()=>{
        const result =await agent
        .get('/api/hikes')

        // console.log(result.body)
        result.body.should.not.equal(undefined) //same here
    })
})