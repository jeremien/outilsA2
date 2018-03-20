// installation des modules
const Rita = require('rita');
const _ = require('underscore');
const filter = require('filter-values');
const jsonfile = require('jsonfile');
const fs = require('fs');

fs.readFile('./bdd/corpus.txt', function(err, data){

  if (err) throw err;

  console.log(data.toString());

  // création de la méthode pour analyser le texte
  const rita_string = Rita.RiString(data.toString());

  // on extrait les parts of speech > penn tags > tableau
  const pos = rita_string.pos();
  // on extrait les mots > tableau
  const words = rita_string.words();

  // on crée un objet vide
  let obj = {};
  // on boucle dans l'objet et on écrit les clefs (mots)
  // et les valeurs (tags)
  // avec les 2 tableaux
  _.each(words, function(k, i){
    obj[k] = pos[i];
  });

  function filtreObj(objet, pos) {
    // on filtre l'objet avec le pos qui correspond il me renvoie un objet
    let res = filter(objet, pos);
    // j'écrase la variable avec juste les clefs et il me renvoie un tableau
    res = _.keys(res);
    // on retourne les données
    return res;
  }

  // on stocke les adjectifs filtrés depuis l'objet
  let adjectif = filtreObj(obj, 'jj');
  // on stocke les noms 'nn'
  let nn = filtreObj(obj, 'nn');
  // on stocke les noms 'nn'
  let vb = filtreObj(obj, 'vb');

  // on crée un nouvel objet et on lui assigne les adjectifs

  let bdd = {
  "phrase": ["We #verbe# to #verbe# it./"],
  "adjectif":adjectif,
  "nom": nn,
  "verbe": vb,
  "pronom": ["we", "you"]
  }

  jsonfile.writeFile('./bdd/bdd.json', bdd, function(err) {
    console.log('la base de donnée est créée');
  })


})
