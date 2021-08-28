<h1>Análise de Pontos de Função - APF</h1>

[Referência APF](https://www.ifpug.org/?lang=pt)

<h2>Sumário</h2>

- [1. Descrição](#1-descrição)
  - [1.1. Histórico de revisões](#11-histórico-de-revisões)
- [2. Contagem Indicativa (Ci)](#2-contagem-indicativa-ci)
  - [2.1. Descrição](#21-descrição)
  - [2.2. Contagem](#22-contagem)
  - [2.3. Produtividade Hr/PF](#23-produtividade-hrpf)
- [3. Contagem Estimativa (Ce)](#3-contagem-estimativa-ce)
- [4. Contagem Detalhada](#4-contagem-detalhada)

# 1. Descrição

Os pontos de função são utilizados como fator normalizado do tamanho do software, permitindo o estabelecimento de métricas tais como:

- Produtividade
  - Pontos de função por pessoa-mês
- Taxa de entrega
  - Pessoas-hora para a produção de um ponto de função
- Densidade de falhas
  - Falhas encontradas por ponto de função

## 1.1. Histórico de revisões

| Data       | Versão | Descrição                                   | Autor                    |
| ---------- | ------ | ------------------------------------------- | ------------------------ |
| 07/07/2021 | 1.0    | Documento Inicial                           | Zaú Júlio Araújo Galvão  |
| 08/07/2021 | 1.1    | Revisão estrutural                          | Zaú Júlio Araújo Galvão  |
| 08/07/2021 | 1.2    | Revisão estrutural, Descrições e Referência | Zaú Júlio Araújo Galvão  |
| 09/07/2021 | 2.0    | Contagem Indicativa (Ci)                    | Zaú Júlio Araújo Galvão  |
| 09/07/2021 | 3.0    | Contagem Detalhada                          | Wanessa da Silva Bezerra |
| 27/08/2021 | 3.1    | Contagem Detalhada, atualização             | Wanessa da Silva Bezerra |
| 27/08/2021 | 4.0    | Contagem Estimativa (Ce)                    | Wanessa da Silva Bezerra |

# 2. Contagem Indicativa (Ci)

## 2.1. Descrição

A Contagem Indicativa do Tamanho Funcional, ou Ci, é uma medida de software, baseada em uma avaliação padronizada dos requisitos lógicos dos usuários. Tem por objetivo fornecer uma estimativa padronizada do tamanho e complexidade de um software.

## 2.2. Contagem

Na contagem indicativa é necessário analisar os **ALIs**[1] (Arquivos Lógicos Internos), com o valor padronizado de **35 PF** cada e os **AIEs**[2] (Arquivos de Interface Externa) com o valor de **15 PF** cada.

```txt
[1]  ALI: Grupos lógicos de dados mantidos dentro da fronteira da aplicação.
[2]  AIE: Arquivos apenas referenciados pela aplicação.
```

| ALI/AIE      | Entidades Relacionadas | PF  |
| ------------ | ---------------------- | --- |
| ALI Task     | Task                   | 35  |
| ALI Reminder | Reminder               | 35  |
| ALI User     | User                   | 35  |
| ALI Project  | Project                | 35  |
| **Total**    | -                      | 140 |

```txt
m = Margem bruta => 35%
c = Contagem Total PF => 140

Tamanho Funcional Ci = 140 PF

Margem = ( 91 PF < (c * m) <= 189 PF)
```

## 2.3. Produtividade Hr/PF

Para estipular a produtividade Hr/PF da equipe foi considerando o desempenho médio da equipe por linguagem:

- 2Hr/PF para Python
- 2Hr/PF para JS/TS

Com produtividade média da equipe em **2Hr/PF**.

```txt
- Considerando o custo de R$ 17,00 por hora.
```

Considerando somente um desenvolvedor. O projeto teria **duração de 200 Horas**, com empenho de 8 Horas por dia, trabalhando por 35 dias.

<!-- PF_Dia = (1 membro * 8 HrsDia)/2 HrPF = 4 -->
<!-- Dias = CI/PF_Dia = 140/4 =~ 35 Dias -->
<!-- Total_Hrs = Dias * (1 membro * 8 HrsDia) = 280 Hrs -->
<!-- Custo = Total_Hrs * Custo = R$ 4760 -->

- Total: R$ 4760,00

Considerando a equipe constituída por 4 membros, empenhando 8 Horas por dia(16PF/Dia), duração de **288 Horas**, temos como resultado a conclusão do projeto em cerca de 9 Dias.

<!-- PF_Dia = (4 membros * 8 HrsDia)/2 HrPF = 16 -->
<!-- Dias = CI/PF_Dia = 140/16 =~ 9 Dias -->
<!-- Total_Hrs = Dias * (4 membros * 8 HrsDia) = 288 Hrs -->
<!-- Custo = Total_Hrs * Custo = R$ 4896 -->

- Total: R$ 4896,00

Considerando o cenário acadêmico, a equipe constituída por 4 membros, empenhando 2 Horas por dia(4PF/Dia), duração de **280 Horas**, temos como resultado a conclusão do projeto em cerca de 35 Dias.

<!-- PF_Dia = (4 membros * 2 HrsDia)/2 HrPF = 4 -->
<!-- Dias = CI/PF_Dia = 140/4 =~ 35 Dias -->
<!-- Total_Hrs = Dias * (4 membros * 2 HrsDia) = 280 Hrs -->
<!-- Custo = Total_Hrs * Custo = R$ 4760 -->

- Total: R$ 4760,00

# 3. Contagem Estimativa (Ce)

Na Ce todas as funções de dados são classificados como baixa complexidade.

Na Ce todas as operações elementares são classificadas como de média complexidade:
**EE** tem 4 PF, **CE** tem 4 PF e **SE** tem 5 PF.

| Operação                 | Tipo | Complexidade       | PF      |
| ------------------------ | ---- | ------------------ | ------- |
| Task                     | ALI  | Baixa              | 7       |
| Reminder                 | ALI  | Baixa              | 7       |
| Project                  | ALI  | Baixa              | 7       |
| User                     | ALI  | Baixa              | 7       |
|                          |      | **Soma de Dados**  | **28**  |
| > **Tarefa**             |      |                    |         |
| Inserir Tarefa           | EE   | Média              | 4       |
| Atualizar Tarefa         | EE   | Média              | 4       |
| Listar Tarefa            | CE   | Média              | 4       |
| Deletar Tarefa           | EE   | Média              | 4       |
| Listar Tarefas Atrasadas | SE   | Média              | 5       |
| Visualizar Tarefa        | CE   | Média              | 4       |
|                          |      | **Soma de Dados**  | **25**  |
| > **Lembrete**           |      |                    |         |
| Inserir Lembrete         | EE   | Baixa              | 4       |
| Atualizar Lembrete       | EE   | Baixa              | 4       |
| Listar Lembrete          | CE   | Baixa              | 4       |
| Deletar Lembrete         | EE   | Baixa              | 4       |
| Visualizar Lembrete      | CE   | Baixa              | 4       |
|                          |      | **Soma de Dados**  | **20**  |
| > **Projeto**            |      |                    |         |
| Inserir Projeto          | EE   | Média              | 4       |
| Atualizar Projeto        | EE   | Média              | 4       |
| Listar Projeto           | CE   | Média              | 4       |
| Deletar Projeto          | EE   | Média              | 4       |
| Visualizar Projeto       | CE   | Baixa              | 4       |
|                          |      | **Soma de Dados**  | **20**  |
| > **Usuário**            |      |                    |         |
| Inserir Usuário          | EE   | Média              | 4       |
| Atualizar Usuário        | EE   | Média              | 4       |
| Listar Usuário           | CE   | Média              | 4       |
| Deletar Usuário          | EE   | Média              | 4       |
| Visualizar Usuário       | CE   | Baixa              | 4       |
|                          |      | **Soma de Dados**  | **20**  |
|                          |      | **Total de Dados** | **113** |

# 4. Contagem Detalhada

Tabela Task (2 RFR e 9 DER - Baixa Complexidade)
1 ALI \* 7 PF = 7PF

Tabela Reminder (1 RFR e 4 DER - Baixa Complexidade)
1 ALI \* 7 PF = 7 PF

Tabela Project (2 RFR e 7 DER - Baixa Complexidade)
1 ALI \* 7 PF = 7 PF

Tabela Users (1 RFR e 7 DER  - Baixa Complexidade)
1 ALI \* 7 PF = 7 PF

ALI: 4 ALI \* 7 PF = **28 PF**

| Operação                 | Tipo | Complexidade       | PF      |
| ------------------------ | ---- | ------------------ | ------- |
| Task                     | ALI  | Baixa              | 7       |
| Reminder                 | ALI  | Baixa              | 7       |
| Project                  | ALI  | Baixa              | 7       |
| User                     | ALI  | Baixa              | 7       |
|                          |      | **Soma de Dados**  | **28**  |
| > **Tarefa**             |      |                    |         |
| Inserir Tarefa           | EE   | Média              | 4       |
| Atualizar Tarefa         | EE   | Média              | 4       |
| Listar Tarefa            | CE   | Média              | 4       |
| Deletar Tarefa           | EE   | Média              | 4       |
| Listar Tarefas Atrasadas | SE   | Média              | 5       |
| Visualizar Tarefa        | CE   | Média              | 4       |
|                          |      | **Soma de Dados**  | **25**  |
| > **Lembrete**           |      |                    |         |
| Inserir Lembrete         | EE   | Baixa              | 3       |
| Atualizar Lembrete       | EE   | Baixa              | 3       |
| Listar Lembrete          | CE   | Baixa              | 3       |
| Deletar Lembrete         | EE   | Baixa              | 3       |
| Visualizar Lembrete      | CE   | Baixa              | 3       |
|                          |      | **Soma de Dados**  | **15**  |
| > **Projeto**            |      |                    |         |
| Inserir Projeto          | EE   | Média              | 4       |
| Atualizar Projeto        | EE   | Média              | 4       |
| Listar Projeto           | CE   | Média              | 4       |
| Deletar Projeto          | EE   | Média              | 4       |
| Visualizar Projeto       | CE   | Baixa              | 4       |
|                          |      | **Soma de Dados**  | **20**  |
| > **Usuário**            |      |                    |         |
| Inserir Usuário          | EE   | Média              | 3       |
| Atualizar Usuário        | EE   | Média              | 3       |
| Listar Usuário           | CE   | Média              | 3       |
| Deletar Usuário          | EE   | Média              | 3       |
| Visualizar Usuário       | CE   | Baixa              | 3       |
|                          |      | **Soma de Dados**  | **15**  |
|                          |      | **Total de Dados** | **103** |
