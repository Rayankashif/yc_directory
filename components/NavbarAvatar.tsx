"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavbarAvatar = ({ image, name }: { image?: string; name?: string }) => {
  return (
    <Avatar className="size-10">
      <AvatarImage src={image || ""} alt={name || ""} />
      <AvatarFallback>AV</AvatarFallback>
    </Avatar>
  );
};

export default NavbarAvatar;
