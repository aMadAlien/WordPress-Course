import "./index.scss"
import {TextControl, Flex, FlexBlock, FlexItem, Button, Icon} from "@wordpress/components"

// doesn't allow to save the page while epmty fields exist
(function() {
  let locked = false

  wp.data.subscribe(function () {
    const results = wp.data.select("core/block-editor").getBlocks().filter(function(block) {
      return block.name == "ourplugin/are-you-paying-attention" && block.attributes.correctAnswer == undefined
    })

    if (results.length && locked == false) {
      locked = true
      wp.data.dispatch("core/editor").lockPostSaving("noanswer")
    }
    if(!results.length && locked) {
      locked = false
      wp.data.dispatch("core/editor").unlockPostSaving("noanswer")
    }
  })
}())

wp.blocks.registerBlockType("ourplugin/are-you-paying-attention", {
    title: "Are You Paying Attention?",
    icon: "smiley",
    category: "common",
    attributes: {
      question: {type: "string"},
      answers: {type: "array", default: [""]},
      correctAnswer: {type: "number", default: undefined}
    },
    edit: EditComponent,
    save: function (props) {
      return null
    }
  })

function EditComponent (props) {
  // saves the question text
  function updateQuestion(value) {
    props.setAttributes({question: value})
  }
  // deletes the line of answer
  function deleteAnswer(indexToDelete) {
    const newAnswers = props.attributes.answers.filter(function(x, index) {
      return index != indexToDelete
    })
    props.setAttributes({answers: newAnswers})

    if(indexToDelete == props.attributes.correctAnswer) {
      props.setAttributes({correctAnswer: undefined})
    }
  }

  // makes an answer correct
  function markAsCorrect(index) {
    props.setAttributes({correctAnswer: index})
  }

  return (
    <div className="paying-attention-edit-block">
      {/* QUESTION */}
      <TextControl label="Question:" value={props.attributes.question} onChange={updateQuestion} style={{fontSize: "20px"}} />
      <p style={{fontSize: "13px", margin: "20px 0 8px 0"}}>Answers:</p>
      {props.attributes.answers.map(function (answer, index) {
        return (
          <Flex>
            {/* ANSWER FIELD */}
            <FlexBlock>
              <TextControl autoFocus={answer == undefined} value={answer} onChange={newValue => {
                const newAnswers = props.attributes.answers.concat([])
                newAnswers[index] = newValue
                props.setAttributes({answers: newAnswers})
              }} />
            </FlexBlock>
            {/* ICON */}
            <FlexItem>
              <Button onClick={() => markAsCorrect(index)}>
                <Icon className="mark-as-correct" icon={props.attributes.correctAnswer == index ? "star-filled" : "star-empty"} />
              </Button>
            </FlexItem>
            {/* DELETE BTN */}
            <FlexItem>
              <Button isLink className="attention-delete"  onClick={() => deleteAnswer(index)}>Delete</Button>
            </FlexItem>
          </Flex>
        )
      })}
      {/* the btn adds new line of answer */}
      <Button isPrimary onClick={() => {
        props.setAttributes({answers: props.attributes.answers.concat([undefined])})
      }}>Add another answer</Button>
    </div>
  );
}