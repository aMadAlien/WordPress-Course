wp.blocks.registerBlockType("ourblocktheme/genericheading", {
    title: "Generic Heading",
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent() {
    return (
        <div>ssssssssssss</div>
    )
}

function SaveComponent() {
    return (
        <div>heading block</div>
    )
}