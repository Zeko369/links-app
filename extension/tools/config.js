const exclude = [".js", ".ts"]

module.exports = { exclude: (file) => !exclude.some((extension) => file.endsWith(extension)) }
