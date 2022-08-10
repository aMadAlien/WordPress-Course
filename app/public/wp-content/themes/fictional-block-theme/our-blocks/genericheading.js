import { ToolbarGroup, ToolbarButton } from "@wordpress/components"
import { RichText, BlockControls } from "@wordpress/block-editor"

wp.blocks.registerBlockType("ourblocktheme/genericheading", {
    title: "Generic Heading",
    attributes: {
        text: {type: "string", },
        size: {type: "string", default: "large"}
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props) {
    // handle text content
    function handleTextChange(x) {
        props.setAttributes({text: x})
    }

    return (
        <>
        {/* allows to choose size for text */}
        {/* if pressed "large" => set size attribute "large" */}
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton isPressed={props.attributes.size === "large"} onClick={() => props.setAttributes({size: "large"})}>Large</ToolbarButton>
                <ToolbarButton isPressed={props.attributes.size === "medium"} onClick={() => props.setAttributes({size: "medium"})}>Medium</ToolbarButton>
                <ToolbarButton isPressed={props.attributes.size === "small"} onClick={() => props.setAttributes({size: "small"})}>Small</ToolbarButton>
            </ToolbarGroup>
        </BlockControls>
        {/* "allowedFormats" allows to use some of options in a drop down menus */}
        <RichText allowedFormats={["core/bold"]} tagName="h1" className={`headline headline--${props.attributes.size}`} value={props.attributes.text} onChange={handleTextChange} />
        </>
    )
}

// renders generic heading in frontend
function SaveComponent(props) {
    // checks which size of text is and returns a appropriate tag
    function createTagName() {
        switch(props.attributes.size) {
            case "large":
                return "h1"
            case "medium":
                return "h2"
            case "small":
                return "h3"
        }
    }

    return (
        <RichText.Content tagName={createTagName()} value={props.attributes.text} className={`headline headline--${props.attributes.size}`} />
    )
}