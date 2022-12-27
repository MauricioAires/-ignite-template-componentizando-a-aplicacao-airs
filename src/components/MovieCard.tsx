import { IconClock, IconStar } from '../assets'

import '../styles/movie-card.scss';

interface MovieCardProps {
  title: string;
  poster: string;
  rating: string;
  runtime: string;
}

export function MovieCard(props: MovieCardProps) {
  return (
    <div className="movie-card">
      <img
        src={props.poster}
        alt={props.title}
      />

      <div>
        <div className="movie-info">
          <span>{props.title}</span>
          <div className="meta">
            <div>
              <IconStar /> {props.rating}
            </div>

            <div>
              <IconClock /> {props.runtime}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}