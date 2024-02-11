import { Schema } from "ajv";

const getRefreshTokenSchema: Schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        refreshToken: {
          type: "string",
        },
      },
      required: ["refreshToken"],
    },
  },
  required: ["body"],
};

export default getRefreshTokenSchema;
