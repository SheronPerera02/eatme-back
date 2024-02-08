import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import db from "../config/db";
import { Op } from "sequelize";

const JWT_SECRET = process.env.JWT_SECRET || "";
const APP_BASE = process.env.APP_BASE;
const API_BASE = process.env.API_BASE;

const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "enosh.sheron@gmail.com",
    pass: "fJNyxY5Zhb3vOMPm",
  },
});

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await db.user.findOne({
    where: {
      email,
    },
  });
  if (!user)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid credentials",
    });

  const passwordIsValid = await bcrypt.compare(
    password,
    user.getDataValue("password"),
  );

  if (!passwordIsValid)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid credentials",
    });

  const accessToken = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(StatusCodes.OK).json({
    message: "Signed in successfully",
    data: {
      accessToken,
    },
  });
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const pendingRegistration = await db.registration.findOne({
    where: {
      email,
      expiration: {
        [Op.gt]: new Date(),
      },
    },
  });
  if (pendingRegistration)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: `A registration confirmation already pending for this email: ${email}`,
    });
  const user = await db.user.findOne({
    where: {
      email,
    },
  });
  if (user)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Email already in use",
    });

  const hashedPassword = await bcrypt.hash(password, 12);
  const token = crypto.randomBytes(10).toString("hex");

  const createdRegistration = await db.registration.create({
    token,
    expiration: new Date(new Date().getTime() + 1000 * 60 * 60 * 2),
    email,
    password: hashedPassword,
  });

  if (!createdRegistration) return next(new Error());

  const confirmationLink = `${API_BASE}/auth/signup/confirmation?token=${token}&email=${email}`;

  const mailOptions = {
    from: "enosh.sheron@gmail.com",
    to: email,
    subject: "EatMe: Registration Confirmation",
    html: `
          <p>Click on the following link to confirm your registration:</p>
          <a href="${confirmationLink}" target="_blank">Confirm</a>
     `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return next(new Error());
    res
      .status(StatusCodes.OK)
      .json({ message: `Registration confirmation sent to: ${email}` });
  });
};

const signupConfirmation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token, email } = req.query;
  if (!token || !email)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing confirmation credentials" });

  const registration = await db.registration.findOne({
    where: {
      email: email as string,
      token: token as string,
      expiration: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!registration) return next(new Error());

  const createdUser = await db.user.create({
    email: registration.getDataValue("email"),
    password: registration.getDataValue("password"),
  });

  if (!createdUser) return next(new Error());

  await db.registration.destroy({
    where: { email: registration.getDataValue("email") },
  });

  const accessToken = jwt.sign(
    { email: createdUser.getDataValue("email") },
    JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.redirect(`${APP_BASE}?accessToken=${accessToken}`);
};

export default {
  signup,
  signin,
  signupConfirmation,
};
