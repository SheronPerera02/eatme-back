import { Schema } from "ajv";

const getTotalSalesSchema: Schema = {
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
        interval: {
          enum: ["daily", "weekly", "monthly"],
        },
        page: {
          type: "string",
        },
        limit: {
          type: "string",
        },
      },
      required: ["startDate", "endDate"],
    },
  },
  required: ["query"],
};

export default getTotalSalesSchema;
