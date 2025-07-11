import { auth } from "@/auth";
import NavbarAvatar from "./NavbarAvatar";

const NavbarAvatarWrapper = async () => {
  const session = await auth();

  return (
    <NavbarAvatar
      image={session?.user?.image ?? undefined}
      name={session?.user?.name ?? undefined}

      
    />
  );
};

export default NavbarAvatarWrapper;
