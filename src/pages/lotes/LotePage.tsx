import React, { useState, useEffect, useRef } from "react";
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import api from "../../services/api";

// Registrando os componentes necessários do Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

type Fila = {
  _id: string;
  name: string;
  productId: string;
  producName: string;
  description: string;
  lotes?: Array<{
    _id: string;
    productId: string;
    quantidade: number;
  }>;
};

const LotePage: React.FC = () => {
  const [filas, setFilas] = useState<Fila[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    productId: "",
    quantidade: 24,
  });
  const [chartData, setChartData] = useState<any>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetchFilas();
    fetchProducts();
  }, []);

  const fetchFilas = async () => {
    try {
      const response = await api.get<Fila[]>("/fila");
      const filas = response.data;

      // Cria um novo lote para cada fila retornada
      for (const fila of filas) {
        await createLoteForFila(fila);
      }

      setFilas(filas);
      updateChartData(filas);
    } catch (error) {
      console.error("Error fetching filas", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const createLoteForFila = async (fila: Fila) => {
    try {
      await api.post("/lote", {
        filaId: fila._id,
        productId: fila.productId,
        quantidade: 1,
      });
    } catch (error) {
      console.error(`Error creating lote for fila ${fila._id}`, error);
    }
  };

  const updateChartData = (filas: Fila[]) => {
    const labels = filas.map((fila) => fila.name);
    const data = filas.map((fila) => fila.lotes?.length || 0);
    const backgroundColors = filas.map((fila) => "rgba(75, 192, 192, 0.2)");

    // Adiciona um quadrado azul em cada barra para representar o novo lote
    const pointStyles = filas.map(() => "rectRot");
    const pointColors = filas.map(() => "blue");

    const newChartData = {
      labels,
      datasets: [
        {
          label: "Número de Lotes por Fila",
          data,
          backgroundColor: backgroundColors,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          pointStyle: pointStyles,
          pointBackgroundColor: pointColors,
        },
      ],
    };

    setChartData(newChartData);
  };

  const handleProductChange = (e: SelectChangeEvent<string>) => {
    const productId = e.target.value;
    setFormData({ ...formData, productId });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { productId, quantidade } = formData;

      const existingFilaResponse = await api.get(`/fila/${productId}`);
      const existingFila = existingFilaResponse.data;

      let filaId = existingFila?._id;

      if (!existingFila) {
        const newFilaResponse = await api.post("/fila", {
          productId,
          name: `Fila - ${productId}`,
          description: "New fila for product",
        });
        filaId = newFilaResponse.data._id;
      }

      await api.post("/lote", { filaId, productId, quantidade });

      fetchFilas();
      setFormData({ productId: "", quantidade: 24 });
    } catch (error) {
      console.error("Error handling operation", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Lote Management
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
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

        <TextField
          label="Quantidade"
          type="number"
          value={formData.quantidade}
          onChange={handleInputChange}
          name="quantidade"
          fullWidth
          disabled
          sx={{ mb: 2 }}
        />

        <Button variant="contained" type="submit" sx={{ mb: 2 }}>
          Create Lote
        </Button>
      </form>

      <Box sx={{ marginTop: 3 }}>
        {chartData ? (
          <Bar
            ref={chartRef}
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Filas e seus Lotes",
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.raw} lotes`,
                  },
                },
              },
            }}
          />
        ) : (
          <Typography variant="body1">Loading chart...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default LotePage;
