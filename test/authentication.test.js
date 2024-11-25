const request = require('supertest')
const express = require("express");

const BASE_URL = "http://localhost:3000/api/v1";

describe('Register testing', () => {
    const URL = "/auth/register";
    test('POST empty request for user registration', async () => {
        const response = await request(BASE_URL).post(
          URL
        ).send({});
        expect(response.status).toBe(400)
    })

    test('POST type check for object', async () => {
        const response = await request(BASE_URL).post(URL).send({})
        expect(response.status).toBe(400)
    })

    // test('successful registration', async () => {
    //     const response = await request(BASE_URL)
    //       .post(URL)
    //       .send({
    //         name: "Anoop Ashok",
    //         phone: "+919072084911",
    //         password: "Qwerty@123",
    //         dob: "2009-12-07 17:48:02.906",
    //       });
    //     expect(response.status).toBe(200)
    // })

    
})

describe('test trigger otp url', () => {
    const URL = "/auth/triggerOTP";
    test("trigger otp fail", async () => {
        const response = await request(BASE_URL).post(URL).send({})
        expect(response.status).toBe(400)
    });
    test("trigger otp success", async () => {
      const response = await request(BASE_URL)
        .post(URL)
        .send({ id: "6571ef2a5c83ab95d81322db" });
      expect(response.status).toBe(200);
    });
})
