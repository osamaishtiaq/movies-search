import { Link } from "react-router-dom";
import styled from "styled-components";
import Colors from "../theme/colors";

const Card = ({onClickHandler, ...props}) => {

    return(
        <>
            {props.isTrailer ? 
                <TrailerCardBlock onClick={onClickHandler}>
                    <div>
                        <img src={props.mediaSrc} alt="trailer thumbnail"/>
                    </div>
                    <div>
                        <span>{props.publishedAt}</span>
                        <h3>{props.title}</h3>
                        <p>{props.description}</p>
                        <a href={`https://www.youtube.com/channel/${props.channelId}`} target="_blank" rel="noreferrer">{props.channelName}</a>
                    </div>
                </TrailerCardBlock>
            :
                <CardBlock mediaSrc={props.mediaSrc}>
                    <Link to={`/movie/id=${props.id}`}>
                        <Rating>{props.rating}</Rating>
                        <h3>{props.title}</h3>
                        <span>Popularity: {props.popularity}</span>
                        <p>{props.description}</p>
                        <div className="row">
                            <span>Released: {props.releaseYear}</span>
                            <span>•</span>
                            <span>Language: {props.language}</span>
                            {props.type ? <><span>•</span>
                            <span>{props.type}</span></> : null}
                        </div>
                    </Link>
                </CardBlock>
            }
        </>
    );
}

const CardBlock = styled.div`
    height: 320px;
    width: 200px;
    position: relative;
    border-radius: 10px/10px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    border: 5px solid ${Colors.white};
    background: linear-gradient(transparent 20%, ${Colors.dark}c9 80%), url(${(props) => props.mediaSrc});
    background-size: cover;
    padding: 1rem;
    margin-right: 15px;
    margin-bottom: 15px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    & a {
        text-decoration: none;
    }

    & h3{
        font-size: 1.2em;
        text-transform: capitalize;
        color: ${Colors.white};
        font-weight: 600;
        margin: 0;
    }

    & span{
        font-size: 0.7em;
        color: ${Colors.white};
        opacity: 0.5;
        font-weight: 600;
    }

    & .row{
        display: flex;
        flex-wrap: wrap;
        margin: 5px 0;
        opacity: 0.9;

        & span{
            font-size: 0.6em;
            color: ${Colors.white};
            opacity: 1;
            margin-right: 8px;
            font-weight: 500;
        }
    }

    & p {
        display: -webkit-box;
        overflow: hidden;
        opacity: 0.9;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        color: ${Colors.white};
        margin: .3rem 0;
        font-size: 0.8em;
        line-height: 1.1em;
    }

    :hover{
        background: linear-gradient(transparent, ${Colors.dark}), url(${(props) => props.mediaSrc});
        background-size: cover;
    }
`;

const TrailerCardBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-right: 30px;
    padding: 0;
    padding-bottom: 2rem;
    width: 355px;
    border-radius: 10px / 10px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
    margin-bottom: 30px;

    & div:nth-child(1){
        padding: 0;
        
        & img {
            width: 355px;
            height: 195px;
            border-radius: 10px 10px 0 0;
            object-fit: cover;
        }
    }

    & div{
        padding: 1rem 2rem;

        & h3{
            font-size: 1.3em;
            color: ${Colors.dark};
            margin-block-start: 0.4em;
            margin-block-end: 0em;
        }

        & span{
            font-size: 0.8em;
            font-weight: 500;
            opacity: 0.7;
        }

        & a{
            text-decoration: none;
            color: ${Colors.pink};
            font-weight: 600;
        }

        & p {
            display: -webkit-box;
            overflow: hidden;
            opacity: 0.9;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            color: ${Colors.dark};
            margin: 1rem 0;
            font-size: 1em;
            line-height: 1.1em;
        }
    }
`;

const Rating = styled.div`
    position: absolute;
    color: ${Colors.white};
    font-size: 0.7em;
    font-weight: 500;
    top: 1rem;
    right: 1rem;
    background: ${Colors.pink};
    padding: 0.3rem .8rem;
    border-radius: 5px;
`;

export default Card;