const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { INTERNAL } = require('sqlite3')
const { resetHikes, resetLocations, resetGroups, resetHistory } = require('../db/dbreset.js')
chai.use(chaiHttp)
chai.should()

const app = require('../index')
let agent = chai.request.agent(app)

describe('Testing all the operations on hikes', function () {
    before(async () => {
        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'antonio.fracassa@live.it',
                password: 'testPassword2'
            })
        await resetHikes()
        await resetLocations()
    })
    after(async () => {
        //maybe delete
    })

    let hikeId;

    it('POST /api/hikes + GET /api/hikes', async () => {
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

        const resultGET = await agent
            .get('/api/hikes?page=0')
        expect(result.body.id).deep.equal(resultGET.body[1].id)
        hikeId = result.body.id;
    })


    /* ----- set start point ----- */

    it('PUT /api/hike-startPt/:id/:startPt', async () => {
        const result = await agent
            .put('/api/hike-startPt/' + hikeId + '/2')
            .set('content-type', 'application/json');

        result.should.have.status(200);
    });

    it('PUT /api/hike-startPt/:id/:startPt', async () => {
        const result = await agent
            .put('/api/hike-startPt/' + hikeId + '/wrongValue')
            .set('content-type', 'application/json');

        result.should.have.status(422);
    });


    /* ----- set end point ----- */

    it('PUT /api/hike-endPt/:id/:endPt', async () => {
        const result = await agent
            .put('/api/hike-endPt/' + hikeId + '/2')
            .set('content-type', 'application/json');

        result.should.have.status(200);
    });

    it('PUT /api/hike-endPt/:id/:endPt', async () => {
        const result = await agent
            .put('/api/hike-endPt/' + hikeId + '/wrongValue')
            .set('content-type', 'application/json');

        result.should.have.status(422);
    });

})

describe('Testing all the operations on hikes with wrong user', function () {
    before(async () => {
        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'maurizio.merluzzo@donkeykong.com',
                password: 'testPassword1'
            })
    })
    after(async () => {
        //maybe delete
        await resetHikes()
        await resetLocations()
    })

    it('POST /api/hikes + GET /api/hikes', async () => {
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
        result.should.have.status(403)
    })

    it('PUT /api/hike-startPt/:id/:startPt', async () => {
        const result = await agent
            .put('/api/hike-startPt/1/2')
            .set('content-type', 'application/json');

        result.should.have.status(400);
    });

    it('PUT /api/hike-endPt/:id/:endPt', async () => {
        const result = await agent
            .put('/api/hike-endPt/1/2')
            .set('content-type', 'application/json');

        result.should.have.status(400);
    });

})

