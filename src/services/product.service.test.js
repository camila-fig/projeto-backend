import productService from "../services/product.service.js"
import dao from "../dao/factory.js"

jest.mock("../dao/factory", () => ({
    dtoProduct: {
        getAllProducts: jest.fn(),
        getProducts: jest.fn(),
        getProductsList: jest.fn(),
        getProductById: jest.fn(),
        createProduct: jest.fn(),
        deleteProduct: jest.fn(),
        updateProduct: jest.fn(),
    },
}))

describe("Product Service", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test("getAllProducts - deve retornar todos os produtos quando o título for 'all'", async () => {
        dao.dtoProduct.getAllProducts.mockResolvedValue([{ id: 1, title: "Produto 1" }])

        const products = await productService.getAllProducts("all", 1, 10)

        expect(products).toEqual([{ id: 1, title: "Produto 1" }])
        expect(dao.dtoProduct.getAllProducts).toHaveBeenCalledWith(1, 10)
    })

    test("getAllProducts - deve retornar produtos filtrados quando o título não for 'all'", async () => {
        dao.dtoProduct.getProducts.mockResolvedValue([{ id: 2, title: "Produto 2" }])

        const products = await productService.getAllProducts("Produto", 1, 10)

        expect(products).toEqual([{ id: 2, title: "Produto 2" }])
        expect(dao.dtoProduct.getProducts).toHaveBeenCalledWith("Produto", 1, 10)
    })

    test("getOrganizedProducts - deve retornar produtos ordenados por código e título", async () => {
        dao.dtoProduct.getProductsList.mockResolvedValue([
            { code: 2, title: "Produto B" },
            { code: 1, title: "Produto A" },
        ])

        const products = await productService.getOrganizedProducts()

        expect(products).toEqual([
            { code: 1, title: "Produto A" },
            { code: 2, title: "Produto B" },
        ])
    })

    test("getProductById - deve retornar um produto quando ele existir", async () => {
        dao.dtoProduct.getProductById.mockResolvedValue({ id: 1, title: "Produto 1" })

        const product = await productService.getProductById(1)

        expect(product).toEqual({ id: 1, title: "Produto 1" })
        expect(dao.dtoProduct.getProductById).toHaveBeenCalledWith("1")
    })

    test("createProduct - deve criar um produto e retornar o resultado", async () => {
        dao.dtoProduct.createProduct.mockResolvedValue({ id: 1, title: "Novo Produto" })

        const result = await productService.createProduct({ title: "Novo Produto" })

        expect(result).toEqual({ id: 1, title: "Novo Produto" })
        expect(dao.dtoProduct.createProduct).toHaveBeenCalledWith({ title: "Novo Produto" })
    })

    test("deleteProduct - deve deletar um produto e retornar o resultado", async () => {
        dao.dtoProduct.deleteProduct.mockResolvedValue({ success: true })

        const result = await productService.deleteProduct(1)

        expect(result).toEqual({ success: true })
        expect(dao.dtoProduct.deleteProduct).toHaveBeenCalledWith("1")
    })

    test("updateProduct - deve lançar um erro se o produto não for encontrado", async () => {
        dao.dtoProduct.getProductById.mockResolvedValue(null)

        await expect(productService.updateProduct(1, { title: "Produto Atualizado" }))
            .rejects
            .toThrow("Produto não encontrado")
    })
})