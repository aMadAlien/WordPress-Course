
wp.blocks.registerBlockType("ourblocktheme/singleprofessor", {
    title: "Fictional University Single Professor",
    // block renders in editor
    edit: function() {
        return wp.element.createElement("div", { className: "our-placeholder-block" }, "Single Professor Placeholder")
    },
    save: function () {
        return null
    }
})