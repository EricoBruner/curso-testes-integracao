import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const { body, status } = await api.post("/users").send({
      email: "erico@gmail.com",
      password: "erico",
    });

    expect(status).toBe(201);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        email: "erico@gmail.com",
        password: expect.any(String),
      })
    );
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    await api.post("/users").send({
      email: "erico@gmail.com",
      password: "erico",
    });

    const { status } = await api.post("/users").send({
      email: "erico@gmail.com",
      password: "erico",
    });

    expect(status).toBe(409);
  });
});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    await api.post("/users").send({
      email: "erico@gmail.com",
      password: "erico",
    });

    const { status, body } = await api.get("/users");

    expect(status).toBe(200);
    expect(body).toHaveLength(1);
  });

  it("should return 404 when can't find a user by id", async () => {
    const { status } = await api.get("/users:1");

    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    await api.post("/users").send({
      email: "erico@gmail.com",
      password: "erico",
    });

    await api.post("/users").send({
      email: "vitor@gmail.com",
      password: "erico",
    });

    await api.post("/users").send({
      email: "claus@gmail.com",
      password: "erico",
    });

    const { status, body } = await api.get("/users");

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: expect.any(String),
        }),
      ])
    );
  });
});
