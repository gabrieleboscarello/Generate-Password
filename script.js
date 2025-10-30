
const passwordField = document.getElementById('password');
const lunghezza_pass = document.getElementById('lunghezza');
const btn_generazione = document.getElementById('generate');
const copia = document.getElementById('copia');
const nome = document.getElementById('nome');
const salvaBtn = document.getElementById('salva');
const lista = document.getElementById('lista');


// --- Funzione per generare password sicure ---
function GeneraPassword(len) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:,.<>?";
  const array = new Uint32Array(len);
  crypto.getRandomValues(array); // generatore casuale crittograficamente sicuro

  let password = "";
  for (let i = 0; i < array.length; i++) {
    const index = array[i] % chars.length;
    password += chars[index];
  }
  return password;
}

btn_generazione.addEventListener('click', () => {
  const lunghezza = parseInt(lunghezza_pass.value) || 12;
  passwordField.value = GeneraPassword(lunghezza);
});

copia.addEventListener('click', async () => {
  if (!passwordField.value) return;
  await navigator.clipboard.writeText(passwordField.value);
  copia.textContent = "Copiato ✓";
  copia.classList.replace('btn-outline-light', 'btn-success');
  setTimeout(() => {
    copia.textContent = "Copia!";
    copia.classList.replace('btn-success', 'btn-outline-light');
  }, 1500);
});
function mostraSalvate() {
  lista.innerHTML = "";
  const dati = JSON.parse(localStorage.getItem("passwords") || "[]");
  dati.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = "list-group-item bg-dark text-light d-flex justify-content-between align-items-center";
    li.innerHTML = `<span><strong>${item.nome}</strong>: ${item.password}</span>
                    <button class="btn btn-sm btn-danger" onclick="rimuovi(${i})">✕</button>`;
    lista.appendChild(li);
  });
}

// Salva una password
salvaBtn.addEventListener('click', () => {
  const nomeServizio = nome.value.trim();
  const pwd = passwordField.value;
  if (!nomeServizio || !pwd) {
    alert("Inserisci un nome e genera una password prima di salvare.");
    return;
  }
  const dati = JSON.parse(localStorage.getItem("passwords") || "[]");
  dati.push({ nome: nomeServizio, password: pwd });
  localStorage.setItem("passwords", JSON.stringify(dati));
  nome.value = "";
  passwordField.value = "";
  mostraSalvate();
});

// Rimuove una password
function rimuovi(index) {
  const dati = JSON.parse(localStorage.getItem("passwords") || "[]");
  dati.splice(index, 1);
  localStorage.setItem("passwords", JSON.stringify(dati));
  mostraSalvate();
}

mostraSalvate();
