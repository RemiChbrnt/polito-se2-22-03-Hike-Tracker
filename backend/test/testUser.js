const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { INTERNAL } = require('sqlite3')
const { resetUsers, resetDeclinedUser1 } = require('../db/dbreset.js')
chai.use(chaiHttp)
chai.should()

const app = require('../index')
var agent = chai.request.agent(app)

describe('User\'s API tests - Signup & Login as a Hiker', function () {
    beforeEach(async () => {
        await resetUsers();
    });

    it('should allow to signup as a Hiker - POST /api/signup', async () => {
        const result = await agent
            .post('/api/signup')
            .set('content-type', 'application/json')
            .send({
                email: 'test@live.it',
                password: 'testPassword',
                fullName: 'test',
                role: 'hiker',
                phoneNumber: '2313124214'
            });

        result.should.have.status(201);
    });

    it('should allow to login as a Hiker', async () => {
        const result = await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'maurizio.merluzzo@donkeykong.com',
                password: 'testPassword1'
            });

        result.should.have.status(201);

        const loggedUserInfo = await agent
            .get('/api/session/current');

        loggedUserInfo.body.should.have.property('email');
        loggedUserInfo.body.should.have.property('fullName');
        loggedUserInfo.body.should.have.property('role');

        expect(loggedUserInfo.body.email).to.equal('maurizio.merluzzo@donkeykong.com');
        expect(loggedUserInfo.body.fullName).to.equal('Maurizio Merlo Petruzzo');
        expect(loggedUserInfo.body.role).to.equal('hiker');
    });

});

describe('User\'s API tests - Hiker\'s preferences management', function () {
    beforeEach(async () => {
        await resetUsers();
    });

    it('should return an empty object when retrieving preferences for a user that has not set them', async () => {
        const loginResult = await agent
        .post('/api/login')
        .set('content-type', 'application/json')
        .send({
            email: 'maurizio.merluzzo@donkeykong.com',
            password: 'testPassword1'
        });
        loginResult.should.have.status(201);

        const preferencesResult = await agent
            .get('/api/preferences')
        expect(preferencesResult.body.body).to.be.empty;
    });

    it('should allow a Hiker to set their preferences', async () => {
        const loginResult = await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'maurizio.merluzzo@donkeykong.com',
                password: 'testPassword1'
            });
        loginResult.should.have.status(201);

        const preferenceSettingResult = await agent
            .post('/api/preferences')
            .set('content-type', 'application/json')
            .send({
                email:'maurizio.merluzzo@donkeykong.com',
                ascent: '1000',
                duration: '2'
            });
        preferenceSettingResult.should.have.status(201);

        const preferences = await agent
            .get('/api/preferences');
        preferences.body.body.should.have.property('email');
        preferences.body.body.should.have.property('duration');
        preferences.body.body.should.have.property('ascent');

        expect(preferences.body.body.email).to.equal('maurizio.merluzzo@donkeykong.com');
        expect(preferences.body.body.duration).to.equal(2);
        expect(preferences.body.body.ascent).to.equal(1000);
    });

    /*
    it('should allow a Hiker to update their preferences after setting them', async () => {
        const loginResult = await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'maurizio.merluzzo@donkeykong.com',
                password: 'testPassword1'
            });
        loginResult.should.have.status(201);

        const preferenceSettingResult = await agent
            .post('/api/preferences')
            .set('content-type', 'application/json')
            .send({
                email:'maurizio.merluzzo@donkeykong.com',
                ascent: '1000',
                duration: '2'
            });
        preferenceSettingResult.should.have.status(201);
        var preferences = await agent
            .get('/api/preferences');
        preferences.body.body.should.have.property('email');
        preferences.body.body.should.have.property('duration');
        preferences.body.body.should.have.property('ascent');

        expect(preferences.body.body.email).to.equal('maurizio.merluzzo@donkeykong.com');
        expect(preferences.body.body.duration).to.equal(2);
        expect(preferences.body.body.ascent).to.equal(1000);

        const preferenceUpdateResult = await agent
            .put('/api/preferences')
            .set('content-type', 'application/json')
            .send({
                email:'maurizio.merluzzo@donkeykong.com',
                ascent: '500',
                duration: '4'
            });
        preferenceUpdateResult.should.have.status(201);
        preferences = await agent
            .get('/api/preferences');
        preferences.body.body.should.have.property('email');
        preferences.body.body.should.have.property('duration');
        preferences.body.body.should.have.property('ascent');

        expect(preferences.body.body.email).to.equal('maurizio.merluzzo@donkeykong.com');
        expect(preferences.body.body.duration).to.equal(4);
        expect(preferences.body.body.ascent).to.equal(500);
    });
    */

    it('should allow a Hiker to delete their preferences after setting them', async () => {
        const loginResult = await agent
        .post('/api/login')
        .set('content-type', 'application/json')
        .send({
            email: 'maurizio.merluzzo@donkeykong.com',
            password: 'testPassword1'
        });
        loginResult.should.have.status(201);

        const preferenceSettingResult = await agent
            .post('/api/preferences')
            .set('content-type', 'application/json')
            .send({
                email:'maurizio.merluzzo@donkeykong.com',
                ascent: '1000',
                duration: '2'
            });
        preferenceSettingResult.should.have.status(201);
        const deletionResult = await agent
            .delete('/api/preferences');

        const emptyPrefs = await agent
            .get('/api/preferences');
        expect(emptyPrefs.body.body).to.be.empty;
    });
});

