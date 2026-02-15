const startBtn = document.getElementById('start-btn');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const cardsContainer = document.getElementById('cards-container');

let currentQuestion = 0;
let questions = [];
const directions = {
    "Медицина и здоровье: фармацевт, стоматолог, медсестра/медбрат": 0,
    "Информационные технологии: IT - разработчик, системный администратор, кибербезопасность": 0,
    "Гуманитарные и креативные направления: журналистика, актерское мастерство, сценарное мастерство": 0,
    "Гуманитарные науки и социальные профессии: педагогика и образование, международные отношения, психология": 0,
    "Экономика и управление: менеджмент, банковское дело, маркетинг": 0,
    "Специалисты по стабильным процессам: управление качеством, логистика, государственное и муниципальное управление": 0,
    "Специалисты для стрессовых задач: МЧС, военное дело, МВД": 0
};

// Университеты
const universitiesByDirection = {
    "Медицина и здоровье: фармацевт, стоматолог, медсестра/медбрат":[
        {img:"img/kgma.jpeg", name:"КГМА", desc:"Краткое описание", price:"1000-1200$", address:"ул.Ахуебаева 92"},
        {img:"img/IUSM2.jpg", name:"Международный университет медицины", desc:"Краткое описание", price:"3000-3500$", address:"ул. Максима горького 1"},
        {img:"img/photo3.jpg", name:"IMU", desc:"Краткое описание", price:"3000-4500$", address:"ул. Интергельпо 1ф"}
    ],
    "Информационные технологии: IT - разработчик, системный администратор, кибербезопасность":[
        {img:"img/politeh4.jpg", name:"КГТУ", desc:"Краткое описание", price:"680-700$", address:"ул. Чынгыза Айтматова 66"},
        {img:"img/MUK5.jpg", name:"МУК", desc:"Краткое описание", price:"800-900$", address:"ул. Льва Толстого 17 А/1"},
        {img:"img/BIT6.jpg", name:"БТИ", desc:"Краткое описание", price:"1200-1300$", address:"ул. Льва Толстого 17 А/1"}
    ],
    "Гуманитарные и креативные направления: журналистика, актерское мастерство, сценарное мастерство":[
        {img:"img/UNIK7.jpg", name:"БГУ", desc:"Краткое описание", price:"600-630$", address:"ул. Жунусалиева 27"},
        {img:"img/KGUSTA8.jpg", name:"КГУСТА", desc:"Краткое описание", price:"800-850$", address:"ул. Малдыбаева 34б"},
        {img:"img/UNI9.jpg", name:"КНУ", desc:"Краткое описание", price:"850$", address:"ул. Фрунзе 54/7"}
    ],
    "Гуманитарные науки и социальные профессии: педагогика и образование, международные отношения, психология":[
        {img:"img/UNI9.jpg", name:"КНУ", desc:"Краткое описание", price:"850$", address:"ул. Фрунзе 54/7"},
        {img:"img/uni3.jpg", name:"КРСУ", desc:"Краткое описание", price:"1100$", address:"ул. Киевская 44"},
        {img:"img/AUCA.jpg", name:"AUCA", desc:"Краткое описание", price:"6500-7500", address:"ул. Алая токомбаева 7/6"}
    ],
    "Экономика и управление: менеджмент, банковское дело, маркетинг":[
        {img:"img/ECO.jpg", name:"КЭУ", desc:"Краткое описание", price:"850$", address:"ул. Тоголок Молдо 58"},
        {img:"img/arabaev.jpg", name:"Институт Экономики и менеджмента", desc:"Краткое описание", price:"750-850$", address:"ул. Логвиненко 39"},
        {img:"img/adam.jpg", name:"Adam University", desc:"Краткое описание", price:"6500-7500$", address:"ул. Молодая гвардия 55"}
    ],
    "Специалисты по стабильным процессам: управление качеством, логистика, государственное и муниципальное управление":[
        {img:"img/UNI9.jpg", name:"КНУ", desc:"Краткое описание", price:"600-630$", address:"ул. Жунусалиева 27"},
        {img:"img/MUK5.jpg", name:"МУК", desc:"Краткое описание", price:"800-900$", address:"ул. Льва Толстого 17 А/1"},
        {img:"img/adam.jpg", name:"Adam University", desc:"Краткое описание", price:"680-850$", address:"ул. Молодая гвардия 55"}
    ],
    "Специалисты для стрессовых задач: МЧС, военное дело, МВД":[
        {img:"img/WAR.jpg", name:"БВВУ", desc:"Краткое описание", price:"Спонсируется государством", address:"ул. Патриса Лумумбы 82/2"},
        {img:"img/МЧС.jpg", name:"Учебно-исследовательский центр при МЧС", desc:"Краткое описание", price:"Спонсируется государством", address:"ул. Кулатова 11"},
        {img:"img/МВД.jpg", name:"Академия МВД", desc:"Подготовка специалистов для органов внутренних дел", price:"Спонсируется государством", address:"ул. Чокана Валиханова, 1А"}
    ]
};

