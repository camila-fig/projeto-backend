import { Command } from "commander"

const program = new Command()

program.option('-p <port>', 'server port', 8080)
program.requiredOption('-u <user>', 'Usuário usando o aplicativo', 'Nenhum usuário declarado')
program.parse()

console.info("Options:", program.opts())

export default program