import * as fs from "fs";
import * as path from "path";

interface SchemaField {
  name: string;
  type: string;
}

export interface SchemaDefinition {
  name: string;
  type: string;
  fields: SchemaField[];
}

class SchemaParser {
  constructor(private schemaDirectory: string) {
    // Validate the schemaDirectory path
    if (!fs.existsSync(schemaDirectory)) {
      throw new Error(`Schema directory not found: ${schemaDirectory}`);
    }
  }

  // Method to read and parse all schema files in the specified directory
  async parseSchemas(): Promise<SchemaDefinition[]> {
    const schemaFiles = this.getSchemaFiles();
    const schemas: SchemaDefinition[] = [];

    for (const file of schemaFiles) {
      const filePath = path.join(this.schemaDirectory, file);
      const schemaModule = await import(filePath);
      const schemaDefinition: SchemaDefinition = schemaModule.default;
      schemas.push(schemaDefinition);
    }

    return schemas;
  }

  // Method to get the list of schema files in the specified directory
  private getSchemaFiles(): string[] {
    const files = fs.readdirSync(this.schemaDirectory);
    return files.filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
  }
}

export default SchemaParser;
