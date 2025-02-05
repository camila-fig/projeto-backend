import cartService from "../services/cart.service.js"
import dao from "../dao/factory.js"

jest.mock("../dao/factory.js")

describe("Cart Service", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test("getCartByEmail - deve retornar um carrinho pelo e-mail", async () => {
        const mockCart = { email: "test@example.com", products: [] }
        dao.dtoCart.findCartPopulate.mockResolvedValue(mockCart)

        const cart = await cartService.getCartByEmail("test@example.com")

        expect(cart).toEqual(mockCart)
        expect(dao.dtoCart.findCartPopulate).toHaveBeenCalledWith("test@example.com")
    })

    test("createCart - deve criar um carrinho para um determinado e-mail", async () => {
        const mockCart = { email: "test@example.com", products: [] }
        dao.dtoCart.createCart.mockResolvedValue(mockCart)

        const cart = await cartService.createCart("test@example.com")

        expect(cart).toEqual(mockCart)
        expect(dao.dtoCart.createCart).toHaveBeenCalledWith("test@example.com")
    })

    test("addProductToCart - deve adicionar um produto ao carrinho", async () => {
        const email = "test@example.com"
        const pid = "product123"

        const mockCart = { email: "test@example.com", products: [] }
        dao.dtoCart.getCartByEmail.mockResolvedValue(mockCart)
        dao.dtoCart.addProductToCart.mockResolvedValue({ ...mockCart, products: [{ product: pid, qty: 1 }] })

        const updatedCart = await cartService.addProductToCart(pid, email)

        expect(updatedCart.products.length).toBe(1)
        expect(updatedCart.products[0].product).toBe(pid)
        expect(dao.dtoCart.getCartByEmail).toHaveBeenCalledWith(email)
        expect(dao.dtoCart.addProductToCart).toHaveBeenCalledWith(pid, email)
    })

    test("updateCart - deve atualizar o carrinho", async () => {
        const email = "test@example.com"
        const pid = "product123"

        const mockUpdatedCart = { email: "test@example.com", products: [{ product: pid, qty: 1 }] }
        dao.dtoCart.updateCart.mockResolvedValue(mockUpdatedCart)

        const updatedCart = await cartService.updateCart(pid, email)

        expect(updatedCart).toEqual(mockUpdatedCart)
        expect(dao.dtoCart.updateCart).toHaveBeenCalledWith(pid, email)
    })

    test("filterProducts - deve filtrar produtos com quantidade > 0", () => {
        const mockCart = {
            products: [
                { product: { _id: "prod1", thumbnail: "thumb1", description: "desc1", price: 100 }, qty: 2 },
                { product: { _id: "prod2", thumbnail: "thumb2", description: "desc2", price: 200 }, qty: 0 }
            ]
        };

        const filteredProducts = cartService.filterProducts(mockCart)

        expect(filteredProducts.length).toBe(1)
        expect(filteredProducts[0]._id).toBe("prod1")
        expect(filteredProducts[0].qty).toBe(2)
    })

    test("clearCart - deve deletar o carrinho correspondente ao e-mail", async () => {
        const email = "test@example.com"

        dao.dtoCart.deleteCart.mockResolvedValue({ acknowledged: true, deletedCount: 1 })

        const result = await cartService.clearCart(email)

        expect(result.acknowledged).toBe(true)
        expect(result.deletedCount).toBe(1)
        expect(dao.dtoCart.deleteCart).toHaveBeenCalledWith(email)
    })
})
