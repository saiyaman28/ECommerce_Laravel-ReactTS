// import { useEffect, useState } from 'react'
import api from "../axios";

export interface User {
  id: number;
  first_name: string,
  last_name: string,
  contact: string,
  email: string;
}

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data.user as User;
};

export const registerUser = async (
  first_name: string,
  last_name: string,
  contact: string,
  email: string,
  password: string
) => {
  const res = await api.post("/register", { first_name, last_name, contact, email, password });
  localStorage.setItem("token", res.data.token);
  return res.data.user as User;
};

export const logoutUser = async () => {
  await api.post("/logout");
  localStorage.removeItem("token");
};

export default function GuestLayout() {
    return { loginUser, registerUser, logoutUser };
}