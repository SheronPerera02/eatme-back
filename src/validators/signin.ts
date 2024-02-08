import { Schema } from "ajv";

const signinSchema: Schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
  },
  required: ["email", "password"],
};

export default signinSchema;
