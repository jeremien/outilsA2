// appels des paquets npm
const cheerio = require('cheerio');
const requestPromise = require('request-promise');
const fs = require('fs');
const modules = require('./module_fonctions')
// librairie gestion du temps
const moment = require('moment');
// on déclare les options
const options = {
  // l'adresse du site
  url: "https://www.qz.com",
  // une fonction qui renvoit la page html parsée par cheerio
  transform: function(body) {
    return cheerio.load(body)
  }
}

// date du jour
let date = moment().format('DD_MM_YY');

// la gestion de la requête
requestPromise(options)
  // action : on récupère le résultat de cheerio
  .then(function($) {

    // dans mots je stocke ma page web, les mots séparés
    let mots = separerTexte($, 'h2', ' ').join();
    console.log(mots);
    // dans resultat je stocke le texte nettoyé
    let resultat = modules.nettoyageTexte(mots);
    // j'écris dans un fichier texte
    modules.ecrire_texte(resultat, './corpus/'+ date +'texte.txt');
    //console.log(nettoyageTexte(mots))

  })
  // gestion des erreurs
  .catch(function(error) { console.log(error); })

// fonction qui sépare les mots avec un séparateur
const separerTexte = function(data, tag, sep) {
  // on stocke dans un tableau le texte découpé
  let title = data(tag).text().split(sep);
  // on retourne le resultat
  return title;
}
