import { resolve } from "path";
import SchemaParser from "../src/lib/SchemaParser";
import { expect } from "chai"; // Assuming you are using chai for assertions

describe("SchemaParser", () => {
  const fixturesDir = resolve(__dirname, "fixtures");

  it("should parse schemas correctly", () => {
    const parser = new SchemaParser(fixturesDir);
    const schemas = parser.parseSchemas();

    expect(schemas).to.be.an("array");
    expect(schemas).to.have.lengthOf(2); // Assuming you have 2 dummy schema files
    // ... other assertions
  });

  // ... other tests
});
