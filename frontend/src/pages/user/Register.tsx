import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { isServerError } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/apis/userApi";
import { ServerError } from "@/types/errors";
import registerValidator, { IRegisterPayload } from "@/validations/RegisterValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  const [registerHandler] = useRegisterMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IRegisterPayload>({
    resolver: zodResolver(registerValidator)
  });

  const onSubmit: SubmitHandler<IRegisterPayload> = async (data) => {
    try {
      const response = await registerHandler(data)
        .unwrap()
      reset();

      if (response.status) {
        toast({
          title: response?.message,
        })
        navigate('/login')
      } else {
        toast({
          title: "Something went wrong",
          variant: "destructive"
        })
      }
      console.log({ response });


    } catch (error) {
      if (isServerError(error)) {
        const serverError = error.data as ServerError;
        toast({
          title: serverError.message,
          variant: "destructive"
        })
      }
    }

  }
  return (
    <div className="flex items-center justify-center w-screen h-screen">

      <Card className="max-w-sm p-2 mx-auto">

        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>Enter your details below to Register to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name" type="text" {...register('name')} />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="user@example.com" type="email" {...register('email')} />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}

            </div>

            <Button className="w-full" type="submit">
              Register
            </Button>
          </form>
          <div className="text-sm text-center ">
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
