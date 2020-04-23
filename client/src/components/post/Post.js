import React, { Fragment , useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

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
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = ({ post }) => ({
  post,
})

export default connect(mapStateToProps, { getPost })(Post)
