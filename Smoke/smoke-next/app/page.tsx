"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
   
  return (
    <div>
      <h1>Smoke</h1>
      <p>
        Don't smoke, but use Smoke!
      </p>
    </div>
  )
};