const form = document.querySelector("form");
const cepInput = document.querySelector("#cep");
const addressSection = document.querySelector("#address");
form.addEventListener("submit", async (event) => {

event.preventDefault();

const cep = cepInput.value.replace("-", "");

if (cep.length === 8) {
try {
const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
const data = await response.json();
if (data.erro !== "true") {
addressSection.innerHTML = `
<p>${data.logradouro}, ${data.bairro} - ${data.localidade}, ${data.uf}.</p
`;
} else {
alert(`Erro ao obter dados do endereço para o CEP ${cep}! 🚨 `);
}
} catch (error) {
alert(`Erro ao obter dados do endereço para o CEP ${cep}! 🚨 `);
}
}
});