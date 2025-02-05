import chatService from "../services/chat.service.js"
import dao from "../dao/factory.js"

jest.mock("../dao/factory", () => ({
    dtoChat: {
        createMsg: jest.fn(),
    },
}))

describe("Chat Service", () => {
    afterEach(() => {
        jest.clearAllMocks()
    });

    test("createMessage - deve chamar dao.dtoChat.createMsg com os dados corretos", async () => {
        dao.dtoChat.createMsg.mockResolvedValue({ id: 1, message: "Mensagem criada" })

        const messageData = { userId: 1, text: "Olá, mundo!" }

        const result = await chatService.createMessage(messageData)

        expect(result).toEqual({ id: 1, message: "Mensagem criada" })
        expect(dao.dtoChat.createMsg).toHaveBeenCalledWith(messageData)
    })
})