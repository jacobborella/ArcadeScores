import { ObjectId } from "bson";

export class Score {
    date = null;
    score =  '';
    level = '';
    game_id = null; 
    _id =  new ObjectId();
    static schema = {
        name: "Score",
        properties: {
          _id: "objectId",
          game_id: "objectId",
          date: "date",
          score: "int",
          level: "int",
        },
        primaryKey: "_id",
      };
}