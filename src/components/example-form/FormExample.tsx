// "use client";
// import { useLoginUserMutation } from "@/services/auth";
// import { error } from "console";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { email } from "zod";

// type formData = {
//   email: string;
//   password: string;
// };

// export default function FormExampleComponent() {
//   // calling login custom hook
//   const [loginRequest, { data: loginResponse, error }] = useLoginUserMutation();
//   // 1. delcare object using with useForm
//   const { register, handleSubmit, reset, setError } = useForm({
//     // 2. set default values
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   // 3. create handleSubmit to track value from input form
//   const onSubmit = (data: formData) => {
//     try {
//       loginRequest({
//         email: data?.email,
//         password: data?.password,
//       });
//       console.log(error);

//       if (data != null) {
//         toast("You have login successfully!");
//       }
//     } catch (error) {
//       toast.error("You need to login again!");
//     }
//     //  console.log("===> Form Data Email: ", data?.email);
//     //  console.log("===> Form Data Password: ", data?.password);
//   };
//   return (
//     <div className="">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
//       >
//         {/* Title */}
//         <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

//         {/* Email */}
//         <div className="flex flex-col gap-2">
//           <label htmlFor="email" className="text-sm font-medium text-gray-600">
//             Email
//           </label>
//           <input
//             {...register("email")}
//             type="email"
//             name="email"
//             id="email"
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             placeholder="Enter your email"
//           />
//         </div>

//         {/* Password */}
//         <div className="flex flex-col gap-2">
//           <label
//             htmlFor="password"
//             className="text-sm font-medium text-gray-600"
//           >
//             Password
//           </label>
//           <input
//             {...register("password")}
//             type="password"
//             name="password"
//             id="password"
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             placeholder="Enter your password"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md active:scale-95"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginUserMutation } from "@/services/auth";

type FormData = {
  email: string;
  password: string;
};

export default function FormExampleComponent() {
  const [loginRequest, { isLoading }] = useLoginUserMutation();

  
  
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await loginRequest({
        email: data.email,
        password: data.password,
      }).unwrap();

      console.log("LOGIN SUCCESS:", response);

      toast.success("You have logged in successfully! 🎉");

      reset();
    } catch (err: any) {
      console.log("LOGIN ERROR:", err);

      toast.error(err?.data?.message || err?.message || "Login failed ❌");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>

          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-600"
          >
            Password
          </label>

          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
