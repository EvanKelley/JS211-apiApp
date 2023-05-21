require("dotenv").config();
const fetch = require("isomorphic-fetch");
const cryptoJS = require("crypto-js");

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

function generateHash(ts) 
{
  const hash = cryptoJS.MD5(ts + privateKey + publicKey).toString();
  return hash;
}

function fetchCharacters() 
{
  const ts = Date.now().toString();
  const hash = generateHash(ts);
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => 
    {
      const characters = data.data.results;
      characters.forEach((character) => 
      {
        console.log("Name:", character.name);
        console.log("Description:", character.description);
        console.log("Comics:", character.comics);
        console.log("_________________________");
      });
    })
    .catch((error) => 
    {
      console.error("Error:", error);
    });
}

fetchCharacters();
