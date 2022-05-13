import { useState, useEffect } from 'react';
import { getGames } from './services/fetch-utils';
import { Link } from 'react-router-dom';

export default function ListPage() {
  // you'll need some state to hold onto the array of games
  const [games, setGames] = useState([]);

  // fetch the games on load (which means use useeffect) and inject them into state
  useEffect(() => {
    async function loadData() {
      const data = await getGames();
      setGames(data);
    }
    loadData();
  }, []);

  return (
    <div className="list games">
      {games.map((game, i) => (
        <Link key={game + i} to={`/board-games/${game.id}`}>
          {/* why are we using link to create a prop? */}
          <div>
            <p>{game.title}</p>
            <p>{game.genre}</p>
            <p>{game.min_players}</p>
            <p>{game.max_players}</p>
            <p>{game.designer}</p>
            <p>{game.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
