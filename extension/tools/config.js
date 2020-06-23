const exclude = [".js", ".ts", ".tsx", ".jsx"]

module.exports = { exclude: (file) => !exclude.some((extension) => file.endsWith(extension)) }
