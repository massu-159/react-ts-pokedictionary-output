import React, { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import './App.css';
import Navber from './components/Navber/Navber';

interface Pokemon {
  sprites: string;
  name: string;
  type: string;
  weight: string;
  height: string;
  abilities: string;
}

function App() {
  const initialURL: string = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonData, setPokemonData] = useState<string[]>([]);
  const [nextURL, setNextURL] = useState<string>("");
  const [prevURL, setPrevURL] = useState<string>("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res:any = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data: string[]) => {
    let _pokemonData:any = await Promise.all(
      data.map((pokemon:any) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };


  const handleNextPage = async () => {
    if (!nextURL) return;

    setLoading(true);
    let data:any = await getAllPokemon(nextURL);

    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevURL) return;
    
    setLoading(true);
    let data: any = await getAllPokemon(prevURL);
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
