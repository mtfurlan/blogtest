import spawn from "cross-spawn";

// https://github.com/11ty/eleventy/blob/main/src/Util/DateGitLastUpdated.js
function getGitLastUpdatedTimeStamp(filePath) {
    const str = spawn
            .sync(
                "git",
                // Formats https://www.git-scm.com/docs/git-log#_pretty_formats
                // %at author date, UNIX timestamp
                ["log", "-1", "--format=%at", filePath],
            )
            .stdout.toString("utf-8");
    return str ? new Date(parseInt(str) * 1000) : new Date();
}

export default {
    lastUpdated: (data) => {
        let lastUpdated;
        if(data.lastUpdated) {
            lastUpdated = data.lastUpdated; // allow override via front matter
        } else {
            lastUpdated = getGitLastUpdatedTimeStamp(data.page.inputPath);
        }
        if(lastUpdated.getTime() != data.page.date.getTime()) {
            return lastUpdated;
        }
        return null;
    },
};
