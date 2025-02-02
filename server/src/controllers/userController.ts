import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

export interface IRequestWithUser extends Request {
  user?: {
    id: number;
    username: string;
    password_hash: string;
  }
}

dotenv.config();

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body.user;

  try {
    console.log("Пришел запрос", req.body)
    const user = await User.query().where("username", username).first();

    console.log("Нашли пользователя:", user);
    if (!user) {
      res.status(401).json({ message: "Такого пользователя не существует" });
      return;
    }

    console.log("Проверка пароля")
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    

    if (!isPasswordValid) {
      res.status(401).json({ message: "Неправильно введен пароль" });
      return;
    }
    console.log("Пароль прошел")

    console.log("Создаем токен")
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    console.log("Возвращаем значение")
    res.status(200).json({
      message: "Вы вошли в аккаунт",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Ошибка входа", error: err });
  }
};

export const registerUser = async (req: Request<User>, res: Response): Promise<void> => {
  const { username, password } = req.body;
  console.log("Поймал запрос!")

  if (!username || !password) {
    res.status(400).json({ message: "Введите имя пользователя и пароль" });
  }

  console.log("Данные правильные!")

  const password_hash = await bcrypt.hash(password, 10);

  console.log("Пароль хэширован!")

  try {
    console.log("Пришло время добавить пользователя в БД!")
    console.log(req.body)
    const user = await User.query().insert({
      username: username,
      password_hash: password_hash
    });
    console.log("Пользователь добавлен в БД!")
  

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    console.log("Создал токен подключения!")

    res.cookie("authToken", token, {
      httpOnly: true,       
      secure: true,         
      maxAge: 36000000       
    });

    res.status(200).json({
      message: "Добавлен новый пользователь",
      user: {
        id: user.id,
        username: user.username
      },
    });
  } catch (err) {
    if (err === '23505') {
      res.status(409).json({ error: "Пользователь уже существует" });
    }
    res.status(500).json({ error: "Ошибка при добавлении пользователя" });
  }
};

export const userAuth = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  console.log("Поймал заголовок токена", req)

  if (!authHeader) {
    res.status(401).json({ error: "Токен не предоставлен" });
  } else {
    const token = authHeader.split(" ")[1];
    console.log("Вот токен", token)
    try {
      console.log("Секретное слово", process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log("Все норм, токен проверен", decoded)

      if (typeof decoded === "object" && "id" in decoded && "username") {
        console.log("Токен прошел проверку на наличие данных")
        res.json({ id: decoded.id, username: decoded.username });
      }
    } catch (err) {
      res.status(403).json({ error: "Недействительный токен" });
    }
  }
}

export const verifyTokenMiddleware = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken;

  if (!token) {
    res.status(401).json({ message: "Не авторизоыван" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; username: string; password_hash: string; };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};
