import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";


const PostsList = () => {
    const posts = useSelector(selectAllPosts);

    const sortedPosts = posts?.slice().sort((a, b) => b.date.localeCompare(a.date))
    

    const postsToRender = sortedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
              <PostAuthor userId={post.userId} />
              <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    ))
  return (
    <section>
        <h2>Posts</h2>
        {postsToRender}
    </section>
  )
}

export default PostsList;