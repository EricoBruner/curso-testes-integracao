import calculator from "../src/calculator";

describe("testes sobre a calculadora", () => {
  it("soma de dois números", () => {
    expect(calculator.sum(2, 2)).toBe(4);
  });

  it("subtração de dois números", () => {
    expect(calculator.sub(2, 2)).toBe(0);
  });

  it("multiplicação de dois números", () => {
    expect(calculator.mul(2, 3)).toBe(6);
  });

  it("divisão de dois números", () => {
    expect(calculator.div(6, 2)).toBe(3);
  });
});
