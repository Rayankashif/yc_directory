import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  // signIn Callback (Custom Logic)
  //   This runs whenever someone logs in via GitHub.
  // It gets data like:
  // name – GitHub display name
  // image – avatar URL
  // email – user email
  // login – GitHub username
  // id – GitHub user ID (used as unique identifier)
  // bio – user bio from GitHub
  // ✅ What This Code Does
  // First Time a GitHub User Logs In:
  // You check Sanity by GitHub ID.
  // If not found → you create a new author document.
  // Then the login continues normally.
  // Next Time They Log In:
  // You find the author already exists.
  // So no need to create anything.
  // Login continues.

  // 🔐 signIn() is like creating the user in the database
  // 🪪 jwt() is like giving them a digital ID card (token with id)
  // 💼 session() is like letting your frontend use that ID

 callbacks: {
  async signIn({ user: { name, image, email }, profile: { login, id, bio } }) {
    const existingUser = await client
      .withConfig({ useCdn: false })
      .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

    if (!existingUser) {
      await writeClient.create({
        _type: "author",
        id,
        name,
        username: login,
        email,
        image,
        bio,
      });
    }

    return true;
  },

  async jwt({ token, account, profile }) {
  if (account && profile) {
    const githubId = profile.id;
    token.githubId = githubId;

    const user = await client
      .withConfig({ useCdn: false })
      .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubId });

    if (user) {
      token.id = user._id;
    }
  }

  if (!token.id && token.githubId) {
    const user = await client
      .withConfig({ useCdn: false })
      .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: token.githubId });

    if (user) {
      token.id = user._id;
    }
  }

  // ✅ NEW fallback using email
  if (!token.id && token.email) {
    const user = await client
      .withConfig({ useCdn: false })
      // “Give me the first author document in Sanity where the email equals token.email, and return its _id and id only.”
      .fetch(`*[_type == "author" && email == $email][0]{_id, id}`, {
        email: token.email,
      });

    if (user) {
      token.githubId = user.id;
      token.id = user._id;
    }
  }

  // console.log("🔑 token in jwt after:", token);
  return token;
},

 async session({ session, token }) {
  if (token.id) {
    session.user.id = token.id as string;
  }

  // console.log("📦 session:", session);
  return session;
}
}, // ✅ this closes just the callbacks object
});
