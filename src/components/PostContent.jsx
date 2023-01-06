import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import { selectPostById } from "../features/posts/postsSlice";
import { useSelector } from "react-redux";


const PostContent = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, Number(postId)))
    
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 75) + '...'}</p>
            <p className="postCredit">
                <Link to={`post/${post.id}`} className="post-link">View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}
export default PostContent