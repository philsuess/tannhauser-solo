import { actionCreatorFactory } from "typescript-fsa";
import { Dispatch } from "redux";

const actionCreator = actionCreatorFactory();

export const loadJoke = actionCreator.async<
  { jokeUri: string },
  { joke: string }
>("LOAD_JOKE");

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// const jokesUri = 'https://api.icndb.com/jokes/random';

export const requestJoke = (jokesUri: string) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(
    loadJoke.started({
      jokeUri: jokesUri,
    })
  );

  try {
    const fetched = await fetch(jokesUri);
    const json = await fetched.json();
    await sleep(1500); // for demonstration
    const newJoke = json.value.joke;
    dispatch(
      loadJoke.done({
        params: { jokeUri: jokesUri },
        result: { joke: newJoke },
      })
    );
  } catch (error) {
    dispatch(
      loadJoke.failed({
        params: { jokeUri: jokesUri },
        error: error.message,
      })
    );
  }
};
