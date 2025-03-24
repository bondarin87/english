document.addEventListener("DOMContentLoaded", function() {
   const words = [
        { en: "Server", es: "Servidor" },
        { en: "Database", es: "Base de datos" },
        { en: "Frontend", es: "Interfaz de usuario" },
        { en: "Backend", es: "Lógica del servidor" },
        { en: "Bug", es: "Error de software" },
        { en: "Cloud", es: "Nube" },
        { en: "Deploy", es: "Desplegar" },
        { en: "Cache", es: "Caché" },
        { en: "Algorithm", es: "Algoritmo" },
        { en: "Encryption", es: "Cifrado" },
        { en: "Allows", es: "Permite" },
        { en: "Within", es: "dentro" },
        { en: "Let's you do", es: "Te permite hacer" },
        { en: "Sample", es: "Muestra" },
        { en: "Getting started", es: "Empezando" },
        { en: "Some", es: "Alguna" },
        { en: "Deploying", es: "Implementar" },
        { en: "Beyond", es: "Mas alla de" },
        { en: "Below", es: "Abajo" },
        { en: "Provides", es: "Proporciona" },
        { en: "Powering it on", es: "Encendiendolo" },
        { en: "Powering it off", es: "Apagandolo" },
        { en: "Such as", es: "Como" },
        { en: "Way", es: "Forma, Manera" },
        { en: "Same", es: "Misma" },
        { en: "Knowledge", es: "Conocimiento" },
        { en: "Were entered", es: "Se introdujeron" },
        { en: "Durling the early portion", es: "Durante la primera parte" },
        { en: "Tasks", es: "Tareas" },
        { en: "Solve", es: "Resolver" },
        { en: "Wiring closed", es: "Armario de cableado" },
        { en: "Backup router", es: "Enrutador de respaldo" },
        { en: "Overall objetives", es: "Objetivos generales" },
         { en: "Don't forget to submit", es: "No olvides enviar" },
         { en: "Which", es: "Cual" },
         { en: "Throughout", es: "Durante" },
         { en: "Hint", es: "Pista" },
         { en: "Stuck", es: "Atascado" },
         { en: "Available", es: "Disponible" },
    ];

    let currentIndex = 0;
    const card = document.getElementById("card");
    const frontText = document.getElementById("front-text");
    const backText = document.getElementById("back-text");

    function loadCard(index) {
        frontText.textContent = words[index].en;
        backText.textContent = words[index].es;
    }

    loadCard(currentIndex);

    card.addEventListener("click", () => {
        card.classList.toggle("flip");
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % words.length;
        card.classList.remove("flip");
        setTimeout(() => loadCard(currentIndex), 200);
    });

    document.getElementById("prev-btn").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + words.length) % words.length;
        card.classList.remove("flip");
        setTimeout(() => loadCard(currentIndex), 200);
    });

    // ---- QUIZ GAME ----
    let gameWords = [];
    document.getElementById("start-game-btn").addEventListener("click", startGame);
    document.getElementById("exit-game-btn").addEventListener("click", exitGame);

    function startGame() {
        document.getElementById("vocab-section").style.display = "none";
        document.getElementById("game-section").style.display = "block";
        gameWords = [...words].sort(() => Math.random() - 0.5); // Mezclar palabras
        loadQuestion(); // ✅ Asegurarse de llamar correctamente la función
    }

    function exitGame() {
        document.getElementById("vocab-section").style.display = "block";
        document.getElementById("game-section").style.display = "none";
        document.getElementById("game-title").textContent = "Guess the Translation";
    }

    function loadQuestion() {
        if (gameWords.length === 0) {
            document.getElementById("game-title").textContent = "🎉 You Win! Congratulations!";
            setTimeout(exitGame, 2000);
            return;
        }

        const randomWord = gameWords.pop();
        document.getElementById("question").textContent = `What is "${randomWord.en}" in Spanish?`;

        const options = document.getElementById("options-container");
        options.innerHTML = "";

        let answers = [randomWord.es];
        while (answers.length < 4) {
            let randomWrong = words[Math.floor(Math.random() * words.length)].es;
            if (!answers.includes(randomWrong)) {
                answers.push(randomWrong);
            }
        }

        answers.sort(() => Math.random() - 0.5);

        answers.forEach(answer => {
            let btn = document.createElement("button");
            btn.textContent = answer;
            btn.onclick = () => {
                if (answer === randomWord.es) {
                    loadQuestion();
                } else {
                    document.getElementById("game-title").textContent = "❌ Game Over! You Lose!";
                    setTimeout(exitGame, 2000);
                }
            };
            options.appendChild(btn);
        });
    }
});
