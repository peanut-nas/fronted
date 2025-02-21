"use client";
import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const dynamicTitle = username ? `Welcome ${username}` : "Welcome Peanut-NAS";

  useEffect(() => {
    if (error && !isExiting) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => setError(null), 300);
      }, 2700);
      return () => clearTimeout(timer);
    }
  }, [error, isExiting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsExiting(false);

    try {
      const response = await fetch(`/api/login?name=${encodeURIComponent(username)}&psw=${encodeURIComponent(password)}`);
      const data = await response.json();

      if (!response.ok || data.code !== 200) {
        throw new Error(data.msg || 'Login failed');
      }

      const urlParams = new URLSearchParams(window.location.search);
      const path = urlParams.get('path') || '/';
      window.location.href = path;
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Toast with fixed positioning */}
      {error && (
        <div className={`fixed left-[50%] right-[50%] mx-auto z-50 ${
          isExiting ? 'animate-slide-up top-2' : 'animate-slide-down top-6'
        }`}>
          <div className="absolute left-[50%] -translate-x-[50%] bg-[#ff444429] backdrop-blur-sm px-6 py-3 rounded-xl flex items-center space-x-3 border border-red-100 shadow-lg min-w-[380px]">
            <div className="text-red-500">❌</div>
            <span className="text-sm text-red-600 font-medium">{error}</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl w-full p-8 space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-semibold text-gray-800 transition-opacity duration-200">
            {dynamicTitle}
          </h1>
          <p className="text-gray-500">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              className="rounded-xl px-4 py-3 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none focus:border-transparent transition-shadow"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="rounded-xl px-4 py-3 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none focus:border-transparent transition-shadow"
              placeholder="••••••••"
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-3 font-medium transition-colors"
          >
            Sign In
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have account?{" "}
          <a 
            href="mailto:panrunqiu@outlook.com" 
            className="text-blue-600 hover:underline font-medium"
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}