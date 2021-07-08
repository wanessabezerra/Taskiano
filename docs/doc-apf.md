<h1>Análise de Pontos de Função - APF</h1>

[Referência APF](https://www.ifpug.org/?lang=pt)

<h2>Sumário</h2>

- [1. Descrição](#1-descrição)
  - [1.1. Histórico de revisões](#11-histórico-de-revisões)
- [2. Contagem Indicativa (Ci)](#2-contagem-indicativa-ci)
  - [2.1. Descrição](#21-descrição)
  - [2.2. Contagem](#22-contagem)
  - [2.3. Duração e custo considerando produtividade 8h/PF e Ci = 205 PF](#23-duração-e-custo-considerando-produtividade-8hpf-e-ci--205-pf)
  - [2.4. Duração e custo considerando produtividade 1h/PF e Ci = 133 PF](#24-duração-e-custo-considerando-produtividade-1hpf-e-ci--133-pf)
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

| Data       | Versão | Descrição                                   | Autor                   |
| ---------- | ------ | ------------------------------------------- | ----------------------- |
| 07/07/2021 | 1.0    | Documento Inicial                           | Zaú Júlio Araújo Galvão |
| 08/07/2021 | 1.1    | Revisão estrutural                          | Zaú Júlio Araújo Galvão |
| 08/07/2021 | 1.2    | Revisão estrutural, Descrições e Referência | Zaú Júlio Araújo Galvão |

# 2. Contagem Indicativa (Ci)

## 2.1. Descrição

A Contagem Indicativa do Tamanho Funcional, ou CI, é uma medida de software, baseada em uma avaliação padronizada dos requisitos lógicos dos usuários. Tem por objetivo fornecer uma estimativa padronizada do tamanho e complexidade de um software.

## 2.2. Contagem

Na contagem indicativa é necessário analisar os **ALIs**[1] (Arquivos Lógicos Internos), com o valor padronizado de **35 PF** cada e os **AIEs**[2] (Arquivos de Interface Externa) com o valor de **15 PF** cada.

```txt
[1]  ALI: Grupos lógicos de dados mantidos dentro da fronteira da aplicação.
[2]  AIE: Arquivos apenas referenciados pela aplicação.
```

| ALI/AIE          | Entidades Relacionadas    | PF  |
| ---------------- | ------------------------- | --- |
| AIE Language     | Language                  | 15  |
| AIE Genre        | Genre                     | 15  |
| ALI User         | User e Group              | 35  |
| ALI Library      | Library                   | 35  |
| ALI Author       | Author                    | 35  |
| ALI Book         | Book                      | 35  |
| ALI BookInstance | BookInstance e LoanStatus | 35  |

Tamanho Funcional **Ci = 205 PF** ( 133,25 PF < Ci <= 276,75 PF)

## 2.3. Duração e custo considerando produtividade 8h/PF e Ci = 205 PF

A produtividade de python é 8h/PF (alta produtividade segundo a SERPRO).
Com Duração de 1640 horas, um dev trabalhando 8h por dia temos 205 dias de duração.
Custo de R$ 17,00 por hora, então totalizamos R$ 27880,00.

## 2.4. Duração e custo considerando produtividade 1h/PF e Ci = 133 PF

A produtividade de python com 1h/PF.
Com Duração de 133 horas, um dev trabalhando 8h por dia temos 17 dias de duração.
Custo de R$ 17,00 por hora, então totalizamos R$ 2261,00.

# 3. Contagem Estimativa (Ce)

Na Ce todas as funções de dados são classificados como baixa complexidade.

| ALI/AIE          | Entidades Relacionadas    | PF     |
| ---------------- | ------------------------- | ------ |
| AIE Language     | Language                  | 5      |
| AIE Genre        | Genre                     | 5      |
| ALI User         | User e Group              | 7      |
| ALI Library      | Library                   | 7      |
| ALI Author       | Author                    | 7      |
| ALI Book         | Book                      | 7      |
| ALI BookInstance | BookInstance e LoanStatus | 7      |
|                  | **Total de Dados**        | **45** |

Na Ce todas as operações elementares são classificadas como de média complexidade:
**EE** tem 4 PF, **CE** tem 4 PF e **SE** tem 5 PF.

| Operação                 | Tipo | Complexidade       | PF      |
| ------------------------ | ---- | ------------------ | ------- |
| Insert User              | EE   | Média              | 4       |
| Update User              | EE   | Média              | 4       |
| List User                | CE   | Média              | 4       |
| Delete User              | EE   | Média              | 4       |
| Block User               | EE   | Média              | 4       |
| List Loans User          | SE   | Média              | 5       |
| Insert Author            | EE   | Média              | 4       |
| Update Author            | EE   | Média              | 4       |
| List Author              | CE   | Média              | 4       |
| Delete Author            | EE   | Média              | 4       |
| Insert Genre             | EE   | Média              | 4       |
| List Genre               | CE   | Média              | 4       |
| Insert Language          | EE   | Média              | 4       |
| List Language            | CE   | Média              | 4       |
| Insert Library           | EE   | Média              | 4       |
| Update Library           | EE   | Média              | 4       |
| List Library             | CE   | Média              | 4       |
| Delete Library           | EE   | Média              | 4       |
| List Books Library       | SE   | Média              | 5       |
| List Loans Library       | SE   | Média              | 5       |
| Insert Book              | EE   | Média              | 4       |
| Update Book              | EE   | Média              | 4       |
| List Book                | CE   | Média              | 4       |
| Delete Book              | EE   | Média              | 4       |
| Insert BookInstance      | EE   | Média              | 4       |
| Update BookInstance      | EE   | Média              | 4       |
| List BookInstance        | CE   | Média              | 4       |
| Delete BookInstance      | EE   | Média              | 4       |
| RequestLoan BookInstance | EE   | Média              | 4       |
| AcceptLoan BookInstance  | EE   | Média              | 4       |
| MakeReturn BookInstance  | EE   | Média              | 4       |
|                          |      | **Total de Dados** | **127** |

Tamanho Funcional: Dados + Operações

**Ce** = 45 PF + 127 PF = **172 PF**

# 4. Contagem Detalhada
