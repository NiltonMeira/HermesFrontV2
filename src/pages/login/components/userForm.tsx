import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const UserForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof FormData]: value as string,
    }));
  };

  const handleSubmit = () => {};

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col bg-white gap-7 w-1/3 p-10"
      >
        <h1 className="text-2xl">Login</h1>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          required
        />

        <Link to={"/"} className="flex px-1 text-xs justify-end text-[#007BC0]">
          Esqueci minha senha
        </Link>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#007BC0", color: "#fff" }}
        >
          Submit
        </Button>
        <div className="text-sm">
          Ainda não tem uma conta?
          <Link
            to={"/signUp"}
            className="px-2 text-sm text-[#007BC0]"
          >
            Increver-se
          </Link>
        </div>
      </Box>
    </>
  );
};
