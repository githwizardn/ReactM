"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean(),
});

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/profile");
  }, [router]);

  const onSubmit = async (data) => {
    const res = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    const result = await res.json();

    if (result.token) {
      if (data.rememberMe) {
        localStorage.setItem("token", result.token);
      }
      router.push("/profile");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Login to Nebula</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("username")} placeholder="Username (johnd)" className="w-full p-3 border rounded-xl" />
        <input type="password" {...register("password")} placeholder="Password (m38rmF$)" className="w-full p-3 border rounded-xl" />
        
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("rememberMe")} id="remember" />
          <label htmlFor="remember" className="text-sm">Remember me</label>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">Login</button>
      </form>
    </div>
  );
}