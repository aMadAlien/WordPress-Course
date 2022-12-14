import "./index.scss"
import {TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow} from "@wordpress/components"
// InspectorControls => allows to work with menu block editor into post editor
// BlockControls => allows to work with drop down menu
// AlignmentToolbar => allows to change the alignment
// useBlockProps => uses block properties, and we use it for our blocks
import {InspectorControls, BlockControls, AlignmentToolbar, useBlockProps} from "@wordpress/block-editor"
// color picker template (from chrome) 
import {ChromePicker} from "react-color"

// doesn't allow to save the page while epmty fields exist and allows if visa versa
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
      correctAnswer: {type: "number", default: undefined},
      bgColor: {type: "srting", default: "#ebebeb"},
      theAlignment: {type: "string", default: "left"}
    },
    description: "The description for my first menu block editor.",
    // block preview
    example: {
      attributes: {
        question: "What is my name?",
        answers: ['Meowsalot', 'Barksalot', 'Iren', 'Purrsloud'],
        correctAnswer: 3,
        bgColor: "#D8DFFC",
        theAlignment: "center"
      }
    },
    edit: EditComponent,
    save: function (props) {
      return null
    }
  })

function EditComponent (props) {
  const blockProps = useBlockProps({
    // style property changes bgc of the block in post editor
    className: "paying-attention-edit-block",
    style: {backgroundColor: props.attributes.bgColor}
  })

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

    // check if the correct answer exists
    if(indexToDelete == props.attributes.correctAnswer) {
      props.setAttributes({correctAnswer: undefined})
    }
  }

  // makes an answer correct
  function markAsCorrect(index) {
    props.setAttributes({correctAnswer: index})
  }

  return (
    <div {...blockProps}>
      {/* drop down menu - alignment */}
      <BlockControls>
        <AlignmentToolbar value={props.attributes.theAlignment} onChange={x => props.setAttributes({theAlignment: x})} />
      </BlockControls>
      {/* color block into editor */}
      <InspectorControls>
        <PanelBody title="Background Color" initialOpen={true}>
          <PanelRow>
            <ChromePicker color={props.attributes.bgColor} onChangeComplete={x => props.setAttributes({bgColor: x.hex})} disableAlpha={true} />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
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