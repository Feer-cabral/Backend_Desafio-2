// Primero importamos el modulo de fylesystem
const fileSystem = require("fs");
// Luego creamos la clase y dentro una variable que contiene la ruta del archivo
class ProductManager {
  // Creamos el constructor y definimos la ruta
  constructor() {
    this.path = "./products.json";
  }
  // Creamos una funcion para escribir en el archivo
  writeProducts() {
    fileSystem.writeFileSync(this.path, JSON.stringify([]));
  }
  // Aqui mostramos todos los productos
  getProducts() {
    const products = fileSystem.readFileSync(this.path, "utf-8");
    return JSON.parse(products);
  }
  // Esta funcion sirve para agregar un nuevo producto
  addProduct(product) {
    // Llamamos a todos los productos
    const products = this.getProducts();
    // Ahora vamos a asignarle un id autoincremental
    product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    // Agregamos el nuevo producto
    products.push(product);
    // Actualizamos el archivo volviendo a escribirlo para pisar el archivo anterior
    fileSystem.writeFileSync(this.path, JSON.stringify(products));
  }
  // Llamamos a un producto por su id
  getProductById(id) {
    const products = this.getProducts();
    // Buscamos el producto por su id
    const product = products.find((product) => product.id === id);
    // Si no encuentra el producto muestra el mensaje y de lo contrario lo muestra
    if (!product) {
      console.log("Producto NO encontrado");
    } else {
      return product;
    }
  }
  // Esta funcion sirve para actualizar un producto
  updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    // Buscamos el producto por su id
    const index = products.findIndex((product) => product.id === id);
    // Si el indice es -1 significa que no lo encontro y muestra el mensaje, de lo contrario lo actualiza
    if (index === -1) {
      console.log("Producto NO encontrado");
    } else {
      // Actualizamos el objeto con spread y el nuevo objeto con los datos actualizados
      products[index] = { ...products[index], ...updatedProduct };
      // Actualizamos el archivo volviendo a escribirlo para pisar el archivo anterior
      fileSystem.writeFileSync(this.path, JSON.stringify(products));
    }
  }
  // Aqui eliminamos un producto por su id
  deleteProduct(id) {
    const products = this.getProducts();
    // Buscamos el producto por su id
    const index = products.findIndex((product) => product.id === id);
    // Si no lo encuentra muestra el mensaje, de lo contrario lo elimina con el splice
    if (index === -1) {
      console.log("Producto NO encontrado");
    } else {
      products.splice(index, 1);
      fileSystem.writeFileSync(this.path, JSON.stringify(products));
    }
  }
}

/* A continuacion iniciamos el proceso de testing para verificar que el programa funcione de manrea correcta */

// Instanciamos la clase
const manager = new ProductManager();
// Escribimos en el archivo
manager.writeProducts();

// Agregamos el nuevo producto
manager.addProduct({
  title: "producto prueba",
  description: "este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25,
});

// Actualizamos el producto modificando su titulo
// manager.updateProduct(1, { title: "nuevo producto" });

// Eliminamos el producto
// manager.deleteProduct(1);

// Mostramos el producto por su id
// console.log(manager.getProductById(1));

// Mostramos todos los productos
console.log(manager.getProducts());
