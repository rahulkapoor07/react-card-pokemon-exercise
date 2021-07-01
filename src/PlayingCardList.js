import {useAxios} from "./hooks"
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import React from "react";
import {formatCard} from "./helpers"
/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const [cards, handleClick, removeElements] = useAxios("card","https://deckofcardsapi.com/api/deck/new/draw/");

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={()=>handleClick(formatCard)}>Add a playing card!</button>
        <button onClick={()=>removeElements()}>Erase</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
