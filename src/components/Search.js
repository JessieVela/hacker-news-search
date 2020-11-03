import React, { Component } from "react";
import Post from "./Post";
import { connect } from "react-redux";
import { setPosts } from "../store/actions";
import { getPosts } from "../Util.ts";
import "../styles/search.css";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerms: "",
    };
  }

  // Sets the search terms as a user types
  handleChange = (event) => {
    this.setState({ searchTerms: event.target.value });
  };

  /**
   * Calls Util function to retrieve Posts and calls action to save to state.
   * @param event - sends the event object when a user hits submit 
   */
  search = async (event) => {
    event.preventDefault();
    document.getElementById("searchForm").reset();
    if (!this.state.searchTerms) return null;

    this.props.setPosts(await getPosts(this.state.searchTerms));
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <form id="searchForm" className="search-input" onSubmit={this.search}>
            <input
              type="text"
              value={this.state.value}
              onKeyUp={this.handleChange}
              placeholder="Enter some search words"
            />
            <input id="submit-term" type="submit" value="Submit" />
          </form>
        </div>
        <div
          className={this.props.posts.hits ? "post-list" : "post-list hidden"}
        >
          {this.props.posts.hits
            ? this.props.posts.hits.map((post, index) => {
                return <Post key={index} post={post} />;
              })
            : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, { setPosts })(Search);
