import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post:{ posts, loading } }) => {

  useEffect(() => {
    getPosts();
  }, [getPosts])

  return (
    <div>
      <h1>posts</h1>
    </div>
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
