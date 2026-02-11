import { useParams } from "react-router-dom";
import { getBlogPostBySlug } from "@/data/blogPosts";
import BlogPost from "@/components/BlogPost";
import NotFound from "./NotFound";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  return <BlogPost post={post} />;
};

export default BlogPostPage;
