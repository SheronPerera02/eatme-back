import { Schema } from "ajv";

const getAverageOrderValueSchema: Schema = {
  type: "object",
  properties: {
    query: {
      type: "object",
      properties: {
        startDate: {
          type: "string",
        },
        endDate: {
          type: "string",
        },
      },
      required: ["startDate", "endDate"],
    },
  },
  required: ["query"],
};

export default getAverageOrderValueSchema;