describe('User\' API tests - Signup & Login as a Local Guide', function () {
    beforeEach(async () => {
        await resetUsers();
    });

    it('should allow to signup as a Local Guide - POST /api/signup', async () => {
        const result = await agent
            .post('/api/signup')
            .set('content-type', 'application/json')
            .send({
                email: 'test@live.it',
                password: 'testPassword',
                fullName: 'test',
                role: 'guide',
                phoneNumber: '2313124214'
            });

        result.should.have.status(201);
    });

    it('should return 403 when a Local Guide tries to log in before having received the manager\'s approval - POST /api/login', async () => {
        const result = await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'fiyode9163@eilnews.com',
                password: 'password'
            });

        result.should.have.status(403);
    });
});

describe('User\' API tests - Signup & Login as a Hut Worker', function () {
    beforeEach(async () => {
        await resetUsers();
    });

    it('should allow to signup as a Hut Worker - POST /api/signup', async () => {
        const result = await agent
            .post('/api/signup')
            .set('content-type', 'application/json')
            .send({
                email: 'test@live.it',
                password: 'testPassword',
                fullName: 'test',
                role: 'hutworker',
                phoneNumber: '2313124214',
                hut: 1
            });

        result.should.have.status(201);
    });

    it('should return 403 when a Hut Worker tries to log in before having received the manager\'s approval - POST /api/login', async () => {
        const result = await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'najejof113@dmonies.com',
                password: 'password'
            });

        result.should.have.status(403);
    });
});

describe('User\'s API tests - Manager approval', function () {
    beforeEach(async () => {
        await resetUsers();
    });

    it('should allow the manager to retrieve the list of pending users', async () => {
        const managerLoginResult = await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'manager@management.com',
                password: 'testPassword3'
            });
        managerLoginResult.should.have.status(201);
        var loggedUserInfo = await agent
            .get('/api/session/current');

        loggedUserInfo.body.should.have.property('email');
        loggedUserInfo.body.should.have.property('fullName');
        loggedUserInfo.body.should.have.property('role');

        expect(loggedUserInfo.body.email).to.equal('manager@management.com');
        expect(loggedUserInfo.body.fullName).to.equal('Managing Manager');
        expect(loggedUserInfo.body.role).to.equal('manager');

        const pendingUsers = await agent
            .get('/api/get-pending-users');
        pendingUsers.body.length.should.equal(2);
    });

    it('should allow the manager to approve the signup of a Local Guide or Hut Worker', async () => {
        const unapprovedLoginResult = await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'fiyode9163@eilnews.com',
                password: 'password'
            });
        unapprovedLoginResult.should.have.status(403);

        const managerLoginResult = await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'manager@management.com',
                password: 'testPassword3'
            });
        managerLoginResult.should.have.status(201);
        var loggedUserInfo = await agent
            .get('/api/session/current');

        loggedUserInfo.body.should.have.property('email');
        loggedUserInfo.body.should.have.property('fullName');
        loggedUserInfo.body.should.have.property('role');

        expect(loggedUserInfo.body.email).to.equal('manager@management.com');
        expect(loggedUserInfo.body.fullName).to.equal('Managing Manager');
        expect(loggedUserInfo.body.role).to.equal('manager');
        
        const approvalResult = await agent
            .put('/api/approve')
            .set('content-type', 'application/json')
            .send({
                email: 'fiyode9163@eilnews.com'
            });
        approvalResult.should.have.status(200);

        const approvedLoginResult = await agent
        .post('/api/login')
        .set('content-type', 'application/json')
        .send({
            email: 'fiyode9163@eilnews.com',
            password: 'password'
        });
        approvedLoginResult.should.have.status(201);
        loggedUserInfo = await agent
            .get('/api/session/current');

        loggedUserInfo.body.should.have.property('email');
        loggedUserInfo.body.should.have.property('fullName');
        loggedUserInfo.body.should.have.property('role');

        expect(loggedUserInfo.body.email).to.equal('fiyode9163@eilnews.com');
        expect(loggedUserInfo.body.fullName).to.equal('Approval Needed');
        expect(loggedUserInfo.body.role).to.equal('guide');
    });

    it('should allow the manager to decline the signup of a Local Guide or Hut Worker', async () => {
        const unapprovedLoginResult = await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'fiyode9163@eilnews.com',
                password: 'password'
            });
        unapprovedLoginResult.should.have.status(403);

        const managerLoginResult = await agent
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({
                email: 'manager@management.com',
                password: 'testPassword3'
            });
        managerLoginResult.should.have.status(201);
        var loggedUserInfo = await agent
            .get('/api/session/current');

        loggedUserInfo.body.should.have.property('email');
        loggedUserInfo.body.should.have.property('fullName');
        loggedUserInfo.body.should.have.property('role');

        expect(loggedUserInfo.body.email).to.equal('manager@management.com');
        expect(loggedUserInfo.body.fullName).to.equal('Managing Manager');
        expect(loggedUserInfo.body.role).to.equal('manager');
        
        const declineResult = await agent
            .delete('/api/approve')
            .set('content-type', 'application/json')
            .send({
                email: 'fiyode9163@eilnews.com'
            });
        declineResult.should.have.status(200);

        const declinedLoginResult = await agent
        .post('/api/login')
        .set('content-type', 'application/json')
        .send({
            email: 'fiyode9163@eilnews.com',
            password: 'password'
        });
        declinedLoginResult.should.have.status(401);
        await resetDeclinedUser1();
    });
});