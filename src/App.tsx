import React, { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import './App.css';
import Navber from './components/Navber/Navber';
import { Pokemon } from './interfaces/Pokemon';
import { ApiUrl } from './interfaces/ApiUrl';





function App() {
  const initialURL: string = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [nextURL, setNextURL] = useState<string>("");
  const [prevURL, setPrevURL] = useState<string>("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res:ApiUrl = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data:ApiUrl[]) => {
    let _pokemonData:Pokemon[] = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };


  const handleNextPage = async () => {
    if (!nextURL) return;

    setLoading(true);
    let data:ApiUrl = await getAllPokemon(nextURL);
    console.log(data);
    console.log(typeof data.results);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevURL) return;
    
    setLoading(true);
    let data: ApiUrl = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navber />
      <div className="App">
        {loading ? (
          <h1>ロード中</h1>
        ) : (
            <>
              <div className="pokemonCardContainer">
                {pokemonData.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />
                })}
              </div>
              <div className="btn">
                <button onClick={handlePrevPage}>前へ</button>
                <button onClick={handleNextPage}>次へ</button>
              </div>
            </>
        )}
      </div>  
    </>
  );
}

export default App;
