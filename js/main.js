$(function () {
    "use strict";

    function przetasujTablice(tablica) {
        var i = 0,
            j = 0,
            temp = null;
        for (i = tablica.length; i > 0; i--) {
            j = Math.floor(Math.random() * i);
            temp = tablica[i - 1];
            tablica[i - 1] = tablica[j];
            tablica[j] = temp;
        }
    }
    var karty = ["geralt.png", "ciri.png", "iorweth.png", "iorweth.png", "jaskier.png", "yen.png", "yen.png", "triss.png", "geralt.png", "ciri.png", "triss.png", "jaskier.png"];

    przetasujTablice(karty);

    var plansza = "",
        i, j, k,
        rewersGwint = "url(img/karta.png)";
    for (i = 0; i < karty.length; i++) {

        plansza += "<div class='karty' id='" + i + "'></div>";
    }
    $("article").html(plansza);

    $(".karty").on("click", function (e) {
        odkryjKarte(e);
    })

    var zablokowane = false,
        jednaWidoczna = false,
        aktualnieWidoczna,
        licznik = "0",
        zostaloPar = (karty.length) / 2;

    function odkryjKarte(e) {

        var przezroczystosc = $("#" + e.target.id).css("opacity")

        var aktualnieKlikniety = $("#" + e.target.id).css("cursor");

        console.log(aktualnieKlikniety);

        if (przezroczystosc != 0 && zablokowane == false && aktualnieKlikniety == "pointer") {

            zablokowane = true;

            var obraz = "url(img/" + karty[e.target.id] + ")";
            $("#" + e.target.id).css("background-image", obraz).addClass("kartyA").removeClass("karty");
            console.log(obraz);

            if (jednaWidoczna == false) {
                //pierwsza karta
                jednaWidoczna = true;
                aktualnieWidoczna = e.target.id;
                zablokowane = false;

            } else {
                //druga karta
                if (karty[aktualnieWidoczna] == karty[e.target.id]) {
                    //trafione
                    setTimeout(function () {
                        usunKarty(aktualnieWidoczna, e.target.id)
                    }, 750);
                } else {
                    //pudło
                    setTimeout(function () {
                        schowajKarty(aktualnieWidoczna, e.target.id)
                    }, 1000);
                }
                jednaWidoczna = false;
                licznik++;
                $(".licznik").html("<p> Liczba rund: " + licznik + "</p>");
            }

        }
    }

    function schowajKarty(nr1, nr2) {
        console.log(nr1);
        console.log(nr2);
        $("#" + nr1).css("background-image", rewersGwint).addClass("karty").removeClass("kartyA");
        $("#" + nr2).css("background-image", rewersGwint).addClass("karty").removeClass("kartyA");
        zablokowane = false;

    }

    function usunKarty(nr1, nr2) {

        $("#" + nr2).css("opacity", "0");
        $("#" + nr1).css("opacity", "0");
        zostaloPar--;

        if (zostaloPar == 0) {
            $("article").html("<p>Brawo Znalazłeś wszystkie pary</p> <a href='index.html'><h2 class='odNowa'>Zagraj Ponownie</h2></a>");
        }
        zablokowane = false;
    }
});
