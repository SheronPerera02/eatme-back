import { Schema } from "ajv";

const signinSchema: Schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        email: {
          type: "string",
          format: "email",
        },
        password: { type: "string" },
      },
      required: ["email", "password"],
    },
  },
  required: ["body"],
};

export default signinSchema;
