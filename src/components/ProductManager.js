import {promises as fs} from "fs"

export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products = [];
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title, 
            description,
            price, 
            thumbnail, 
            code, 
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products))

        /*
        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i].code === code){
                console.log(`El codigo ${code} esta repetido`);
                return;
            }
        }
        
        

        if (!Object.values(newProduct).includes(undefined)) {
            ProductManager.id++
                this.products.push({
                    ...newProduct,
                    id: ProductManager.id 
                });
        }else{
            console.log("Todos los campos son Requeridos")
        }
*/
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProduct = async () => {
        let get_product = await this.readProducts()
        return console.log(get_product)
    }

    getLimitProduct = async (limit) =>{
        let get_limit_product = await this.readProducts()
        return get_limit_product.slice(0,limit)
    }

    getProductById = async (id) => {
        let get_product_id = await this.readProducts()
        if(!get_product_id.find(product => product.id === id)) {
            return `<h1>Producto no encontrado</h1>`
        }else{
            return get_product_id.find((product) => product.id === id)
        }
    }

    deleteProductById = async (id) => {
        let delete_product_id = await this.readProducts()
        let productFilter = delete_product_id.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Producto Eliminado")
    }

    updateProduct = async ({id, ...producto}) => {
        await this.deleteProductById(id)
        let productOld = await this.readProducts()
        console.log(productOld)
        let productModif = [{...producto, id}, ...productOld] 
        await fs.writeFile(this.patch, JSON.stringify(productModif))
    }
}
    

// Arreglo vacio
//const productos = new ProductManager

// Agrego productos async
//productos.addProduct('producto prueba 1', 'Este es un producto prueba 1', 'Sin imagen', 200 , 'abc123', 25)
//productos.addProduct('producto prueba 2', 'Este es un producto prueba 2', 'Sin imagen', 350 , 'abc124', 15)
//productos.addProduct('producto prueba 3', 'Este es un producto prueba 3', 'Sin imagen', 887 , 'abc125', 15)
//productos.addProduct('producto prueba 4', 'Este es un producto prueba 4', 'Sin imagen', 887654 , 'abc126', 34)
//productos.addProduct('producto prueba 5', 'Este es un producto prueba 5', 'Sin imagen', 2345 , 'abc127', 76)
//productos.addProduct('producto prueba 6', 'Este es un producto prueba 6', 'Sin imagen', 87654 , 'abc128', 43)
//productos.addProduct('producto prueba 7', 'Este es un producto prueba 7', 'Sin imagen', 112 , 'abc129', 98)
//productos.addProduct('producto prueba 8', 'Este es un producto prueba 8', 'Sin imagen', 654 , 'abc130', 654)
//productos.addProduct('producto prueba 9', 'Este es un producto prueba 9', 'Sin imagen', 11234 , 'abc131', 54)
//productos.addProduct('producto prueba 10', 'Este es un producto prueba 10', 'Sin imagen', 8874 , 'abc132', 55)

// Arreglo con productos
//console.log("-------- ARREGLO CON PRODUCTOS --------")
//productos.getProduct()
//console.log(productos.getProduct());

// Validacion de Code repetido
//console.log(productos.getProduct());

// Busqueda de producto por ID
//console.log("Busqueda de producto: ")
//productos.getProductById(4);
//productos.getProductById(2);

// Eliminar producto por ID
//console.log("ELiminando producto por id...")
//productos.deleteProductById(2)

//console.log("Update de producto")
/*productos.updateProduct({
    title: "producto prueba 3", 
    description: "Este es un producto prueba 3",
    price: 6550,
    thumbnail: "Sin imagen", 
    code: "abc123", 
    stock: 15,
    id: 3
})*/
//console.log("getProducto updateado..")
//productos.getProduct()
//console.log(productos.getProduct());