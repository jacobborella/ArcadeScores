import { ObjectId } from "bson";

export class Game {
    name = '';
    variant = '';
    _id =  new ObjectId();
    constructor(name, variant, id) {
        this.name = name;
        this.variant = variant;
        this._id = id;
    }
    static schema = {
        name: "Game",
        properties: {
          _id: "objectId",
          name: "string",
          variant: "string",
        },
        primaryKey: "_id",
      };
    
}