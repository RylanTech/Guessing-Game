import { useEffect, useState } from "react"
import { Button, Form} from "react-bootstrap"
import useLocalStorage from "./UseLocalStorage"
import "./GuessingGame.module.css"

function GuessingGame(props) {

    const [luckyNumber, setLuckyNumber] = useLocalStorage("luckyNumber", 0)
    const [currentGuess, setCurrentGuess] = useState()
    const [numOfGuesses, setNumOfGuesses] = useLocalStorage("numOfGuesses", 0)
    const [hint, setHint] = useState("")

    useEffect(() => {
        generateLuckyNumber()
    }, [])

    const handleHint = () => {
        console.log(luckyNumber)
        if (currentGuess === luckyNumber) {
            setHint("Your number is Correct!") 
        } else if (currentGuess > luckyNumber) {
            setHint("The Lucky number is lower")
        } else if (currentGuess < luckyNumber) {
            setHint("The Lucky number is Higher")
        } else {
            setHint("error")
        }
        console.log(currentGuess)
    }

    function submit(event) {
        event.preventDefault()
        setNumOfGuesses(numOfGuesses + 1)
        handleHint()
    }
    function handleGuess(event) {
        setCurrentGuess(parseInt(event.target.value))
    }
    function generateLuckyNumber() {
        let newLuckyNumber = Math.ceil(Math.random() * 100)
        setLuckyNumber(newLuckyNumber)
    }
    function reset() {
        setCurrentGuess()
        generateLuckyNumber()
        setNumOfGuesses(0)
        setHint("")
    }

    return (
        <div className="container">
            <Form onSubmit={submit}>
            <p>I am thinking of a number between 1 and 100. Guess the Lucky Number!</p>
            <div className="row">
             <Form.Group className="col-9">
                 <Form.Control type="number" min="1" max="100" onChange={handleGuess} value={currentGuess}>
                    
                 </Form.Control>
             </Form.Group>
             <Button type="submit" className="col-3">submit</Button>
             </div>
            <div className="row">
             <p className="col-6">You have made {numOfGuesses} guesses!</p>
            <div className="col-6">{hint}</div>
            </div>
            <Button onClick={reset}>reset</Button>
            </Form>
        </div>
    )
}
export default GuessingGame