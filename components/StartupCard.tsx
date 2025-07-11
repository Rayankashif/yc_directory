
import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Author, Startup } from '../sanity/types'




 export type StartupTypeCard= Omit<Startup,"author">&{author?:Author}
//  The line export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author } 
//  creates a new TypeScript type called StartupTypeCard by modifying the existing Startup type.
//   Specifically, it uses Omit to remove the original author field from Startup, which normally
//    contains a reference to an Author document (e.g., { _ref: string, _type: "reference" }). 
//    This is useful because in GROQ queries, we often use author-> to fetch the full author object
//     instead of just a reference. To match that populated structure, the line then merges back a new 
//     author field with the full Author type using & { author?: Author }. The result is a type that
//      contains all the original fields from Startup (like title, description, slug, etc.) but replaces
//       the author reference with a fully expanded author object. This ensures your components can safely 
//       access properties like author.name or author.image with proper type support.
    
   
const StartupCard = ({ post }: { post: StartupTypeCard }) => {

  


  const {_createdAt, views, author,title,category,_id,image,description}=post;
  return (
    <li className="startup-card ">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-[#EE2B69]" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
          <h3 className="text-26-semibold line-clamp-1">
          {title}
          </h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
        <Image src={author?.image!} alt={author?.name!} width={50} height={50} className="rounded-full"/>
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
      <p className="startup-card_desc line-clamp-2">  
         {description}
         </p>
         <img src={image} alt="placeholder" className=" w-full h-[164px] rounded-[10px] object-cover"  />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
               <p className="text-16-medium"> 
                {category}
                </p>     
        </Link>
        <button className="startup-card_btn ">
          <Link href={`/startup/${_id}`}>
          Details
          </Link>
        </button>
      </div>
    </li>
  );
};




export default StartupCard;
