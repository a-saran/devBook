import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost} from "../../actions/post";

const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <div class="post bg-white card my-1 p-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt="avatar" />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p class="my-1">{text}</p>
        <div className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </div>

        <button class="btn" onClick={() => addLike(_id)}>
          <i class="fas fa-thumbs-up"></i>{" "}
          <span>{likes.length === 0 ? null : likes.length}</span>
        </button>

        <button class="btn"  onClick={() => removeLike(_id)}>
          <i class="fas fa-thumbs-down"></i>
        </button>

        <Link to={`/post/${_id}`} class="btn btn-primary">
          <i class="far fa-comment-dots"></i> Comments{" "}
          <span>{comments.length === 0 ? null : comments.length}</span>
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button type="button" className="btn-danger" onClick={() => deletePost(_id)}>
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
