import './SingleCard.css'

export const SingleCard = ({cardd, handleChoice, flipped, disabled }) => {

    return(
        <div className="card" >
              <div className= {flipped ? "flipped":""}>
                <img className="front" src={cardd.src}  />
                <img
                  className="back" 
                  src= "./img/cover.png" 
                  onClick={()=>{ if (!disabled) {handleChoice(cardd)}}}
                  />
              </div>
            </div>
    )
}