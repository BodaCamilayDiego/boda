const video = document.getElementById('weddingVideo');
const invitationButton = document.getElementById('invitationButton');
const inputContainer = document.getElementById('inputContainer');
const nameInput = document.getElementById('nameInput');
const searchButton = document.getElementById('searchButton');
const result = document.getElementById('result');
const error = document.getElementById('error');
const mensaje_error = document.getElementById('mensaje_error');
const choices = document.getElementById('choices');

// Function to remove accents from characters
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

video.addEventListener('ended', () => {
    invitationButton.style.display = 'block';
});

invitationButton.addEventListener('click', () => {
    invitationButton.style.display = 'none';
    inputContainer.style.display = 'block';
});

// Fake database
const database = {
    "familia_1": ["Diego Fernando Chavarro Sanchez", "Maria Camila De La Espriella Amaranto"],
    "familia_2": ["Martha Lenis Sanchez Pinzon", "Raul Fernando Chavarro Mahecha"],
    "familia_3": ["Delcin Cecilia Amaranto Ahumada", "Luna del Mar"],
    "familia_4": ["Johana Andrea Molano Sanchez","Samuel Valero", "Luciana Valero Molano","Samuel Valero Molano"],
    "familia_5": ["Nevys Amaranto Ahumada","Stefanny Novoa Amaranto"],
    "familia_6": ["Matty Norris","Roony Norris"],
    "familia_7": ["Paula Andrea Aldana Chavarro","Victoria Aldana Chavarro"],
    "familia_8": ["David Mauricio Muñoz Sanchez","Pastor Antonio Muñoz","Rosa Lilia Sanchez Pinzon","Karen Nathaly Muñoz Sanchez","Juan Andres Giraldo Muñoz"],
    "familia_9": [],
    "familia_10": [],
    "familia_11": [],
    "familia_12": [],
    "familia_13": [],
    "familia_14": [],
    "familia_15": [],
    "familia_16": []
    // Add more families as needed
};

searchButton.addEventListener('click', () => {
    const query = removeAccents(nameInput.value.toLowerCase().trim()).split(' ');

    if (!query.length) {
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
        const members = database[family];
        const matches = members.filter(name => {
            const lowerCaseName = removeAccents(name.toLowerCase());
            return query.every(part => lowerCaseName.includes(part));
        });

        if (matches.length > 0) {
            multipleMatches.push(...matches.map(name => {
                return { family, name }; // Store original case name
            }));
        }
    }

    if (multipleMatches.length > 0) {
        choices.innerHTML = multipleMatches.map(match => `<button class="choices-button">${removeAccents(match.name)}</button>`).join('<br>');
        choices.style.display = 'block';
        document.querySelectorAll('.choices-button').forEach(button => {
            button.addEventListener('click', () => {
                const selectedFamily = multipleMatches.find(match => removeAccents(match.name) === button.textContent).family;
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
        error.innerHTML = `Hola ${nameInput.value}, no estás invitado a la boda.`;
        error.style.display = 'block';
    }
});
