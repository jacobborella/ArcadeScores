import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Game } from "../components/atoms/Game";
import { ObjectId } from "bson";
import { Score } from "../components/atoms/Score";
import app from "../realmApp";

const GamesContext = React.createContext(null);

const GamesProvider = ({ children }) => {

  const realmRef = useRef(null);

  const [selectedGame, setSelectedGame] = useState({});

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

  const findtopScores = (gameId, noOfScores) => {
    const projectRealm = realmRef.current;
    const data = projectRealm.objects("Score").filtered("game_id == $0", gameId).sorted("score", true);
    let returnVal = [];
    for(let i = 0; i < noOfScores; i++) {
      if(i >= data.length) break;
      returnVal.push(data[i]);
    }
    return returnVal;
  }

  const findAvgScore = (gameId, resolution) => {
    const projectRealm = realmRef.current;
    currentTime = new Date();
    dateSplit = new Date(currentTime.getTime());
    dateSplit.setHours(0,0,0,0);
    oldDateBorder = new Date(currentTime.getTime());
    oldDateBorder.setHours(0,0,0,0);
    switch(resolution) {
      case "year":
        dateSplit = new Date(currentTime.getFullYear(), 0, 1)
        oldDateBorder = new Date(currentTime.getFullYear() - 1, 0, 1)
        break;
      case "month":
        dateSplit.setDate(1);
        oldDateBorder.setDate(1);
        oldDateBorder.setMonth(dateSplit.getMonth()-1);
        break;
      case "week":
        const day = dateSplit.getDay();
        const diff = dateSplit.getDate() - day + (day == 0 ? -6:1);
        dateSplit.setDate(diff);
        oldDateBorder.setTime(dateSplit.getTime()-7*24*3600000)
        break;
      case "day":
        oldDateBorder.setTime(dateSplit.getTime()-1*24*3600000)
        break;
      }
      const averageNew = projectRealm.objects("Score").filtered("game_id == $0 && date > $1", gameId, dateSplit).avg("score");
      const averageOld = projectRealm.objects("Score").filtered("game_id == $0 && date > $1 && date <= $2", gameId, oldDateBorder, dateSplit).avg("score");
      const growth = averageOld > 0? 100 * (averageNew - averageOld)/averageOld: 0;
      return {"avg": averageNew | 0, "change": growth | 0};
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
    if(!app.currentUser) {
       throw new Error("Did you get to this screen without logging in?")
    }
    return new Realm(getConfig(app.currentUser))
  }
  const loadGames = () => {
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
        selectedGame,
        setSelectedGame,
        games,
        createGame,
        scores,
        findScores,
        addScore,
        loginUser,
        loadGames,
        logoutUser,
        findAvgScore,
        findtopScores,
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