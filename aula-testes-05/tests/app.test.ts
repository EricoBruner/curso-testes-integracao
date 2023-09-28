import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  });

  it("should return 400 when ask /fibonacci?elements=abc", async () => {
    const { status, text } = await api.get("/fibonacci?elements=abc");
    expect(status).toBe(400);
  });

  it("should return 400 when ask /fibonacci?elements=1", async () => {
    const { status, text } = await api.get("/fibonacci?elements=1");
    expect(status).toBe(400);
  });

  it("should return 400 when elements param is not valid number", async () => {
    const { status, text } = await api.get("/fibonacci?elements=0");
    expect(status).toBe(400);
  });

  it("should return 200 and a fibonacci sequence with n elements", async () => {
    const { status, body } = await api.get("/fibonacci?elements=5");
    expect(status).toBe(200);
    expect(body).toHaveLength(5);
    expect(body).toEqual([0, 1, 1, 2, 3]);
  });
});
