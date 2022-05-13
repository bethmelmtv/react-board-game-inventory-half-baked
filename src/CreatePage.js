import { useState } from 'react';
import { createGame } from './services/fetch-utils';
import { useHistory } from 'react-router-dom';

export default function CreatePage() {
  // you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit
  const history = useHistory();
  const [gameInTheForm, setGameInTheForm] = useState({
    title: '',
    genre: '',
    designer: '',
    description: '',
    min_players: 0,
    max_players: 0,
  });
  // here's the state you'll need:
  // title;
  // genre;
  // designer;
  // description;
  // minPlayers;
  // maxPlayers;

  async function handleSubmit(e) {
    e.preventDefault();

    // create a game
    await createGame(gameInTheForm);

    // use history.push to send the user to the list page
    //this is how we redirect inside event handle listeners ..this is how we redirect to list page
    history.push('/board-games');
  }

  return (
    <div className="create">
      {/* on submit, call your handleSubmit function */}

      <form onSubmit={handleSubmit}>
        <h2>Add board game</h2>
        <label>
          Title
          {/* on change, set the title in state */}
          <input
            required
            name="title"
            onChange={(e) =>
              setGameInTheForm({
                ...gameInTheForm,
                title: e.target.value,
              })
            }
          />
        </label>

        <label>
          Genre
          {/* on change, set the genre in state */}
          <select
            required
            name="genre"
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, genre: e.target.value })}
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
          Designer
          {/* on change, set the designer in state */}
          <input
            required
            name="designer"
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, designer: e.target.value })}
          />
        </label>

        <label>
          Min Players
          {/* on change, set the min players in state */}
          <input
            required
            name="min_players"
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, min_players: e.target.value })}
          />
        </label>

        <label>
          Max Players
          {/* on change, set the max players in state */}
          <input
            required
            name="max_players"
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, max_players: e.target.value })}
          />
        </label>

        <label>
          Description
          {/* on change, set the description in state */}
          <textarea
            required
            name="description"
            onChange={(e) => setGameInTheForm({ ...gameInTheForm, description: e.target.value })}
          />
        </label>

        <button>Create game</button>
      </form>
    </div>
  );
}
