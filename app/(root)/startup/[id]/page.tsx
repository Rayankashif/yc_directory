// /startup/[id]
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
// markdown-it is a JavaScript library that converts Markdown syntax (like **bold**, # Headings, - Lists, etc.) into HTML.
// You initialize it using markdownit().
import markdownit from 'markdown-it'
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
  
const md=markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

// post: will be the result of client.fetch(STARTUP_BY_ID_QUERY, { id })
// { select: editorPosts }: is the second result (the playlist), and you're extracting the select array from it and renaming it to editorPosts
  const [post,{select:editorPosts}]= await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
  slug: 'editor-picks-new',
})
  ])
 


  if (!post) return notFound();
//   ✅ const parsedContent = md.render(post?.pitch || '')
// This line takes the post.pitch (which is a Markdown string written by the user) and parses it into raw HTML.
//  md.render() is the Markdown → HTML converter function.
  const parsedContent= md.render(post?.pitch || '');
  return (
    <>
      <section className="pink_container pattern !min-h-[230px]">
        <p className="tag tag-tri ">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full  max-h-[200px] object-cover rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-[#7D8087]">@{post.author.username}</p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>

          {/* React normally escapes all HTML to protect your app from XSS (Cross-Site Scripting) attacks.
But here, you're telling React:
➤ "I trust this HTML. Render it as-is."
dangerouslySetInnerHTML is the only way to inject raw HTML into a React component. */}
          {parsedContent ? (
            <article
            className="pros max-w-4xl break-all"
             dangerouslySetInnerHTML={{__html: parsedContent}}
            />
          ):(
            <p className="no-result"> No Details provided </p>
          )}
        </div>
        <hr className="divider" />

      {editorPosts?.length > 0 && (
        <div  className="max-w-4xl mx-auto">
          <p className="text-30-semibold">Editor Picks</p>

          <ul className="mt-7 card_grid-sm">
            {editorPosts.map((post:StartupTypeCard, index:number)=>
            <StartupCard key={index} post={post}/>
          )}
          </ul>
        </div>
      )}


        <Suspense fallback={<Skeleton className="view_skeleton"/>}>
             <View id={id}/>
        </Suspense>
      </section>
    </>
  );
};

export default page;
