/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import './style.scss';
//import Player from "./Player.jsx";
import RxPlayer from "rx-player";

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    console.log('did mount...')
    const { username, onSubmitForm } = this.props;
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
    this.initPlayer();
  }

  initPlayer() {
    const player = new RxPlayer({videoElement: document.getElementById("video")});
    player.loadVideo({
      //url: "http://vm2.dashif.org/livesim-dev/segtimeline_1/testpic_6s/Manifest.mpd",
      url:"https://drive.google.com/open?id=10mY7Xtx3-5_bfQaI_OY304QPSRIIXvxZ",
      transport: "dash",
      autoPlay: false});
  }

  render() {
    console.log('rendering...')
    const {
      loading, error, repos, username, onChangeUsername, onSubmitForm
    } = this.props;
    const reposListProps = {
      loading,
      error,
      repos
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
          <section className="centered">
            <h2>Start your next react project in seconds 1234</h2>
            <p>
              A minimal <i>React-Redux</i> boilerplate with all the best practices
            </p>
          </section>
          <section>
            <video id="video" controls></video>
          </section>
          <section>
            <h2>Try me!</h2>
            <form onSubmit={onSubmitForm}>
              <label htmlFor="username">
                Show Github repositories by
                <span className="at-prefix">@</span>
                <input
                  id="username"
                  type="text"
                  placeholder="flexdinesh"
                  value={username}
                  onChange={onChangeUsername}
                />
              </label>
            </form>
            <ReposList {...reposListProps} />
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func
};
