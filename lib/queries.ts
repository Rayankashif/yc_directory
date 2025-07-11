import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
  *[
    _type == "startup" &&
    defined(slug.current) &&
    (
      !defined($search) ||
      category match $search ||
      title match $search ||
      author->name match $search
    )
  ] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author-> {
      _id,
      name,
      image,
      bio
    },
    views,
    description,
    category,
    image
  }
`);

// 🔹 defined(slug.current)
// Ensures that the startup has a valid slug (used for links like /startup/some-title)

// Without a slug, we can’t generate pages.

// 🔹 | order(_createdAt desc)
// Sorts the results:

// desc = newest startups first

// Based on their _createdAt timestamp


// “Fetch all startup documents that have a valid slug. 
// If there's no search query, return all of them. But if a search query is given, return only 
// those startups where the category, title, or author.name matches the search. Then, sort them by 
// creation date (newest first), and return only the necessary fields.”




export const STARTUP_BY_ID_QUERY = defineQuery(`
  *[_type=="startup" && _id==$id][0]{
    _id,
    title,
    slug,
    _createdAt,
    author->{
      _id,
      name,
      username,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
`)

export const STARTUP_VIEWS_QUERY=defineQuery(`
  *[_type=="startup" && _id==$id][0]{
  _id,views
  }
`)

export const AUTHOR_BY_GITHUB_ID_QUERY=defineQuery(`
 *[_type=='author' && id==$id][0]{
 _id,
 id,
 name,
 username,
 email,
 image,
 bio
 }`)

 export const AUTHOR_BY_ID_QUERY=defineQuery(`
 *[_type=='author' && _id==$id][0]{
 _id,
 id,
 name,
 username,
 email,
 image,
 bio
 }`)



 export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(`
  *[
    _type == "startup" && author._ref==$id] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author-> {
      _id,
      name,
      image,
      bio
    },
    views,
    description,
    category,
    image
  }
`);



export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "playlist" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    select[]->{
      _id,
      _createdAt,
      title,
      slug,
      description,
      category,
      image,
      pitch,
      views,
      author->{
        _id,
        name,
        username,
        image
      }
    }
  }
`)

