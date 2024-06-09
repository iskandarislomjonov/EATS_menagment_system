import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "../api/routes/index.js";
import fileUpload from "express-fileupload";


import { errorHandler } from "../api/middlewares/errorHandler.js";


export const modules = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(fileUpload());
    app.use(cors({ origin: '*' }));
    app.use(cookieParser());
    app.use(errorHandler);
    app.use(express.static(process.cwd() + "/uploads"));

   app.use(routes);
};