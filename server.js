import program from "./src/config/commander.js"
import app from "./src/App.js"

app.listen(program.opts().p, () => {
    console.log(`Server is running on port ${program.opts().p}`)
})