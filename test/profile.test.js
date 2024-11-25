const request = require("supertest");

const BASE_URL = "http://localhost:3000/api/v1";

describe("Profile login", () => {
    const URL = '/auth/login'
    // test('login', async () => {
    //     const response = await request(BASE_URL).post(URL).send({"phone":"+919072084911","password":"Qwerty@123"})
    //     console.log(response.body)
    //     expect(response.status).toBe(200)
    // })

    test('profile', async () => {
        const response = await request(BASE_URL)
          .get("/profile")
          .set(
            "Authorization",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW5vb3AgQXNob2siLCJpZCI6IjY1NzFlZjJhNWM4M2FiOTVkODEzMjJkYiIsInBob25lIjoiKzkxOTA3MjA4NDkxMSIsImlhdCI6MTcwMjEyMTI2M30.LqGBAtCb4K0ChuHVGjSvbCADSGDqEJM6CHnmY1Gzm4s"
          )
          .send({});
        expect(response.status).toBe(200)
    })
});
