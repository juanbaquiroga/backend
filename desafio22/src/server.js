import {
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
} from './imports.js'

const app = express()
const cpus =  os.cpus()
const db = DBClientFactory.getClient(config.database);

const PORT = process.env.PORT || config.port




if(cluster.isPrimary && config.mode.toUpperCase() === 'CLUSTER'){
    cpus.map(()=>{
        cluster.fork()
    })
    cluster.on('exit', (worker)=>{
        logger.info(`${worker.process.pid} died`)

        cluster.fork()
    })
}else{
    app.use(
        cors({
          origin: config.corsOrigin,
          credentials: true,
        })
      );
        
    app.use(json())
    app.use(urlencoded({extended:true}))
    app.use(
        session({
            secret: "coderhouse",
            rolling: true,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 600000
            }
        })
    );

    app.use(router)
    app.use("/graphql",
        graphqlHTTP({
            schema,
            rootValue: {
                getProduct: controller.getById,
                getProducts: controller.getProducts,
                updateProduct: controller.updateProduct,
                createProduct: controller.saveProd,
                deleteProduct: controller.deleteProduct,
            },
            graphiql: true,
        })
    );
      

    app.engine('.hbs', engine({extname: '.hbs'}));
    app.set('view engine', '.hbs');
    app.set('views','./views');


    await db.connect();
    app.listen(PORT, ()=>{
        logger.info(`server listening port ${PORT}, mode: ${config.mode}`)
    })
}