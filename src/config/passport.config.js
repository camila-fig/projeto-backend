import passport from "passport"
import local from "passport-local"
import userModel from "../model/user.model.js"
import { createHash } from "../utils/index.js"
import bcrypt from "bcrypt"
import GitHubStrategy from "passport-github2"

const initializePassport = () => {
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

    passport.use("login", new local.Strategy(
        { usernameField: "email" },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                if (!user) {
                    console.log("User doesn't exist")
                    return done(null, false)
                }
                const isPasswordValidTest = bcrypt.compareSync(password, user.password)
                //console.log(isPasswordValidTest)
                if (isPasswordValidTest) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(`Erro ao obter user ${error}`)
            }
        }
    ))

    passport.use("github", new GitHubStrategy(
        {
            clientID: "Iv23liy5WWRVBRvPj6UN",
            clientSecret: "39940dd72825de90ae569ccda750063648b4dc61",
            callbackURL: "http://localhost:8080/api/sessions/github",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                //console.log("Console1:", profile);
                //console.log("Console2:", profile._json.email)
                const user = await userModel.findOne({ email: profile._json.email })
                //console.log("Console3:", user)
                if (!user) {
                    let newUser = {
                        name: profile._json.name,
                        email: profile._json.email,
                        password: "", //Sendo autenticação de terceiros, não pode atribuir senha.
                        role: profile._json.type.toLowerCase() || "user"
                    }
                    let result = await userModel.create(newUser)
                    return done(null, result)
                } else { //Cai aqui se o usuário já existir.
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