describe('Testing the status of hikes', function () {
    before(async () => {
        // await agent
        //     .post('/api/signup')
        //     .set('content-type', 'application/json')
        //     .send({
        //         email: 'jen.shiro@chiocciola.it',
        //         password: 'testPassword4',
        //         fullName: 'jenet',
        //         role: 'hutworker',
        //         phoneNumber: '2313124214'
        //     })
        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'jen.shiro@chiocciola.it',
                password: 'testPassword4'
            })
        await resetHikes()
        await resetLocations()
    })
    after(async () => {
        //maybe delete
    })


    it('GET /api/huts/myhut', async () => {
        const result = await agent
            .get('/api/huts/myhut')
            .set('content-type', 'application/json');
        expect(result.body).deep.equal(1);
        result.should.have.status(200)
    });

    it('GET /api/hikesList/:hutId', async () => {
        const hutIdCall = await agent
            .get('/api/huts/myhut')
            .set('content-type', 'application/json');
        const hutId=hutIdCall.body;

        const result = await agent
            .get('/api/hikesList/'+hutId)
            .set('content-type', 'application/json');
        expect(result.body).deep.equal([
            {
              id: 1,
              name: 'Sentiero per il Rocciamelone',
              status: 'closed',
              description: 'mud slide on the main bridge'
            }
          ]);
        result.should.have.status(200)
    });

    it('PUT /api/hikes/:hikeId/status/:hutId', async () => {
        const hikeId=1;
        const hutId=1;
        const result = await agent
            .put('/api/hikes/'+hikeId+'/status/'+hutId)
            .set('content-type', 'application/json')
            .send({
                status: 'closed',
                description: 'mud slide on the main bridge'
            });
        result.should.have.status(200)
    });

    it('PUT /api/hikes/:hikeId/status/:hutId with missing fields', async () => {
        const hikeId=1;
        const hutId=1;
        const result = await agent
            .put('/api/hikes/'+hikeId+'/status/'+hutId)
            .set('content-type', 'application/json')
            .send({
                description: 'all good'
            });
        result.should.have.status(422)
    });

    it('PUT /api/hikes/:hikeId/status/:hutId with wrong hikeId', async () => {
        const hikeId="abcd";
        const hutId=1;
        const result = await agent
            .put('/api/hikes/'+hikeId+'/status/'+hutId)
            .set('content-type', 'application/json')
            .send({
                description: 'all good'
            });
        result.should.have.status(422)
    });


    it('POST api/hike-photo/:id when user is not the author', async () => {
        await agent
            .delete('/api/session/current');
        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'maurizio.merluzzo@donkeykong.com',
                password: 'testPassword1'
            });
        const result = await agent
            .post('/api/hike-photo/1')
            .set('content-type', 'application/json');

        result.should.have.status(403)
    });


    it('POST api/hike-photo/:id inexisting id', async () => {
        const result = await agent
            .post('/api/hike-photo/acab')
            .set('content-type', 'application/json');

        result.should.have.status(422)
    });


    it('POST api/hike-photo/:id without an actual photo', async () => {
        await agent
            .delete('/api/session/current');
        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'antonio.fracassa@live.it',
                password: 'testPassword2'
            });

        const result = await agent
            .post('/api/hike-photo/1')
            .set('content-type', 'application/json');

        result.should.have.status(418)
    });
})

