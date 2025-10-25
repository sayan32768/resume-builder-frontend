import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login.schema";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { getData } from "@/contexts/UserContext";

export function LoginForm({ className, ...props }) {
  const { user, setUser } = getData();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const changeVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginSchema.parse({}),
    mode: "onChange",
  });

  // API CALLING HERE
  const onSubmit = async (data) => {
    console.log("Final Resume Data", data);
    setUser(null);
    try {
      // await login({ email, password });
      const res = await axios.post("/user/login", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // const res = await api.post("/user/login", { email, password });
      console.log(res.data);
      if (res.data.success) {
        console.log("AAAAAAAAAAAAAAAAAAAA");
        console.log(res.data.data);
        setUser(res.data.data);
        toast.success(res.data.message);
        navigate("/home", { replace: true });
      }
    } catch (error) {
      setUser(null);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <p className="text-red-900 text-sm">{errors.email.message}</p>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>

                <div className="relative">
                  <Input
                    {...register("password")}
                    id="password"
                    type={!showPassword ? "password" : "text"}
                  />

                  <Button
                    onClick={(e) => changeVisibility(e)}
                    className={"absolute right-0 top-0 h-full px-3 py-2"}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </Button>
                </div>

                {errors.password && (
                  <p className="text-red-900 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <Button variant="outline" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Working..." : "Login"}
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
