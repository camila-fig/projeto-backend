import jwt from "jsonwebtoken"

const generateToken = (user) => {
  delete user.password
  const token = jwt.sign(user, process.env.JWTPRIVATE_KEY)
  return token
}

export { generateToken }