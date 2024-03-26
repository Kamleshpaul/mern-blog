import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import loginValidator, { ILoginPayload } from "@/validations/LoginValidator"
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from "@/redux/apis/userApi"
import { isServerError, isServerValidationError } from "@/lib/utils"
import { ServerError, ServerValidationErrors } from "@/types/errors"
import { useToast } from "@/components/ui/use-toast"


export default function Login() {

  const navigate = useNavigate();
  const { toast } = useToast()

  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<ILoginPayload>({
    resolver: zodResolver(loginValidator)
  })

  const onSubmit: SubmitHandler<ILoginPayload> = async (data) => {
    try {
      await login(data)
        .unwrap()
      navigate('/admin')

    } catch (error: unknown) {

      if (isServerValidationError(error)) {
        const fetchError = error as ServerValidationErrors;
        const errors = fetchError.data.errors;
        setError('email', errors.filter(x => x.path.includes('email'))[0])
        setError('password', errors.filter(x => x.path.includes('password'))[0])
        return;
      }

      if (isServerError(error)) {
        const fetchError = error.data as ServerError;
        toast({
          title: fetchError.message,
          variant: 'destructive'
        })
        return;
      }
    }

  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">

      <Card className="max-w-sm p-2 mx-auto">

        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="user@example.com" {...register('email', { required: true })} />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                  <Link className="inline-block ml-auto text-sm underline" to="#">
                    Forgot your password?
                  </Link>

                </div>
                <Input id="password" type="password" {...register('password', { required: true })} />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
              </div>

              <Button className="w-full" type="submit">
                Login
              </Button>

              {/* <Button className="w-full" variant="outline">
              Login with Google
            </Button> */}
            </div>
          </form>
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


