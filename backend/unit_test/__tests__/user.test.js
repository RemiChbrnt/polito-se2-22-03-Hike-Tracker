const { login, signup, getPreferences, createPreferences, getPendingUsers, approveUser, declineUser } = require('../../api/DAOs/userDAO')
const { resetUsers, resetDeclinedUser1, resetDeclinedUser2 } = require('../../db/dbreset');
const SECONDS = 1000;
jest.setTimeout(20 * SECONDS);

describe('User API tests - Signup & Login as Hiker', () => {
    beforeEach(async () => {
        await resetUsers();
    });

    test('Signup should create a new entry in the database and return email, full name and role of the user', async () => {
        const newUser = {
            "id": 2,
            "email": "test@test.com",
            "fullname": "test",
            "password": "abcd0000",
            "role": "hiker",
            "phoneNumber": "3498732362"
        }
        const result = await signup(newUser.email, newUser.fullname, newUser.password, newUser.role, newUser.phoneNumber);
        const expectedResult = {
            "email": "test@test.com",
            "fullName": "test",
            "role": "hiker"
        }
        expect(result).toEqual(expectedResult);
    });

    test('Login before verifying email should return 412', async () => {
        const newUser = {
            "id": 2,
            "email": "test2@test.com",
            "fullname": "test2",
            "password": "abcd0000",
            "role": "hiker",
            "phoneNumber": "3498732362"
        }
        const signupResult = await signup(newUser.email, newUser.fullname, newUser.password, newUser.role, newUser.phoneNumber);
        const expectedResult = {
            "email": "test2@test.com",
            "fullName": "test2",
            "role": "hiker"
        }
        expect(signupResult).toEqual(expectedResult);

        const loginResult = await login(newUser.email, newUser.password);
        expect(loginResult).toEqual(412);
    });

    test('Successful login should return logged user\'s email, full name, role and verified status', async () => {
        const loginResult = await login("maurizio.merluzzo@donkeykong.com", "testPassword1");
        const expectedResult = {
            "email": "maurizio.merluzzo@donkeykong.com",
            "fullName": "Maurizio Merlo Petruzzo",
            "role": "hiker",
            "verified": 1
        }
        expect(loginResult).toEqual(expectedResult);
    });

});

describe('User API tests - Hiker\'s preferences management', () => {
    beforeEach(async () => {
        await resetUsers();
    });
    
    test('Getting preferences for a user without preferences should return an empty object', async () => {
        const preferences = await getPreferences("maurizio.merluzzo@donkeykong.com");
        expect(preferences).toEqual({});
    });

    test('Setting preferences should return the new preferences', async () => {
        const preferences = {
            "email": "maurizio.merluzzo@donkeykong.com",
            "duration": 6,
            "ascent": 7
        }
        const preferencesResult = await createPreferences(preferences.email, preferences.ascent, preferences.duration);
        expect(preferencesResult).toEqual(preferences);
    });

    test('Setting and getting new preferences should return the preference just set', async() => {
        const newUser = {
            "id": 1,
            "email": "test1@donkeykong.com",
            "fullname": "test1",
            "password": "abcd0000",
            "role": "hiker",
            "phoneNumber": "3498732362"
        };
        await signup(newUser.email, newUser.fullname, newUser.password, newUser.role, newUser.phoneNumber);
        const newPref = {
            "email": "test1@donkeykong.com",
            "ascent": 13,
            "duration": 14,
        };
        await createPreferences(newPref.email, newPref.ascent, newPref.duration);
        const res = await getPreferences(newPref.email);
        expect(res).toEqual(newPref);
    });

});

