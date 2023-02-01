/*
Project Goals

In this project, you’ll be building an interactive terminal game.
The scenario is that the player has lost their hat in a field full of holes,
and they must navigate back to it without falling down
one of the holes or stepping outside of the field.
*/

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
  }

  static generateField(height, width) {
    let line = [];
    const field = [];
    // Generate random indexes for the place of the hat, exclude first half of fiel:
    const hRand = Math.floor(Math.random() * (height - height / 2) + height / 2);
    const wRand = Math.floor(Math.random() * width);
    for (let i = 0; i < height; i++) {
      const widthRand = Math.floor(Math.random() * width);
      for (let j = 0; j < width; j++) {
        if (j === widthRand) {
          line.push(hole);
        }
        line.push(fieldCharacter);
      }
      field.push(line);
      line = [];
    }
    field[0][0] = pathCharacter;
    field[hRand][wRand] = hat;
    this.field = field;
    return field;
  }

  print() {
    this.field.forEach(line => console.log(line.join(' ')));
  }

  play() {
    let youWin = false;
    let gameOver = false;
    const startingField = this.field;
    let newField = this.field;
    let fieldIndex = 0;
    let lineIndex = 0;
    const go = () => {
      if (fieldIndex < 0 || fieldIndex > this.field.length - 1 || lineIndex < 0 || lineIndex > this.field[fieldIndex].length -1) {
        console.log('Game Over');
        gameOver = true;
      } else if (newField[fieldIndex][lineIndex] === hole) {
        console.log('Game Over');
        gameOver = true;
      } else if (newField[fieldIndex][lineIndex] === hat) {
        console.log('You win!');
        youWin = true;
      }
      newField[fieldIndex][lineIndex] = pathCharacter;
      this.field = newField;
    };
    while (!youWin || !gameOver) {
      this.print();
      readline.question('Press l, r, u, or d to move (left, right, up, down)\n'
      , response => {
        if (response === 'r') {
            lineIndex ++;
            go();
            } else if (response === 'd') {
            fieldIndex ++;
            go();
            } else if (response === 'l') {
            lineIndex --;
            go();
            } else if (response === 'u') {
            fieldIndex --;
            go();
            }
        readline.close();
      })
    }
  }
};

const generated = Field.generateField(8, 10);
const generatedField = new Field(generated);
generatedField.play();
