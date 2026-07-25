import { SITE } from "@/config/site.config";

export type Post = {
  title: string;
  slug: string;
  publishedAt: string;
};

const POSTS_ENDPOINT = `${SITE.blogUrl}/api/posts.json`;

// Fetched at build time
async function getLatestPosts(limit = 3): Promise<Post[]> {
  try {
    const res = await fetch(POSTS_ENDPOINT);

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const posts: Post[] = await res.json();

    return posts.slice(0, limit);
  } catch (error) {
    console.error(
      `\n!! [getPosts] BUILD-TIME FETCH FAILED\n!! endpoint: ${POSTS_ENDPOINT}\n!! reason:   ${error instanceof Error ? error.message : error}\n!! The writing section will render empty.\n`,
    );

    return [];
  }
}

export default getLatestPosts;
