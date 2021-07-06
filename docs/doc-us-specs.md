<h1>Taskiano: Especificação de US</h1>

---

Criado a partir de: [Processo BSI - Especificação de US](https://docs.google.com/document/d/1-WXKp-wji_fbTiIKF1e136S4nbK9cx4UWCfqtuOZWAQ/edit)

---

<h2>Sumário</h2>

- [1. User Story 01 - Manter Usuário](#1-user-story-01---manter-usuário)
  - [1.1. Descrição](#11-descrição)
    - [1.1.1. Entradas](#111-entradas)
    - [1.1.2. Saídas](#112-saídas)
    - [1.1.3. Pré-Condições](#113-pré-condições)
    - [1.1.4. Pós-Condições](#114-pós-condições)
  - [1.2. Fluxo Principal](#12-fluxo-principal)
  - [1.3. Fluxos Alternativos](#13-fluxos-alternativos)
    - [1.3.1. FA01 – Detalhar](#131-fa01--detalhar)
    - [1.3.2. FA02 – Incluir](#132-fa02--incluir)
    - [1.3.3. FA03 – Alterar](#133-fa03--alterar)
    - [1.3.4. FA04 – Excluir](#134-fa04--excluir)
    - [1.3.5. Exceções](#135-exceções)
  - [1.4. Telas](#14-telas)
  - [1.5. Diagramas](#15-diagramas)
    - [1.5.1. Diagrama de Classe do User Story](#151-diagrama-de-classe-do-user-story)
    - [1.5.2. Outros diagramas](#152-outros-diagramas)
- [2. Referências](#2-referências)

# 1. User Story 01 - Manter Usuário

<table>
  <tr>
   <td>Atores</td>
   <td>Usuário/Admin</td>
   <td></td>
   <td></td>
  </tr>
  <tr>
   <td>Prioridades</td>
   <td>Essencial <strong>X</strong></td>
   <td>Importante</td>
   <td>Desejável</td>
  </tr>
  <tr>
   <td>Requisitos Envolvidos</td>
   <td colspan="3" >[RF001] – Cadastrar Usuário</td>
  </tr>
  <tr>
   <td>Ações Associadas</td>
   <td colspan="3" >Registrar Usuário
    <p>Editar Usuário
    <p>Ativar Usuário
    <p>Consultar Usuário
    <p>Incluir Usuário
    <p>Alterar Usuário
    <p>Excluir Usuário
   </td>
  </tr>
  <tr>
   <td>Regra de Negócio:</td>
   <td colspan="3" >[RN01] – O próprio usuário pode registrar-se.
    <p>[RN02] – O usuário ativo pode logar.
    <p>[RN03] – O usuário ativo pode editar seus próprios dados.
    <p>[RN04] – O usuário admin pode ativar, incluir, alterar, excluir e consultar os usuários.
    <p>[RN05] – O email do usuário deve ser único e é seu login.
   </td>
  </tr>
</table>

## 1.1. Descrição

    Permite a consulta, inclusão, alteração e exclusão de usuários. As ações desse user story se comportam da seguinte forma:

- **Consultar Usuário:** Ação que realiza a consulta dos Usuários pelo admin.
- **Ativar Usuário:**Ação que realiza a ativação de usuário pelo admin.
- **Incluir Usuário:**Ação que realiza a inclusão de usuário pelo admin.
- **Alterar Usuário:**Ação que realiza a alteração de usuário pelo admin.
- **Excluir Usuário:**Ação que realiza a exclusão de usuário pelo admin.
- **Registar Usuário:**Ação que realiza registro de usuário por ele mesmo.
- **Editar Usuário:**Ação que realiza a edição dos dados do usuário por ele mesmo.

### 1.1.1. Entradas

    Não se aplica.

### 1.1.2. Saídas

    Não se aplica.

### 1.1.3. Pré-Condições

    Não se aplica.

### 1.1.4. Pós-Condições

    Não se aplica.

## 1.2. Fluxo Principal

1. O sistema exibe a tela de consulta de Usuário com seus filtros **[TL001 – Listar Usuário];**
2. **O sistema exibe a lista de usuários;**
3. O sistema exibe as opções que o usuário tem direito:
   1. Detalhar **[FA01] [Detalhar Usuário]**
   2. Incluir **[FA02]** **[Incluir Usuário]**
   3. Alterar **[FA03] [Alterar Usuário]**
   4. Excluir **[FA04] [Excluir Usuário]**

## 1.3. Fluxos Alternativos

### 1.3.1. FA01 – Detalhar

1. O sistema exibe a tela com a lista de usuários **[TL001 – Listar Usuário];**
2. O ator clica em detalhar;
3. O sistema realiza a consulta do usuário selecionado e exibe seus dados detalhados.

### 1.3.2. FA02 – Incluir

1. O ator seleciona a ação incluir;
2. O sistema abre a tela **[TL002 – Incluir Usuário] e **solicita os dados do Usuário;
3. O ator informa os dados do Usuário;
4. O ator seleciona a opção incluir;
5. O sistema verifica se os campos obrigatórios foram informados [**EX01 – Campos Obrigatórios não informados**];
6. O sistema identifica que esta Usuário ainda não foi cadastrada **[RN05]**;
7. O sistema realiza a inclusão no banco de dados.
8. O sistema exibe a mensagem com o texto “Inclusão realizada com sucesso.” [**MSG001 – Inclusão realizada com sucesso**].
9. O sistema realiza o Fluxo Principal.

### 1.3.3. FA03 – Alterar

1. O ator seleciona a ações alterar;
2. O sistema exibe a tela de alteração [**TL003 - Alterar Usuário**];
3. O sistema recupera e preenche os campos com os dados atuais;
4. O ator edita os campos e seleciona a opção salvar [**RN01, RN02, RN03, RN04**];
5. O sistema verifica se os campos obrigatórios foram informados [**EX01 – Campos Obrigatórios não informados**];
6. O sistema realiza a alteração no banco de dados;
7. O sistema exibe a mensagem com o texto “Alteração realizada com sucesso.” [**MSG002 – Alteração realizada com sucesso**].
8. O sistema realiza o Fluxo Principal.

### 1.3.4. FA04 – Excluir

1. O ator clica na ação excluir
2. O sistema solicita a confirmação da exclusão exibindo uma mensagem de aviso na tela atual, com o texto “Confirma a exclusão do Usuário &lt;Nome do Usuário>?” [**MSG004 – Confirmação exclusão Usuário**].
3. O sistema exclui a Usuário no banco de dados.
4. O sistema exibe a mensagem com o texto “Exclusão realizada com sucesso” [**MSG003 – Exclusão realizada com sucesso**].
5. O sistema realiza Fluxo Principal.

### 1.3.5. Exceções

**EX01 – Campos Obrigatórios não Informados**

Caso não sejam informados os campos obrigatórios o sistema redireciona para uma página de mensagem com o texto “É necessário informar os campos obrigatórios.” [**MSG005 – Campo obrigatório não informado]\*\*.

## 1.4. Telas

Aqui você coloca os desenhos das telas.

[TL001 – Listar Usuário]

[TL002 – Incluir Usuário]

[TL003 – Alterar Usuário]

## 1.5. Diagramas

### 1.5.1. Diagrama de Classe do User Story

### 1.5.2. Outros diagramas

# 2. Referências

| Nome                            | Link                                   |
| ------------------------------- | -------------------------------------- |
| Documento de Visão              | [Clique aqui ➡️](./doc-visao.md)       |
| Documento de Modelos            | [Clique aqui ➡️](./doc-modelos.md)     |
| Documento Lista de User Stories | [Clique aqui ➡️](./doc-userstories.md) |
