* [Url do Tema](https://github.com/wpbrasil/odin-grid-system)
* [Grupo Wordpress Brasil](https://www.facebook.com/groups/wordpress.brasil)


* HTML5shiv	## Descrição do Projeto ##
* matchMedia() polyfill
* Respond.js	Nota+ é um app dedicado a solicitação de suporte acadêmico de forma rápida e confiável. O app busca facilitar a relação cliente / prestador, diversificando as opções do usuário com base em desempenho e valor, garantindo a entrega e pagamento do serviço.

## Instalação ##

1) Clone o repositorio em sua máquina (git clone ...)
2) Através do terminal acesse cd backand\ nota+/ e depois execute yarn install
3) Verifique o arquivo .envExemplo, informe os acessos ao banco de dados PostgreSQL, após atualizar o envExemplo renomear arquivo para .env
4) Caso não queira informar um banco de dados específico, utilize o Docker para gerar uma imagem postgre
    a) Intale o docker * [Intall Docker](https://docs.docker.com/install/)
    b) Execute no terminal, docker --version, para confirmar instalação
    c) Execute o seguinte comando: docker run --name {fica a sua escolha} -e POSTGRES_PASSWORD={fica a sua escolha} -p 5432:5432 -d postgres
5) Execute yarn dev, e a aplicação está rodando localmente.
