import express from "express";
import { modules } from "./start/modules.js";
import { run } from "./start/run.js";
const app =  express();

modules(app);
run(app);