import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div className="">
      <h1 className="h1-bold">Welcome to the world of Next JS.</h1>
    </div>
  );
}
