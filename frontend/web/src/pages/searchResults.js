import { Container } from "../components/shared/layout/container";
import { Title } from "../components/shared/layout/title";
import { Spacer } from "../components/shared/layout/spacer";

import Card from "../components/shared/layout/card";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../components/shared/layout/loader";
import { ApiFetchService } from "../services/apiFetchService";

const SearchResults = ({ props }) => {
  const { input } = useParams();
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    const apiFetchService = new ApiFetchService();

    apiFetchService
      .getSearchResults(input)
      .then((result) => setSearchResults(result))
      .catch((error) => console.log("error", error));
    console.log(searchResults);
  }, []);

  return (
    <Container
      direction="column"
      justify="flex-start"
      align="flex-start"
      height="auto"
    >
      <Spacer value={5} />
      <Title size={3}>Search Results</Title>
      <Spacer value={3} />
      {/* Movie Cards */}
      {searchResults ? (
        <Container fullWidth={true} direction="row" wrap="wrap">
          {searchResults.length > 0 ? (
            searchResults.map((item, i) => (
              <Card
                key={i}
                id={item.id}
                title={item.title}
                rating={item.vote_average}
                popularity={item.popularity}
                language={item.original_language}
                releaseYear={new Date(item.release_date).getFullYear()}
                mediaSrc={
                  item.poster_path
                    ? item.poster_path
                    : "https://us.123rf.com/450wm/oculo/oculo2004/oculo200400003/143645399-no-image-available-icon.jpg?ver=6"
                }
                description={item.overview}
              />
            ))
          ) : (
            <h1>Nothing Found, Please try another search</h1>
          )}
        </Container>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default SearchResults;
