// Вставь свой ключ от Web3Forms внутрь кавычек:
const WEB3FORMS_KEY = '// sb_publishable-wRYTccHBao6SA-1doR3EjA_dLQJThRH:
const WEB3FORMS_KEY = '65e6fd07-0b65-465b-b3c1-dc2b74608680';

// 1. Переключение вкладок меню
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
    });
});

// 2. Счётчик символов
const msgInput = document.getElementById('msgInput');
const charCount = document.getElementById('charCount');

msgInput.addEventListener('input', () => {
    charCount.textContent = `${msgInput.value.length} / 500`;
});

// 3. Отправка анонимного письма на почту
const sendBtn = document.getElementById('sendBtn');
const statusBox = document.getElementById('statusBox');

function showStatus(text, type) {
    statusBox.textContent = text;
    statusBox.className = `status-box ${type}`;
    setTimeout(() => {
        statusBox.classList.add('hidden');
    }, 4500);
}

sendBtn.addEventListener('click', async () => {
    const text = msgInput.value.trim();
    if (!text) {
        showStatus('⚠️ Напиши текст перед отправкой!', 'error');
        return;
    }

    sendBtn.disabled = true;
    const originalBtnHTML = sendBtn.innerHTML;
    sendBtn.innerHTML = '<span>Отправляем...</span>';

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: '📩 Новое анонимное письмо с сайта!',
                from_name: 'Анонимный отправитель',
                message: text
            })
        });

        const result = await response.json();

        if (result.success) {
            showStatus('✅ Письмо отправлено! Автор получит его на почту.', 'success');
            msgInput.value = '';
            charCount.textContent = '0 / 500';
        } else {
            showStatus('❌ Не удалось отправить. Проверь ключ Web3Forms.', 'error');
        }
    } catch (error) {
        showStatus('❌ Ошибка сети. Проверь интернет и попробуй снова.', 'error');
    }

    sendBtn.disabled = false;
    sendBtn.innerHTML = originalBtnHTML;
});';

// 1. Переключение вкладок меню
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
    });
});

// 2. Счётчик символов
const msgInput = document.getElementById('msgInput');
const charCount = document.getElementById('charCount');

msgInput.addEventListener('input', () => {
    charCount.textContent = `${msgInput.value.length} / 500`;
});

// 3. Отправка анонимного письма на почту
const sendBtn = document.getElementById('sendBtn');
const statusBox = document.getElementById('statusBox');

function showStatus(text, type) {
    statusBox.textContent = text;
    statusBox.className = `status-box ${type}`;
    setTimeout(() => {
        statusBox.classList.add('hidden');
    }, 4500);
}

sendBtn.addEventListener('click', async () => {
    const text = msgInput.value.trim();
    if (!text) {
        showStatus('⚠️ Напиши текст перед отправкой!', 'error');
        return;
    }

    sendBtn.disabled = true;
    const originalBtnHTML = sendBtn.innerHTML;
    sendBtn.innerHTML = '<span>Отправляем...</span>';

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: '📩 Новое анонимное письмо с сайта!',
                from_name: 'Анонимный отправитель',
                message: text
            })
        });

        const result = await response.json();

        if (result.success) {
            showStatus('✅ Письмо отправлено! Автор получит его на почту.', 'success');
            msgInput.value = '';
            charCount.textContent = '0 / 500';
        } else {
            showStatus('❌ Не удалось отправить. Проверь ключ Web3Forms.', 'error');
        }
    } catch (error) {
        showStatus('❌ Ошибка сети. Проверь интернет и попробуй снова.', 'error');
    }

    sendBtn.disabled = false;
    sendBtn.innerHTML = originalBtnHTML;
});
