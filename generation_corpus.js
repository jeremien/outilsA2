// file system > pour gérer les fonctionnalités des fichiers et dossiers
const fs = require('fs');
// gestion des chemins dans le systèmes
const path = require('path');
// pour combiner des flux de données
const combined = require('combined-stream');

// on stocke le nom et le chemin du dossier
const directory = path.join(__dirname,'corpus');
const bddDirectory = path.join(__dirname, 'bdd');

// on appelle une méthode de fs pour lire le dossier et on lui passe le chemin de /corpus
fs.readdir(directory, function(error, files){
  // gestion des erreurs
  if (error) throw error;

  // créer le flux
  let flux = combined.create();

  // on va boucler dans le tableau qui liste les noms des fichiers
  files.forEach(function(file) {
    // flux.append(fs.createReadStream(directory + '/' + file));
    flux.append(fs.createReadStream(`${directory}/${file}`));
  });

  // création du fichier texte avec le flux
  flux.pipe(fs.createWriteStream(bddDirectory+'/corpus.txt'));
  // flux.pipe(fs.createWriteStream(`${bddDirectory}/corpus.txt`));

});
