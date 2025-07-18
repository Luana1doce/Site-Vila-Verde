// ✅ Importações do Firebase Modular
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// ✅ Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBgOxpFzvOGuvl02eBZSYovF1J7oNad7hA",
  authDomain: "emporiovila-6d34f.firebaseapp.com",
  projectId: "emporiovila-6d34f",
  storageBucket: "emporiovila-6d34f.appspot.com",
  messagingSenderId: "747350863563",
  appId: "1:747350863563:web:a56bf9782663313359b54e"
};

// ✅ Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Função para carregar dados no DOM
async function carregarDados() {
  try {
    // 🌸 Combos
    const comboRef = doc(db, "combos", "combo1");
    const comboSnap = await getDoc(comboRef);
    if (comboSnap.exists()) {
      const data = comboSnap.data();
      document.getElementById("combo1").src = data.imagem || 'img/Combo1.png';
      document.getElementById("description1").textContent = data.descricao || '';
      console.log("✅ Combo carregado:", data);
    } else {
      console.log("⚠️ Documento 'combo1' não encontrado.");
    }

    // 🌸 Promoção
    const promoRef = doc(db, "promocoes", "promo1");
    const promoSnap = await getDoc(promoRef);
    if (promoSnap.exists()) {
      const data = promoSnap.data();
      document.getElementById("promo-imagem").src = data.imagem || 'img/promo-padrao.jpg';
      document.getElementById("promo-descricao").textContent = data.descricao || '';
      console.log("✅ Promoção carregada:", data);
    } else {
      console.log("⚠️ Documento 'promo1' não encontrado.");
    }

    // 🌸 Carrossel
    for (let i = 1; i <= 5; i++) {
      const slideRef = doc(db, "carrossel", `slide${i}`);
      const slideSnap = await getDoc(slideRef);
      if (slideSnap.exists()) {
        const data = slideSnap.data();
        document.getElementById(`carrossel${i}`).src = data.imagem || `img/Carrossel${i}.png`;
        console.log(`✅ Carrossel ${i} carregado:`, data);
      } else {
        console.log(`⚠️ Slide 'slide${i}' não encontrado.`);
      }
    }
  } catch (err) {
    console.error("❌ Erro ao carregar dados:", err);
  }
}

// ✅ Chama carregarDados quando o DOM estiver pronto
window.addEventListener('DOMContentLoaded', carregarDados);



