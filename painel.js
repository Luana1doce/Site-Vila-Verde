// painel.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("✅ Usuário logado:", user.email, user.uid);
  } else {
    console.log("❌ Nenhum usuário logado");
  }
});

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBgOxpFzvOGuvl02eBZSYovF1J7oNad7hA",
  authDomain: "emporiovila-6d34f.firebaseapp.com",
  projectId: "emporiovila-6d34f",
  storageBucket: "emporiovila-6d34f.appspot.com",
  messagingSenderId: "747350863563",
  appId: "1:747350863563:web:a56bf9782663313359b54e"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para converter arquivo em Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Salvar Combo
export async function salvarCombo() {
  const descricao = document.getElementById("description1").value;
  const imgInput = document.getElementById("combo1");
  let imagemBase64 = null;

  console.log("Combo - Arquivos selecionados:", imgInput.files);

  if (imgInput.files.length > 0) {
    imagemBase64 = await fileToBase64(imgInput.files[0]);
  }

  await setDoc(doc(db, "combos", "combo1"), {
    descricao: descricao,
    imagem: imagemBase64 || null
  });

  alert("Combo salvo com sucesso!");
}

// 💫 Torna a função visível pro botão com onclick
window.salvarCombo = salvarCombo;



// Salvar Promoção
export async function salvarPromocao() {
  const descricao = document.getElementById("promo-txt").value;
  const imgInput = document.getElementById("promo-img");
  let imagemBase64 = null;

    console.log("Combo - Arquivos selecionados:", imgInput.files);

  if (imgInput.files.length > 0) {
    imagemBase64 = await fileToBase64(imgInput.files[0]);
  }

  await setDoc(doc(db, "promocoes", "promo1"), {
    descricao: descricao,
    imagem: imagemBase64 || null
  });

  alert("Promoção salva com sucesso!");
}

// Salvar Carrossel
export async function salvarCarrossel() {
  for (let i = 1; i <= 5; i++) {
    const imgInput = document.getElementById(`carousel-img-${i}`);
    const descricao = document.getElementById(`carousel-txt-${i}`).value;
    let imagemBase64 = null;

      console.log("Combo - Arquivos selecionados:", imgInput.files);

    if (imgInput.files.length > 0) {
      imagemBase64 = await fileToBase64(imgInput.files[0]);
    }

    await setDoc(doc(db, "carrossel", `slide${i}`), {
      descricao: descricao,
      imagem: imagemBase64 || null
    });
  }

  alert("Carrossel salvo com sucesso!");
}


