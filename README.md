# Sumário
> <a href="#app">Sobre o App</a>

> <a href="#screen">Telas</a>

> <a href="#RF">Requisitos Funcionais</a>

> <a href="#RNF">Requisitos Não-Funcionais</a>

> <a href="#lang">Linguagem utilizada</a>

<div id="app"/>

# RESISTÊNCIA

Aplicativo desenvolvido para auxiliar nos casos de denúncia junto a Guarda Municipal em casos de violência doméstica tendo como foco vítimas que possuam ou não medida protetiva ativa.

<div id="screen"/>

# SCREENS

► LOGIN, ► ESQUECI MINHA SENHA, ► CADASTRO
 <div style="display:inline-block">
 <img src="https://user-images.githubusercontent.com/67290959/142232764-b5ee2349-56e0-4a6f-bc33-522c9f1dd925.png" width="230" heigth="500" >
 <img src="https://user-images.githubusercontent.com/67290959/142234205-6bf8dd71-20c4-4114-bfd5-55e5194c0300.png" width="230" heigth="500" >
 <img src="https://user-images.githubusercontent.com/67290959/142234860-5bb0029d-2f70-413c-a49d-431d024700bf.png" width="230" heigth="500" >
 <img src="https://user-images.githubusercontent.com/67290959/142235156-2dbb5995-7246-43c5-add6-f37b918d4749.png" width="230" heigth="500" >
 </div>
► TERMOS E CONDIÇÕES DE USO
 <div style="display:inline-block">
 <img src="https://user-images.githubusercontent.com/67290959/142235156-2dbb5995-7246-43c5-add6-f37b918d4749.png" width="230" heigth="500" >
 </div>
 ► HOME, ► MEDIDA PROTETIVA, ► DADOS PESSOAIS, ► CONFIGURAÇÕES DE MENSAGENS
 <div style="display:inline-block">
 <img src="https://user-images.githubusercontent.com/67290959/142235492-4d92aa6e-8cc0-43ba-a1a7-5df55df7293a.png" width="230" heigth="500" > 
 <img src="https://user-images.githubusercontent.com/67290959/142235293-569edf50-2aba-444c-83f3-99ec92059501.png" width="230" heigth="500" >
 <img src="https://user-images.githubusercontent.com/67290959/142236898-cca938fd-beed-485c-a557-c460c3fa0079.png" width="230" heigth="500" >
 <img src="https://user-images.githubusercontent.com/67290959/142237174-1867b96a-b664-4c6a-b978-dae2f291fb69.png" width="230" heigth="500" >
 </div>
  ► OCORRÊNCIAS, ► TELEFONES ÚTEIS, ► MINHA LOCALIZAÇÃO
 <div style="display:inline-block">
 <img src="https://user-images.githubusercontent.com/67290959/142237772-b6fd7aad-0ee6-44e7-91ce-edb61563d39b.png" width="230" heigth="500" > 
 <img src="https://user-images.githubusercontent.com/67290959/142237842-55d75ca7-2a22-451f-b61a-64962f91c466.png" width="230" heigth="500" >
 <img src="https://user-images.githubusercontent.com/67290959/142238326-4219a303-6367-4ade-8c6e-78d7592724e7.png" width="230" heigth="500" >
 </div>
 
 <div id="RF"/>

# Requisitos Funcionais

> RF-001 - Cadastro
O usuário poderá se cadastrar na plataforma, será solicitado o preenchimento das informações necessárias sendo elas: Nome Completo, CPF, CEP, Bairro, Endereço, Número, Complemento, Telefone principal e outro para contato, E-mail, RG, Data de nascimento e Senha.

> RF-002 - Login
O usuário poderá efetuar login no aplicativo desde que esteja devidamente cadastrado, sendo solicitado o número de CPF e senha.

> RF-003 - Recuperação de senha
O usuário poderá solicitar sua senha a partir de um CPF préviamente cadastrado no sistema respondendo algumas perguntas relacionadas a seu cadastro.

> RF-004 - Termos e condições Gerais
O aplicativo oferece para o usuário maiores informações sobre as regras e normas da Lei Geral de Proteção de Dados (LGPD).

