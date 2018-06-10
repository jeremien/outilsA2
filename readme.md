# Sujet

Créer un personnage, une identité, et automatiser sa parole.


# Déroulé

- extraire du texte de différentes sources
- analyser les mots
- constituer une base de donnée
- générer du texte


# Code

collection d'outils:

- Collecteur pour page web
- Communication avec api pour base de données existantes (wikipedia, googlenews)
- Convertisseurs, traducteurs et aggrégateurs pour fichiers (sous-titres etc)
- Analyse du lexique et écriture de la base
- CFG pour générer les phrases
- analyse des modèles de phrases avec les POS

# publication

- on cherche dans dossier :
/nom_prenom/
  / texte
  / description

- séparer les paragraphes avec un signe
- ajouter des styles > markdown ?

# TODO

- remplacer tracery par rita pour le texte génératif
- convertisseur sub/ocr/pdf > detection de l'extension
- mise en page automatisée
- extracteur de sous-titres youtube
- commande pour lister tous les fichiers textes/json etc
- module de traduction à remplacer

# pdftk
$ pdftk couverture-couverture.txt.pdf anna-texte.txt.pdf iris-texte.txt.pdf leo-texte.txt.pdf lucas-texte.txt.pdf lucille-texte.txt.pdf maeva-texte.txt.pdf mathieu-texte.txt.pdf louise-texte.txt.pdf rose-texte.txt.pdf samy-texte.txt.pdf marie-texte.txt.pdf elena-texte.txt.pdf annexe-explication.txt.pdf cat output fantome.pdf
