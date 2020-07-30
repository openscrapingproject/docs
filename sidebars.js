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
        "spec/scraping-definition",
        "spec/example",
        "spec/json",
        "spec/component-mapping",
        "spec/output",
      ],
    },
    {
      type: "category",
      label: "Osprey",
      collapsed: false,
      items: ["osprey/intro", "osprey/xpath"],
    },
  ],
};