> RF-005 - Aceite dos termos de condições
Termos que são necessários declarar que leu e concorda com as regras e normas da Lei Geral de Proteção de Dados (LGPD) para ter direito à utilização do aplicativo.

> RF-006 - Ocorrências
O usuário poderá registrar ocorrências através do botão de Pãnico ou efetuando uma ligação para a lista de telefones úteis e, posteriormente consultá-las na tela específica.

> RF-007 - Telefones Úteis
O usuário poderá efetuar uma ligação para os números diponibilizados pelo aplicativo de diversos orgãos municipais ativos.

> RF-008 - Medida Protetiva
O aplicativo permite o usuário consultar informações gerais sobre como funciona a Medida Protetiva.

> RF-009 - Localização
Permite o usuário checar sua localização em tempo real para posterior utilização e registro de ocorrências.

> RF-010 - Botão de SOS
Botão de emergência, que entra em contato com o órgão responsável pela segurança do usuário assegurado pela medida protetiva e dispara SMS** para os contatos adicionados pelo usuário gerando uma ocorrência com os dados de localização e tempo ( Latitude, Longitude, data e hora ). Para o usuário padrão, o botão é bloqueado. Para o desbloqueio do botão, será necessária uma confirmação prévia através do CPF de que o usuário realmente possui medida protetiva ativa. Para Ativa-lo o usuário pode pressionar o botão na tela principal do app ou também movimentar bruscamente o aparelho (se caso o dispositivo tiver o acelerômetro disponível).
** Função de envio de sms a ser implementada.

> RF-011 - Filtro de ocorrências e Telefones Úteis
O usuário poderá filtrar as informações de acordo com a data de ocorrência ( ocorrências ) e de acordo com o nome do orgão ou telefone ( Telefones úteis ).

> RF-012 - Chamada direta para Delegacia da Mulher
Usuário terá número direto para chamar na tela de Medida Protetiva.

> RF-013 - Gerenciamento dos dados pessoais
O usuário poderá alterar a qualquer momento todos os dados préviamente registrados com excessão no CPF.

> RF-014 - Modo de visualização dos dados pessoais
O usuário poderá confirmar se na tela de dados pessoais está em Modo Visualização ou Modo Alteração.

> RF-015 - Gerenciar contatos de emergência
O usuário poderá ter até 3 (três) contatos de emergência registrados, sendo possível a qualquer momento alterar esse números.

> RF-016 - Enviar SMS de teste 
O usuário poderá encaminhar um SMS de teste para qualquer um dos contatos que estiverem préviamente registrados na tela de Mensagens de emergência.

> RF-017 - Sair da Conta
O usuário poderá a qualquer momento sair da conta da qual fez login no aplicativo.

<div id="RNF"/>

# Requisitos Não Funcionais

> Categoria - Usabilidade / UX-UI:

RNF-001 - Interface intuitiva.

O software disponibilizará de telas intuitivas e de fácil manuseio, não sendo necessário conhecimento prévio.

> Categoria - Segurança:

RNF-002 - Acesso ao app.

O usuário não cadastrado, conseguirá ter acesso apenas a tela de login. Será necessário efetuar o cadastro e a autenticação do login através de CPF e senha.

> Categoria - Implementação:

RNF-003 - Linguagem utilizada

O aplicativo utiliza a linguagem de programação Javascript.

RNF-004 - Banco de Dados

O aplicativo utiliza banco de dados SQL Server.

RNF-005 - Escalabilidade

A arquitetura do código foi pensada de forma que possa escalar facilmente.

<div id="lang"/>

# Linguagem utilizada

O aplicativo foi desenvolvido utilizando :

► Front-End:

React-Native:

> Expo ( Location, sensors, status-bar, linear-gradient )

> Async Storage

> Geolocation

> Material-Top-Tabs

> React-Native ( Geolocation, maps, modal, picker, responsive-fontsize, responsive-screen )

> Styled-components

> React-Navigation ( stacks, screens, tabs )

► Back-End:

NodeJs

> Express

> Nodemon

> mssql

► Banco de dados

SQL Server
