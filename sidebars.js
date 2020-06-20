module.exports = {
  someSidebar: [
    { type: "category", label: "Basics", items: ["intro", "features"] },
    {
      type: "category",
      label: "OpenScraping Specification",
      collapsed: false,
      items: [
        "spec/definitions",
        "spec/architecture",
        "spec/example",
        "spec/extensibility",
        "spec/json",
        "spec/component-mapping"
      ],
    },
  ],
};
