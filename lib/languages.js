exports.LANGUAGES = [
  {
    name: "go",
    command: "go version 2>&1 | awk '{print $3}'"
  },
  {
    name: "java",
    command: "java -version 2>&1 | head -n 1 | awk -F '\"' '{print $2}'"
  },
  {
    name: "lua",
    command: "lua -v 2>&1 | awk '{print $2}'"
  },
  {
    name: "node",
    command: "node --version 2>&1 | awk '{print $1}'"
  },
  {
    name: "python",
    command: "python --version 2>&1 | awk '{print $2}'"
  },
  {
    name: "ruby",
    command: "ruby --version 2>&1 | awk '{print $2}'"
  },
  {
    name: "rust",
    command: "rustc --version 2>&1 | awk '{print $2}'"
  }
];
