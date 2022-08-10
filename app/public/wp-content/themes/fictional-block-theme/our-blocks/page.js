wp.blocks.registerBlockType("ourblocktheme/page", {
    title: "Fictional University Single Page",
    // block renders in editor
    edit: function() {
        return wp.element.createElement("div", { className: "our-placeholder-block" }, "Single Page Placeholder")
    },
    save: function () {
        return null
    }
})