export class Hero {
    id: number;
    name: string;

    constructor(private idP: number, private nameP: string) {
      this.id = idP;
      this.name = nameP;
    }
  }