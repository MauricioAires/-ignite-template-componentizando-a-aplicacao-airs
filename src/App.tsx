import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { MovieProvider } from './hooks/user-movies';

import './styles/global.scss';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MovieProvider>
        <SideBar />
        <Content />
      </MovieProvider>
    </div>
  );
}
