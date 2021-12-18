export class Game {
    name: '';
    variant: ''
    constructor(name, variant) {
        this.name = name;
        this.variant = variant;
    }
    static schema = {
        name: "Game",
        properties: {
          name: "string",
          variant: "string",
        },
      };
    
}