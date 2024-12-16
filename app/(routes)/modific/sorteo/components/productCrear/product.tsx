"use client";

import { useEffect, useState } from "react";
import { useData } from "@/context/fetchdatos";

// Tipo del producto basado en el modelo
interface Product {
  id: string;
  title: string;
  ImagenRuta: string;
  description: string;
  caracteristicas: string;
  priceProduct: string;
  cantidadBoletonumeros: number;
  priceBoleto: string;
  createdAt: Date;
}

export const Product = () => {
  // Definimos el tipo del producto a crear
  type NewProduct = Omit<Product, "id" | "createdAt" | "ImagenRuta"> & {
    ImagenRuta: File | null;
  };

  // Estados
  const [message, setMessage] = useState<string>("");
  console.log(message ? "d" : "");
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    title: "",
    ImagenRuta: null,
    description: "",
    caracteristicas: "",
    priceProduct: "",
    cantidadBoletonumeros: 0,
    priceBoleto: "",
  });
  const { productos } = useData() ?? {};
  // Efecto para obtener productos al cargar el componente
  useEffect(() => {
    if (productos) {
      setProducts(productos);
    }
  }, [productos]);

  // Manejar cambios en el formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setNewProduct({ ...newProduct, ImagenRuta: file || null });
  };

  // Agregar nuevo producto
  const handleAddProduct = async () => {
    try {
      if (products.length >= 1) {
        setMessage("No puedes crear más de un sorteo.");
        return;
      }

      // Validar campos obligatorios
      const { title, ImagenRuta, description, caracteristicas, priceProduct, cantidadBoletonumeros, priceBoleto } =
        newProduct;

      if (!title || !ImagenRuta || !description || !caracteristicas || !priceProduct || !cantidadBoletonumeros || !priceBoleto) {
        setMessage("Todos los campos son obligatorios.");
        return;
      }

      // Subir imagen
      const formData = new FormData();
      formData.append("file", ImagenRuta);

      const imageResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!imageResponse.ok) {
        throw new Error("Error al subir la imagen.");
      }

      const { rutas } = await imageResponse.json();

      // Crear producto con ruta de imagen
      const newProductWithImage = { ...newProduct, ImagenRuta: rutas[0] };

      const productResponse = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductWithImage),
      });

      if (!productResponse.ok) {
        throw new Error("Error al crear el producto.");
      }

      setMessage("Producto creado con éxito.");
      setProducts([...products, newProductWithImage as Product]);
      setNewProduct({
        title: "",
        ImagenRuta: null,
        description: "",
        caracteristicas: "",
        priceProduct: "",
        cantidadBoletonumeros: 0,
        priceBoleto: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Error al conectar con el servidor.");
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/product/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto.");
      }

      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      setMessage("Producto eliminado correctamente.");
    } catch (error) {
      console.error(error);
      setMessage("Error al eliminar el producto.");
    }
  };

  return (
    <section className="p-4 flex flex-col lg:flex-col justify-center items-center min-h-[100vh] w-full bg-[rgb(12,12,12)] rounded-lg">
      {/* Formulario de creación */}
      <div className="mb-4 w-[90%] h-[50%] mt-5 ">
        <h1 className="text-xl font-bold font-serif text-white">Crear Producto</h1>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Inputs */}
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={newProduct.title}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            name="ImagenRuta"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={newProduct.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          ></textarea>
          <textarea
            name="caracteristicas"
            placeholder="Características"
            value={newProduct.caracteristicas}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          ></textarea>
          <input
            type="number"
            name="priceProduct"
            placeholder="Precio del Producto"
            value={newProduct.priceProduct}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="cantidadBoletonumeros"
            placeholder="Cantidad de Boletos"
            value={newProduct.cantidadBoletonumeros}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="priceBoleto"
            placeholder="Precio por Boleto"
            value={newProduct.priceBoleto}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </form>
        <button
          type="button"
          onClick={handleAddProduct}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Agregar Producto
        </button>
      </div>

      {/* Tabla de productos */}
      <div className="mt-8 w-[90%] h-[50%] ">
        <h1 className="text-xl font-bold mb-4 font-serif text-white">Mostrar Productos/Eliminar</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead> text-white 
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Título</th>
              <th className="border border-gray-300 p-2">Ruta de Imagen</th>
              <th className="border border-gray-300 p-2">Descripción</th>
              <th className="border border-gray-300 p-2">Características</th>
              <th className="border border-gray-300 p-2">Precio Producto</th>
              <th className="border border-gray-300 p-2">Cantidad Boletos</th>
              <th className="border border-gray-300 p-2">Precio Boleto</th>
              <th className="border border-gray-300 p-2">Fecha</th>
              <th className="border border-gray-300 p-2">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className=" text-white border border-gray-300 p-2">{product.id}</td>
                <td className=" text-white border border-gray-300 p-2">{product.title}</td>
                <td className=" text-white border border-gray-300 p-2">{product.ImagenRuta}</td>
                <td className=" text-white border border-gray-300 p-2">{product.description}</td>
                <td className=" text-white border border-gray-300 p-2">{product.caracteristicas}</td>
                <td className=" text-white border border-gray-300 p-2">{product.priceProduct}</td>
                <td className=" text-white border border-gray-300 p-2">{product.cantidadBoletonumeros}</td>
                <td className=" text-white border border-gray-300 p-2">{product.priceBoleto}</td>
                <td className=" text-white border border-gray-300 p-2">{new Date(product.createdAt).toDateString()}</td>
                <td className=" text-white border border-gray-300 p-2">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
