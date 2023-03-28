import express, {json, urlencoded} from 'express';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { engine } from 'express-handlebars'
import router from './routes/index.js';
import { middlewares } from './middlewares/index.js';
import passport from 'passport';
import session from 'express-session';
import { passportStrategies } from "./lib/passport.lib.js";
import mongoose from 'mongoose';
import { User } from './models/index.js';
import os from 'os';
import cluster from 'cluster';
import yargs from 'yargs';
import logger from './lib/logger.lib.js';

export {
    express,
    json,
    urlencoded,
    dirname,
    join,
    fileURLToPath,
    engine,
    router,
    middlewares,
    passport,
    session,
    passportStrategies,
    mongoose,
    User,
    os,
    cluster,
    logger,
    yargs
}