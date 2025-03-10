import { readSession } from "@/features/auth/session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await readSession();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
