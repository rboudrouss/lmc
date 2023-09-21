const fs = require("fs")

function read_md(path) {
  const files = fs.readdirSync(path);

  const drops= [];

  // files.forEach((file) => {
  //   if (file) {}
  // });

  console.log(files)

}

read_md("../data/dropdowns")