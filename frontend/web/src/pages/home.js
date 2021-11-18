import { Container } from "../components/shared/layout/container";
import SearchBar from "../components/searchBar";
import { Title } from "../components/shared/layout/title";
import { Spacer } from "../components/shared/layout/spacer";

import Card from "../components/shared/layout/card";
import Slider from "../components/shared/layout/slider";
import { useEffect, useState } from "react";

import styled from "styled-components";
import Colors from "../components/shared/theme/colors";
import { Link, useNavigate } from "react-router-dom";
import { ApiFetchService } from "../services/apiFetchService";

const Home = () => {
  const [redirect, setRedirect] = useState(false);

  const [dailyPopular, setDailyPopular] = useState();
  const [topRatedMovies, setTopRatedMovies] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = new ApiFetchService();
    fetchService
      .getTrendingDaily()
      .then((result) => setDailyPopular(result))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    var fetchService = new ApiFetchService();
    fetchService
      .getTopRatedMovies()
      .then((result) => setTopRatedMovies(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      {redirect ? (
        navigate(`/search/searchTerm=${localStorage.getItem("search_query")}`)
      ) : (
        <>
          <div>
            <Link to="/requestMovie">
              <Button>Request a movie</Button>
            </Link>
          </div>
          <Container
            direction="column"
            justify="flex-start"
            align="center"
            height="auto"
          >
            <Spacer value={5} />
            <Title size={3}>Movie Search Api</Title>
            <Spacer value={3} />
            <SearchBar stateChanger={setRedirect} />
          </Container>

          {/* Trending Moviews Cards Sections */}
          {dailyPopular ? (
            <Container
              direction="column"
              justify="flex-start"
              align="Flex-start"
              height="auto"
            >
              <Spacer value={3} />
              <Title color="#444" size={1.7}>
                What's Popular
              </Title>

              {/* Slider */}
              <Slider>
                {dailyPopular.map((item, i) => (
                  <Card
                    key={i}
                    id={item.id}
                    title={item.title}
                    rating={item.vote_average}
                    popularity={item.popularity}
                    language={item.original_language}
                    releaseYear={new Date(item.release_date).getFullYear()}
                    type={item.media_type}
                    mediaSrc={
                      item.poster_path
                        ? item.poster_path
                        : "https://us.123rf.com/450wm/oculo/oculo2004/oculo200400003/143645399-no-image-available-icon.jpg?ver=6"
                    }
                    description={item.overview}
                  />
                ))}
              </Slider>
            </Container>
          ) : null}

          {/* Top Rated Movies Cards Sections */}
          {topRatedMovies ? (
            <Container
              direction="column"
              justify="flex-start"
              align="Flex-start"
              height="auto"
            >
              <Spacer value={3} />
              <Title color="#444" size={1.7}>
                Top Rated Movies
              </Title>

              {/* Slider */}
              <Slider>
                {topRatedMovies.map((item, i) => (
                  <Card
                    key={i}
                    id={item.id}
                    title={item.title}
                    rating={item.vote_average}
                    popularity={item.popularity}
                    language={item.original_language}
                    releaseYear={new Date(item.release_date).getFullYear()}
                    type={item.media_type}
                    mediaSrc={
                      item.poster_path
                        ? item.poster_path
                        : "https://us.123rf.com/450wm/oculo/oculo2004/oculo200400003/143645399-no-image-available-icon.jpg?ver=6"
                    }
                    description={item.overview}
                  />
                ))}
              </Slider>
            </Container>
          ) : null}
          <Spacer value={5} />
        </>
      )}
    </>
  );
};

const Button = styled.button`
  float: right;
  margin: 2rem;
  right: 3rem;
  height: 45px;
  padding: 0 3rem;
  font-size: 1em;
  background: ${Colors.primary};
  border: none;
  border-radius: 50px / 50px;
  color: ${Colors.white};
  font-weight: 600;
  box-shadow: 0 0 10px ${Colors.primary}bf;
  transition: all 1s ease;
  cursor: pointer;
  position: absolute;

  :hover {
    box-shadow: 0 20px 30px ${Colors.primary};
  }
`;

export default Home;
