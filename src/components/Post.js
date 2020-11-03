import Moment from "react-moment";
import "../styles/post.css";

const Post = (props) => {
  let title, url;

  const getTitle = () => {
    if (props.post.title === null) title = props.post.story_title;
    else if (props.post.title.length === 0) title = props.post.story_title;
    else title = props.post.title;

    return title;
  };

  const getUrl = () => {
    if (props.post.url === null) url = props.post.story_url;
    else if (props.post.url.length === 0) url = props.post.story_url;
    else if (props.post.url.length === 0 && props.post.url === null) url = null;
    else url = props.post.url;

    return url;
  };

  if (url === null && title === null) return null;
  else
    return (
      <div className="post">
        <div className="post-header">
          <h2>{getTitle()}</h2>
          <Moment unix format="MM/DD/YYYY hh:mm A">
            {props.post.created_at_i}
          </Moment>
        </div>
        <div className="post-footer">
          <p>{props.post.author}</p>
          {getUrl() ? (
            <a href={url} target="_blank" rel="noreferrer">
              Read Post →
            </a>
          ) : (
            <p>No URL</p>
          )}
        </div>
      </div>
    );
};

export default Post;
