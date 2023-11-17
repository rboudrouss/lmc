// Don't forget to remove "./00-La_Matrice_Carre" in the root links
const drop_data_T = require("../data/dropdowns.json");
const drop_data = drop_data_T;

const fs = require("fs");

function convertJsonMd(json, path, i, depth = 0) {
  if (!fs.existsSync(path)) fs.mkdirSync(path);

  const folder = path.concat("/".concat(json.link));

  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  let text = `---\nlayout: ../${
    depth === 0
      ? ""
      : Array.from({ length: depth })
          .map(() => "..")
          .join("/")
          .concat("/")
  }layouts/Dropdowns.astro\ntitle: "${json.title}"`;

  console.log("text", text);

  if (json.childs?.length > 0) {
    text = text.concat("\nchilds:");
    json.childs.forEach((child, i) => {
      text = text.concat(
        `\n  - title: "${child.title}"\n    href: "/${path.slice(
          6 // uwu
        ) === '' ? '' : path.slice(6).concat('/')}${json.link}/${child.link}"`
      );
    });
  }

  text = text.concat(`\n---\n${json.content ?? ""}`);

  const file = folder.concat("/index.md");

  console.log(`Creating file ${json.link}/index.md`);
  console.log("path", path);
  console.log("depth", depth);

  fs.writeFileSync(file, text);

  if (json.childs) {
    json.childs.forEach((child, i) => {
      convertJsonMd(child, folder, i, depth + 1);
    });
  }
}

function commandJsonMd() {
  const json = drop_data;
  const path = ".";
  convertJsonMd(json, path, 0);
}

commandJsonMd();
