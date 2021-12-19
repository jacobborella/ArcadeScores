import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Game } from "../components/atoms/Game";
import { ObjectId } from "bson";
import { Score } from "../components/atoms/Score";

const GamesContext = React.createContext(null);

const GamesProvider = ({ children }) => {

  const realmRef = useRef(null);

  const [games, setGames] = useState([]);

  const [scores, setScores] = useState([]);

  const findScores = (gameId) => {
    setScores(null)
    const projectRealm = realmRef.current;
    const syncScores = projectRealm.objects("Score").filtered("game_id == $0 ", gameId);
    const sortedScores = syncScores.sorted([["date", true]]);
    setScores(sortedScores);
    sortedScores.addListener(() => {
      setScores([...sortedScores])
    });
  }

  const addScore = (gameId, level, score) => {
    const projectRealm = realmRef.current;
    let s;
    projectRealm.write(() => {
      s = projectRealm.create(
        "Score",
        {
          game_id: gameId,
          date: new Date(),
          level: level,
          score: score,
        }
      );
    });
  }

  const createGame = (gameName, gameVariant) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.create(
        "Game",
        {
          _id: new ObjectId(),
          name: gameName,
          variant: gameVariant,
        }
      );
    });
  } 
  useEffect(() => {
    const config = {
      schema: [Game.schema, Score.schema],
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
        scores,
        findScores,
        addScore,
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