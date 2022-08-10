import ourColors from "../includes/ourColors"
import { link } from "@wordpress/icons"
// "Popover" => add a modal window to add link to btn
// "Button" => adds btn to modal window
import { ToolbarGroup, ToolbarButton, Popover, Button, PanelBody, PanelRow, ColorPalette } from "@wordpress/components"
// "RichText" => displays generic btn
// "BlockControls" => capability to change the drop down menu
// "__experimentalLinkControl" => adds link to btn
// "InspectorControls" => capability to change editor menu
import { RichText, BlockControls, __experimentalLinkControl as LinkControl, InspectorControls, getColorObjectByColorValue } from "@wordpress/block-editor"
import { useState } from "@wordpress/element"

wp.blocks.registerBlockType("ourblocktheme/genericbutton", {
    title: "Generic Button",
    attributes: {
        text: {type: "string", },
        size: {type: "string", default: "large"},
        linkObject: {type: "object", default: { url: "" }},
        colorName: {type: "string", default: "blue"}
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props) {
    const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)

    // handle text content
    function handleTextChange(x) {
        props.setAttributes({text: x})
    }

    function buttonHandler() {
        setIsLinkPickerVisible(prev => !prev)
    }

    // assigns a link to btn (via attributes)
    function handleLinkChange(newLink) {
        props.setAttributes({linkObject: newLink})
    }

    // returns color name if its color exists into array
    const currentColorValue = ourColors.filter(color => {
        return color.name == props.attributes.colorName
    })[0].color

    // assigns a color in editor
    function handleColorChange(colorCode) {
        // contains keys of ourColors array
        const { name } = getColorObjectByColorValue(ourColors, colorCode)
        props.setAttributes({colorName: name})
    }

    return (
        <>
        {/* changes the drop down menu */}
        <BlockControls>
            {/* allows to add link to genegic btn */}
            <ToolbarGroup>
                <ToolbarButton onClick={buttonHandler} icon={link} />
            </ToolbarGroup>
            {/* allows to choose size for text */}
            {/* if pressed "large" => set size attribute "large" */}
            <ToolbarGroup>
                <ToolbarButton isPressed={props.attributes.size === "large"} onClick={() => props.setAttributes({size: "large"})}>Large</ToolbarButton>
                <ToolbarButton isPressed={props.attributes.size === "medium"} onClick={() => props.setAttributes({size: "medium"})}>Medium</ToolbarButton>
                <ToolbarButton isPressed={props.attributes.size === "small"} onClick={() => props.setAttributes({size: "small"})}>Small</ToolbarButton>
            </ToolbarGroup>
        </BlockControls>
        {/* change the editor menu */}
        <InspectorControls>
            <PanelBody title="Color" initialOpen={true}>
                <PanelRow>
                    {/* adds color palette into editor menu */}
                    <ColorPalette disableCustomColors={true} clearable={false} colors={ourColors} value={currentColorValue} onChange={handleColorChange} />
                </PanelRow>
            </PanelBody>
        </InspectorControls>
        {/* "allowedFormats" allows to use some of options in a drop down menus */}
        <RichText allowedFormats={[]} tagName="a" className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`} value={props.attributes.text} onChange={handleTextChange} />
        {isLinkPickerVisible && (
            <Popover position="middle center">
                <LinkControl settings={[]} value={props.attributes.linkObject} onChange={handleLinkChange} />
                <Button variant="primary" onClick={() => setIsLinkPickerVisible(false)} style={{display: "block", width: "100%"}}>Confirm Link</Button>
            </Popover>
        )}
        </>
    )
}

// renders generic btn in frontend
function SaveComponent(props) {
    return <a href={props.attributes.linkObject.url} className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`}>{props.attributes.text}</a>
}