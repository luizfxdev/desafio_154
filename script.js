// Array para armazenar os planetas
let planets = [];

// Elementos DOM
const planetNameInput = document.getElementById('planetName');
const planetResourcesInput = document.getElementById('planetResources');
const addPlanetBtn = document.getElementById('addPlanet');
const planetsTable = document.getElementById('planetsTable');
const revealBtn = document.getElementById('revealBtn');
const resetBtn = document.getElementById('resetBtn');
const resultBox = document.getElementById('result');

// Adicionar planeta à tabela
function addPlanet() {
    const name = planetNameInput.value.trim();
    const resources = planetResourcesInput.value
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');

    if (name && resources.length > 0) {
        planets.push({ name, resources });
        updatePlanetsTable();
        clearInputs();
    } else {
        alert('Por favor, insira o nome do planeta e pelo menos um recurso');
    }
}

// Atualizar a tabela de planetas
function updatePlanetsTable() {
    planetsTable.innerHTML = '';

    planets.forEach((planet, index) => {
        const row = document.createElement('div');
        row.className = 'planet-row';
        row.innerHTML = `
            <div class="planet-name">${index + 1} - ${planet.name}</div>
            <div class="planet-resources">${planet.resources.map(r => `"${r}"`).join(', ')}</div>
        `;
        planetsTable.appendChild(row);
    });
}

// Limpar campos de entrada
function clearInputs() {
    planetNameInput.value = '';
    planetResourcesInput.value = '';
    planetNameInput.focus();
}

// Função principal para encontrar o tesouro
function findGalacticTreasure() {
    const required = ['stardust', 'quantum foam', 'dark matter'];

    const treasurePlanet = planets.find(planet =>
        required.every(resource => planet.resources.includes(resource))
    );

    return treasurePlanet
        ? `TESOURO ENCONTRADO EM: ${treasurePlanet.name.toUpperCase()}`
        : 'NENHUM PLANETA CONTÉM TODOS OS RECURSOS NECESSÁRIOS';
}

// Revelar o resultado
function revealResult() {
    if (planets.length === 0) {
        resultBox.textContent = 'Adicione planetas para buscar o tesouro';
        return;
    }

    resultBox.textContent = findGalacticTreasure();
    resultBox.style.animation = 'pulse 1.5s ease-in-out';
}

// Resetar a aplicação
function resetApp() {
    planets = [];
    planetsTable.innerHTML = '';
    resultBox.textContent = '';
    clearInputs();
}

// Event listeners
addPlanetBtn.addEventListener('click', function() {
    addPlanet();
    this.classList.add('clicked');
    setTimeout(() => {
        this.classList.remove('clicked');
    }, 200);
});

revealBtn.addEventListener('click', revealResult);
resetBtn.addEventListener('click', resetApp);

// Adicionar com Enter (atualizado)
planetResourcesInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addPlanet();
        // Efeito de clique no botão +
        document.getElementById('addPlanet').classList.add('clicked');
        setTimeout(() => {
            document.getElementById('addPlanet').classList.remove('clicked');
        }, 200);
    }
});

// Animação de pulsação
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(79, 195, 247, 0.7); }
        70% { transform: scale(1.02); box-shadow: 0 0 10px 5px rgba(79, 195, 247, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(79, 195, 247, 0); }
    }
`;
document.head.appendChild(style);