document.addEventListener("DOMContentLoaded", function () {
    const funfactTitle = document.getElementById("funfact-title");
    const funfactText = document.getElementById("funfact-text");
    const funfactImage = document.querySelector(".funfact-image");
    const nextButton = document.getElementById("next-funfact");
    const funfactContainer = document.querySelector(".funfact-card");

    const funFacts = [
        {
            title: "Los gatos tienen un sistema de comunicación complejo",
            text: "Los gatos son animales muy expresivos, pero su comunicación va más allá de los maullidos. \
            Utilizan una combinación de vocalizaciones, lenguaje corporal y feromonas para comunicarse con otros gatos y con los humanos. \
            Por ejemplo, el ronroneo no solo indica felicidad, sino que también puede ser una señal de estrés o dolor, ya que libera \
            endorfinas que les ayudan a calmarse. Además, los gatos tienen un repertorio de más de 100 sonidos diferentes, mientras que \
            los perros solo emiten alrededor de 10. Los bigotes también juegan un papel crucial en su comunicación, ya que les permiten medir \
            espacios y expresar emociones. Un gato con bigotes relajados está tranquilo, mientras que si los tiene hacia adelante, está alerta o curioso.",
            image: "../img/imagen9.jpg"
        },
        {
            title: "Los gatos pueden rotar sus orejas 180 grados",
            text: "Las orejas de los gatos son una maravilla de la evolución. Tienen 32 músculos en cada oreja, lo que les permite moverlas \
            de forma independiente y girarlas hasta 180 grados. Esta habilidad les ayuda a localizar sonidos con precisión, lo que es esencial para cazar \
            presas en la naturaleza. Además, las orejas de los gatos son tan sensibles que pueden detectar frecuencias de sonido mucho más altas que las \
            que perciben los humanos o los perros. Esto explica por qué reaccionan a sonidos que nosotros no podemos escuchar, como el ultrasonido emitido \
            por pequeños roedores.",
            image: "../img/imagen10.jpg"
        },
        {
            title: "Los gatos tienen una memoria excelente",
            text: "Aunque a veces se cree que los gatos son distantes, en realidad tienen una memoria impresionante. Estudios han demostrado que pueden recordar \
            eventos, personas y lugares durante años. Esto se debe a que su cerebro es más complejo de lo que parece, con una estructura similar a la de los \
            humanos en áreas relacionadas con la memoria y las emociones. Por ejemplo, un gato puede recordar a su dueño después de años de separación o asociar \
            un sonido específico con una experiencia positiva o negativa. Esta memoria también les ayuda a aprender rápidamente, aunque su naturaleza independiente \
            hace que no siempre obedezcan.",
            image: "../img/imagen11.jpg"
        },
    ];

 let currentIndex = 0;

    nextButton.addEventListener("click", function () {
        funfactContainer.classList.add("slide-out-right");

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % funFacts.length;
            funfactTitle.textContent = funFacts[currentIndex].title;
            funfactText.textContent = funFacts[currentIndex].text;
            funfactImage.src = funFacts[currentIndex].image;

            funfactContainer.classList.remove("slide-out-right");
            funfactContainer.classList.add("slide-in-right");

            setTimeout(() => {
                funfactContainer.classList.remove("slide-in-right");
            }, 500);
        }, 500);
    });
});