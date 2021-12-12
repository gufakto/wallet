const request = require('supertest')
const app = require("./index")

// const request = supertest.agent(app)

describe('TEST SUITE FOR USERS ROUTES', ()=>{
    it('should successfully access list users: GET /users', async ()=>{
        return await request(app).get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response=>{
                expect(response.statusCode).toEqual(200)
            })
    })

})