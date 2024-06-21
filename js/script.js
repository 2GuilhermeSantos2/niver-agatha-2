let attempts = 0;
let hintIndex = 0;
const maxAttempts = 3;
const correctPassword = '2129';
const hints = ['2', '21', '212', '2129'];

// Função para carregar as dicas da sessão
function loadHint() {
    const storedHintIndex = sessionStorage.getItem('hintIndex');
    if (storedHintIndex !== null) {
        hintIndex = parseInt(storedHintIndex, 10);
        document.getElementById('hint').innerText = `Dica: ${hints[hintIndex]}`;
    }
}

// Função para verificar a senha
function checkPassword() {
    const password = document.getElementById('password-input').value;
    if (password === correctPassword) {
        sessionStorage.removeItem('hintIndex'); // Resetar as dicas
        location.href = 'birthday.html';
    } else {
        attempts++;
        if (attempts % maxAttempts === 0) {
            hintIndex = Math.min(hintIndex + 1, hints.length - 1);
            sessionStorage.setItem('hintIndex', hintIndex);
        }
        document.getElementById('hint').innerText = `Dica: ${hints[hintIndex]}`;
        alert('Senha incorreta!');
        if (attempts >= maxAttempts * hints.length) {
            alert('Tentativas esgotadas! Volte para a tela inicial.');
            sessionStorage.setItem('hintIndex', hintIndex); // Armazenar a dica atual
            location.href = 'index.html';
        }
    }
}

// Carregar a dica ao carregar a página de senha
document.addEventListener('DOMContentLoaded', loadHint);
