import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const SignForm = () => {
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
        <TextField
          label="Name"
          name="Name"
          type="name"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          required
        />
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
          label="EDV"
          name="EDV"
          type="EDV"
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
          Ja tenho uma conta
        </Link>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#007BC0", color: "#fff" }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};
