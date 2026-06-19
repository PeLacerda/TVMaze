const campoPesquisa = document.getElementById("campoPesquisa");
const btnBuscar = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");

btnBuscar.addEventListener("click", buscarFilmes);

async function buscarFilmes() {
  const pesquisa = campoPesquisa.value.trim();

  resultado.innerHTML = "";

  if (pesquisa === "") {
    resultado.innerHTML =
      "<p class='mensagem'>Digite um filme ou série.</p>";
    return;
  }

  try {
    const resposta = await fetch(
      `https://api.tvmaze.com/search/shows?q=${pesquisa}`
    );

    if (!resposta.ok) {
      throw new Error("Erro de conexão.");
    }

    const dados = await resposta.json();

    if (dados.length === 0) {
      resultado.innerHTML =
        "<p class='mensagem'>Nenhum resultado encontrado.</p>";
      return;
    }

    dados.forEach(item => {
      const serie = item.show;

      const imagem = serie.image
        ? serie.image.medium
        : "https://via.placeholder.com/210x295?text=Sem+Imagem";

      const resumo = serie.summary
        ? serie.summary.replace(/<[^>]*>/g, "")
        : "Sem sinopse disponível.";

      resultado.innerHTML += `
        <div class="card">
          <img src="${imagem}" alt="${serie.name}">

          <div class="info">
            <h2>${serie.name}</h2>

            <p>
              <strong>Ano:</strong>
              ${serie.premiered
                ? serie.premiered.substring(0, 4)
                : "Não informado"}
            </p>

            <p>
              <strong>Gêneros:</strong>
              ${serie.genres.join(", ") || "Não informado"}
            </p>

            <p>
              <strong>Sinopse:</strong>
              ${resumo}
            </p>
          </div>
        </div>
      `;
    });

  } catch (error) {
    resultado.innerHTML =
      "<p class='mensagem'>Erro ao conectar com a API.</p>";
  }
}