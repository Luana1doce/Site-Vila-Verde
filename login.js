// Firebase já inicializado no HTML
const auth = firebase.auth();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login").value;
  const senha = document.getElementById("senha").value;

  auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
      window.location.href = "painel.html";
    })
    .catch((error) => {
      console.error("Erro no login:", error);
      alert("Usuário ou senha incorretos.");
    });
});



