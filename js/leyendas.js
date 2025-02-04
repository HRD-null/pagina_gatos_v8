document.addEventListener("DOMContentLoaded", function () {
    const leyendasTitle = document.getElementById("leyendas-title");
    const leyendasText = document.getElementById("leyendas-text");
    const leyendasImage = document.querySelector(".leyendas-image");
    const nextButton = document.getElementById("next-leyenda");
    const leyendaSection = document.getElementById("leyendas-section");

    const leyendas = [
        {
            title: "El gato y la diosa Freya en la mitología nórdica",
            text: "En la mitología nórdica, la diosa Freya, asociada con el amor, la belleza y la fertilidad, tenía un carruaje tirado por dos grandes gatos grises. \
            Estos gatos, regalos del dios Thor, eran símbolos de su poder y elegancia. Se creía que los gatos domésticos estaban bajo la protección de Freya, y que \
            maltratarlos podía despertar su ira. Los granjeros nórdicos dejaban ofrendas de leche para los gatos, creyendo que esto aseguraría una buena cosecha y la \
            bendición de la diosa. Esta leyenda muestra cómo los gatos eran vistos como criaturas mágicas y protectoras en la cultura nórdica.",
            image: "../img/imagen15.jpg"
        },
        {
            title: "El gato Bakeneko y Nekomata en el folclore japonés",
            text: "En Japón, existen leyendas sobre gatos sobrenaturales llamados Bakeneko y Nekomata. Se creía que los gatos que vivían muchos años o eran tratados mal \
            podían transformarse en estas criaturas. Los Bakeneko tenían la habilidad de caminar sobre dos patas, hablar como humanos y manipular a los muertos. Los Nekomata, \
            por su parte, eran más peligrosos, con colas bifurcadas y poderes para controlar fuegos fatuos. Una leyenda cuenta que un Nekomata se disfrazó como una mujer \
            para vengarse de una aldea que había maltratado a los gatos. Estas historias reflejan el respeto y el temor que los gatos inspiraban en el folclore japonés.",
            image: "../img/imagen16.jpg"
        },
        {
            title: "El gato y el diluvio universal en la mitología maya",
            text: "En la mitología maya, se cuenta que los dioses decidieron destruir el mundo con un gran diluvio. Sin embargo, un gato llamado Chom fue elegido para salvar \
            a los humanos. Chom, con su astucia y agilidad, ayudó a una pareja a construir una barca y les enseñó a sobrevivir. Después del diluvio, Chom fue recompensado con \
            la habilidad de ver en la oscuridad y un lugar especial en el cielo como una constelación. Esta leyenda muestra al gato como un salvador y un ser sabio en la \
            cultura maya.",
            image: "../img/imagen17.jpg"
        }
    ];

    let currentIndex = 0;

    nextButton.addEventListener("click", function () {
        leyendaSection.classList.add("slide-out");

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % leyendas.length;
            leyendasTitle.textContent = leyendas[currentIndex].title;
            leyendasText.textContent = leyendas[currentIndex].text;
            leyendasImage.src = leyendas[currentIndex].image;

            leyendaSection.classList.remove("slide-out");
            leyendaSection.classList.add("slide-in");

            // Simula el desplazamiento automático
            window.scrollBy({ top: 700, behavior: "smooth" });

            setTimeout(() => {
                leyendaSection.classList.remove("slide-in");
            }, 500);
        }, 500);
    });
});