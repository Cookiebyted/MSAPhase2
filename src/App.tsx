import axios from "axios";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { spacing } from '@mui/system';
import "./App.css";

function App() {
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoInfo, setCryptoInfo] = useState<undefined | any>(
    undefined
  );
  const CRYPTO_BASE_URL = "https://api.coincap.io/v2/assets/";

  return (
    <div style={{paddingLeft: "1.5em", textAlign:"center"}}>
      <h1>Cryptocurrency Search</h1>

      <div>
        <TextField
          id="search-bar"
          className="text"
          value={cryptoName}
          onChange={(prop: any) => {
            setCryptoName(prop.target.value);
          }}
          label="Enter cryptocurrency name..."
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton
          aria-label="search"
          sx={{mb:1}}
          onClick={() => {
            search();
          }}
        >
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </div>

      {cryptoInfo === undefined ? (
        <p>Enter a cryptocurrency name</p>
      ) : (
        <div id="pokemon-result">
          {cryptoInfo.data.name}
          <br></br>
          {cryptoInfo.data.symbol}
          <br></br>
          {cryptoInfo.data.priceUsd}
        </div>
      )}

      <p>Crypto Entered: {cryptoName.toLocaleUpperCase()}</p>
    </div>
  );

  function search() {
    console.log(CRYPTO_BASE_URL + cryptoName);
    axios
      .get(CRYPTO_BASE_URL + cryptoName.toLowerCase())
      .then((res) => {
        setCryptoInfo(res.data);
        console.log(cryptoInfo);
      })
      .catch((err) => {
        console.log("Pokemon not found");
        setCryptoInfo(undefined);
      });
  }
}

export default App;
