// import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Exporter/Components_Exporter'
import api from "../axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data.user as User;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await api.post("/register", { name, email, password });
  localStorage.setItem("token", res.data.token);
  return res.data.user as User;
};

export const logoutUser = async () => {
  await api.post("/logout");
  localStorage.removeItem("token");
};



export default function GuestLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}