import express, {json, urlencoded} from 'express';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { engine } from 'express-handlebars'
import router from './routes/index.js';
import session from 'express-session';
import mongoose from 'mongoose';
import os from 'os';
import cluster from 'cluster';
import logger from './lib/logger.lib.js';
import config from './config/config.js';
import cors from 'cors';
import DBClientFactory from './classes/DBClientFactory.class.js';

export {
    express,
    json,
    urlencoded,
    dirname,
    join,
    fileURLToPath,
    engine,
    router,
    session,
    mongoose,
    os,
    cluster,
    logger,
    config,
    cors,
    DBClientFactory
}