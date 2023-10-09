// Fonction pour ajouter la date et l'heure à un message
function addDateTime(message) {
    // Obtenir la date et l'heure actuelles
    var now = new Date();
    
    // Convertir en format de date et d'heure français
    var dateTime = now.toLocaleString('fr-FR');
    
    // Concaténer la date, l'heure et le message
    var fullMessage = dateTime + " : " + message;
    
    return fullMessage;
}

// Appeler la fonction addDateTime au chargement de la page
window.onload = function() {
    // Définir le message
    var message = "C'est le meilleur moment pour consulter ce site web !";
    
    // Obtenir le message complet avec la date et l'heure
    var fullMessage = addDateTime(message);
    
    // Afficher le pop-up
    alert(fullMessage);
    
    // Afficher le message dans la console
    console.log(fullMessage);
};
