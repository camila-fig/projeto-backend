import dao from "../dao/factory.js"

const createMessage = async (messageData) => {
  return await dao.dtoChat.createMsg(messageData)
}

export default { createMessage }