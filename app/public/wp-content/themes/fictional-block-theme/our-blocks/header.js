
wp.blocks.registerBlockType("ourblocktheme/header", {
    title: "Fictional University Header",
    // block renders in editor
    edit: function() {
        return wp.element.createElement("div", { className: "our-placeholder-block" }, "Header Placeholder")
    },
    save: function () {
        return null
    }
})