import { useEffect, useState } from "react";
import { Container } from "../components/shared/layout/container";
import { Title } from "../components/shared/layout/title";
import { Spacer } from "../components/shared/layout/spacer";

import { FaInstagram, FaTwitter, FaFacebook, FaGlobe } from "react-icons/fa";
import { BsPaperclip } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import styled from "styled-components";
import Colors from "../components/shared/theme/colors";
import Card from "../components/shared/layout/card";
import { useParams } from "react-router";
import Modal from "react-modal";
import Loader from "../components/shared/layout/loader";
import { ApiFetchService } from "../services/apiFetchService";

const SingleResult = () => {
  const [data, setData] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [trailerURL, setTrailerURL] = useState();

  const { id } = useParams();

  useEffect(() => {
    var apiFetchService = new ApiFetchService();
    apiFetchService.getMovieById(id).then((data) => setData(data));
  }, []);

  const openModal = (url) => {
    setIsOpen(true);
    setTrailerURL(url);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const copyUrl = (e) => {
    var copyButton = document.getElementById("copyBtn");
    var copyInput = e.currentTarget.getAttribute("data-id");

    copyButton.addEventListener("click", function () {
      e.preventDefault();
      document.execCommand("copy");
    });

    document.addEventListener("copy", function (e) {
      e.clipboardData.setData("text/plain", copyInput);
      e.preventDefault();
    });
  };

  return (
    <>
      {data ? (
        <>
          <Container fullWidth={true}>
            <Banner media={data.backdrop_path}>
              <Container direction="row" justify="center" align="center">
                <Col flex={1} direction="row">
                  <PosterImg
                    src={data.poster_path}
                    alt={`${data.original_title} poster/cover`}
                    loading="lazy"
                  />
                </Col>
                <Col flex={2.5} direction="column">
                  <Title size={2.5} color={Colors.white}>
                    {data.original_title}{" "}
                    <ReleaseYearTitleText>
                      ({new Date(data.release_date).getFullYear()})
                    </ReleaseYearTitleText>
                  </Title>
                  <Genres>
                    <span>
                      {data.genres.map(
                        (x, index) =>
                          x.name + (index < data.genres.length - 1 ? ", " : "")
                      )}
                    </span>
                  </Genres>
                  <InlineWrapper>
                    <UserRatings>
                      Rating:<b> {data.vote_average}</b>%
                    </UserRatings>
                    <SocialShare>
                      { data.homepage ? 
                        <a href={data.homepage} target="_blank" title="official page" rel="noreferrer">
                          <FaGlobe />
                        </a>
                      : null}
                    </SocialShare>
                  </InlineWrapper>
                  <Tagline>{data.tagline ? data.tagline : null}</Tagline>
                  <MovieOverview>{data.overview}</MovieOverview>
                  <Spacer value={1.5} />
                  <MovieInfo>
                    <span>
                      <b>{data.runtime}</b> mins
                    </span>
                    <span>Released: {data.release_date}</span>
                    <span>Original Language: {data.original_language}</span>
                  </MovieInfo>
                </Col>
              </Container>
            </Banner>
          </Container>
          <MainWrapper>
            <Main>
              <div>
                <Title size={2} color={Colors.dark}>
                  On Youtube
                </Title>
                {data.trailers.length > 0 ? (
                  <Trailers>
                    {data.trailers.map((e, i) => (
                      <Card
                        key={i}
                        isTrailer={true}
                        title={e.title}
                        channelName={e.channelTitle}
                        channelId={e.channelId}
                        publishedAt={e.publishedAt}
                        mediaSrc={e.thumbnails.high.url}
                        description={e.description}
                        onClickHandler={() => openModal(e.vide_embed_url)}
                      />
                    ))}
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                    >
                      <iframe
                        width="100%"
                        height="90%"
                        src={`https://${trailerURL}`}
                      ></iframe>
                      <ShareTrailer>
                        <div>
                          <span>SHARE</span>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://www.facebook.com/dialog/share?app_id=87741124305&href=${trailerURL}`}
                          >
                            <FaFacebook />
                          </a>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://twitter.com/intent/tweet?url=${trailerURL}`}
                          >
                            <FaTwitter />
                          </a>
                          <i
                            id="copyBtn"
                            data-id={`https://${trailerURL}`}
                            onClick={(e) => copyUrl(e)}
                          >
                            <BsPaperclip />
                          </i>
                        </div>
                        <div>
                          <span>Open In New Tab</span>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://${trailerURL}`}
                          >
                            <MdOpenInNew />
                          </a>
                        </div>
                      </ShareTrailer>
                    </Modal>
                  </Trailers>
                ) : (
                  <h3>No trailers Available</h3>
                )}
              </div>
              {/* <div>
                                <Title size={1.5}>Production Companies</Title>
                                <ProductionCompanies>
                                    {data.production_companies.map((e, i) => (
                                        <div key={i}>
                                            <span>{e.name}</span>
                                            <img src={`https://www.themoviedb.org/t/p/w220_and_h220_face${e.logo_path}`} alt={`logo of ${e.name}`} loading="lazy" />
                                        </div>
                                    ))}
                                </ProductionCompanies>
                            </div> */}
            </Main>
            <Sidebar>
              <div>
                <Title size={1}>Status</Title>
                <p>{data.status}</p>
              </div>
              <div>
                <Title size={1}>Budget</Title>
                <p>${data.budget.toLocaleString()}.00</p>
              </div>
              <div>
                <Title size={1}>Revenue</Title>
                <p>${data.revenue.toLocaleString()}.00</p>
              </div>
              <div>
                <Title size={1}>Spoken Languages</Title>
                <p>
                  {data.spoken_languages.map(
                    (x, index) =>
                      x.english_name +
                      (index < data.spoken_languages.length - 1 ? ", " : "")
                  )}
                </p>
              </div>
              <div>
                <Title size={1}>Production Countries</Title>
                <p>
                  {data.production_countries.map(
                    (x, index) =>
                      x.name +
                      (index < data.production_countries.length - 1 ? ", " : "")
                  )}
                </p>
              </div>
              <div>
                <Title size={1}>Popularity</Title>
                <p>{data.popularity}</p>
              </div>
            </Sidebar>
          </MainWrapper>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "60vw",
    overflow: "hidden",
    height: "80vh",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "white",
    padding: 0,
  },
  overlay: {
    background: "rgba(0,0,0,0.8)",
  },
};

{
  /* Banner Style */
}
const Banner = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),
    url(${(props) => props.media});
  background-color: black;
  background-size: cover;
  background-position: center;
  height: auto;
  min-height: 500px;
  max-height: 650px;
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PosterImg = styled.img`
  height: 500px;
  border-radius: 10px / 10px;
  position: absolute;
  top: 3rem;
  width: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
`;

const Col = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  flex: ${(props) => props.flex};
  width: 100%;
  flex-basis: 1;
  height: fit-content;
  padding: 0 1rem;
`;

const ReleaseYearTitleText = styled.span`
  font-weight: 300;
  opacity: 0.8;
  margin: 0 0.5rem;
`;

const Genres = styled.span`
  font-size: 1.2em;
  color: ${Colors.white};
  font-weight: 600;
  opacity: 0.7;
  margin-top: 0rem;
  margin-bottom: 0.6rem;
`;

const UserRatings = styled.span`
  background: ${Colors.pink};
  color: ${Colors.white};
  font-size: 16px;
  padding: 0.3rem 1.3rem;
  width: fit-content;
  font-weight: 400;
  border-radius: 40px / 40px;
  word-spacing: 6px;
  margin-bottom: 20px;
  margin-top: 8px;

  & b {
    font-weight: 600;
  }
`;

const Tagline = styled.span`
  color: ${Colors.white};
  font-size: 1.1em;
  font-style: italic;
  opacity: 0.4;
`;

const MovieOverview = styled.p`
  color: ${Colors.white};
  margin-block-start: 0.3em;
  margin-block-end: 0.3em;
  font-size: 0.9em;
  opacity: 0.9;
`;

const MovieInfo = styled.div`
  display: flex;
  color: ${Colors.white};

  & span {
    margin-right: 1rem;
    font-size: 0.9em;
    font-weight: 500;

    :not(:first-child) {
      position: relative;
      padding-left: 1rem;

      &::before {
        content: "";
        width: 5px;
        height: 5px;
        background-color: ${Colors.white};
        position: absolute;
        top: 50%;
        left: 0;
        border-radius: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;

const InlineWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SocialShare = styled.div`
  display: flex;
  margin-top: -10px;
  margin-left: 2.5rem;
  position: relative;
  align-items: center;

  & svg {
    color: ${Colors.white};
    font-size: 1.2em;
    margin-right: 0.8rem;
  }

  ::before {
    content: "";
    width: 1px;
    height: 20px;
    background-color: ${Colors.white};
    position: absolute;
    top: 50%;
    left: -20px;
    transform: translateY(-50%);
  }
`;

{
  /* Main Style */
}
const MainWrapper = styled.div`
  padding: 10rem 8rem 2rem 8rem;
  display: flex;
`;

const Sidebar = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  flex: 1;
  padding: 1rem 4rem;

  & div {
    margin-bottom: 2rem;

    & p {
      margin-block-start: 0.3em;
      margin-block-end: 0.3em;
      font-size: 1em;
      font-weight: 400;
      color: ${Colors.dark};
    }
  }
`;

const Main = styled.div`
  flex: 4;
  padding: 0 1rem;
`;

const Trailers = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 2rem;
`;

const ShareTrailer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;

  & div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & span {
    font-size: 1.2em;
    font-weight: 500;
    color: ${Colors.pink};
    letter-spacing: 1px;
    margin-right: 2rem;
  }

  & svg {
    color: ${Colors.pink};
    font-size: 1.6em;
    cursor: pointer;
    margin-top: 5px;
    margin-right: 0.8rem;
  }
`;

// const ProductionCompanies = styled.div`
//     display: flex;
//     flex-wrap: wrap;

//     & div{
//         display: flex;
//         flex-direction: column;
//         justify-content: flex-start;
//         height: auto;
//         background: red;
//         margin-right: 20px;
//         :not(:first-child){
//             padding: 0 2rem;
//         }

//         & img{
//             width: 100px;
//             height: auto;
//         }
//     }
// `;

export default SingleResult;
