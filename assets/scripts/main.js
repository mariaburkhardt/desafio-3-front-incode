const formulario = document.querySelector("#formulario");
const inputTexto = document.querySelector("#input-text");
const sessaoRetorno = document.querySelector("#sessao-retorno"); // Seleciona onde o retorno será inserido

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const textoDigitado = inputTexto.value;

    if (textoDigitado.trim() === "") {
        alert("digite algo antes de enviar");
    } else {
        const url = `https://api.github.com/users/${textoDigitado}`;
        const urlRepos = `https://api.github.com/users/${textoDigitado}/repos`;

        async function pegarUrl() {
            try {
                const loading = document.createElement("p");
                loading.textContent = "Carregando...";
                sessaoRetorno.appendChild(loading);

                const resposta = await fetch(url);
                const data = await resposta.json();

                loading.classList.add("carregando");

                // Limpa a sessão de retorno antes de adicionar o novo conteúdo
                sessaoRetorno.innerHTML = "";

                // Cria o container para o usuário
                const retornoValido = document.createElement("div");
                retornoValido.classList.add("retorno-valido");

                const divUsuario = document.createElement("div");
                divUsuario.classList.add("div-usuario");

                // Div com informações do usuário
                const infosUsuario = document.createElement("div");
                infosUsuario.classList.add("infos-usuario");

                const imgPerfil = document.createElement("img");
                imgPerfil.src = data.avatar_url;
                imgPerfil.id = "imagem-usuario";

                const usuarioNomeProfissao = document.createElement("div");
                usuarioNomeProfissao.classList.add("usuario-nome-profissao");

                const nomeUsuario = document.createElement("h2");
                nomeUsuario.classList.add("nome-usuario");
                nomeUsuario.textContent = data.name;

                const profissaoUsuario = document.createElement("p");
                profissaoUsuario.classList.add("profisssao-usuario");
                profissaoUsuario.textContent = data.bio;

                usuarioNomeProfissao.appendChild(nomeUsuario);
                usuarioNomeProfissao.appendChild(profissaoUsuario);

                infosUsuario.appendChild(imgPerfil);
                infosUsuario.appendChild(usuarioNomeProfissao);

                // Nav de links
                const navLinks = document.createElement("ul");
                navLinks.classList.add("nav-links");

                const links = [
                    {
                        src: "assets/imgs/seguidores.png",
                        text: `${data.followers} seguidores`,
                    },
                    {
                        src: "assets/imgs/Ellipse 1.svg",
                        text: `${data.following} seguindo`,
                    },
                    {
                        src: "assets/imgs/localizacao.png",
                        text: data.location || "Localização desconhecida",
                    },
                    {
                        src: "assets/imgs/encadeado.png",
                        text: data.blog || "Nenhum site",
                        target:"_blank"
                    },
                ];

                links.forEach((link) => {
                    const li = document.createElement("li");
                    li.classList.add("item-link");

                    const img = document.createElement("img");
                    img.src = link.src;
                    img.classList.add("img-lista");

                    li.appendChild(img);
                    li.appendChild(document.createTextNode(link.text));
                    navLinks.appendChild(li);
                });

                divUsuario.appendChild(infosUsuario);
                divUsuario.appendChild(navLinks);

                retornoValido.appendChild(divUsuario);

                // Adiciona a div do usuário na seção de retorno
                sessaoRetorno.appendChild(retornoValido);

                // Busca os repositórios
                const repos = await fetch(urlRepos);
                const reposData = await repos.json();

                // Cria o container para os repositórios
                const containerRepositorio = document.createElement("section");
                containerRepositorio.classList.add("container-repositorio");

                reposData.forEach((r) => {
                    const repositorio = document.createElement("div");
                    repositorio.classList.add("repositorios");

                    const nomeRepositorio = document.createElement("h3");
                    nomeRepositorio.classList.add("nome-repositorio");
                    nomeRepositorio.textContent = r.name;

                    const descricaoRepositorio = document.createElement("p");
                    descricaoRepositorio.classList.add("descriçao-repositorio");
                    descricaoRepositorio.textContent =
                        r.description || "Sem descrição";

                    const quantidadeEstrela = document.createElement("span");
                    quantidadeEstrela.classList.add("quantidade-estrela");

                    const imgEstrela = document.createElement("img");
                    imgEstrela.src = "assets/imgs/estrela.png";
                    quantidadeEstrela.appendChild(imgEstrela);
                    quantidadeEstrela.appendChild(
                        document.createTextNode(
                            ` estrelas: ${r.stargazers_count}`
                        )
                    );

                    const btnLinkRepositorio = document.createElement("button");
                    btnLinkRepositorio.classList.add("btn-link-repositorio");

                    const linkRepositorio = document.createElement("a");
                    linkRepositorio.href = r.html_url;
                    linkRepositorio.classList.add("link-repositorio");
                    linkRepositorio.textContent = "Ver no Github";
                    linkRepositorio.target = "_blank"; // Abre o link em uma nova aba

                    btnLinkRepositorio.appendChild(linkRepositorio);

                    repositorio.appendChild(nomeRepositorio);
                    repositorio.appendChild(descricaoRepositorio);
                    repositorio.appendChild(quantidadeEstrela);
                    repositorio.appendChild(btnLinkRepositorio);

                    containerRepositorio.appendChild(repositorio);
                });

                // Adiciona o container dos repositórios ao retorno
                retornoValido.appendChild(containerRepositorio);
            } catch (e) {
                console.log(e);
                criarRetornoInvalido();
            }
        }

        pegarUrl();
    }

    function criarRetornoInvalido() {
        const div = document.createElement("div");
        div.classList.add("retorno-invalido");

        const p = document.createElement("p");
        p.textContent =
            "Nenhum repositório encontrado. Faça uma busca para ver os resultados.";
        div.appendChild(p);

        // Limpa a sessão de retorno antes de exibir o erro
        sessaoRetorno.innerHTML = "";
        sessaoRetorno.appendChild(div);
    }
});
