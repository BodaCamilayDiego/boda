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
    "familia_1": ["Rosa Lilia Sanchez Pinzon","Pastor Antonio Muñoz","David Mauricio Muñoz Sanchez","Karen Nathaly Muñoz Sanchez","Juan Andres Giraldo Muñoz"],
    "familia_2": ["Dora Alicia Sanchez Pinzon","Hugo Molano","Jennifer Paola Molano Sanchez"],
    "familia_3": ["Johana Andrea Molano Sanchez","Samuel Valero Rubio", "Luciana Valero Molano","Samuel Valero Molano","Juliana Valero"],
    "familia_4": ["Angelica Maria Perez Sanchez", "Francisco Javier Perez Rocha"],
    "familia_5": ["Luz Edith Sanchez Pinzon","Nestor Hernan Latorre Latorre"],
    "familia_6": ["Luis Alberto Sanchez Pinzon","Yolanda Sierra Chaparro","Laura Ximena Sanchez Sierra"],
    "familia_7": ["Jenny Marcela Sanchez Sierra","Luis David Contreras Lopez"],
    "familia_8": ["Carlos Enrique Sanchez Pinzon", "Ana Maria Rojas Junca", "Valentina Sanchez Rojas", "Juan Camilo Rodriguez Castro"],
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
    const inputValue = nameInput.value.trim();
    const words = inputValue.split(' ').filter(word => word.length > 0);
    //const query = removeAccents(nameInput.value.toLowerCase().trim()).split(' ');

    if (words.length < 2) {
        mensaje_error.innerHTML = 'Por favor, escribe tu nombre y apellido.';
        mensaje_error.style.display = 'block';
        return;
    }

    const query = removeAccents(inputValue.toLowerCase()).split(' ');

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
                const fullName = button.textContent;
                const firstName = fullName.split(' ')[0]; // Obtener la primera palabra (primer nombre)

                result.innerHTML = `<h4>¡Hola ${firstName}!<br>Estas son las personas con las que puedes asistir a la boda:<br></h4>${database[selectedFamily].join('<br>')}<br><button id="goToInvitation">Ir a la invitación</button>`;
                result.style.display = 'block';
                choices.style.display = 'none';
                mensaje_error.style.display = 'none';
                document.getElementById('goToInvitation').addEventListener('click', () => {
                    window.location.href = 'https://matrimonicamilaydiego.my.canva.site/invitaci-n';
                });
            });
        });
    } else {
        mensaje_error.style.display = 'none';
        error.innerHTML = `Hola ${nameInput.value}, no estás invitado(a) a la boda.`;
        error.style.display = 'block';
    }
});
