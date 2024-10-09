import jwt from "jsonwebtoken"

const generateToken = (user) => {
  delete user.password
  const token = jwt.sign(user, process.env.JWTPRIVATE_KEY)
  return token
}

// Middleware
// const authToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"]
//   if (!authHeader) {
//     return res.status(401).send({ erro: "Not authenticated" })
//   }
//   console.log(authHeader)

//   const token = authHeader.split(" ")[1]
//   jwt.verify(token, process.env.JWTPRIVATE_KEY, (err, credentials) => {
//     if (err) {
//       console.log(err);
//       return res.status(403).json({ erro: "Not authorized" })
//     }
//     console.log("Credentials:", credentials)
//     req.user = credentials
//     next()
//   })
// }

export { generateToken }