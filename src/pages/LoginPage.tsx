import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(email, password)) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-[100vh] mx-auto">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white cursor-pointer"
              variant="outline"
            >
              Login
            </Button>
          </form>
          <div className="mt-6 p-4 rounded-lg bg-gray-200">
            <div className="space-y-2 text-sm flex gap-5">
              <div>
                <p className="font-medium">User Account:</p>
                <p>Email: user@example.com</p>
                <p>Password: user123</p>
              </div>
              <div>
                <p className="font-medium">Admin Account:</p>
                <p>Email: admin@example.com</p>
                <p>Password: admin123</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
