import app from "../src/app";
import supertest from "supertest";

const server = supertest(app);

describe("app", () => {
  it("retornar ok quando buscar a rota health", async () => {
    const { statusCode } = await server.get("/health");

    expect(statusCode).toEqual(200);
  });
});
