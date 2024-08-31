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
    "familia_2": ["Dora Alicia Sanchez Pinzon","Hugo Molano Rodriguez","Jennifer Paola Molano Sanchez"],
    "familia_3": ["Johana Andrea Molano Sanchez","Samuel Valero Rubio", "Luciana Valero Molano","Samuel Valero Molano", "Zara Juliana Valero Acosta"],
    "familia_4": ["Angelica Maria Perez Sanchez", "Francisco Javier Perez Rocha"],
    "familia_5": ["Luz Edith Sanchez Pinzon","Nestor Hernan Latorre Latorre"],
    "familia_6": ["Luis Alberto Sanchez Pinzon","Yolanda Sierra Chaparro","Laura Ximena Sanchez Sierra"],
    "familia_7": ["Jenny Marcela Sanchez Sierra","Luis David Contreras Lopez"],
    "familia_8": ["Carlos Enrique Sanchez Pinzon", "Ana Maria Rojas Junca", "Valentina Sanchez Rojas", "Juan Camilo Rodriguez Castro"],
    "familia_9": ["Jorge William Sanchez Pinzon","Blanca Ines Pinzon de Sanchez"],
    "familia_10": ["Carlos Alberto Gomez Sanchez","Cristina Paola Mora Alvarado","Milena Gomez Mora"],
    "familia_11": ["Martha Lenis Sanchez Pinzon","Raul Fernando Chavarro Mahecha"],
    "familia_12": ["Martha Norris","Ronny Norris","Paula Andrea Aldana Chavarro","Victoria Aldana"],
    "familia_13": ["Victor Alfredo Chavarro Mahecha","Monica Carranza","Laura Milena Chavarro Carranza","Samuel Chavarro Carranza"],
    "familia_14": ["Jorge Alberto Chavarro Mahecha","Marta Cecilia Ramirez Fierro","Daniel Felipe Chavarro Ramirez"],
    "familia_15": ["Mario Alvarez Chavarro","Giovanna Alexandra Correa Bernal","Constanza Bernal","Francisco Alvarez Correa"],
    "familia_16": ["Oscar Raul Chavarro Rodriguez","+1 Acompañante"],
    "familia_17": ["Felix Rodrigo Chavarro Brijando", "Diana Marcela Naranjo Carranza"],
    "familia_18": ["Delcin Cecilia Amaranto Ahumada", "Luna del Mar"],
    "familia_19": ["Osvaldo De La Rosa"],
    "familia_20": ["Juan Sebastian De La Rosa Amaranto","Daniela Quiñones"],
    "familia_21": ["Milton Jose De La Rosa Amaranto","Ana Milena Pardo Leal"],
    "familia_22": ["Tatiana De La Rosa Amaranto","Adriana de los Santos Martín"],
    "familia_23": ["Natalia Diaz Montoya","Andres Felipe Wilches"],
    "familia_24": ["Yulvis Esther Castro Amaranto","Yeison Alfonso Fajardo "],
    "familia_25": ["Nevys Judith Amaranto Ahumada","Stefanny Paola Novoa Amaranto"],
    "familia_26": ["Arelys Ariza Amaranto","Brayan Castro Ariza","Luis Jose Ariza Amaranto"],
    "familia_27": ["Duvan Efren Sarmiento Sachica","Leidy Johanna Vergara Giraldo"],
    "familia_28": ["Jhoan Sebastian Bustos Heredia","Mayerly Tatiana Bautista"],
    "familia_29": ["Cristian Camilo Vela Merchan","Maria Alejandra Guzman Cruz"],
    "familia_30": ["Sebastian Camilo Riaño Palacios"],
    "familia_31": ["David Felipe Gomez Rodriguez"],
    "familia_32": ["Bernie Echeverria"],
    "familia_33": ["Angela Maria Escobar Leon", "Esposo"],
    "familia_34": ["Claudia Marcela Forero Gonzalez"],
    "familia_35": ["Camilo Andrés Garcia Rico","Karen Valeria Lopez Sierra"],
    "familia_36": ["Paula Andrea Tovar Zorro","Eduardo Gonzalez Santos"],
    "familia_37": ["Juliana Velasquez Noreña"],
    "familia_38": ["Maria Fernanda Torres Almonacid"],
    "familia_39": ["Ana Maria Rosero Wilches"],
    "familia_40": ["Laura Daniela Ramirez Ruiz","Jeferson Andrés Pinilla Tellez"],
    "familia_41": ["Lizbeth Johana Paez Gonzalez","Daniel Alejandro Gomez Penagos"],
    "familia_42": ["Diana Marcela Bejarano Gonzalez"],
    "familia_43": ["Nicolas Mauricio Montejo Perez","Karin Andrea Romero Ruiz"],
    "familia_44": ["Nicolás Alfredo Solaque Aguilar"],
    "familia_45": ["Laura Daniela Caceres Rave"],
    "familia_46": ["Angélica María Restrepo Gonzalez", "e hijo"],
    "familia_47": ["Martiza Ahumada"],
    "familia_48": ["Blanca Liliana Diaz Rodriguez", "e hijo"],
    "familia_49": ["Duby De La Torre", "Jacob Fer"],
    "familia_50": ["Magalys Ahumada", "Camila Andrea Almario"],
    "familia_51": ["Maria Camila De La Espriella Amaranto", "Diego Fernando Chavarro Sanchez"],
    "familia_52": ["Digna Margarita Rodriguez Ahumada","Marcos Pertuz"],
    "familia_53": ["Maritza Ahumada"],
    "familia_54": ["Natalia Diaz Montoya", "Andres Felipe Wilches"],
    "familia_55": ["Alvaro Cuentas Ahumada","Vivian Fontalbo","Juan David Cuentas Fontalbo","Jesus David Cuentas Fontalbo"],
    "familia_55": ["Donaldo Cuentas Ahumada"],
    "familia_56": ["Gloria Maria Avila"]
};

const instruction = document.getElementById('instruction');

searchButton.addEventListener('click', () => {
    const inputValue = nameInput.value.trim();
    const words = inputValue.split(' ').filter(word => word.length > 0);

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
                return { family, name };
            }));
        }
    }

    if (multipleMatches.length > 0) {
        instruction.style.display = 'block';  // Mostrar la instrucción
        choices.innerHTML = multipleMatches.map(match => `<button class="choices-button">${removeAccents(match.name)}</button>`).join('<br>');
        choices.style.display = 'block';
        document.querySelectorAll('.choices-button').forEach(button => {
            button.addEventListener('click', () => {
                instruction.style.display = 'none';
                const selectedFamily = multipleMatches.find(match => removeAccents(match.name) === button.textContent).family;
                const fullName = button.textContent;
                const firstName = fullName.split(' ')[0];

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
