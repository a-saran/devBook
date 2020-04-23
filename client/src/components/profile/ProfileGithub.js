import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubrepos } from '../../actions/profile';
import Loader from '../layout/Loader';

const ProfileGithub = ({ username, repos, getGithubrepos }) => {
  useEffect(() => {
    getGithubrepos(username)
  }, [getGithubrepos, username]);

  return (
    <div class="profile-github">
      <h2 class="text-primary my-1">
        <i class="fab fa-github"></i>Github Repos
      </h2>
      {repos === null ? <Loader /> : (
        repos.map(repo => (
          <div key={repo._id} class="repo bg-white card my-1 p-1">
            <div>
              <h4><a href={repo.html_url} target='_blank' rel='noopener noreferrer'>{repo.name}</a></h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
                <li class="badge badge-dark">Watchers: {repo.watchers_count}</li>
                <li class="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

ProfileGithub.propTypes = {
  getGithubrepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
}

const mapStateToProps = ({profile: {repos}}) => ({
  repos,
})

export default connect(mapStateToProps, { getGithubrepos })(ProfileGithub)
