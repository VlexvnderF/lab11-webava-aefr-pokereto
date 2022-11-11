import { useState, useEffect } from "react";
import theme from "./theme";
import { CardPokemons, DropDown } from "./components";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import { get } from "./services";
import './App.css';
import { Polyline } from "@mui/icons-material";

function App() {
  const [type, setType] = useState("");

  const [types, setTypes] = useState([]);

  const [pokemons, setPokemons] = useState([]);
  


  async function getTypes() {
    const types = await get("type");
    setTypes(types.results);
  }

  async function getPokemons(url) {
    const id = url.split("/");
    
    const pokemons = await get(`type/${id[id.length - 2]}`);
    setPokemons(pokemons.pokemon);
  }

  const handleChange = (event) => {
    setType(event.target.value);
    getPokemons(event.target.value);
  };

  useEffect(() => {
    // llamo a la funciona
    getTypes();
  }, []);

  const ce = `${type}`
  
  return (
    <ThemeProvider theme={theme}>
      
      <img id="imgprofile" src="https://assets.stickpng.com/thumbs/5eb95bc017f3c600044a2908.png" alt=""/>
      <Container id="contenedor">
        <DropDown  type={type} handleChange={handleChange} types={types} />
        <div id={ce}>
        
        <CardPokemons  pokemons={pokemons}  />
        </div>
        
      </Container>
    </ThemeProvider>
  );
}

export default App;
