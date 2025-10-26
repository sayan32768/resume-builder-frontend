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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/signup.schema";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { getData } from "@/contexts/UserContext";

export function SignupForm({ className, ...props }) {
  const { user, setUser } = getData();

  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const changeVisibilityPassword = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  const changeVisibilityConfirmPassword = (e) => {
    e.preventDefault();
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: signupSchema.parse({}),
    mode: "onChange",
  });

  // API CALLING HERE
  const onSubmit = async (data) => {
    console.log("Final Resume Data", data);
    setUser(null);
    try {
      // await login({ email, password });
      const res = await axios.post("/user/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/verify");
      }

      console.log(res.data);
    } catch (error) {
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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <Input
                  {...register("fullName")}
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-red-900 text-sm">
                    {errors.fullName?.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  placeholder="John Doe"
                />
                {errors.username && (
                  <p className="text-red-900 text-sm">
                    {errors.username?.message}
                  </p>
                )}
              </Field>
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
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    {...register("password")}
                    id="password"
                    type={!isPasswordVisible ? "password" : "text"}
                  />
                  <Button
                    onClick={(e) => changeVisibilityPassword(e)}
                    className={"absolute right-0 top-0 h-full px-3 py-2"}
                  >
                    {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-900 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>

                <div className="relative">
                  <Input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type={!isConfirmPasswordVisible ? "password" : "text"}
                  />

                  {/* <Button
                    onClick={(e) => changeVisibilityConfirmPassword(e)}
                    className={"absolute right-0 top-0 h-full px-3 py-2"}
                  >
                    {isConfirmPasswordVisible ? (
                      <FaRegEye />
                    ) : (
                      <FaRegEyeSlash />
                    )}
                  </Button> */}
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-900 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>
              <Field>
                <Button
                  variant={"outline"}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Working..." : "Create Account"}
                </Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
