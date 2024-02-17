import React, { useEffect, useState } from "react";
import "./App.css";
import { SingleCard } from "./components/SingleCard";

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false},
  { "src": "/img/potion-1.png", matched: false},
  { "src": "/img/ring-1.png", matched: false},
  { "src": "/img/scroll-1.png", matched: false},
  { "src": "/img/shield-1.png", matched: false},
  { "src": "/img/sword-1.png", matched: false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setturns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choicetwo, setChoicetwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () =>{
     const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoicetwo(null)
    setCards(shuffleCards)
    setturns(0) 
  }

    //handle choice
    const handleChoice = (card) => {
      choiceOne ? setChoicetwo(card) : setChoiceOne(card)
    
    }

  const resetTurn = () =>{
    setChoiceOne(null)
    setChoicetwo(null)
    setturns(prevTurn => prevTurn+1)
    setDisabled(false)

  }
    // compare 2 Selected Cards
    useEffect(() => {
      if(choiceOne && choicetwo){
        
        setDisabled(true)
        if(choiceOne.src === choicetwo.src){
          setCards(prevCards => {
            return prevCards.map(card => {
              if(card.src === choiceOne.src){
                return {...card, matched: true}
              } else {
                return card
              }
            })
          })
          console.log(cards)
          resetTurn()
        } else {
          console.log('first')
          setTimeout(()=>resetTurn(), 1000 ) 
          console.log('two')
          
        }
      }
    }, [choiceOne, choicetwo])

    useEffect(()=>{
      shuffleCards()
    },[])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {
          cards.map(card =>(
          <SingleCard
            key={card.id}
            cardd = {card} 
            handleChoice={handleChoice}
            flipped = {card === choiceOne || card === choicetwo || card.matched}
            disabled = {disabled}
          />

          ))
        }
      </div>
        <p>Turns: {turns} </p>
    </div>
  )
  }

export default App;
