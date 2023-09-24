// Importing necessary classes and types from your library
import SchemaParser from "./lib/SchemaParser";
import DocumentationGenerator from "./lib/DocumentationGenerator";

// If you have any types you wish to export, import them here
// import { SomeType } from './types';

// Main function to orchestrate schema parsing and documentation generation
async function generateDocumentation(
  schemaDirectory: string,
  openAIKey: string
): Promise<void> {
  try {
    const parser = new SchemaParser(schemaDirectory);
    const schemas = parser.parseSchemas();

    const docGenerator = new DocumentationGenerator(openAIKey);
    await docGenerator.generate(schemas);

    console.log("Documentation generated successfully!");
  } catch (error) {
    console.error("Error generating documentation:", error);
  }
}

// Exporting your library's main function and any necessary classes/types for external use
export {
  generateDocumentation,
  SchemaParser,
  DocumentationGenerator,
  // SomeType,  // If you have types to export
};
