import { Pokemon } from "../interfaces/Pokemon";
import { ApiUrl } from "../interfaces/ApiUrl";

export const getAllPokemon = (url: string): Promise<ApiUrl> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
});
};

export const getPokemon = (url:string): Promise<Pokemon> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};