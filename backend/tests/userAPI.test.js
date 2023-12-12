const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
const User = require('../models/userModel')
// const api = supertest(app)
const helper = require('./helperTest')

const request = supertest(app);

beforeEach(async () => {
	// Increasing timeout otherwise sometimes a timeout error can wreck the whole testing phase
    jest.setTimeout(100000) 

	// await User.deleteMany({})
	// await User.insertMany(helper.initialUsers)
})

describe('User Controller - Login', () => {
    test('should log in a user with valid credentials', async () => {
      const userCredentials = {
        email: "Balaji.Sankapal@iiitb.ac.in",
        password: "12345"
      };
  
      const response = await request.post('/api/v1/users/login').send(userCredentials);
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toBeDefined();
      // Add more assertions as needed based on your response structure
    },7000);
  
    test('should handle login failure with invalid credentials', async () => {
      const invalidCredentials = {
        email: "nonexistent@example.com",
        password: "invalidpassword",
      };
  
      const response = await request.post('/api/v1/users/login').send(invalidCredentials);
  
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(undefined);
    //   expect(response.body.error).toBe('User Not Found');
      // Add more assertions as needed based on your response structure
    },7000);
  
    test('should handle login failure with missing credentials', async () => {
      const response = await request.post('/api/v1/users/login').send({});
  
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(undefined);
    //   expect(response.body.error).toBeDefined();
      // Add more assertions as needed based on your response structure
    },7000);
  
  
    afterAll(() => {
        // Close the MongoDB connection after all tests
        mongoose.connection.close();
    });
});

describe('User Registration', () => {
    // Test case for successful user registration
    test('should register a new user', async () => {
      const newuser = {
        name: "Johnny Depp",
        email: "johndepp@example.com",
        password: "123098",
      };
  
      const response = await request.post('/api/v1/users/register').send(newuser).expect(201); // Expecting a 201 Created status
  
      // Additional assertions based on your response format
      expect(response.body.success).toBe(true);
    //   expect(response.body.newUser).toBeDefined();
      expect(response.body.newUser.name).toBe(newUser.name);
      expect(response.body.newUser.email).toBe(newUser.email);
      // Add more assertions as needed
    },7000);
  
    // Test case for registering a user with an existing email (expecting failure)
    test('should fail to register a user with an existing email', async () => {
      const existingUser = {
        name: "Bala",
        email: "Balanapal@iiitb.ac.in",
        password: "098436",
      };
  
      // Register the existing user first
      await request.post('/api/v1/users/register').send(existingUser).expect(201);
  
      // Attempt to register the same user again
      const response = await request.post('/api/v1/users/register').send(existingUser).expect(400); // Expecting a 400 Bad Request status (or another appropriate status)
  
      // Additional assertions based on your response format
      expect(response.body.success).toBe(false);
    //   expect(response.body.error).toBeDefined();
    //   expect(response.body.error).toBe('User with this email already exists.');
      // Add more assertions as needed
    },7000);

    afterAll(() => {
        // Close the MongoDB connection after all tests
        mongoose.connection.close();
    });
});


// describe('Adding New User', () => {
// 	test('valid user is added succesfully', async () => {
// 		const user = {
// 			'name': 'j',
// 			'email': 'usermail@gmail.com',
// 			'password': 'abcdeff'
// 		}

// 		await api
// 			.post('/api/v1/users')
// 			.send(user)
// 			.expect(200)
// 			.expect('Content-Type', /application\/json/)

// 		const users = await helper.usersInDb()
// 		expect(users).toHaveLength(helper.initialUsers.length + 1)

// 		const usernames = users.map(user => user.name)
// 		expect(usernames).toContain('jacob')
// 	})

// 	// test('password less than 3 characters gets 400 response', async () => {
// 	// 	const user = {
// 	// 		'username': 'jj69',
// 	// 		'name': 'JJJ',
// 	// 		'password': '12'
// 	// 	}

// 	// 	await api
// 	// 		.post('/api/users')
// 	// 		.send(user)
// 	// 		.expect(400)
// 	// })

// 	// test('duplicate username rejected and receives 400 response', async () => {
// 	// 	const user = {
// 	// 		'username': 'Sal',
// 	// 		'name': 'Sal Vulcano',
// 	// 		'password': '123456'
// 	// 	}

// 	// 	await api
// 	// 		.post('/api/users')
// 	// 		.send(user)
// 	// 		.expect(400)
// 	// })
// })

