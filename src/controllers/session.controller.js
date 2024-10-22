import { generateToken } from "../utils/jsonwebtoken.js"
import program from "../config/commander.js"

const tokenGit = async (req, res) => {
    const user = req.body
    const accessToken = generateToken(user)
    return res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        })
        .cookie("logged", true)
        .render("msgConected", {
            name: req.user.name,
            port: program.opts().p
        })
}

export default { tokenGit }