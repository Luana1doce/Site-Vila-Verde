// index.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBgOxpFzvOGuvl02eBZSYovF1J7oNad7hA",
  authDomain: "emporiovila-6d34f.firebaseapp.com",
  projectId: "emporiovila-6d34f",
  storageBucket: "emporiovila-6d34f.appspot.com",
  messagingSenderId: "747350863563",
  appId: "1:747350863563:web:a56bf9782663313359b54e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function carregarDados() {
  try {
    // Combos
    const comboRef = doc(db, "combos", "combo1");
    const comboSnap = await getDoc(comboRef);
    if (comboSnap.exists()) {
      const data = comboSnap.data();
      console.log("URL da imagem do combo:", data.imagem);
      document.getElementById("combo1").src = (data.imagem ? data.imagem + "?v=" + Date.now() : 'img/Combo1.png');
      document.getElementById("description1").textContent = data.descricao || '';
    }

    // Promoção
    const promoRef = doc(db, "promocoes", "promo1");
    const promoSnap = await getDoc(promoRef);
    if (promoSnap.exists()) {
      const data = promoSnap.data();
      document.getElementById("promo-imagem").src = (data.imagem ? data.imagem + "?v=" + Date.now() : 'img/promo-padrao.jpg');
      document.getElementById("promo-descricao").textContent = data.descricao || '';
    }

    // Carrossel
    for (let i = 1; i <= 5; i++) {
      const slideRef = doc(db, "carrossel", `slide${i}`);
      const slideSnap = await getDoc(slideRef);
      if (slideSnap.exists()) {
        const data = slideSnap.data();
        document.getElementById(`carrossel${i}`).src = (data.imagem ? data.imagem + "?v=" + Date.now() : `img/Carrossel${i}.png`);
      }
    }
  } catch (err) {
    console.error("❌ Erro ao carregar dados:", err);
  }
}

window.addEventListener('DOMContentLoaded', carregarDados);
