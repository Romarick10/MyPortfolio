"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff, LogIn } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  noStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setSuccess(message);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userRole = data.user.role;
        if (userRole === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-2 sm:p-4">
      <Card className="w-full max-w-xs sm:max-w-sm bg-slate-800/30 border-slate-700/50 backdrop-blur-sm shadow-xl">
        <CardHeader className="p-4 sm:p-6 space-y-0.5">
          <div className="flex justify-center mb-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
              <LogIn className="h-4 w-4 text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-base sm:text-lg font-bold text-center text-white tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-center text-slate-400">
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {success && (
              <Alert className="border-green-500/30 bg-green-500/10 p-2 text-xs">
                <AlertDescription className="text-green-300 text-xs">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="border-red-500/30 bg-red-500/10 p-2 text-xs">
                <AlertDescription className="text-red-300 text-xs">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs text-slate-400">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-7 text-xs bg-slate-800/20 border-slate-700/70 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-xs text-slate-400">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-7 text-xs bg-slate-800/20 border-slate-700/70 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 pr-8"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-700/30 rounded"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-3 w-3 text-slate-400" />
                  ) : (
                    <Eye className="h-3 w-3 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="sm"
              className="w-full h-7 text-xs bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-1 h-3 w-3" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-700/30 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-400 hover:text-blue-300 font-medium text-xs"
              >
                Sign up
              </Link>
            </p>

            <div className="mt-2">
              <Link
                href="/"
                className="text-xs text-slate-500 hover:text-slate-300 inline-flex items-center gap-1"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
