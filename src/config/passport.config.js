import passport from "passport"
import jwt from "passport-jwt"
import local from "passport-local"
import userModel from "../model/user.model.js"
import { createHash } from "../config/bcrypt.config.js"
import GitHubStrategy from "passport-github2"

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['accessToken']
    }
    return token
}

const initializePassport = () => {

    passport.use("jwt", new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.JWTPRIVATE_KEY
        },
        async (jwt_payload, done) => {
            //console.log("JWT Payload:", jwt_payload)
            try {
                return done(null, jwt_payload)
            } catch (error) {
                return done(error)
            }
        }))

    passport.use("register", new local.Strategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
            const { name, email, role } = req.body
            try {
                let user = await userModel.findOne({ email: username })
                if (user) {
                    console.log("User already exists")
                    return done(null, false)
                }
                const newPass = createHash(password)
                const novoUser = {
                    name,
                    email,
                    password: newPass,
                    role,
                }
                let newUser = await userModel.create(novoUser)
                return done(null, newUser)
            } catch (error) {
                return done(`Erro ao obter user ${error}`)
            }
        }
    ))

    passport.use("github", new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({ email: profile._json.email })
                //console.log("User do passport.config Github:", user)

                if (!user) {
                    let newUser = {
                        name: profile._json.name,
                        email: profile._json.email,
                        password: "", //Sendo autenticação de terceiros, não pode atribuir senha.
                        role: "user"
                    }
                    let result = await userModel.create(newUser)
                    return done(null, result)
                } else {
                    return done(null, user)
                }
            } catch (error) {
                return done(`Erro ao obter user ${error}`)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            done(`Erro ao obter user ${error}`)
        }
    })
}

export default initializePassport 