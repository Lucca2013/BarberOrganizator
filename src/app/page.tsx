"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  router.push("/client");

  return (
    <html>
      <body>
      </body>
    </html>
  );
}
