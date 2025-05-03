import { logOut } from "@/actions/authentication";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div className="">
      <h1 className="">Welcome to the world of Next JS.</h1>
      <form action={logOut} className="px-10 pt-[100px]">
        <Button className="text-white dark:text-dark-200" type="submit">
          Log out
        </Button>
      </form>
    </div>
  );
}
