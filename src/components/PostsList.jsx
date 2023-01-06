import { useSelector, useDispatch } from "react-redux";
import {
  selectPostIds,
  getPostsError,
  getPostsStatus,
} from "../features/posts/postsSlice";

import PostContent from "./PostContent";

const PostsList = () => {
  // const dispatch = useDispatch();

  const orderedPostIds = useSelector(selectPostIds);
  const error = useSelector(getPostsError);
  const postStatus = useSelector(getPostsStatus);

  // useEffect(() => {
  //   if (postStatus == "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [postStatus, dispatch]);

  let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        // content = orderedPosts.map(post => <PostContent key={post.id} post={post} />)
        content = orderedPostIds.map(postId => <PostContent key={postId} postId={postId} /> )
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}


export default PostsList;
