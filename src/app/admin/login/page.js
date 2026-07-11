"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { LoginForm } from "@/components/admin/LoginForm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { isAdmin, login } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      router.replace("/admin/dashboard");
    }
  }, [isAdmin, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate admin login - replace this with actual authentication logic
    if (email === "admin123@gmail.com" && password === "Admin123") {
      login();
      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
