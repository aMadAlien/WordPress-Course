wp.blocks.registerBlockType("ourblocktheme/singlepost", {
    title: "Fictional University Single Post",
    // block renders in editor
    edit: function() {
        return wp.element.createElement("div", { className: "our-placeholder-block" }, "Single Post Placeholder")
    },
    save: function () {
        return null
    }
})