import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//removed useRouteMatch, from line 3,
import { getGameById } from './services/fetch-utils';
import { updateGame } from './services/fetch-utils';

export default function UpdatePage() {
  const { push } = useHistory();
  const { id } = useParams();
  const [gameInForm, setGameInForm] = useState({
    title: '',
    genre: '',
    min_players: 0,
    max_players: 0,
    designer: '',
    description: '',
  });

  // on mount, fetch and set in state the correct board game for this id (the id can be found in match.params using the correct react-router hook)
  useEffect(() => {
    async function load() {
      const game = await getGameById(id);
      setGameInForm(game);
    }
    load(); //we use this so that our useEffect is asynchronis
  }, [id]); //this is a dependency array, if its empty, then it occurs on page load

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    await updateGame(id, gameInForm);
    push('/board-games');
  }

  return (
    <div className="detail">
      <form onSubmit={handleUpdateSubmit}>
        Update a game
        <label>
          Title
          <input
            value={gameInForm.title}
            onChange={(e) => setGameInForm({ ...gameInForm, title: e.target.value })}
          />
        </label>
        <label>
          Genre
          {/* on change, set the genre in state */}
          <select
            required
            name="genre"
            onChange={(e) => setGameInForm({ ...gameInForm, genre: e.target.value })}
          >
            <option value="Tile-laying">Tile-laying</option>
            <option value="Economic">Economic</option>
            <option value="War">War</option>
            <option value="Card">Card</option>
            <option value="Abstract">Abstract</option>
            <option value="Cooperative">Cooperative</option>
            <option value="Solo">Solo</option>
          </select>
        </label>
        <label>
          Minimum Players
          <input
            value={gameInForm.min_players}
            onChange={(e) => setGameInForm({ ...gameInForm, min_players: e.target.value })}
          />
        </label>
        <label>Maxiumum Players</label>
        <label>
          Designer
          <input
            value={gameInForm.designer}
            onChange={(e) => setGameInForm({ ...gameInForm, designer: e.target.value })}
          />
        </label>
        <label>
          Description
          <input
            value={gameInForm.description}
            onChange={(e) => setGameInForm({ ...gameInForm, description: e.target.value })}
          />
        </label>
        <button>Submit Update</button>
      </form>

      {/* <h1>{game.title}</h1>
      <h2>
        A {game.genre} game for {game.min_players} to {game.max_players} players
      </h2>
      <h3>by celebrated designer {game.designer}</h3>
      <p>{game.description}</p> */}
    </div>
  );
}
