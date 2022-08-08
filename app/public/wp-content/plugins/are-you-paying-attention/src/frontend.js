import React from 'react'
import ReactDOM from 'react-dom'
import "./frontend.scss"

const divsToUpdate = document.querySelectorAll(".paying-attention-update-me")

// renders the block (quiz)
divsToUpdate.forEach(function(div) {
    ReactDOM.render(<Quiz />, div)
    div.classList.remove("paying-attention-update-me")
})

// contains the content of the block (quiz)
function Quiz() {
    return (
        <div className="paying-attention-frontend">
            react says hello
        </div>
    )
}