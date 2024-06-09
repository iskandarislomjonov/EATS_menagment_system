import nodemailer from "nodemailer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { Restaurant } from "../../models/restaurant.model.js";
import { comparePayload, hashPayload } from "../../utilities/bcrypt.js";
import { CustomError } from "../../utilities/customError.js";
import { signPayload, verifyPayload } from "../../utilities/jwt.js";

export const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      stir,
      location,
      bussinessHours,
    } = req.body;

    const { image } = req.files;

    const imagename = `${uuidv4()}${path.extname(image.name)}`;
    image.mv(process.cwd() + "/uploads/" + imagename);

    const findRestaurant = await Restaurant.find({ email, stir });

    if (!findRestaurant) {
      throw new CustomError(`Restaurant allready exists`, 409);
    } else {
      function getRandomCode() {
        return Math.floor(Math.random() * 9000) + 1000;
      }
      let verifyCode = getRandomCode();
      console.log(verifyCode);

      const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: "nasirullayevo7@gmail.com",
          pass: "smenmggcgonbqmwl",
        },
        secure: true,
      });
      const mailData = {
        from: "nasirullayevo7@gmail.com",
        to: email,
        subject: "Verification code",
        text: `Verification code`,
        html: `Login code: <b>${verifyCode}</b><br> Do not give this code to anyone, even if they say they are from our Site<br/>`,
      };

      const generate = await hashPayload(password);

      const Location = { lat: location.lat, long: location.long };
      const BussinessHours = {
        from: bussinessHours.from,
        to: bussinessHours.to,
      };

      if (!findRestaurant.length < 1) {
        throw new CustomError("invalid authentication password", 403);
      }
      await transporter.sendMail(mailData);

      const newRestaurant = await Restaurant.create({
        name,
        email,
        phoneNumber,
        stir,
        emailVerifyCode: verifyCode,
        image: imagename,
        password: generate,
      });

      const token = signPayload({ userId: newRestaurant.id });

      res.cookie("token", token);

      res.status(201).json({
        message: "Successfully created new restaurant",
        data: newRestaurant,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { verifyCode } = req.body;
    const { token } = req.cookies;

    const id = verifyPayload(token);
    const findRes = await Restaurant.findById({ _id: id.userId });
    if (findRes.emailVerifyCode == verifyCode) {
      res.status(200).json({ message: "Successfully", data: findRes });
    } else {
      throw new CustomError("Invalid email verification code failed", 409);
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const findRes = await Restaurant.findOne({ email: email });
  if (findRes.length < 1) {
    return res
      .status(404)
      .json({ message: "Invalid email or password provided for login" });
  }
  const compare = await comparePayload(password, findRes.password);

  if (!compare) {
    return res
      .status(404)
      .json({ message: "Invalid password provided to login" });
  }
  const token = signPayload({ userId: findRes.id });

  res.cookie("token", token);

  res.status(201).json({ message: "Login successful", token: token });
};

export const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ message: "Success", restaurants });
  } catch (error) {
    next(error);
  }
};

export const getRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findOne({ _id: restaurantId });

    if (!restaurant) {
      throw new CustomError("Restaurant not found", 404);
    } else {
      res.status(200).json({ message: "Success", restaurant });
    }
  } catch (error) {
    next(error);
  }
};

export const editRestaurant = async (req, res, next) => {
  try {
    const { name, phoneNumber, stir, location, bussinessHours } = req.body;
    const { image } = req.files;
    const { id } = req.restaurant;

    const imagename = `${uuidv4()}${path.extname(image.name)}`;
    image.mv(process.cwd() + "/uploads/" + imagename);

    const findRes = await Restaurant.findByIdAndUpdate(id, {
      name,
      phoneNumber,
      stir,
      location,
      bussinessHours,
      image: imagename,
    });

    if (!findRes) throw new CustomError("Restaurant not found", 404);
    res.status(200).json({
      message: `Restaurant updated successfully`,
      restaurant: findRes,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { id } = req.restaurant;
    const { password, newPassword, reNewPassword } = req.body;
    const restaurant = await Restaurant.findById(id);
    if (newPassword === reNewPassword) {
      const compare = await comparePayload(password, restaurant.password);
      if (!compare) {
        throw new CustomError(`Invalid password `, 403);
      } else {
        const newPassHash = await hashPayload(newPassword);
        restaurant.password = newPassHash;
        await restaurant.save();
        res.status(200).json({ message: "success" });
      }
    } else {
      throw new CustomError("Passwords do not match");
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { id } = req.restaurant;
    await Restaurant.findByIdAndDelete(id);
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
