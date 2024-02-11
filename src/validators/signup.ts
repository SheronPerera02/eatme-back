import { Schema } from "ajv";

const signupSchema: Schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        email: {
          type: "string",
          format: "email",
        },
        password: { type: "string", minLength: 6 },
      },
      required: ["email", "password"],
    },
  },
  required: ["body"],
};

export default signupSchema;
