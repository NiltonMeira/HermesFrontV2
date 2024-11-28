import { Box, Button, TextField } from "@mui/material";
import {FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";

export const SignForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [edv, setEdv] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => { 
    e.preventDefault()

    let token = localStorage.getItem("token")

    const formValue = {
      name: name,
      email: email,
      edv: edv,
      password: password
    }

    try{
      const response = await api.post("users", formValue, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response)
    } catch(err){
      console.log(err)
    }

  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col bg-white gap-7 w-1/3 p-10"
      >
        <h1 className="text-2xl">Sign Up</h1> 
        <TextField
          label="Name"
          name="Name"
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="Email"

          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="EDV"
          name="EDV"
          type="EDV"
          value={edv}
          onChange={(e) => setEdv(e.target.value)}
          variant="outlined"
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
