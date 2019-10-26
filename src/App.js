import React, { useState } from "react";
import "./App.css";

function cloneField(field) {
  return field.map((_, index) => [...field[index]]);
}

function App() {
  const [field, setField] = useState([
    ["♠", "♠", "♣", "♦", "♣", "♣"],
    ["♠", "♠", "♣", "♦", "♦", "♦"],
    ["♠", "♣", "♣", "♦", "♦", "♦"],
    ["♠", "♣", "♣", "♣", "♣", "♦"],
    ["♥", "♣", "♣", "♣", "♥", "♥"],
    ["♥", "♥", "♣", "♣", "♦", "♣"],
    ["♥", "♥", "♥", "♠", "♠", "♣"]
  ]);

  function clearArea(field, x, y) {
    const suit = field[y][x];
    if (!suit) return;

    const newField = cloneField(field);

    newField[y][x] = null;
    checkNeighbors(x, y, suit);

    return setField(newField);

    function checkNeighbors(x, y) {
      //проверяем соседа сверху, если он есть
      if (y - 1 >= 0) {
        if (newField[y - 1][x] === suit) {
          newField[y - 1][x] = null;
          checkNeighbors(x, y - 1);
        }
      }
      //справа
      if (x + 1 < newField[0].length) {
        if (newField[y][x + 1] === suit) {
          newField[y][x + 1] = null;
          checkNeighbors(x + 1, y);
        }
      }
      //снизу
      if (y + 1 < newField.length) {
        if (newField[y + 1][x] === suit) {
          newField[y + 1][x] = null;
          checkNeighbors(x, y + 1);
        }
      }
      //слева
      if (x - 1 >= 0) {
        if (newField[y][x - 1] === suit) {
          newField[y][x - 1] = null;
          checkNeighbors(x - 1, y);
        }
      }
    }
  }

  return (
    <div className="App">
      <table className="field" border="2">
        <tbody>
          {field.map((_, y) => (
            <tr key={y}>
              {field[y].map((card, x) => (
                <td
                  className={card === "♦" || card === "♥" ? "item red" : "item"}
                  key={x}
                  onClick={() => clearArea(field, x, y)}
                >
                  {card}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