describe('User API tests - Signup, Login and Manager Approval as Local Guide', () => {
    beforeEach(async () => {
        await resetUsers();
    });

    test('Signup should create a new entry in the database and return email, full name and role of the user', async () => {
        const newUser = {
            "id": 2,
            "email": "test@test.com",
            "fullname": "test",
            "password": "abcd0000",
            "role": "guide",
            "phoneNumber": "3498732362"
        }
        const result = await signup(newUser.email, newUser.fullname, newUser.password, newUser.role, newUser.phoneNumber);
        const expectedResult = {
            "email": "test@test.com",
            "fullName": "test",
            "role": "guide"
        }
        expect(result).toEqual(expectedResult);
    });

    test('Login before required manager approval should return 403', async () => {
        const loginResult = await login("fiyode9163@eilnews.com", "password");
        expect(loginResult).toEqual(403);
    });

    test('Users waiting for approval should be retrieved when getting pending users', async () => {
        const pendingUsers = await getPendingUsers();
        expect(pendingUsers.length).toEqual(2);
    });

    test('Approving a user should allow them to login', async () => {
        const approvalResult = await approveUser("fiyode9163@eilnews.com");
        expect(approvalResult).toBe(true);
        const loginResult = await login("fiyode9163@eilnews.com", "password");
        const expectedResult = {
            "email": "fiyode9163@eilnews.com",
            "fullName": "Approval Needed",
            "role": "guide",
            "verified": 2
        }
        expect(loginResult).toEqual(expectedResult);
    });

    test('Declining a user should delete them from the db', async () => {
        const declineResult = await declineUser("fiyode9163@eilnews.com");
        expect(declineResult).toBe(true);
        const loginResult = await login("fiyode9163@eilnews.com", "password");
        expect(loginResult).toEqual(401);
        await resetDeclinedUser1();
    });
});

describe('User API tests - Signup, Login and Manager Approval as Hut Worker', () => {
    beforeEach(async () => {
        await resetUsers();
    });

    test('Signup should create a new entry in the database and return email, full name and role of the user', async () => {
        const newUser = {
            "id": 2,
            "email": "test@test.com",
            "fullname": "test",
            "password": "abcd0000",
            "role": "hutworker",
            "phoneNumber": "3498732362",
            "hut": 1
        }
        const result = await signup(newUser.email, newUser.fullname, newUser.password, newUser.role, newUser.phoneNumber, newUser.hut);
        const expectedResult = {
            "email": "test@test.com",
            "fullName": "test",
            "role": "hutworker"
        }
        expect(result).toEqual(expectedResult);
    });

    test('Login before required manager approval should return 403', async () => {
        const loginResult = await login("najejof113@dmonies.com", "password");
        expect(loginResult).toEqual(403);
    });

    test('Users waiting for approval should be retrieved when getting pending users', async () => {
        const pendingUsers = await getPendingUsers();
        expect(pendingUsers.length).toEqual(2);
    });

    test('Approving a user should allow them to login', async () => {
        const approvalResult = await approveUser("najejof113@dmonies.com");
        expect(approvalResult).toBe(true);
        const loginResult = await login("najejof113@dmonies.com", "password");
        const expectedResult = {
            "email": "najejof113@dmonies.com",
            "fullName": "Unapproved Hutworker",
            "role": "hutworker",
            "verified": 2,
            "hut" : 1,
        }
        expect(loginResult).toEqual(expectedResult);
    });

    test('Declining a user should delete them from the db', async () => {
        const declineResult = await declineUser("najejof113@dmonies.com");
        expect(declineResult).toBe(true);
        const loginResult = await login("najejof113@dmonies.com", "password");
        expect(loginResult).toEqual(401);
        await resetDeclinedUser2();
    });
});

describe('User API tests - Unsuccessful login handling', () => {
    beforeEach(async () => {
        await resetUsers();
    });

    test('Login with non existing email should return 401', async () => {
        const loginResult = await login("wrongemail@polito.it", "whatever");
        expect(loginResult).toEqual(401);
    });

    test('Login with wrong password should return false', async () => {
        const loginResult = await login("maurizio.merluzzo@donkeykong.com", "wrongpassword");
        expect(loginResult).toBe(false);
    });
});