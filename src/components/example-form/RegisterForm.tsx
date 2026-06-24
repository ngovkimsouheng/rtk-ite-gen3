"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterUserMutation } from "@/services/auth";

type FormData = {
  username: string;
  phoneNumber: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    road: string;
    linkAddress: string;
  };
  email: string;
  password: string;
  confirmPassword: string;
  profile: string;
};

export default function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { register, handleSubmit, reset } = useForm<FormData>({
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
      // 1. PASSWORD CHECK
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match ❌");
        return;
      }

      // 2. SAFE PROFILE
      const safeProfile = data.profile?.startsWith("http")
        ? data.profile
        : "https://example.com/default.jpg";

      // 3. PAYLOAD (MATCH BACKEND)
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
      console.log(data)
      console.log("REGISTER RESPONSE:", res);

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
      className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Register</h2>

      {/* username */}
      <input
        {...register("username")}
        placeholder="Username"
        className="input"
      />

      {/* phone */}
      <input
        {...register("phoneNumber")}
        placeholder="Phone Number"
        className="input"
      />

      {/* address */}
      <input
        {...register("address.addressLine1")}
        placeholder="Address Line 1"
        className="input"
      />
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
      <input
        {...register("address.linkAddress")}
        placeholder="Google Map Link"
        className="input"
      />

      {/* auth */}
      <input {...register("email")} placeholder="Email" className="input" />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="input"
      />
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm Password"
        className="input"
      />

      {/* profile */}
      <input
        {...register("profile")}
        placeholder="Profile URL"
        className="input"
      />

      {/* button */}
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
