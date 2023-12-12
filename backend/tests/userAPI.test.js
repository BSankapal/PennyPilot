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
        email: 'balaji.sankapal@iiitb.ac.in',
        password: '12345',
      };
  
      const response = await request.post('/api/v1/users/login').send(userCredentials);
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toBeDefined();
      // Add more assertions as needed based on your response structure
    });
  
    // it('should handle login failure with invalid credentials', async () => {
    //   const invalidCredentials = {
    //     email: 'nonexistent@example.com',
    //     password: 'invalidpassword',
    //   };
  
    //   const response = await request.post('/api/v1/users/login').send(invalidCredentials);
  
    //   expect(response.status).toBe(404);
    //   expect(response.body.success).toBe(false);
    //   expect(response.body.error).toBe('User Not Found');
    //   // Add more assertions as needed based on your response structure
    // });
  
    // it('should handle login failure with missing credentials', async () => {
    //   const response = await request.post('/api/v1/users/login').send({});
  
    //   expect(response.status).toBe(400);
    //   expect(response.body.success).toBe(false);
    //   expect(response.body.error).toBeDefined();
    //   // Add more assertions as needed based on your response structure
    // });
  
    // Add more test cases as needed
  
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

