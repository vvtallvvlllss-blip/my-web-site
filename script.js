// 1. Твои данные из Supabase (для сохранения архива в базу)
const SUPABASE_URL = 'https://srakvhmbskiplvtggsly.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_wRYTccHBao6SA-ldoR3EjA_dLQJThRH';

// 2. Твой ключ от Web3Forms (чтобы письма летели на почту)
const WEB3FORMS_KEY = '65e6fd07-0b65-465b-b3c1-dc2b74608680';

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const statusText = document.getElementById('statusText');
const adminBtn = document.getElementById('adminBtn');
const adminPanel = document.getElementById('adminPanel');
const messagesList = document.getElementById('messagesList');

// Отправка: дублирует письмо на почту И сохраняет в базу Supabase
sendBtn.addEventListener('click', async () => {
    const text = msgInput.value.trim();
    if (!text) {
        statusText.textContent = 'Напиши текст сообщения!';
        return;
    }

    sendBtn.disabled = true;
    statusText.textContent = 'Отправка...';

    try {
        // Отправка на почту через Web3Forms
        const mailResponse = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: '📩 Новое анонимное письмо с сайта!',
                message: text
            })
        });
        const mailResult = await mailResponse.json();

        // Сохранение в базу данных Supabase
        const { error: dbError } = await _supabase
            .from('anon_messages')
            .insert([{ message: text }]);

        if (mailResult.success && !dbError) {
            statusText.textContent = '✅ Письмо отправлено на почту и сохранено!';
            msgInput.value = '';
        } else {
            statusText.textContent = '⚠️ Отправлено, но произошла ошибка при сохранении.';
        }
    } catch (err) {
        statusText.textContent = '❌ Ошибка сети. Попробуй еще раз.';
    }

    sendBtn.disabled = false;
    setTimeout(() => { statusText.textContent = ''; }, 4000);
});

// Кнопка входа для тебя (пароль '1234', можешь изменить ниже)
adminBtn.addEventListener('click', async () => {
    const password = prompt('Введите секретный пароль:');
    
    if (password === '1234') { 
        adminPanel.classList.remove('hidden');
        adminBtn.style.display = 'none';
        fetchMessages();
    } else {
        alert('Неверный пароль!');
    }
});

// Загрузка истории писем из базы Supabase (чтобы читать только ты)
async function fetchMessages() {
    const { data, error } = await _supabase
        .from('anon_messages')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        messagesList.innerHTML = '<li>Ошибка загрузки базы данных</li>';
        return;
    }

    messagesList.innerHTML = '';
    if (data.length === 0) {
        messagesList.innerHTML = '<li>Пока нет ни одного сообщения</li>';
        return;
    }

    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.message;
        messagesList.appendChild(li);
    });
}