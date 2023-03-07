import bcrypt from "bcrypt";
import {User} from '../tables/user.model.js';
import LocalStrategy from 'passport-local';


const hashPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const validatePassword = (plainPassword, hashedPassword) =>{
    return bcrypt.compareSync(plainPassword, hashedPassword);
};

const loginStrategy = new LocalStrategy(async (username, password, done)=>{
    try{
        const user = await User.findOne({username});

        if(!user || !validatePassword(password, user.password)){
            return done('invalid credentials', null)
        }
        done(null, user)
    } catch(err) {
        console.log('todo mal')
        done("Error while login in", null);
    }
});

const registerStrategy = new LocalStrategy( 
    { passReqToCallback: true },
    async (req, username, password, done) =>{
        try {
            const existingUser = await User.findOne({username});

            if(existingUser) {
                return done('username alreaady in use', null)
            }
            const newUser = {
                username,
                password: hashPassword(password),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email
            };
            const createdUser = await User.create(newUser);

            req.user = createdUser;

            done(null, createdUser);
        } catch (error) {
            done('Error while register', null)
        }
    }
);

export const passportStrategies = { loginStrategy, registerStrategy };