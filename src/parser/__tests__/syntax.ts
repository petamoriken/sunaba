import fs from "fs/promises";
import path from "path";
import fg from "fast-glob";
import { parseToSyntaxTree } from "../syntax";

describe("parse Sunaba sources to tokens", () => {
  const targets = fg.sync(__dirname + "/../../../test/*.txt").map((target) => {
    const info = path.parse(target);
    return [info.name, info.dir] as readonly [filename: string, filedir: string];
  });

  test.each(targets)("%s", async (filename, filedir) => {
    const [input, expected] = await Promise.all([
      fs.readFile(path.resolve(filedir, `${filename}.token.json`), "utf-8"),
      fs.readFile(path.resolve(filedir, `${filename}.syntax.json`), "utf-8"),
    ]);
    expect(parseToSyntaxTree(JSON.parse(input))).toEqual(JSON.parse(expected));
  })
});
