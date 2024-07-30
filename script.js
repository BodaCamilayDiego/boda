const video = document.getElementById('weddingVideo');
const invitationButton = document.getElementById('invitationButton');
const inputContainer = document.getElementById('inputContainer');
const nameInput = document.getElementById('nameInput');
const searchButton = document.getElementById('searchButton');
const result = document.getElementById('result');
const error = document.getElementById('error');
const mensaje_error = document.getElementById('mensaje_error');
const choices = document.getElementById('choices');

video.addEventListener('ended', () => {
    invitationButton.style.display = 'block';
});

invitationButton.addEventListener('click', () => {
    invitationButton.style.display = 'none';
    inputContainer.style.display = 'block';
});

// Fake database
const database = {
    "familia_1": ["Ana Ana suarez", "Juan Gomez", "Maria Gomez", "Pedro Gomez"],
    "familia_2": ["Ana Ana Lopez", "Carlos Lopez", "Luis Lopez"],
    "familia_3": ["Ana Ana Lopez mendez", "Carlos gomez", "Luis Lopez"]
    // Add more families as needed
};

searchButton.addEventListener('click', () => {
    const query = nameInput.value.toLowerCase().trim();

    if (!query) {
        mensaje_error.innerHTML = 'Por favor, escribe tu nombre.';
        mensaje_error.style.display = 'block';
        return;
    }

    inputContainer.style.display = 'none';
    result.style.display = 'none';
    error.style.display = 'none';
    choices.style.display = 'none';
    mensaje_error.style.display = 'none';
    
    let found = false;
    let multipleMatches = [];

    for (const family in database) {
        const members = database[family].map(name => name.toLowerCase());
        const matches = members.filter(name => name.includes(query));

        if (matches.length > 0) {
            multipleMatches.push(...matches.map(name => {
                return { family, name };
            }));
        }
    }

    if (multipleMatches.length > 0) {
        choices.innerHTML = multipleMatches.map(match => `<button class="choices-button">${match.name}</button>`).join('<br>');
        choices.style.display = 'block';
        document.querySelectorAll('.choices-button').forEach(button => {
            button.addEventListener('click', () => {
                const selectedFamily = multipleMatches.find(match => match.name === button.textContent).family;
                result.innerHTML = `<h4>¡Hola ${button.textContent}!<br>Estas son las personas con las que puedes asistir a la boda:<br></h4>${database[selectedFamily].join('<br>')}<br><button id="goToInvitation">Ir a la invitación</button>`;
                result.style.display = 'block';
                choices.style.display = 'none';
                mensaje_error.style.display = 'none';
                document.getElementById('goToInvitation').addEventListener('click', () => {
                    window.location.href = 'https://www.youtube.com/watch?v=673QN0h9jPQ';
                });
            });
        });
    } else {
        mensaje_error.style.display = 'none';
        error.innerHTML = `Hola ${nameInput.value}, no estás dentro de los invitados a la boda`;
        error.style.display = 'block';
    }
});
