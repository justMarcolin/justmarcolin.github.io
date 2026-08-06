// Lista delle parole che verranno scritte e cancellate (supporta aggiornamento lingua)
let words = ["uno studente.", "curioso.", "appassionato di informatica."];

window.updateTypingWords = function(newWords) {
    if (Array.isArray(newWords) && newWords.length > 0) {
        words = newWords;
        wordIndex = 0;
        charIndex = 0;
        isDeleting = false;
    }
};

// Selezioniamo l'elemento HTML dove inserire il testo digitato
const typingElement = document.querySelector(".typing");

// Indice della parola corrente (parte da 0, quindi "uno studente")
let wordIndex = 0;

// Indice della lettera corrente della parola
let charIndex = 0;

// Flag che indica se il testo sta venendo cancellato
let isDeleting = false;

// Velocità di digitazione (in millisecondi)
let speed = 100;

function typeEffect() {

    // Prendiamo la parola attuale da scrivere/cancellare
    const currentWord = words[wordIndex];

    // Se stiamo cancellando:
    if (isDeleting) {
        // Mostra la parola fino a "charIndex", poi diminuisce
        typingElement.textContent = currentWord.substring(0, charIndex--);
        speed = 60; // cancellazione più veloce
    } 
    // Se stiamo scrivendo:
    else {
        // Aggiunge una lettera alla volta
        typingElement.textContent = currentWord.substring(0, charIndex++);
        speed = 100; // velocità di scrittura
    }

    // Se abbiamo finito di scrivere tutta la parola
    if (!isDeleting && charIndex === currentWord.length + 1) {
        isDeleting = true; // ora si inizia a cancellare
        speed = 1000; // piccola pausa prima di cancellare
    }

    // Se abbiamo cancellato tutta la parola
    if (isDeleting && charIndex === 0) {
        isDeleting = false; // ricominciamo a scrivere
        wordIndex = (wordIndex + 1) % words.length; // passiamo alla prossima parola
        speed = 300; // pausa prima di ricominciare a scrivere
    }

    // Richiama la funzione dopo "speed" millisecondi
    setTimeout(typeEffect, speed);
}

// Avvia l'effetto
typeEffect();
