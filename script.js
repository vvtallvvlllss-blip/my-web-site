// ТВОИ ДАННЫЕ ИЗ SUPABASE (смотри Шаг 2 ниже)
const SUPABASE_URL = 'https://srakvhmbskiplvtggsly.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_wRYTccHBao6SA-ldoR3EjA_dLQJThRH';

// Инициализация Supabase
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const inputField = document.getElementById('userInput');
const saveBtn = document.getElementById('saveBtn');
const dataList = document.getElementById('dataList');

// 1. Функция загрузки данных из базы при открытии сайта
async function fetchRecords() {
    const { data, error } = await _supabase
        .from('records') // Название таблицы в базе
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.error('Ошибка загрузки:', error);
        dataList.innerHTML = '<li>Ошибка загрузки данных</li>';
        return;
    }

    dataList.innerHTML = '';
    if (data.length === 0) {
        dataList.innerHTML = '<li>Пока записей нет</li>';
        return;
    }

    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.text;
        dataList.appendChild(li);
    });
}

// 2. Функция сохранения данных при клике на кнопку
saveBtn.addEventListener('click', async () => {
    const textValue = inputField.value.trim();
    if (!textValue) return alert('Введите текст!');

    const { error } = await _supabase
        .from('records')
        .insert([{ text: textValue }]);

    if (error) {
        alert('Ошибка сохранения: ' + error.message);
    } else {
        inputField.value = '';
        fetchRecords(); // Перезагружаем список
    }
});

// Запускаем загрузку при старте
fetchRecords();