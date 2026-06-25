"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
  const email = useSearchParams().get("email");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyEmail = async () => {
    if (!email) return toast.error("Missing email in URL");
    if (!code) return toast.error("Please enter verification code");

    try {
      setLoading(true);

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

      if (!res.ok) throw new Error("Verification failed");

      toast.success("Email verified . You can now login");
      console.log("VERIFY RESPONSE:", data);
    } catch (err) {
      toast.error("Invalid verification code ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Verify Your Email
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          We sent a code to:
        </p>

        <p className="text-center font-medium text-gray-700 mb-6">{email}</p>

        {/* Input */}
        <input
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={verifyEmail}
          disabled={loading}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 rounded-lg font-medium transition"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Didn’t receive the code? Check spam folder
        </p>
      </div>
    </div>
  );
}
