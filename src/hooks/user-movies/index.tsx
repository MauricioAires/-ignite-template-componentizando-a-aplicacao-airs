import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { api } from '../../services/api';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

// Tipagem do dados disponivesl no contexto
// criar assinatura das funções que serão criadas no provider
export type MovieContextData = {
  movies: MovieProps[];
  genres: GenreResponseProps[];
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  handleClickButton: (genre: GenreResponseProps) => void;
};

// Valores padão do contexto ( pode conter funções também)
export const MovieContextDefaultValue: MovieContextData = {
  movies: [],
  genres: [],
  selectedGenreId: 1,
  selectedGenre: {} as GenreResponseProps,
  handleClickButton: () => null,
};

// criação do contexto
export const MovieContext = createContext<MovieContextData>(
  MovieContextDefaultValue
);

// ciação do provider para utilização do movie context

export type MovieProviderProps = {
  // inserir os componentes que vão compartilar o etstao do contexto
  children: React.ReactNode;
};

const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

   
  }, [selectedGenreId]);

  const  handleClickButton = useCallback((genre: GenreResponseProps)  => {
    setSelectedGenreId(genre.id);
    setSelectedGenre(genre)
  }, [])

  return (
    <MovieContext.Provider
      value={{
        movies,
        genres,
        selectedGenreId,
        selectedGenre,
        handleClickButton,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// abstração da chamada da funcção ( useContext )
const useMovie = () => useContext(MovieContext);

export { MovieProvider, useMovie };
