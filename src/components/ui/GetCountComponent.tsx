"use client";

import { useAppSelector } from "@/store/hooks";

export default function GetCountComponent() {
  const count = useAppSelector((value) => value.count.value);
  return <div className="text-center m-5 text-4xl">Count: {count}</div>;
}
