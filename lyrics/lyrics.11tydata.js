import f from "../commonindex.js";

export default f("lyrics", {
    templateEngineOverride: data => data.index ? "liquid" : "mdbreaks",
});
