import { resolve } from "path";
import SchemaParser from "../src/lib/SchemaParser";
import { expect } from "chai";

describe("SchemaParser", () => {
  const fixturesDir = resolve(__dirname, "fixtures");

  it("should parse schemas correctly", async () => {
    // Mark this function as async
    const parser = new SchemaParser(fixturesDir);
    const schemas = await parser.parseSchemas(); // Await the result here

    expect(schemas).to.be.an("array");
    expect(schemas).to.have.lengthOf(2); // Assuming you have 2 dummy schema files
    // ... other assertions
  });

  // ... other tests
});
