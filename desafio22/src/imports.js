import express, {json, urlencoded} from 'express';
import { engine } from 'express-handlebars'
import router from './routes/index.js';
import session from 'express-session';
import os from 'os';
import cluster from 'cluster';
import logger from './lib/logger.lib.js';
import config from './config/config.js';
import cors from 'cors';
import DBClientFactory from './classes/DBClientFactory.class.js';
import { graphqlHTTP } from "express-graphql";
import schema from './graphql/product.schema.js';
import {controller} from './controllers/index.js'

export {
    express,
    json,
    urlencoded,
    engine,
    router,
    session,
    os,
    cluster,
    logger,
    config,
    cors,
    DBClientFactory,
    graphqlHTTP,
    schema,
    controller
}