const { login, signup, clearDatabase } = require('../__mocks__/mockUserDAO')
const SECONDS = 1000;
jest.setTimeout(20 * SECONDS);

describe('User API tests', () => {
    beforeEach(() => {
        clearDatabase();
    });

    test('signup should create a new entry in the Db and return true', async () => {
        const newUser = {
            "id" : 2,
            "email" : "test2@donkeykong.com",
            "fullname" : "test2",
            "password" : "abcd0000",
            "role" : "hiker",
            "phoneNumber" : "3498732362"
        };
        const res=await signup(newUser.email,newUser.fullname,newUser.password,newUser.role,newUser.phoneNumber);
        expect(res).toBe(true);
    });

    test('login with the user just created should return the user', async () => {
        const newUser = {
            "id" : 1,
            "email" : "test1@donkeykong.com",
            "fullname" : "test1",
            "password" : "abcd0000",
            "role" : "hiker",
            "phoneNumber" : "3498732362"
        };
        await signup(newUser.email,newUser.fullname,newUser.password,newUser.role,newUser.phoneNumber);
        const user = {
            "email" : "test1@donkeykong.com",
            "password" : "abcd0000",
        };
        const res=await login(user.email,user.password);
        expect(res.email).toBe('test1@donkeykong.com');
        expect(res.fullName).toBe('test1');
    });

    test('login with non existing user', async () => {
        const newUser = {
            "id" : 1,
            "email" : "test1@donkeykong.com",
            "fullname" : "test1",
            "password" : "abcd0000",
            "role" : "hiker",
            "phoneNumber" : "3498732362"
        };
        await signup(newUser.email,newUser.fullname,newUser.password,newUser.role,newUser.phoneNumber);
        const user = {
            "email" : "aoooooooo@donkeykong.com",
            "password" : "abcd0000",
        };
        const res=await login(user.email,user.password);
        expect(res).toBe(false);
    });

    test('login with wrong password', async () => {
        const newUser = {
            "id" : 1,
            "email" : "test1@donkeykong.com",
            "fullname" : "test1",
            "password" : "abcd0000",
            "role" : "hiker",
            "phoneNumber" : "3498732362"
        };
        await signup(newUser.email,newUser.fullname,newUser.password,newUser.role,newUser.phoneNumber);
        const user = {
            "email" : "test1@donkeykong.com",
            "password" : "xdxdxdxdxdxd",
        };
        const res=await login(user.email,user.password);
        expect(res).toBe(false);
    });
})