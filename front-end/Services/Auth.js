"use server";
import { cookies } from "next/headers"; 
export async function Login(prevState, formData) {
  try {
    const name = formData.get("Fullname");
    const password = formData.get("password");
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Fullname: name,
        password,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      const message = error.message || "Login failed";
      console.log("❌ Login error:", message);
      return {
        success: false,
        message,
      };
    }
    const data = await res.json();
    console.log("✅ Login success:", data);
    // ⚠️ IMPORTANT: return something on success too*
 const cookieStore = await cookies();
    cookieStore.set("token", JSON.stringify(data), {
      httpOnly: true,
      path: "/",
    });
    cookieStore.set("user", JSON.stringify({
    Fullname: name,
        password,
    }), {
      httpOnly: true,
      path: "/",
    });
    return {
      success: true,
      message:"",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}


export async function Logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return redirect("/login");
}

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return redirect("/login");
  }
  return token 
}