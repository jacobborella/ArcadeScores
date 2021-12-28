import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Game } from "../components/atoms/Game";
import { ObjectId } from "bson";
import { Score } from "../components/atoms/Score";
import app from "../realmApp";

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
          _id: new ObjectId(),
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
  async function loginUser(username, password) {
    await app.logIn(Realm.Credentials.emailPassword(username, password));
  }
  async function logoutUser() {
    await app.currentUser.logOut();
  }
  function getConfig(user) {
    return {
        schema: [Game.schema, Score.schema],
        schemaVersion: 1,
        sync: {
          user,
          partitionValue: `user=${user.id}`,
        },
    };
  }
  async function getRealm() {
    console.log("inside getRealm")
    if(!app.currentUser) {
       throw new Error("Did you get to this screen without logging in?")
    }
    return new Realm(getConfig(app.currentUser))
  }
  const loadGames = () => {
    console.log("Load GamesProvider")
    getRealm().then((projectRealm) => {
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
  };

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
        loginUser,
        loadGames,
        logoutUser,
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