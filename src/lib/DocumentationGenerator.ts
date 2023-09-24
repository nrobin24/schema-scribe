import { writeFile } from "fs";
import { promisify } from "util";

// Importing the OpenAI SDK
import { Configuration, OpenAIApi } from "openai";

// Assuming SchemaDefinition is defined in another file
import { SchemaDefinition } from "./SchemaParser";

const writeFileAsync = promisify(writeFile);

class DocumentationGenerator {
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generate(schemas: SchemaDefinition[]): Promise<void> {
    try {
      // Iterate through each schema and generate documentation
      for (const schema of schemas) {
        const documentation = await this.generateSchemaDocumentation(schema);
        await this.writeDocumentationToFile(schema.name, documentation);
      }
    } catch (error) {
      throw new Error(`Failed to generate documentation: ${error.message}`);
    }
  }

  private async generateSchemaDocumentation(
    schema: SchemaDefinition
  ): Promise<string> {
    // Create the document content based on schema using OpenAI API
    try {
      const response = await this.openai.createCompletion({
        engine: "davinci-codex",
        prompt: `Generate documentation for the following schema:\n\n${JSON.stringify(
          schema,
          null,
          2
        )}`,
        maxTokens: 500,
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      throw new Error(
        `Failed to generate documentation for schema ${schema.name}: ${error.message}`
      );
    }
  }

  private async writeDocumentationToFile(
    schemaName: string,
    documentation: string
  ): Promise<void> {
    // Define the output file path
    const filePath = `./docs/${schemaName}.md`;

    // Write the generated documentation to file
    await writeFileAsync(filePath, documentation);
  }
}

export default DocumentationGenerator;
