const mongoose = require('mongoose');

const { loginUser } = require('../../src/services/user.service')
const { hashMethod } = require('../../src/utils/hash.util')
const { generateToken } = require('../../src/utils/jwt.util')

const User = require('../../src/models/user.model')

jest.mock('../../src/models/user.model')
jest.mock('../../src/utils/jwt.util', () => ({
    generateToken: jest.fn(),
}));


describe('Login user', () => {
    afterAll(() => {
        mongoose.connection.close();
    });

    test('Should throw error when username not present in db', async () => {
        const input = {
            username: "rahuldubey010@gmail.com",
            password: "abc123"
        }

        User.findOne.mockResolvedValue(null);

        try {
            await loginUser(input)
        } catch (error) {
            expect(error.message).toBe('Username is not registered with us');
            expect(error.status).toEqual(404);
        }
    });

    test('Should throw error when password is invalid', async () => {
        const input = {
            username: "rahuldubey010@gmail.com",
            password: "xyz123"
        }

        const mockedDBData = {
            username: "rahuldubey010@gmail.com",
            password: hashMethod('abc123' + 'salt'),
            salt: 'salt'
        }

        User.findOne.mockResolvedValue(mockedDBData);

        try {
            await loginUser(input)
        } catch (error) {
            expect(error.message).toBe('Password is wrong!');
            expect(error.status).toEqual(400);
        }
    });

    test('Should able to login when username and password are correct', async () => {
        const input = {
            username: "rahuldubey010@gmail.com",
            password: "abc123"
        }

        const mockedDBData = {
            username: "rahuldubey010@gmail.com",
            password: hashMethod('abc123' + 'salt'),
            salt: 'salt'
        }

        const mockedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6I"

        User.findOne.mockResolvedValue(mockedDBData);
        generateToken.mockReturnValue(mockedToken);

        const result = await loginUser(input)

        expect(User.findOne).toHaveBeenCalledWith({ username: input.username });
        expect(result).toEqual({ token: mockedToken });

    });
});
