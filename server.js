import program from "./src/config/commander.config.js"
import app from "./src/App.js"

app.listen(program.opts().p, () => {
    console.warn(`Server is running on port ${program.opts().p}`)
})