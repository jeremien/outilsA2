// on charge les librairies
// tracery pour la génération de texte
const tracery = require('tracery-grammar');
// file system pour lire et écrire des fichiers
const fs = require('fs');
// librairie gestion du temps
const moment = require('moment')
// on importe les fonctions génériques
const modules = require('./module_fonctions.js')

// on lit la base de données
const base_de_donnee = fs.readFileSync('./bdd/bdd.json');
// on parse le json
const donnees = JSON.parse(base_de_donnee);

/* -----------------------
appel des fonctions
--------------------------*/
setInterval(function(){
  let date = moment().format('DD_MM_YY');
  // on stocke le resultat de generation_texte
  let resultat = generation_texte();
  // on l'écrit dans un fichier texte dans le dossier resultats
  modules.ecrire_texte(resultat+'\n', './resultats/' + date + '.txt')
  // on l'affiche dans la console
  console.log(resultat);
},2000);
/*------------------------
fonction qui génère des phrases
--------------------------*/
function generation_texte() {
  // on le donne à manger à tracery
  const grammar = tracery.createGrammar(donnees)
  // tracery applique les modfieurs
  grammar.addModifiers(tracery.baseEngModifiers);
  // on stocke la chaine de caractère générée par tracery
  let phrase = grammar.flatten('#phrase#');
  // on sépare avec le / les phrases et on récupère un tableau
  let tableau = phrase.split("/");
  // on récupère la valeur de l'index
  let index = tableau.length;
  // on génére un nombre_aleatoire qui n'est pas plus grand que l'index de mon tableau
  let nombre_aleatoire = Math.floor(Math.random()*index);
  // je renvoie la valeur générée
  return tableau[nombre_aleatoire];
}
