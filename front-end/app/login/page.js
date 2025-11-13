"use client"
import { useActionState, useEffect } from "react"
import { redirect } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Login } from "@/Services/Auth"
import logo from "@/public/logo.png";
import Image from "next/image";

export default function LoginPage() {
  const initialState = {
    success: false,
    message: "",
  }

  const [state, action, isPending] = useActionState(Login, initialState)

  useEffect(() => {
    if (state.success) {
      redirect("/")
    }
  }, [state.success])

  return (
    <main className="w-full min-h-screen flex">
      {/* Left Section - Brand & Visual */}
      <div className="hidden lg:flex w-1/2  flex-col justify-between p-12 relative overflow-hidden bg-orange-400">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -ml-40 -mb-40" />

        {/* Content */}
        <div className="relative z-10">
          <div className="text-white mb-16">
            <h2 className="text-5xl font-bold mb-4 text-pretty">Welcome Back</h2>
            <p className="text-lg text-white/80">Access your account to manage everything in one place</p>
          </div>
        </div>

        {/* Features */}
        <div className="relative z-10 space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🔒</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Secure & Safe</h3>
              <p className="text-white/70 text-sm">Your data is encrypted and protected</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Fast & Reliable</h3>
              <p className="text-white/70 text-sm">Lightning quick access to your account</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🌍</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Available Anywhere</h3>
              <p className="text-white/70 text-sm">Access from any device, anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-br from-primary to-primary/80">
        <div className="w-full max-w-sm">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-8 mb-10">
                <Image
          src={logo}
          width={90}
          height={90}
          alt="Picture of the author"
          className="select-none"
        ></Image>
<div className="flex flex-col items-center gap-3">
  <h1 className="text-3xl font-bold text-white">Connexion</h1>
  <p className="text-center text-white">
    Entrez vos identifiants pour accéder à votre compte
  </p>
</div>

          </div>

          {/* Error Message */}
          {state.message && !state.success && (
            <div className="w-full bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6 animate-in fade-in-50">
              <p className="text-destructive text-sm font-medium">{state.message}</p>
            </div>
          )}

          {/* Form Section */}
          <form action={action} className="w-full flex flex-col gap-5">
            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="Fullname" className="font-medium text-white text-sm">
                Nom d'utilisateur
              </Label>
              <Input
                type="text"
                id="Fullname"
                name="Fullname"
                placeholder="Entrez votre nom d'utilisateur"
                disabled={isPending}
                className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="font-medium text-white text-sm">
                  Mot de passe
                </Label>
              </div>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                disabled={isPending}
                className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg transition-all duration-200 mt-6 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Spinner className="w-4 h-4" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <span>Se connecter</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
