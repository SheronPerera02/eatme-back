import { Schema } from "ajv";

const signupConfirmationSchema: Schema = {
  type: "object",
  properties: {
    query: {
      type: "object",
      properties: {
        token: { type: "string" },
        email: {
          type: "string",
          format: "email",
        },
      },
      required: ["token", "email"],
    },
  },
  required: ["query"],
};

export default signupConfirmationSchema;
