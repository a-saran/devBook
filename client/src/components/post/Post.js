import React, { Fragment , useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import { Link, withRouter } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost])


  if(loading || post === null) {
    return <Loader />
  }
  
  return (
    <Fragment>
      <Link to='/posts' className='btn'>Back to posts</Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id}/>
      <div className="comments">
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id}/>
        ))}
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = ({ post }) => ({
  post,
})

export default connect(mapStateToProps, { getPost })(withRouter(Post))
