import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";
const view = async ({ id }: { id: string }) => {
  // These two requests will execute sequentially and you want see anything on ui until they are executed. We will
  //  see the skeleton.TO avoid that and update the views in background while we see rest of results immediately. We can
  // use unstable after functionality

  const { views: totalViews } = await client
    // client.withConfig({ useCdn: false }): Tells Sanity to fetch fresh data (not from cache). Good for showing real-time view counts.
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  // Patch is used for updates
  //  await writeClient.patch(id).set({views :totalViews+1}).commit();

  //  Safer Alternative using inc:
  // Sanity supports atomic increments to avoid race conditions:
    // This atomically increments the value of views by 1 — much safer in high-traffic scenarios.
  after(async () => {
    await writeClient.patch(id).inc({ views: 1 }).commit();
  });
  //You’re telling Next.js:
// “Update views after the page renders — don’t delay rendering.”
  

  return (
    <div className="view-container ">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black"> Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default view;
