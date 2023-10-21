// const fs = require("fs")
import * as fs from "fs";
import { Empty_Element, type Element_Drop } from ".";

// must be executed by nodeJs, do not uses with react <!>
function read_md(path: string): Element_Drop {
  if(!fs.existsSync(path)) {
    console.log("Path " + path + " does not exists");
    return Empty_Element;
  }

  let files = fs.readdirSync(path);

  let md_files = files.filter((file) => file.endsWith(".md"));

  if (md_files.length === 0) {
    console.log("No markdown files found in " + path);
    return Empty_Element;
  }
  if (md_files.length > 1) {
    console.log(
      "Multiple markdown files found in " +
        path +
        ", will only use the first one"
    );
  }

  let md_file = import.meta.glob(path + "/" + md_files[0]);
  files = files
    .slice(files.indexOf(md_files[0]), 1)
    .filter((file) => fs.lstatSync(path + "/" + file).isDirectory());

  return {
    title: md_file.frontmatter.title,
    opened: md_file.frontmatter.opened,
    isPage: md_file.frontmatter.isPage,
    isMd: md_file.frontmatter.isMd,
    childs: files.map((file) => read_md(path + "/" + file)),
    content: md_file.Content as React.JSX.Element,
  };
}