const collegesByDirection = {
    "Медицина и здоровье: фармацевт, стоматолог, медсестра/медбрат":[
        {img:"img/bkmcol.jpg", name:"Бишкекский медицинский колледж (БМК) им. А. Молдогазиева", price:"215 - 400$", address:"ул. Логвиненко, 18"},
        {img:"img/isitocol.jpg", name:"Медицинский колледж при ИСИТО", price:"450-630$", address:"Бишкек"},
        {img:"img/kgmacol.jpg", name:"Медицинское училище (колледж) при КГМА им. И.К. Ахунбаева", price:"750 - 1 200$", address:"Бишкек"}
    ],

    "Информационные технологии: IT - разработчик, системный администратор, кибербезопасность":[
        {img:"img/bgpcol.jpg", name:"БГК (Бишкекский гуманитарно-правовой колледж)", price:"350 – $450$", address:"ул. Гвардейская, 1/3"},
        {img:"img/itmuitcol.jpg", name:"Колледж ИТ-Академии (на базе МУИТ / КГТУ)", price:"650 – $900", address:"ул. Ахунбаева, 80 "},
        {img:"img/AUCA.jpg", name:"Колледж инновационных технологий при АУЦА (ITC)", price:"1 500 – $2 200", address:"ул. Аалы Токомбаева, 7/6"}
    ],

    "Гуманитарные и креативные направления: журналистика, актерское мастерство, сценарное мастерство":[
        {img:"img/bmpcol.jpg", name:"Бишкекское музыкально-педагогическое училище (БМПУ)", price:"300 – $400", address:" ул. Медерова, 161"},
        {img:"img/krmu.jpeg", name:"Колледж КРМУ (Кыргызско-Российский Международный Университет)", price:"500 – 700$", address:"ул. Московская, 53"},
        {img:"img/kgiicol.jpg", name:"Колледж при КГИИ им. Б. Бейшеналиевой (Институт Искусств)", price:"800 – 1 100$", address:"ул. Джантошева, 113"}
    ],

    "Гуманитарные науки и социальные профессии: педагогика и образование, международные отношения, психология":[
        {img:"img/bgpcol.jpg", name:"Бишкекский гуманитарно-правовой колледж (БГПК)", price:"350 – 450$", address:"ул. Гвардейская, 1/3"},
        {img:"img/keukrsucol.jpg", name:"Колледж инноваций и экономики (при КЭУ / КРСУ)", price:"600 – 850$", address:"ул. Тоголок Молдо, 58 "},
        {img:"img/alatoo.jpg", name:"Колледж при Международном университете «Ала-Тоо» (IT&B)", price:"1 200 – 1 800$", address:"ул. Анкара, 1/8  "}
    ],

    "Экономика и управление: менеджмент, банковское дело, маркетинг":[
        {img:"img/иауесщд.jpg", name:"Бишкекский финансово-экономический техникум (БФЭТ) им. А. Токтоналиева", price:"350 – 480$", address:"ул. Тоголок Молдо, 54"},
        {img:"img/keukrsucol.jpg", name:"Колледж экономики и сервиса при КЭУ (Кыргызский экономический университет)", price:"600 – 800$", address:"ул. Тоголок Молдо, 58"},
        {img:"img/mUkcol.jpg", name:"Гуманитарно-технический колледж при МУК (Международный университет Кыргызстана)", price:"900 – 1 300 $", address:"ул. Льва Толстого, 17а/1 "}
    ],

    "Специалисты по стабильным процессам: управление качеством, логистика, государственное и муниципальное управление":[
        {img:"img/bkams.jpg", name:"Бишкекский колледж архитектуры и менеджмента в строительстве (БКАМС)", price:"3350 – 450$", address:" ул. Льва Толстого, 62 "},
        {img:"img/politehcol.jpg", name:"Колледж КГТУ им. И. Раззакова (Политех)", price:"650 – 850$", address:"пр. Чингиза Айтматова, 66"},
        {img:"img/aupkr.jpg", name:"Колледж Академии управления при Президенте КР (АУПКР)", price:"1 000 – 1 400$", address:"ул. Панфилова, 237 "}
    ],

    "Специалисты для стрессовых задач: МЧС, военное дело, МВД":[
        {img:"img/btkcol.webp", name:"Бишкекский технический колледж (БТК)", price:"400 – 650$", address:"пр. Чуй, 215"},
        {img:"img/knvlcol.jpg", name:"Кыргызский национальный военный лицей (КНВЛ) им. Д. Асанова", price:"Гос. обеспечение", address:"ул. Пржевальского, 4"}
    ]
};



