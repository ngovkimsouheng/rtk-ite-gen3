"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
  const email = useSearchParams().get("email");
  const [code, setCode] = useState("");

  const verifyEmail = async () => {
    if (!email) {
      toast.error("Missing email in URL");
      return;
    }

    if (!code) {
      toast.error("Please enter verification code");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ISHOP_BASE_URL}/users/verify-email?token=${code}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json().catch(() => null);

      console.log("VERIFY RESPONSE:", data);

      if (!res.ok) throw new Error("Verification failed");

      toast.success("Email verified 🎉 You can now login");
    } catch (err) {
      console.log(err);
      toast.error("Invalid verification code ❌");
    }
  };
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Verify Email</h1>

      <p className="text-sm text-gray-500 mb-4">We sent a code to: {email}</p>

      <input
        className="border p-2 w-full"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={verifyEmail}
        className="bg-blue-600 text-white w-full mt-3 py-2"
      >
        Verify
      </button>
    </div>
  );
}
