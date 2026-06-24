"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRegisterUserMutation } from "@/services/auth";
import { registerSchema, FormData } from "@/lib/registerSchema";

export default function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        road: "",
        linkAddress: "",
      },
      email: "",
      password: "",
      confirmPassword: "",
      profile: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const safeProfile = data.profile?.startsWith("http")
        ? data.profile
        : "https://example.com/default.jpg";

      const payload = {
        username: data.username,
        phoneNumber: data.phoneNumber,
        address: {
          addressLine1: data.address.addressLine1,
          addressLine2: data.address.addressLine2,
          road: data.address.road,
          linkAddress: data.address.linkAddress,
        },
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        profile: safeProfile,
      };

      const res = await registerUser(payload).unwrap();

      console.log("REGISTER SUCCESS:", res);
      console.log("FORM DATA:", data);

      toast.success("Check your email to verify your account 📩");

      reset();
    } catch (err: any) {
      console.log("REGISTER ERROR:", err);
      toast.error(err?.data?.message || "Register failed ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm space-y-3"
    >
      <h2 className="text-xl font-bold text-center">Register</h2>

      {/* Username */}
      <input
        {...register("username")}
        placeholder="Username"
        className="input"
      />
      <p className="text-red-500 text-sm">{errors.username?.message}</p>

      {/* Phone */}
      <input
        {...register("phoneNumber")}
        placeholder="Phone Number"
        className="input"
      />
      <p className="text-red-500 text-sm">{errors.phoneNumber?.message}</p>

      {/* Address */}
      <input
        {...register("address.addressLine1")}
        placeholder="Address Line 1"
        className="input"
      />
      <p className="text-red-500 text-sm">
        {errors.address?.addressLine1?.message}
      </p>

      <input
        {...register("address.addressLine2")}
        placeholder="Address Line 2"
        className="input"
      />

      <input
        {...register("address.road")}
        placeholder="Road"
        className="input"
      />
      <p className="text-red-500 text-sm">{errors.address?.road?.message}</p>

      <input
        {...register("address.linkAddress")}
        placeholder="Google Map Link"
        className="input"
      />
      <p className="text-red-500 text-sm">
        {errors.address?.linkAddress?.message}
      </p>

      {/* Email */}
      <input {...register("email")} placeholder="Email" className="input" />
      <p className="text-red-500 text-sm">{errors.email?.message}</p>

      {/* Password */}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="input"
      />
      <p className="text-red-500 text-sm">{errors.password?.message}</p>

      {/* Confirm Password */}
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm Password"
        className="input"
      />
      <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>

      {/* Profile */}
      <input
        {...register("profile")}
        placeholder="Profile URL"
        className="input"
      />
      <p className="text-red-500 text-sm">{errors.profile?.message}</p>

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-2 rounded-lg"
      >
        {isLoading ? "Creating account..." : "Register"}
      </button>
    </form>
  );
}
