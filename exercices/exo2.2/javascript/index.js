var counter = 0;

        function incrementCounter() {
            counter++;
            document.getElementById('counter').innerHTML = counter;

            if (counter >= 5 && counter <= 9) {
                document.getElementById('message').innerHTML = "Bravo, bel échauffement !";
            } else if (counter >= 10) {
                document.getElementById('message').innerHTML = "Vous êtes passé maître en l'art du clic !";
            }
        }