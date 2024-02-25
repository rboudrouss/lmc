# parser convertie la syntaxe rotor en syntaxe valide md
MAYARRAY = ["affiliation", "typeasso"]

import os

files = os.listdir(".")
mds = list(filter(lambda x : x.endswith("md") and not x.startswith("index"), files)) # on garde que les fichiers du dossier qui sont des .md
print("uwu")
for md in mds:
  print(f"treating {md}")

  content = filter(None, open(md).read().split("\n")) # divisent par saut de ligne, et on retire les lignes vide (quand 2 sauts de ligne)

  content:list[str] = list(map(lambda x:x.strip().replace("\"", ""), content)) # les guillemets peuvent me gêner, je les retire

  outJson: dict[str, str] = dict()
  lastKey = ""

  for line in content:
    if ":" in line:
      key,*value = map(lambda x:x.strip(), line.split(":"))
      value = ":".join(value)
      if key in outJson:
        print(f"<!> warning key {key} already in dict {outJson}")
      lastKey = key
      outJson[key] = value
    else:
      outJson[lastKey] += "\\n"
      outJson[lastKey] += line

  for may in MAYARRAY:
    if may not in outJson: continue
    value = map(lambda x:f"   - {x}\n", outJson[may].split(","))
    outJson[may] = "\n" + "".join(list(value))
  
  lines = map(lambda x: f"{x}: {outJson[x]}\n" if x != "description" else f"{x}: \"{outJson[x]}\"\n", outJson)
  out = "---\n"
  out += "".join(lines)
  out += "---"

  # print(out)

  with open(md, "w") as f:
    f.write(out)
    