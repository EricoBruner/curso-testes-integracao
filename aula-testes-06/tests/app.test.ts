import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  describe("Event:", () => {
    it("return 200 and event with send /event", async () => {
      const { status, body } = await api.get("/event");
      expect(status).toEqual(200);
      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          image: expect.any(String),
          date: expect.any(String),
        })
      );
    });
  });
});
