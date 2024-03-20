import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Login() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">

      <Card className="max-w-sm p-2 mx-auto">

        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="user@example.com" required type="email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

                <Link className="inline-block ml-auto text-sm underline" to="#">
                  Forgot your password?
                </Link>

              </div>
              <Input id="password" required type="password" />
            </div>

            <Button className="w-full" type="submit">
              Login
            </Button>

            {/* <Button className="w-full" variant="outline">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-sm text-center">
            Don't have an account?
            <Link className="underline" to="/register">
              Sign up
            </Link>
          </div>
        </CardContent>

      </Card>
    </div>
  )
}