describe('Testing starting and ending operations', function () {
    beforeEach(async () => {
        await agent
        .post('/api/login')
        .set('content-type', 'application/json')
        .send({
            email: 'maurizio.merluzzo@donkeykong.com',
            password: 'testPassword1'
        });
    await resetGroups();
    await resetHistory();
    });


    it('should allow a hiker to start a hike, returning 201', async () => {
        const hikeId = 1;
        const result = await agent
            .post('/api/start-hike')
            .set('content-type', "application/json")
            .send({
                hikeId: hikeId
            });
        result.should.have.status(201);
    });

    it('should return 400 when the user trying to start a hike is not a hiker', async () => {
        const hikeId = 1;
        await agent
            .delete('/api/session/current');

        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'antonio.fracassa@live.it',
                password: 'testPassword2'
            });
        const result = await agent
            .post('/api/start-hike')
            .set('content-type', "application/json")
            .send({
                hikeId: hikeId
            });
        result.should.have.status(400);
    });

    it('should return 404 when the user tries to start a hike while already in a hike', async () => {
        const hikeId = 1;
        const startResult = await agent
            .post('/api/start-hike')
            .set('content-type', "application/json")
            .send({
                hikeId: hikeId
            });
        startResult.should.have.status(201);
        const result = await agent
            .post('/api/start-hike')
            .set('content-type', "application/json")
            .send({
                hikeId: hikeId
            });
        result.should.have.status(404);
    });

    it('should retrieve the ID of the group the user is currently in', async () => {
        const hikeId = 1;
        const startResult = await agent
            .post('/api/start-hike')
            .set('content-type', "application/json")
            .send({
                hikeId: hikeId
        });
        startResult.should.have.status(201);
        const result = await agent
            .get('/api/current-group');
        expect(result.body).to.have.property('groupId').that.equals(1);
        expect(result.body).to.have.property('hikeId').that.equals(1);
    });

    it('should return 204 if the user is not in a group currently in an ongoing hike', async () => {
            const result = await agent
                .get('/api/current-group');
            result.should.have.status(204);
    });

    it('should return 400 when retrieving the current group while not logged in as a hiker', async () => {
        await agent
        .delete('/api/session/current');

        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'antonio.fracassa@live.it',
                password: 'testPassword2'
        });

        const result = await agent
                .get('/api/current-group');
            result.should.have.status(400);
    });

    it('should allow the user to terminate a hike they\'re currently in', async () => {
        const hikeId = 1;
        const startResult = await agent
            .post('/api/start-hike')
            .set('content-type', "application/json")
            .send({
                hikeId: hikeId
            });
        startResult.should.have.status(201);
        const details = await agent
            .get('/api/current-group');
        
        const terminationResult = await agent
            .put('/api/terminate-hike')
            .set('content-type', 'application/json')
            .send({
                hikeId: details.body.hikeId,
                groupId: details.body.groupId
            });
        terminationResult.should.have.status(201);
    });

    it('should return 400 when trying to terminate a hike while not logged in as a hiker', async () => {
        await agent
        .delete('/api/session/current');

        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'antonio.fracassa@live.it',
                password: 'testPassword2'
        });
        
        const terminationResult = await agent
            .put('/api/terminate-hike')
            .set('content-type', 'application/json')
            .send({
                hikeId: 0,
                groupId: 0
            });
        terminationResult.should.have.status(400);
    });

    it('should return 403 when the user tries to terminate a hike the\'re not in (wrong group)', async () => {
        const hikeId = 1;
        const startResult = await agent
            .post('/api/start-hike')
            .set('content-type', "application/json")
            .send({
                hikeId: hikeId
            });
        startResult.should.have.status(201);

        const details = await agent
        .get('/api/current-group');

        const terminationResult = await agent
            .put('/api/terminate-hike')
            .set('content-type', 'application/json')
            .send({
                hikeId: details.body.hikeId,
                groupId: 2
            });
        terminationResult.should.have.status(403);
    });

    it('should return 404 when the user tries to terminate a hike they\'re not in (wrong hikeId)', async () => {
        const hikeId = 1;
        const startResult = await agent
            .post('/api/start-hike')
            .set('content-type', "application/json")
            .send({
                hikeId: hikeId
            });
        startResult.should.have.status(201);

        const details = await agent
        .get('/api/current-group');

        const terminationResult = await agent
            .put('/api/terminate-hike')
            .set('content-type', 'application/json')
            .send({
                hikeId: 2,
                groupId: details.body.groupId
            });
        terminationResult.should.have.status(404);
    });

    it('should return 400 when the user tries to terminate a hike they are in, but that is not ongoing', async () => {
        const hikeId = 1;
        const startResult = await agent
            .post('/api/start-hike')
            .set('content-type', "application/json")
            .send({
                hikeId: hikeId
            });
        startResult.should.have.status(201);

        const details = await agent
        .get('/api/current-group');

        const correctTermination = await agent
            .put('/api/terminate-hike')
            .set('content-type', 'application/json')
            .send({
                hikeId: details.body.groupId,
                groupId: details.body.groupId
            });
        correctTermination.should.have.status(201);
        const invalidTermination = await agent
            .put('/api/terminate-hike')
            .set('content-type', 'application/json')
            .send({
                hikeId: details.body.groupId,
                groupId: details.body.groupId
            });
        invalidTermination.should.have.status(400);
    });

    it('should return the list of completed hikes from the hiker\'s history', async () => {
        const hikeId = 1;
        await agent
            .post('/api/start-hike')
            .set('content-type', "application/json")
            .send({
                hikeId: hikeId
            });

        const details = await agent
            .get('/api/current-group');

        await agent
            .put('/api/terminate-hike')
            .set('content-type', 'application/json')
            .send({
                hikeId: details.body.groupId,
                groupId: details.body.groupId
            });

        const result = await agent
            .get('/api/hikes/completed');
        expect(result.body[0].id).equal(hikeId);
        result.should.have.status(200);
    });

    it('should return [] if there are not completed hikes in the history', async () => {
        const result = await agent
            .get('/api/hikes/completed');
        expect(result.body).deep.equal([]);
        result.should.have.status(200);
    });

    it('should return [] if there are not completed hikes in the history, but there is an ongoing one', async () => {
        const hikeId = 1;
        await agent
            .post('/api/start-hike')
            .set('content-type', "application/json")
            .send({
                hikeId: hikeId
            });

        const result = await agent
            .get('/api/hikes/completed');
            expect(result.body).deep.equal([]);
            result.should.have.status(200);
    });

    it('should return 400 when getting the completed hikes as a user who is not a hiker', async () => {
        await agent
        .delete('/api/session/current');

        await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'antonio.fracassa@live.it',
                password: 'testPassword2'
        });

        const result = await agent
            .get('/api/hikes/completed');
            result.should.have.status(403);
    });
})