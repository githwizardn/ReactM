"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

// ვალიდაციის სქემა
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed")  
    .min(2)
    .max(20),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed")  
    .min(4)
    .max(20),
  age: yup.number().typeError("Age must be a number").required().min(18).max(100),
  email: yup.string().email("Invalid email").required(),
  password: yup.string().required().min(6).max(12)
    .matches(/[A-Z]/, "Uppercase required")
    .matches(/[a-z]/, "Lowercase required")
    .matches(/[0-9]/, "Number required")
    .matches(/[@$!%*?&#]/, "Special character required (@$!%*?&#)"),
  phone: yup.string().required().matches(/^[0-9]+$/, "Digits only").min(9).max(20),
});

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const router = useRouter(); 

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        reset();
         
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl mt-10 mb-10 border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h1>

      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6 text-center animate-bounce font-medium">
           Success! Redirecting to home...
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">First Name</label>
            <input 
              {...register("firstName")} 
              placeholder="John" 
              className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`} 
            />
            <p className="text-red-500 text-[10px] mt-1">{errors.firstName?.message}</p>
          </div>
          

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Last Name</label>
            <input 
              {...register("lastName")} 
              placeholder="Doe" 
              className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`} 
            />
            <p className="text-red-500 text-[10px] mt-1">{errors.lastName?.message}</p>
          </div>
        </div>


        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Age</label>
          <input type="number" {...register("age")} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          <p className="text-red-500 text-[10px] mt-1">{errors.age?.message}</p>
        </div>


        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
          <input type="email" {...register("email")} placeholder="example@gmail.com" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          <p className="text-red-500 text-[10px] mt-1">{errors.email?.message}</p>
        </div>


        <div className="relative">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
          <input 
            type={showPassword ? "text" : "password"} 
            {...register("password")} 
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-xs text-blue-600 font-semibold hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <p className="text-red-500 text-[10px] mt-1">{errors.password?.message}</p>
        </div>


        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Phone Number</label>
          <input {...register("phone")} placeholder="555123456" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          <p className="text-red-500 text-[10px] mt-1">{errors.phone?.message}</p>
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 disabled:bg-gray-300 transition-all active:scale-95"
        >
          {loading ? "Processing..." : success ? "Welcome! " : "Register Now"}
        </button>
      </form>
    </div>
  );
}