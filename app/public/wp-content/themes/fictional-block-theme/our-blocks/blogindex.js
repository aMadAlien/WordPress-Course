wp.blocks.registerBlockType("ourblocktheme/blogindex", {
    title: "Fictional University Blog Index",
    // block renders in editor
    edit: function() {
        return wp.element.createElement("div", { className: "our-placeholder-block" }, "Blog Index Placeholder")
    },
    save: function () {
        return null
    }
})