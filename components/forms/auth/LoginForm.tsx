"use client";

import React, { useState } from "react";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { getErrorMessage } from "@/lib/utils";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number")
  // .regex(
  //   /[^a-zA-Z0-9]/,
  //   "Password must contain at least one special character"
  // ),
});

function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        toast.error("Invalid login credentials");
        return;
      }
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (error: Error | any) {
      toast.error(getErrorMessage(error?.response?.data));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Card className="w-full max-w-md p-6 shadow-none border-0 transition-colors space-y-4">
        <Form {...form}>
          <h1 className="text-3xl  font-semibold text-center text-foreground">
            Welcome back!
          </h1>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 flex flex-col"
          >
            <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="w-full bg-[#7F9CF5] hover:bg-[#5a7be7] text-white"
              type="submit"
              disabled={isLoading}
            >
              Login
            </Button>
          </form>
        </Form>
      </Card>

      <div className="text-center pt-2">
        <Link href="/auth/signup" className="text-sm font-300">
          Don&apos;t have an account?{" "}
          <span className=" text-[#5a7be7] font-bold">Signup</span>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
