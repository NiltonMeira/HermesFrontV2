import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import api from "../../services/api";
import { AppBar } from "../../components/appbar";

type Fila = {
  _id: string;
  name: string;
  productId: string;
  producName: string;
  description: string;
};

type FormData = Omit<Fila, "_id" | "producName">; // Remove producName from FormData, as we don't need it anymore

const Operation: React.FC = () => {
  const [filas, setFilas] = useState<Fila[]>([]);
  const [products, setProducts] = useState<any[]>([]); // Store the list of products
  const [formData, setFormData] = useState<FormData>({
    name: "",
    productId: "", // productId will be set based on selected product
    description: "",
  });
  const [operation, setOperation] = useState<string>("add");

  useEffect(() => {
    fetchFilas();
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const fetchFilas = async () => {
    try {
      const response = await api.get<Fila[]>("/fila"); // Keep the original path for filas
      setFilas(response.data);
    } catch (error) {
      console.error("Error fetching fila", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products"); // Fetch products from the backend with updated path
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductChange = (e: SelectChangeEvent<string>) => {
    const productId = e.target.value;
    setFormData({ ...formData, productId });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (operation === "add") {
        await api.post("/fila", formData); // Use the api service for POST with the original path
      }
      fetchFilas();
      setFormData({ name: "", productId: "", description: "" });
    } catch (error) {
      console.error("Error handling operation", error);
    }
  };

  return (
    <div>
        <AppBar/>
         <div className="max-w-4xl mx-auto p-6">
            <div>
                
            </div>
        <h1 className="text-2xl font-bold mb-4">Operation</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
            <label className="block text-sm font-medium">Operation</label>
            <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="add">Add</option>
            </select>
            </div>

            {operation === "add" && (
            <>
                <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    required
                />
                </div>

                <div>
                <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Select
                    value={formData.productId}
                    onChange={handleProductChange}
                    label="Product"
                    required
                    >
                    {products.map((product) => (
                        <MenuItem key={product._id} value={product._id}>
                        {product.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </div>

                <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    required
                ></textarea>
                </div>
            </>
            )}

            <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
            Add Fila
            </button>
        </form>

        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Existing Filas</h2>
            <ul className="space-y-2">
            {filas.map((fila) => (
                <li key={fila._id} className="p-4 border border-gray-300 rounded-md">
                <p><strong>Name:</strong> {fila.name}</p>
                <p><strong>Product Name:</strong> {fila.producName}</p>
                <p><strong>Description:</strong> {fila.description}</p>
                </li>
            ))}
            </ul>
        </div>
        </div>

    </div>
       
  );
};

export default Operation;
