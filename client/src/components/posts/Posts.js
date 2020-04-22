import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';

const Posts = ({ getPosts, post:{ posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts])

  if(loading) {
    return <Loader />
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      {/* post form */}
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = ({post}) => ({
  post,
})

export default connect(mapStateToProps, { getPosts })(Posts);
