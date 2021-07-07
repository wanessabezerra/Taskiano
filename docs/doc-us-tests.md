<h1>Documento de Testes e Validação de User Stories</h1>

---

Criado a partir de: [Processo BSI - Relatório de Testes de Módulo/Sistema](https://docs.google.com/document/d/11hLKf0FcspQrDRfo3gRMXzuY1028cUeniv_Aob8DX_0/edit)

```txt
Legenda

Teste: Código ou identificação do Teste.

Descrição: Descrição dos passos e detalhes do teste a ser executado.

Especificação: Informações sobre a função testada e se ela de acordo com a especificação do caso de uso.

Resultado: Resultado do teste, modificações sugeridas ou resultados do teste. No caso de erro ou problema na execução do teste descrever o erro em detalhes e adicionar print's das telas.
```

<h2>Sumário</h2>

- [1. Descrição](#1-descrição)
  - [1.1. Histórico de revisões](#11-histórico-de-revisões)
- [2. US001 – Manter Produto](#2-us001--manter-produto)
  - [2.1. Teste 01: Incluir Produto](#21-teste-01-incluir-produto)
  - [2.2. Teste 02: Excluir Produto](#22-teste-02-excluir-produto)
  - [2.3. Teste 03: Alterar Produto](#23-teste-03-alterar-produto)
- [3. Relatório de Bugs e Providências](#3-relatório-de-bugs-e-providências)

# 1. Descrição

Neste documento é abordado os relatórios de Testes de Módulo/Sistema sobre responsabilidade do Testador da iteração.

## 1.1. Histórico de revisões

| Data       | Versão | Descrição         | Autor                   |
| ---------- | ------ | ----------------- | ----------------------- |
| 06/07/2021 | 1.0    | Documento Inicial | Zaú Júlio Araújo Galvão |

---

# 2. US001 – Manter Produto

## 2.1. Teste 01: Incluir Produto

|        |                                                        |
| ------ | ------------------------------------------------------ |
| Código | Descrição                                              |
| A1.0;  | Incluir Produto                                        |
| A1.1.  | O ator preenche os dados;                              |
| A1.2.  | O ator seleciona a opção Cadastrar;                    |
| A1.3.  | O sistema salva os dados;                              |
| A1.4.  | O sistema exibe uma mensagem de acordo com a [MSG001]; |
| A1.5.  | Fim do fluxo.                                          |

|                                                                                                                       |                                                                    |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Especificação                                                                                                         | Resultado                                                          |
| A função implementada não segue os passos A1.4. A implementação não está de acordo com a especificação do User Story. | O produto é inserido, contudo a mensagem [MSG001] não foi exibida. |

---

## 2.2. Teste 02: Excluir Produto

|        |                                                                                    |
| ------ | ---------------------------------------------------------------------------------- |
| Código | Descrição                                                                          |
| A3.0   | Excluir Produto                                                                    |
| A3.1   | O ator executa o fluxo de Listar Produtos                                          |
| A3.2   | O ator seleciona o Produto e os dados referentes ao mesmo, são carregados na tela; |
| A3.3   | O ator clica no botão Excluir;                                                     |
| A3.3   | O sistema solicita confirmação para exclusão [MSG05];                              |
| A3.4   | O ator confirma a exclusão;                                                        |
| A3.5   | O sistema exclui o registro e exibe uma mensagem de acordo com a [MSG03]; (E2).    |
| A3.6   | Fim do fluxo. (P2)                                                                 |

|                   |           |
| ----------------- | --------- |
| Especificação     | Resultado |
| Especificação OK. | OK.       |

---

## 2.3. Teste 03: Alterar Produto

|        |                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------ |
| Código | Descrição                                                                                        |
| A2.0   | Alterar Produto                                                                                  |
| A2.1   | O ator executa o fluxo. (A4)                                                                     |
| A2.2   | O ator seleciona o Produto e os dados referentes ao mesmo, são carregados no campos para edição; |
| A2.3   | O ator edita os campos e clica no botão Editar;                                                  |
| A2.4   | O sistema salva os dados alterados no banco de dados;                                            |
| A2.5   | O sistema exibe uma mensagem de acordo com a [MSG04].                                            |
| A2.6   | Fim do fluxo. (P2)                                                                               |

|                                                                                                                                                                                 |                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Especificação                                                                                                                                                                   | Resultado                                                                                                          |
| A função não implementa o passo A2.4, ou seja não altera o Produto. Na execução da função aparece uma mensagem sobre a regra de negócio RN001 que não aparece na especificação. | Ao tentar alterar um produto que tem compras (RN001) é exibida a mensagem MSG002. “Produto não pode ser alterado”. |

---

---

# 3. Relatório de Bugs e Providências

Responsabilidade do Gerente

|                            |                                                              |                                   |
| -------------------------- | ------------------------------------------------------------ | --------------------------------- |
| Teste                      | Providência                                                  | Tarefas/Tipo                      |
| Teste 01 – Incluir Produto | Corrigir Implementação do fluxo do user story.               | Tarefa: Bug de Implementação.     |
| Teste 03 – Alterar Produto | Corrigir a especificação do fluxo do US e sua implementação. | Tarefa: Corrigir a análise do US. |
