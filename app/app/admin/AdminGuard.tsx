"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/app/context/AuthContext";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  const {
    user,
    loading,
  } = useAuth();

  const adminEmail =
    "admin@guess360.com.pk";

  useEffect(() => {

    if (
      !loading
    ) {

      if (
        !user
      ) {

        router.push(
          "/login"
        );

        return;

      }

      if (
        user.email !==
        adminEmail
      ) {

        router.push(
          "/"
        );

      }

    }

  }, [
    user,
    loading,
    router,
  ]);

  if (
    loading ||
    !user ||
    user.email !==
      adminEmail
  ) {

    return null;

  }

  return <>{children}</>;

}