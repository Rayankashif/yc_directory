import Link from "next/link";
import React from "react";
import Image from "next/image";
import { auth } from "@/auth";
import SignInButton from "../components/SignInButton";
import SignOutButton from "../components/SignOutButton";
import NavbarAvatarWrapper from "./NavbarAvatarWrapper";


const Navbar = async () => {
  
  
  // By session we can know whether user is logged in or not
  const session = await auth();
  return (
    <header className=" py-3 shadow-sm bg-white font-work-sans overflow-x-hidden">
      <nav className="flex justify-between items-center px-4 py-2  ">
        <div className="mr-5">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} priority></Image>
        </Link>
        </div>
        <div className="flex items-center gap-3 lg:gap-5 text-black">
          {/* Why is ? written after session like session?.user?
That ? is called the optional chaining operator in JavaScript/TypeScript. */}
          {/* ✅ What is session?.user?
This means:
✅ “If session exists (is not null or undefined), then access session.user.
❌ But if session is null, don't crash — just return undefined.” */}

          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="cursor-pointer  "> Create</span>
              </Link>
              <SignOutButton />



               {/* <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              ><button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  </button>
                  </form> */}


              
             
              <Link href={`/user/${session?.user?.id}`}>
                <NavbarAvatarWrapper />
              </Link>




            </>
          ) : (
            <SignInButton />
            // <form
            //   action={async () => {
            //     "use server";

            //     await signIn("github");
            //   }}
            // >
            //   <button type="submit">Login</button>
            // </form>   
          )}
        </div>
      </nav>
    </header>
  );
};
// <button onClick={signIn(provider:'github')}>
            //   <span>Login</span>
            // </button>
            // we cannot use onClick like this . It need to be await in next js but on click is a client component and it
            // should be a server component for await so we use {acction} in a form
export default Navbar;
