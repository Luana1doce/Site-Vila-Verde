// painel.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Firebase Config
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
    throw new Error(data.error?.message || "Erro no upload Cloudinary");
  }

  return data.secure_url;
}

// Protege painel
function verificarLoginOuSair() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
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
      alert("Erro ao enviar imagem do combo.");
      console.error(err);
      return;
    }
  }

  await setDoc(doc(db, "combos", "combo1"), {
    descricao,
    imagem: imageUrl || null
  });
  alert("✅ Combo atualizado com sucesso!");
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
      alert("Erro ao enviar imagem da promoção.");
      console.error(err);
      return;
    }
  }

  await setDoc(doc(db, "promocoes", "promo1"), {
    descricao,
    imagem: imageUrl || null
  });
  alert("✅ Promoção atualizada com sucesso!");
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
        alert(`Erro ao enviar imagem do slide ${i}.`);
        console.error(err);
        return;
      }
    }

    await setDoc(doc(db, "carrossel", `slide${i}`), {
      descricao,
      imagem: imageUrl || null
    });
  }
  alert("✅ Carrossel atualizado com sucesso!");
}

window.salvarCombo = salvarCombo;
window.salvarPromocao = salvarPromocao;
window.salvarCarrossel = salvarCarrossel;


