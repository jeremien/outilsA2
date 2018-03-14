const fs = require('fs');


/*-------------------------
fonction pour écrire dans un fichier texte
---------------------------*/
exports.ecrire_texte = function(phrase, fichier) {

  // on enleve l'espace dans l'occurence
  fichier = fichier.replace(/\s/g, '-');
  // création du flux
  fichier = fs.createWriteStream(fichier, {
    flags: 'a'
  });
  // écriture du fichier
  fichier.write(phrase) ;
}

// fonction pour nettoyer le texte
exports.nettoyageTexte = function (texte) {

  // passer les chaînes de caractères en minuscule
  texte = texte.toLowerCase();
  // chercher et effacer la ponctuation avec les regex
  //texte = texte.replace(//g,' ');

  texte = texte.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"”“'?]/g,' ');
  // on retourne la chaine de caractère modifiée
  return texte;
}
