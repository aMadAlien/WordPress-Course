
wp.blocks.registerBlockType("ourblocktheme/programarchive", {
    title: "Fictional University Program Archive",
    // block renders in editor
    edit: function() {
        return wp.element.createElement("div", { className: "our-placeholder-block" }, "Program Archive Placeholder")
    },
    save: function () {
        return null
    }
})