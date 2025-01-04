import "dotenv/config";
import { Request, Response } from "express";
import { join } from "path";
import { cwd } from "process";
import { readFile, writeFile } from "../utils/readWriteFile";
import User from "../models/UserType";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getErrorMessage from "../utils/getErrorMessage";

const path = join(cwd(), "data", "users.json");

const v_noEmptyFields = (input: string[]) => {
  let fail = false;
  input.forEach((input) => {
    if (!input) fail = true;
  });
  if (fail) throw new Error("all fields must be filled out");
};

const v_userFound = (user: User) => {
  if (!user) throw new Error("username incorrect");
};

const v_usernameAlphanumeric = (username: string) => {
  if (!validator.isAlphanumeric(username))
    throw new Error("username must be alphanumeric");
};

const v_strongPassword = (password: string) => {
  const pwOpts = {
    minLength: 7,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  };
  if (!validator.isStrongPassword(password, pwOpts))
    throw new Error(
      `password must contain at least ${pwOpts.minLength} characters, including ${pwOpts.minLowercase} lowercase, ${pwOpts.minUppercase} uppercase, ${pwOpts.minNumbers} number(s) and ${pwOpts.minSymbols} symbol(s)`
    );
};

const v_passwordCorrect = (password: string, user: User, old?: string) => {
  const match = bcrypt.compareSync(password, user.password);
  if (!match)
    throw new Error(old ? "old password incorrect" : "password incorrect");
};

const v_newPasswords = (newPassword1: string, newPassword2: string) => {
  if (newPassword1 !== newPassword2)
    throw new Error("new passwords don't match");
};

export const getUser = async (username: string) => {
  const users: User[] = await readFile(path);
  const index: number = users.findIndex(
    (user: User) => user.username === username
  );
  const user = users[index];
  return { users, index, user };
};

const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const getNewUser = async (username: string, password: string) => {
  return { username, password: await encryptPassword(password) };
};

const secret = process.env.SECRET;
if (!secret) throw new Error("no SECRET defined in .env");

const createToken = (username: string) => {
  return jwt.sign({ username }, secret, { expiresIn: "3d" });
};

const signupUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    v_noEmptyFields([username, password]);
    v_usernameAlphanumeric(username);
    v_strongPassword(password);

    const { users: oldUsers, index } = await getUser(username);
    if (index >= 0) throw new Error("username already in use");

    const newUser = await getNewUser(username, password);
    await writeFile(path, [...oldUsers, newUser]);

    const token = createToken(username);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

const signinUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    v_noEmptyFields([username, password]);

    const { user } = await getUser(username);
    v_userFound(user);
    v_passwordCorrect(password, user);

    const token = createToken(username);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { username, newPassword1, newPassword2 } = req.body;
    v_noEmptyFields([username, newPassword1, newPassword2]);

    const { user, index, users } = await getUser(username);
    v_userFound(user);
    v_strongPassword(newPassword1);
    v_newPasswords(newPassword1, newPassword2);

    const updatedUser = await getNewUser(username, newPassword1);

    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    updatedUsers.push(updatedUser);

    await writeFile(path, updatedUsers);

    const token = createToken(username);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    v_noEmptyFields([username]);

    const { user, index, users } = await getUser(username);
    v_userFound(user);

    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);

    await writeFile(path, updatedUsers);

    res.status(200).json({ username });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export { signinUser, signupUser, changeUserPassword, deleteUser };
