import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">

      <Card className="max-w-sm p-2 mx-auto">

        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>Enter your details below to Register to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name" required type="text" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="user@example.com" required type="email" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" required type="password" />
            </div>

            <Button className="w-full" type="submit">
              Register
            </Button>
          </div>
          <div className="mt-4 text-sm text-center">
            Already have account?
            <Link className="underline" to="/login">
              Login
            </Link>
          </div>
        </CardContent>

      </Card>
    </div>
  )
}
