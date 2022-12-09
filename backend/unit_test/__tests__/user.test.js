const { login, signup, getPreferences, createPreferences, getPendingUsers, approveUser } = require('../../api/DAOs/userDAO')
const { resetUsers } = require('../../db/dbreset');
const SECONDS = 1000;
jest.setTimeout(20 * SECONDS);

describe('User API tests', () => {
    beforeEach(() => {
        resetUsers();
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

    test('Login before required manager approval should return 403', async () => {
        const loginResult = await login("approvalneeded@polito.it", "testPassword4");
        expect(loginResult).toEqual(403);
    });

    test('Login with non existing email should return 401', async () => {
        const loginResult = await login("wrongemail@polito.it", "whatever");
        expect(loginResult).toEqual(401);
    });

    test('Login with wrong password should return false', async () => {
        const loginResult = await login("maurizio.merluzzo@donkeykong.com", "wrongpassword");
        expect(loginResult).toBe(false);
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

    test('Users waiting for approval should be retrieved when getting pending users', async () => {
        const pendingUsers = await getPendingUsers();
        expect(pendingUsers.length).toEqual(1);
    });

    test('Approving a user should allow them to login', async () => {
        const approvalResult = await approveUser("approvalneeded@polito.it");
        expect(approvalResult).toBe(true);
        const loginResult = await login("approvalneeded@polito.it", "testPassword4");
        const expectedResult = {
            "email": "approvalneeded@polito.it",
            "fullName": "Approval Needed",
            "role": "hutworker",
            "verified": 2
        }
        expect(loginResult).toEqual(expectedResult);
    })
/* 
    test('signup should create a new entry in the Db and return true', async () => {
        const newUser = {
            "id": 2,
            "email": "test2@donkeykong.com",
            "fullname": "test2",
            "password": "abcd0000",
            "role": "hiker",
            "phoneNumber": "3498732362"
        };
        const res = await signup(newUser.email, newUser.fullname, newUser.password, newUser.role, newUser.phoneNumber);
        const expectedResult = {
            "email": "test2@donkeykong.com",
            "fullName": "test2",
            "role": "hiker"
        }
        expect(res).toEqual(expectedResult);
    });

    test('login with the user just created should return the user', async () => {
        const newUser = {
            "id": 1,
            "email": "test1@donkeykong.com",
            "fullname": "test1",
            "password": "abcd0000",
            "role": "hiker",
            "phoneNumber": "3498732362"
        };
        await signup(newUser.email, newUser.fullname, newUser.password, newUser.role, newUser.phoneNumber);
        const user = {
            "email": "test1@donkeykong.com",
            "password": "abcd0000",
        };
        const res = await login(user.email, user.password);
        expect(res.email).toBe('test1@donkeykong.com');
        expect(res.fullName).toBe('test1');
    });

    test('login with non existing user', async () => {
        const newUser = {
            "id": 1,
            "email": "test1@donkeykong.com",
            "fullname": "test1",
            "password": "abcd0000",
            "role": "hiker",
            "phoneNumber": "3498732362"
        };
        await signup(newUser.email, newUser.fullname, newUser.password, newUser.role, newUser.phoneNumber);
        const user = {
            "email": "aoooooooo@donkeykong.com",
            "password": "abcd0000",
        };
        const res = await login(user.email, user.password);
        expect(res).toBe(401);
    });

    test('login with wrong password', async () => {
        const newUser = {
            "id": 1,
            "email": "test1@donkeykong.com",
            "fullname": "test1",
            "password": "abcd0000",
            "role": "hiker",
            "phoneNumber": "3498732362"
        };
        await signup(newUser.email, newUser.fullname, newUser.password, newUser.role, newUser.phoneNumber);
        const user = {
            "email": "test1@donkeykong.com",
            "password": "xdxdxdxdxdxd",
        };
        const res = await login(user.email, user.password);
        expect(res).toBe(false);
    });

    test('creating preferences', async () => {
        const newPref = {
            "email": "maurizio.merluzzo@donkeykong.com",
            "ascent": 13,
            "duration": 14,
        };
        const res = await createPreferences(newPref.email, newPref.ascent, newPref.duration);
        expect(res).toEqual(newPref);
    });

    test('getting preferences', async () => {
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
    */
})