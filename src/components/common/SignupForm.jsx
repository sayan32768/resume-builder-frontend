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
import { signupSchema } from "@/schemas/signup.schema";
import { useRef, useState } from "react";
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
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

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

  const onSubmit = async (data) => {
    setUser(null);
    try {
      const res = await axios.post("/user/register", data, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/verify");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className={"bg-slate-100 border-slate-300"}>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.id === "fullName") {
                e.preventDefault();
                document.getElementById("email")?.focus();
              }

              if (e.key === "Enter" && e.target.id === "email") {
                e.preventDefault();
                passwordRef.current?.focus();
              }
              if (e.key === "Enter" && e.target.id === "password") {
                e.preventDefault();
                confirmPasswordRef.current?.focus();
              }
              if (e.key === "Enter" && e.target.id === "confirmPassword") {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <Input
                  className={"bg-slate-300 border-0 border-slate-700"}
                  {...register("fullName")}
                  onKeyDown={(e) => {
                    const regex = /^[a-zA-Z\s]*$/;
                    if (!regex.test(e.key) && e.key.length === 1) {
                      e.preventDefault();
                    }
                  }}
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
              {/* <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  className={"bg-slate-300 border-0 border-slate-700"}
                  {...register("username")}
                  onKeyDown={(e) => {
                    const regex = /^[a-zA-Z0-9]*$/;
                    if (!regex.test(e.key) && e.key.length === 1) {
                      e.preventDefault();
                    }
                  }}
                  id="username"
                  type="text"
                  placeholder="JohnDoe"
                />
                {errors.username && (
                  <p className="text-red-900 text-sm">
                    {errors.username?.message}
                  </p>
                )}
              </Field> */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  className={"bg-slate-300 border-0 border-slate-700"}
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
                    id="password"
                    type={!isPasswordVisible ? "password" : "text"}
                    className={"bg-slate-300 border-0 border-slate-700"}
                    {...register("password")}
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        e.preventDefault();
                      }
                    }}
                    ref={(e) => {
                      register("password").ref(e);
                      passwordRef.current = e;
                    }}
                  />
                  <Button
                    onClick={changeVisibilityPassword}
                    className={
                      "absolute right-0 top-0 h-full px-3 py-2 hover:cursor-pointer"
                    }
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
                    id="confirmPassword"
                    type={!isConfirmPasswordVisible ? "password" : "text"}
                    className={"bg-slate-300 border-0 border-slate-700"}
                    {...register("confirmPassword")}
                    ref={(e) => {
                      register("confirmPassword").ref(e);
                      confirmPasswordRef.current = e;
                    }}
                  />
                  {/* <Button
                    onClick={changeVisibilityConfirmPassword}
                    className={
                      "absolute right-0 top-0 h-full px-3 py-2 hover:cursor-pointer"
                    }
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
                  className={"bg-slate-900 text-white hover:cursor-pointer"}
                  variant={"outline"}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Working..." : "Create Account"}
                </Button>
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
