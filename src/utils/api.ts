import { sanityClient } from "sanity:client";

const imageRefObj = `
{
  "imageRef": asset,
  alt,
  "dimensions": asset-> metadata.dimensions {
    height,
    width,
    aspectRatio
  }
}
`;

export async function getGlobalContent() {
  const query = `*[_type == "globalContent"][0] {
    title,
    titleAlignment
  }`;
  const data = await sanityClient.fetch(query);
  return data;
}

// Homepage post excerpts with author information
export async function getHomePosts() {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    "slug": slug.current,
    "featuredImage": featuredImage.imageRef ${imageRefObj},
    "author": author-> {
      "label": name,
      "slug": slug.current,
      "image": image.imageRef ${imageRefObj},
    },
    title,
    excerpt
  }`;
  const data = await sanityClient.fetch(query);
  return data;
}

// Get Homecards for homepage
export async function getHomeCards() {
  const query = `{
    "cards": *[_type == "homeCard"] | order(order asc) {
      order,
      cardType,
      headline,
      body,
      bodyMinimized,
      media,
      button,
      title,
      subtitle,
      videos[] {
        title,
        duration,
        video {
          "url": video.asset->url,
          "poster": video.poster.asset->url,
          width,
          height
        }
      }
    }
  }`;
  const data = await sanityClient.fetch(query);
  return data;
}

// Tag page with all posts related to that tag
export async function getTagPage() {
  const query = `*[_type == "tag"] {
    "slug": slug.current,
    "posts": *[_type == "post" && references(^._id)] {
      "slug": slug.current,
      title,
      excerpt,
      "featuredImage": featuredImage.imageRef ${imageRefObj},
      "author": author-> {
        "label": name,
        "slug": slug.current,
        "image": image.imageRef ${imageRefObj},
      },
    }
  }`;
  return sanityClient.fetch(query);
}

// Author page with all posts related to that author
export async function getAuthorPage() {
  const query = `*[_type == "author"] {
    "slug": slug.current,
    "posts": *[_type == "post" && references(^._id)] {
      "slug": slug.current,
      title,
      excerpt,
      "featuredImage": featuredImage.imageRef ${imageRefObj},
      "author": author-> {
        "label": name,
        "slug": slug.current,
        "image": image.imageRef ${imageRefObj},
      },
    }
  }`;
  return sanityClient.fetch(query);
}

// Get all posts and list of related posts based on tag
export async function getPosts() {
  const query = `*[_type == "post"] {
    slug,
    excerpt,
    "featuredImage": featuredImage.imageRef ${imageRefObj},
    "featuredVideo": featuredVideo.video {
      "url": asset->url,
      "poster": poster.asset,
      height,
      width,
    },
    "author": author-> {
      "label": name,
      "slug": slug.current,
      "image": image.imageRef ${imageRefObj},
    },
    title,
    body,
    "tags": tags[]->{
      title,
      "slug": slug.current
    },
    "relatedPosts": *[_type == "post" && slug.current != ^.slug.current && count(tags[@._ref in ^.^.tags[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..3] {
      title,
      "slug": slug.current,
      "created": _createdAt,
      "featuredImage": featuredImage.imageRef ${imageRefObj},
      "author": author-> {
        "label": name,
        "slug": slug.current,
        "image": image.imageRef ${imageRefObj},
      },
    },
    metaTitle,
    metaDescription
  }`;
  return paramMap(await sanityClient.fetch(query));
}

// Get all basic pages
export async function getPages() {
  const query = `*[_type == "page" && title != "404"] {
    slug,
    title,
    body,
    titleAlignment,
    "featuredImage": featuredImage.imageRef ${imageRefObj},
    "featuredVideo": featuredVideo.video {
      "url": asset->url,
      "poster": poster.asset->url,
      height,
      width,
    },
    metaTitle,
    metaDescription
  }`;
  return paramMap(await sanityClient.fetch(query));
}

// Get the 404 page specifically
export async function get404Page() {
  const query = `*[_type == "page" && title == "404"][0]  {
    title,
    body,
    titleAlignment,
    "featuredImage": featuredImage.imageRef ${imageRefObj},
  }`;
  return await sanityClient.fetch(query);
}

// Get header nav
export async function getHeaderNav() {
  const query = `*[_type == "menu" && title == "Header"][0]  {
    "links": blocks[] {
      text,
      url,
      blank,
      displayButton
    }
  }`;
  const data = await sanityClient.fetch(query);
  return data.links;
}

// Get footer nav
export async function getFooterNav() {
  const query = `*[_type == "menu" && title == "Footer"][0]  {
    "links": blocks[] {
      text,
      url,
      blank
    }
  }`;
  const data = await sanityClient.fetch(query);
  return data.links;
}

export async function getVideoGallery(id: string) {
  const query = `*[_type == "videoGallery" && _id == $id][0] {
    title,
    subtitle,
    videos[] {
      title,
      duration,
      video {
        "url": video.asset->url,
        "poster": video.poster.asset->url,
        width,
        height
      }
    }
  }`;
  
  return sanityClient.fetch(query, { id });
}

function paramMap(items: any) {
  return items.map((item: any) => {
    return {
      params: {
        slug: item.slug?.current || "",
      },
      props: { ...item },
    };
  });
}
