import React from 'react'
import ReactDOM from 'react-dom'
import "./frontend.scss"

const divsToUpdate = document.querySelectorAll(".paying-attention-update-me")

// renders the block (quiz)
divsToUpdate.forEach(function(div) {
    // retrieves the data from the element
    const data = JSON.parse(div.querySelector("pre").innerHTML)
    ReactDOM.render(<Quiz {...data} />, div)
    div.classList.remove("paying-attention-update-me")
})

// contains the content of the block (quiz)
function Quiz(props) {
    return (
        <div className="paying-attention-frontend">
            <p>{props.question}</p>
            <ul>
            {props.answers.map(function(answer) {
                return <li>{answer}</li>
            })}
            </ul>
        </div>
    )
}