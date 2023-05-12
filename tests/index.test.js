const { execSync } = require('child_process');
execSync('npm install');
//execSync('npm run seed');

const request = require("supertest")
const { db } = require('../db/connection');
const { User, Show } = require('../models/index')
const { app } = require('../app');
const seed = require("../seed");


describe('./users endpoint', () => {
    // Write your tests here
    
    it("can send successful request", async () => {
        let info = await request(app).get("/users");
        expect(info.statusCode).toBe(200);
    })



    it("can get list of users with correct attributes", async () => {
        let info = await request(app).get("/users");
        expect(info.body[0]).toHaveProperty('username');
        expect(info.body[0]).toHaveProperty('password');
    })

    it("can get list of users", async () => {
        let users = await User.findAll();
        let userdata = JSON.stringify(users)
        let info = await request(app).get("/users");
        //let data = JSON.stringify(info.text);
        expect(users).toEqual([{"id":1,"username":"testUser@gmail.com","password":"ThisIsA","createdAt": "2023-05-12T13:38:25.639Z","updatedAt":"2023-05-12T13:38:25.639Z"},
        {"id":2,"username":"someone@gmail.com","password":"asdfsAS2@1","createdAt":"2023-05-12T13:38:25.640Z","updatedAt":"2023-05-12T13:38:25.640Z"}]);

    })

    it("can get user by id", async (req, res) => {
        let user = await User.findAll({where :{username: "testUser@gmail.com"}}); //get first user in seed
        let response = await request(app).get(`/users/1`); //request first user 
        expect(response).toEqual(user); //request should equal first user
    })


    
})