import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Game } from "../components/atoms/Game";

const GamesContext = React.createContext(null);

const GamesProvider = ({ children }) => {

  const realmRef = useRef(null);

  const [games, setGames] = useState([]);

  const createGame = (gameName, gameVariant) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.create(
        "Game",
        {
          name: gameName,
          variant: gameVariant,
        }
      );
    });
  } 
  useEffect(() => {
    const config = {
      schema: [Game.schema],
    };
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      const syncGames = projectRealm.objects("Game");
      let sortedGames = syncGames.sorted("name");
      setGames([...sortedGames]);
      sortedGames.addListener(() => {
        setGames([...sortedGames]);
      });
    });
    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setGames([]);
      }
    };  
  }, []);

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <GamesContext.Provider
      value={{
        games,
        createGame,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useGames = () => {
  const game = useContext(GamesContext);
  if (game == null) {
    throw new Error("useGames() called outside of a GamesProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return game;
};

export { GamesProvider, useGames };