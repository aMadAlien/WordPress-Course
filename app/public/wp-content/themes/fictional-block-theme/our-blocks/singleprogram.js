
wp.blocks.registerBlockType("ourblocktheme/singleprogram", {
    title: "Fictional University Single Program",
    // block renders in editor
    edit: function() {
        return wp.element.createElement("div", { className: "our-placeholder-block" }, "Single Program Placeholder")
    },
    save: function () {
        return null
    }
})