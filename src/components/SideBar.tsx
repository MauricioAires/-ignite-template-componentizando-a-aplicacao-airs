import { memo } from 'react';
import { useMovie } from '../hooks/user-movies';
import { Button } from './Button';

import '../styles/sidebar.scss';


 function SideBarComponent() {
  const { genres, selectedGenreId, handleClickButton } = useMovie();


  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}


export const  SideBar = memo(SideBarComponent)