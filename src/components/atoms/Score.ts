import { ObjectId } from "bson";

export class Score {
    date: null;
    score: '';
    level:'';
    game_id: null; 
    static schema = {
        name: "Score",
        properties: {
          game_id: "objectId",
          date: "date",
          score: "int",
          level: "int",
        },
      };
}