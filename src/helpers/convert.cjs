// Don't forget to remove "./00-La_Matrice_Carre" in the root links
const drop_data_T = require("../data/dropdowns.json");
const drop_data = drop_data_T;

const fs = require("fs");

function convertJsonMd(json, path, i, depth = 0) {
  if (!fs.existsSync(path)) fs.mkdirSync(path);

  const title = `${(i ? i.toString().padStart(2, "0") : "00") + "-"}${json.title
    .match(/[a-zA-Z\s]/g)
    .join("")
    .replaceAll(" ", "_")}`;

  const folder = path.concat("/".concat(title));

  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  let text = `---\nlayout: ../${
    depth === 0
      ? ""
      : Array.from({ length: depth })
          .map(() => "..")
          .join("/")
          .concat("/")
  }layouts/Dropdowns.astro\ntitle: ${json.title}`;

  console.log("text", text);

  if (json.childs?.length > 0) {
    text = text.concat("\nchilds:");
    json.childs.forEach((child, i) => {
      text = text.concat(
        `\n  - title: "${child.title}"\n    href: "/${path.slice(
          2 + 20 // HACK remove "./00-La_Matrice_Carre"
        )}${path.length > 23 ? "/" : ""}${title}/${i
          .toString()
          .padStart(2, "0")}-${child.title
          .match(/[a-zA-Z\s]/g)
          .join("")
          .replaceAll(" ", "_")}"`
      );
    });
  }

  text = text.concat(`\n---\n${json.content ?? ""}`);

  const file = folder.concat("/index.mdx");

  console.log(`Creating file ${title}/index.mdx`);
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
