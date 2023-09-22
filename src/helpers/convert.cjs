const drop_data_T = require("../data/dropdowns.json");
const drop_data = drop_data_T;

const fs = require("fs");

function convertJsonMd(json, path, i) {
  if (!fs.existsSync(path)) fs.mkdirSync(path);

  const title = `${(i ? i.toString().padStart(2, "0") : "00") + "-"}${json.title
    .match(/[a-zA-Z\s]/g)
    .join("")
    .replaceAll(" ", "_")}`;

  const folder = path.concat("/".concat(title));

  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  let text = `---\ntitle: ${json.title}`;

  if (json.isPage) {
    text = text.concat(`\npage: true`);
  }
  if (json.opened) {
    text = text.concat(`\nopened: true`);
  }
  text = text.concat(`\n---\n${json.content ?? ""}`);

  const file = folder.concat("/").concat(title).concat(".md");

  console.log(`Creating file ${file}`);

  fs.writeFileSync(file, text);

  if (json.childs) {
    json.childs.forEach((child, i) => {
      convertJsonMd(child, folder, i);
    });
  }
}

function commandJsonMd() {
  const json = drop_data;
  const path = "./test";
  convertJsonMd(json, path);
}

commandJsonMd();
