    const filmSelect = document.getElementById("film");
    const inputs = document.getElementsByTagName("input")
    const visBilletter = document.getElementById("visBilletter")
    //const billetter = []

    // Håndterer klikk på kjøp knappen
    function kjop() {
    if (!verifiser()) return

    const billett = {film:filmSelect.value, antall: inputs[0].value, fornavn: inputs[1].value, etternavn: inputs[2].value, telefon: inputs[3].value, epost: inputs[4].value }

        $.post("/lagre", billett, function(){
            hentAlle();
        });


        // RESET
        filmSelect.value="";
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
        inputs[3].value = "";
        inputs[4].value = "";
}

    // Sjekker at inputet er gyldig
    function verifiser() {
    let gyldig = true
    for (const element of inputs) {
        const tr = element.parentNode.parentNode
            if (element.value == "") {
                tr.children[2].style.visibility = "visible"
                gyldig = false
            }
        else {
            tr.children[2].style.visibility = "hidden"
        }
    }
        return gyldig
}

    // Fjerner billetter fra visbilett tabellen
    function visKjop(billetter) {
    let i = visBilletter.children.length - 1
    while (visBilletter.children.length > 0) {
        visBilletter.children[i].remove()
    i--
    }

    // Legger til billetter fra billett arrayet
    for (let i = 0; i < billetter.length; i++) {
        const tr = document.createElement("tr")
        //tr.classList.add("table");
        $(tr).addClass('table')
            for (const nokkel in billetter[i]) {
                const td = document.createElement("td")
                td.innerHTML = billetter[i][nokkel]
                tr.appendChild(td)
            }
        visBilletter.appendChild(tr)
    }
}
    // Sletter billetter fra billett-arrayet
    function slett() {
        $.get( "/slettAlle", function() {
            hentAlle();
        });
}

////////////////////////////////////////////////

    function hentAlle() {
        $.get( "/hentAlle", function( billetter ) {
            visKjop(billetter);
            console.log(billetter)
        });
    }




