import { useMovie } from '../hooks/user-movies';

import '../styles/header.scss';

export function Header() {
  const { selectedGenre } = useMovie();
  return (
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>
  );
}
