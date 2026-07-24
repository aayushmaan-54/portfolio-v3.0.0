export type Post = {
  title: string;
  slug: string;
  publishedAt: string;
};

const POSTS_ENDPOINT = `${import.meta.env.PUBLIC_BLOG_URL}/api/posts.json`;

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
    console.warn(`[getPosts] failed to fetch ${POSTS_ENDPOINT}:`, error);

    return [];
  }
}

export default getLatestPosts;