// ===== СТАРТ ТЕСТА =====
startBtn.addEventListener('click', async () => {
    if (questions.length === 0) {
        try {
            const response = await fetch('jsons/questions.json');
            questions = await response.json();
        } catch (error) {
            alert('Ошибка загрузки вопросов');
            console.error(error);
            return;
        }
    }
    document.querySelector('.hero').classList.add('hidden');
    quizSection.classList.remove('hidden');
    showQuestion();
});

const educationSection = document.getElementById('education-section');

function showEducationChoice(){
    quizSection.classList.add('hidden');
    educationSection.classList.remove('hidden');
}

document.querySelectorAll('.edu-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const type = btn.dataset.type;
        educationSection.classList.add('hidden');

        if(type === 'university'){
            showResults(); // твои вузы
        }else{
            showColleges();
        }
    });
});

function getChosenDirection(){
    let maxScore = 0;
    let chosenDirection = '';

    for(const dir in directions){
        if(directions[dir] > maxScore){
            maxScore = directions[dir];
            chosenDirection = dir;
        }
    }
    return chosenDirection;
}

function showColleges(){
    resultSection.classList.remove('hidden');
    cardsContainer.innerHTML = '';

    const chosenDirection = getChosenDirection();

    const title = document.createElement('h2');
    title.textContent = `Подходящие колледжи: ${chosenDirection}`;
    resultSection.prepend(title);

    const colleges = collegesByDirection[chosenDirection] || [];

    colleges.forEach(c=>{

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${c.img}" alt="${c.name}">
            <h3>${c.name}</h3>
            <p class="price">${c.price}</p>
            <p>${c.address}</p>
            <a href="">подробнее</a>
        `;
        cardsContainer.appendChild(card);
    });
}


function showQuestion() {
    if(currentQuestion >= questions.length){
        showEducationChoice();
        return;
    }

    const q = questions[currentQuestion];
    questionEl.textContent = q.q;
    answersEl.innerHTML = '';

    q.a.forEach(answer => {
        const btn = document.createElement('button');
        btn.textContent = answer.text;
        btn.addEventListener('click', () => {
            directions[answer.dir]++;
            currentQuestion++;
            showQuestion();
        });
        answersEl.appendChild(btn);
    });

    // Обновляем прогресс
    const progressPercent = ((currentQuestion) / questions.length) * 100;
    progressBar.style.width = progressPercent + '%';
    progressText.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
}

function showResults(){
    quizSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    cardsContainer.innerHTML = '';

    let maxScore = 0;
    let chosenDirection = '';
    for(const dir in directions){
        if(directions[dir] > maxScore){
            maxScore = directions[dir];
            chosenDirection = dir;
        }
    }

    const directionTitle = document.createElement('h3');
    directionTitle.textContent = `Твоё направление: ${chosenDirection}`;
    resultSection.prepend(directionTitle);

    const unis = universitiesByDirection[chosenDirection] || [];
    unis.forEach(u => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${u.img}" alt="${u.name}">
            <h3>${u.name}</h3>
            <p>${u.desc}</p>
            <p class="price">${u.price}</p>
            <p>${u.address}</p>
            <a href="">подробнее</a>
        `;
        cardsContainer.appendChild(card);
    });
}