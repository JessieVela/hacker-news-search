import React, { Component } from "react";
import { connect } from "react-redux";
import { setPosts } from "../store/actions";
import { getPosts } from "../Util.ts";
import * as _ from "underscore";
import Post from "./Post";
import "../styles/search.css";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerms: "",
    };
  }

  // Sets the search terms state as a user types
  handleChange = (event) => {
    this.setState({ searchTerms: event.target.value });
  };

  /**
   * Calls Util function to retrieve Posts and calls setPosts action to save to state.
   * @param event - sends the event object when a user hits submit
   */
  search = async (event) => {
    event.preventDefault();
    document.getElementById("searchForm").reset();
    if (!this.state.searchTerms) return null;

    this.props.setPosts(await getPosts(this.state.searchTerms));
  };

  filter = (event) => {
    event.preventDefault();
    let sort = event.target.value;

    let sortedPosts = _.sortBy(this.props.posts, "created_at_i");
    if (sort === "Asc") this.props.setPosts(sortedPosts);
    else if (sort === "Desc") this.props.setPosts(sortedPosts.reverse());
  };

  render() {
    console.log(_.size(this.props.posts));
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
        <div className={_.size(this.props.posts) > 0 ? "filter" : "hidden"}>
          <select className="dropdown" onChange={this.filter}>
            <option value="">Sort By Date</option>
            <option value="Asc">Ascending</option>
            <option value="Desc">Descending</option>
          </select>
        </div>
        <div className={_.size(this.props.posts) > 0 ? "post-list" : "post-list hidden"}>
          {this.props.posts !== undefined
            ? Object.values(this.props.posts).map((post, index) => {
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
