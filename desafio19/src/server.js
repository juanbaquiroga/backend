import { express, json, urlencoded, dirname, join, fileURLToPath, engine, router, middlewares, passport, session, passportStrategies, mongoose, User, os, cluster, logger, yargs } from './imports.js'


const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express()
const cpus =  os.cpus()
const params = yargs(process.argv.slice(2)).alias({
    p: 'port',
    m: 'mode'
}).default({
    port: 8080,
    mode: 'FORK'
}).argv

const PORT = process.env.PORT || params.port




if(cluster.isPrimary && params.mode.toUpperCase() === 'CLUSTER'){
    cpus.map(()=>{
        cluster.fork()
    })
    cluster.on('exit', (worker)=>{
        logger.info(`${worker.process.pid} died`)

        cluster.fork()
    })
}else{
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
app.use(passport.initialize());
app.use(passport.session());

app.use(middlewares.isLoged)
app.use('/', router)

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views','./views');


passport.use("login", passportStrategies.loginStrategy);
passport.use("register", passportStrategies.registerStrategy);
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    const data = await User.findById(id);
    done(null, data)
});


await mongoose.connect('mongodb+srv://admin:admin123@juanbaquiroga.x9kwboy.mongodb.net/ecommerce')
app.listen(PORT, ()=>{
    logger.info(`server listening port ${PORT}, mode: ${params.mode}`)
})
}