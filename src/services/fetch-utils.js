import { client, checkError } from './client';

export function getUser() {
  console.log(client.auth);
  return client.auth.session();

  //client.auth.session() returns the session information and verify the user
}

// signs an new user in and puts an auth token in local storage in the browser
export async function signUp(email, password) {
  const response = await client.auth.signUp({ email, password });

  return response.user;
}

// signs an existing user in and puts an auth token in local storage in the browser
export async function signIn(email, password) {
  const response = await client.auth.signIn({ email, password });

  return response.user;
}

// removes the token from local storage and redirects the user home
export async function logout() {
  await client.auth.signOut();
  //what does client.auth console log out to ?

  return (window.location.href = '../');
}

export async function createGame(game) {
  const response = await client.from('board_games').insert([game]);

  return checkError(response);
}

export async function updateGame(id, newGame) {
  const { body, error } = await client.from('board_games').update(newGame).match({ id });
  console.log(body);
  return error || body;
}

// export async function updateGame(id, newGame) {
//   const response = await client.from('board_games').update(newGame).match({ id });
//   console.log(response.body);
//   return checkError(response);
// }

export async function getGames() {
  const response = await client.from('board_games').select();

  return checkError(response);
}

export async function getGameById(id) {
  const response = await client.from('board_games').select().match({ id }).single();

  return checkError(response);
}
