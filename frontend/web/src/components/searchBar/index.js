import styled from "styled-components";
import Colors from "../shared/theme/colors";

const SearchBar = ({ stateChanger }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.elements.search.value);
    localStorage.setItem("search_query", event.target.elements.search.value);
    stateChanger(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputBar>
        <input placeholder="Type movie name.." name="search" required />
        <button type="submit">Search</button>
      </InputBar>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputBar = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  max-width: 600px;
  border-radius: 50px / 50px;
  min-width: 200px;
  padding: 0.6rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.09),
    inset 0px 0px 0px 3px ${Colors.white};

  background: ${Colors.background};

  & input {
    flex: 0.7;
    border-radius: 50px / 50px;
    font-weight: 500;
    background: ${Colors.background};
    border: none;
    outline: none;
    padding: 0 1rem 0 2rem;
    font-size: 1.2em;

    :focus {
      outline: none;
    }
  }

  & button {
    flex: 0.3;
    border-radius: 50px / 50px;
    border: none;
    font-size: 1.2em;
    font-weight: 500;
    color: ${Colors.white};
    background: linear-gradient(to right, ${Colors.primary}, ${Colors.pink});
    background-size: 300px;
    cursor: pointer;
    transition: all 0.7s ease-out;

    :hover {
      background-position: -50px;
    }
  }
`;

export default SearchBar;
