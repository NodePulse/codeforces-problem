import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  console.log(user);
  if (user) {
    redirect("/dashbaord");
  } else {
    redirect("/signIn");
  }

  return <div className="">Hello World</div>;
}
