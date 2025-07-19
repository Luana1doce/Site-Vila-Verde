import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

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
const auth = getAuth(app);

// Upload para Cloudinary
async function uploadParaCloudinary(file) {
  const url = "https://api.cloudinary.com/v1_1/doolfmxy2/image/upload";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "painel_upload");

  const response = await fetch(url, {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Erro no upload para Cloudinary");
  }

  return data.secure_url;
}

// Protege o painel
function verificarLoginOuSair() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("✅ Usuário logado:", user.email, user.uid);
    } else {
      console.log("❌ Nenhum usuário logado");
      alert("Você precisa estar logado para acessar o painel.");
      window.location.href = "login.html";
    }
  });
}
verificarLoginOuSair();

// Salvar Combo
export async function salvarCombo() {
  const descricao = document.getElementById("description1").value;
  const imgInput = document.getElementById("combo1");
  let imageUrl = null;

  if (imgInput.files.length > 0) {
    try {
      imageUrl = await uploadParaCloudinary(imgInput.files[0]);
    } catch (err) {
      console.error("❌ Erro no upload para Cloudinary:", err);
      alert("Erro ao enviar a imagem. Tente novamente.");
      return;
    }
  }

  await setDoc(doc(db, "combos", "combo1"), {
    descricao: descricao,
    imagem: imageUrl || null,
    versao: Date.now()
  });

  alert("✅ Combo salvo com sucesso!");
}

// Salvar Promoção
export async function salvarPromocao() {
  const descricao = document.getElementById("promo-txt").value;
  const imgInput = document.getElementById("promo-img");
  let imageUrl = null;

  if (imgInput.files.length > 0) {
    try {
      imageUrl = await uploadParaCloudinary(imgInput.files[0]);
    } catch (err) {
      console.error("❌ Erro no upload para Cloudinary:", err);
      alert("Erro ao enviar a imagem. Tente novamente.");
      return;
    }
  }

  await setDoc(doc(db, "promocoes", "promo1"), {
    descricao: descricao,
    imagem: imageUrl || null,
    versao: Date.now()
  });

  alert("✅ Promoção salva com sucesso!");
}

// Salvar Carrossel
export async function salvarCarrossel() {
  for (let i = 1; i <= 5; i++) {
    const imgInput = document.getElementById(`carousel-img-${i}`);
    const descricao = document.getElementById(`carousel-txt-${i}`).value;
    let imageUrl = null;

    if (imgInput.files.length > 0) {
      try {
        imageUrl = await uploadParaCloudinary(imgInput.files[0]);
      } catch (err) {
        console.error(`❌ Erro no upload do slide${i}:`, err);
        alert(`Erro ao enviar a imagem do slide ${i}.`);
        return;
      }
    }

    await setDoc(doc(db, "carrossel", `slide${i}`), {
      descricao: descricao,
      imagem: imageUrl || null,
      versao: Date.now()
    });
  }

  alert("✅ Carrossel salvo com sucesso!");
}

// Torna visíveis pro botão onclick
window.salvarCombo = salvarCombo;
window.salvarPromocao = salvarPromocao;
window.salvarCarrossel = salvarCarrossel;

window.salvarCombo = salvarCombo;
window.salvarPromocao = salvarPromocao;
window.salvarCarrossel = salvarCarrossel;


