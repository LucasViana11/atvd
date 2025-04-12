const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const results = document.getElementById("results");
const waifuContainer = document.getElementById("waifuContainer");

async function fetchAnimes(query, type) {
  results.innerHTML = "Carregando...";
  waifuContainer.innerHTML = "";

  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&type=${type}`);
    const data = await res.json();

    if (!data.data.length) {
      results.innerHTML = '<p class="error">Nenhum anime encontrado.</p>';
      return;
    }

    results.innerHTML = "";
    data.data.forEach(anime => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <div class="info">
          <strong>${anime.title}</strong><br>
          Tipo: ${anime.type}<br>
          Nota: ${anime.score || "N/A"}<br>
          Episódios: ${anime.episodes || "?"}
        </div>
      `;
      results.appendChild(card);
    });
  } catch (err) {
    results.innerHTML = '<p class="error">Erro ao buscar animes.</p>';
    console.error(err);
  }
}

async function fetchRandomWaifu() {
  waifuContainer.innerHTML = "Carregando surpresa...";
  results.innerHTML = "";

  try {
    const res = await fetch("https://api.waifu.pics/sfw/waifu");
    const data = await res.json();
    waifuContainer.innerHTML = `<img src="${data.url}" alt="Waifu" style="max-width: 300px; border-radius: 8px;">`;
  } catch (err) {
    waifuContainer.innerHTML = '<p class="error">Erro ao carregar imagem.</p>';
    console.error(err);
  }
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  const type = typeFilter.value;
  if (query) fetchAnimes(query, type);
});

randomBtn.addEventListener("click", fetchRandomWaifu);