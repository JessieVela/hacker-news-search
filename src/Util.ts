import Axios from "axios";

/**
 * Creates a get request to Algolia api to retrieve news articles.
 * @param searchWords - The keywords inputted by the user for searching.
 */
export const getPosts = async (searchWords: string) => {
  let searchTerms = parseSearchWords(searchWords);
  let response;

  try {
    await Axios.get(
      `https://hn.algolia.com/api/v1/search?query=${searchTerms}`
    ).then((res) => {
      response = res.data.hits;
    });
    return response;
  } catch (error) {
    console.log("Error getting results");
  }
};

// Replaces spaces in string with '+'. It decreases the time it takes for the get request to retrieve posts
const parseSearchWords = (words: string) => {
  return words.replace(" ", "+");
};
