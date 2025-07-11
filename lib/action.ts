"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify"


export const createPitch = async (state: any, form: FormData, pitch: string) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }
  // The line const { title, description, category, link } = Object.fromEntries(Array.from(form).filter(([key]) =>
  // key !== "pitch")) efficiently extracts specific values from a FormData object while excluding the "pitch" field.
  // First, it converts the FormData into an array of key-value pairs using Array.from(form). Then, it filters out
  // the pair where the key is "pitch", and reconstructs the remaining entries back into a plain object using
  //  Object.fromEntries(). Finally, it destructures the resulting object to directly access the title, description,
  //  category, and link values. This approach is clean, avoids repetitive form.get(...) calls, and helps separate
  //  pitch (which may be h andled differently) from the rest of the form data.
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key != "pitch")
  );
//     lower: true,   // ✅ convert to lowercase (e.g., "My App" → "my-app")
//   strict: true   // ✅ remove all special characters (e.g., "!" or ":")
  const slug = slugify(title as string, { lower: true, strict: true });

  try{
    const startup={
        title,
        description,
        category,
        image:link,
        slug:{
            _type:"slug",
            current:slug
        },
        author:{
            _type:"reference",
            _ref:session?.user?.id
        },
        pitch,
        views:0
    };
    const result=await writeClient.create({_type:"startup", ...startup})
    return parseServerActionResponse({
        ...result,
        error:'',
        status:"SUCCESS"
    })

  }catch(error){

    console.log(error);
    return parseServerActionResponse({
        error:JSON.stringify(error),
        status:"ERROR"
    })
    
  }
};
