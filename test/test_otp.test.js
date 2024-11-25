const request = require("supertest");
const BASE_URL = "http://localhost:3000/api/v1";

describe("verifyphone", () => {
  const URL = "/auth/verifyPhone";
  test("validate phone fail", async () => {
    const response = await request(BASE_URL).post(URL).send({});
    expect(response.status).toBe(400);
  });
  test("validate phone", async () => {
    const response = await request(BASE_URL)
      .post(URL)
      .send({ id: "6571ef2a5c83ab95d81322db", otp: "856503" });
    expect(response.status).toBe(400);
  });
});
