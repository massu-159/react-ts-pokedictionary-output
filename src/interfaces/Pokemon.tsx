export interface Pokemon {
  sprites: {
    front_default: string;
  };
  name: string;
  types: Array<{
    type: {
      name: string;
    }
  }>
  weight: number;
  height: number;
  abilities: Array<{
    ability: {
      name: string;
    },
  }>;
  url: string;
}