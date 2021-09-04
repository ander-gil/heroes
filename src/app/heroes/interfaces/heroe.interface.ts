export interface Heroe {
  id?:               string;     //quiere decir q el id es opcional ya que al crear un nuevo heroe no tendra id
  superhero:        string;
  publisher:        Publisher;
  alter_ego:        string;
  first_appearance: string;
  characters:       string;
  alt_img?:         string;         //imagen opcional
}

export enum Publisher {
  DCComics = "DC Comics",
  MarvelComics = "Marvel Comics",
}
