import FormExample from "@/components/example-form/FormExample";
import RegisterForm from "@/components/example-form/RegisterForm";
import ButtonComponent from "@/components/ui/ButtonComponent";
import GetCountComponent from "@/components/ui/GetCountComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-2 max-w-7xl items-center place-items-center container mx-auto gap-8 py-4 place-content-center min-h-screen">
      {/* <ButtonComponent />
      <GetCountComponent /> */}{" "}
      <RegisterForm></RegisterForm>
      <FormExample></FormExample>
    </div>
  );
  //  <Card className="max-w-sm">
  //       <CardHeader>
  //         <CardTitle>Project Overview</CardTitle>
  //         <CardDescription>
  //           Track progress and recent activity for your Next.js app.
  //         </CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         Your design system is ready. Start building your next component.
  //       </CardContent>
  //     </Card>
  //   );
}
