export class Score {
    date: null;
    score: '';
    level:'';
    static schema = {
        name: "Score",
        properties: {
          date: "date",
          score: "int",
          level: "int",
        },
      };
}