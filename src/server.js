import express from "express"
import ProductManager from "./components/ProductManager.js"

const app = express()
app.use(express.urlencoded({extended : true}))

const productos = new ProductManager()
//const readProducts = productos.readProducts()

app.get('/products', async (req,res) => {
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await productos.readProducts())
    let limitProduct = await productos.getLimitProduct(limit)
    res.send(limitProduct)
})

app.get("/products/:id", async (req, res) =>{
    let id = parseInt(req.params.id)
    let productById = await productos.getProductById(id)
    res.send(productById)
})

app.listen(3000, () => {
    console.log(`Express por LocalHost en el puerto 3000`)
})
