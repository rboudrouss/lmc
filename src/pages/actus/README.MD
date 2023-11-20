Pour les actus :

le frontmatter c'est ce que tu met entres ---. y a qlq infos essentiels du type :

(pour les textes t'es pas obligé de mettre entre guillet, mais tu peux si tu veux)

- `layout` : le layout qui va être utilisé pour cette page. J'ai toujours pas intégré d'autres truc spéciale donc pour l'instant pour les actus il y a juste `ActuL.astro`.

- `title` : le titre de la page. <!> obligatoire (le seul avec layout. Tout le reste est facultatif)

- `source` : le lien de la source

- `date` : la date de l'actu. sera utilisé pour afficher le "dans x jours" et pour trier les actus par date. soit être sous le format `dd-mm-yyyy hh:mm` (le format est stricte)

- `img` : l'image de l'actu. Doit être stocké dans dans le dossier public.

- `assos` : la liste des assos concernées par l'actu. Doit être le nom court de l'asso (comme les noms des images). (c'est pas caseSensitive, majuscules/minuscules ça revient au même)

- `fac` : la liste des facs concernées par l'actu. c'est soit "lettre", "sciences", "medecine", soit "polytech". Tu peux en mettre plusieurs. Si c'est vide, pour le trie je considère que ça concerne toutes les facs. (c'est aussi pas caseSensitive)

exemple de frontmatter :

```md
---
layout: ../../layouts/ActuL.astro
title: OMGGG NYAH
source: https://www.instagram.com/p/uwuwuwuwuwu
date: 01-12-2023 08:00
img: /assets/actus/fjaziuohuiahc.png
assos:
  - PSU
  - alias
fac:
  - LETTRE
  - sciences
---
```

Met tes actus ici et tes infos dans le dossier `/infos`