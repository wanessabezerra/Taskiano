<h1>Cálculo do Tamanho Funcional com APF</h1>

<h2>Sumário</h2>

- [1. Histórico de revisões](#1-histórico-de-revisões)
- [2. Contagem Indicativa (Ci)](#2-contagem-indicativa-ci)
  - [2.1. Duração e custo considerando produtividade 8h/PF e Ci = 205 PF](#21-duração-e-custo-considerando-produtividade-8hpf-e-ci--205-pf)
  - [2.2. Duração e custo considerando produtividade 1h/PF e Ci = 133 PF](#22-duração-e-custo-considerando-produtividade-1hpf-e-ci--133-pf)
- [3. Contagem Estimativa](#3-contagem-estimativa)
- [4. Contagem Detalhada](#4-contagem-detalhada)

# 1. Histórico de revisões

| Data       | Versão | Descrição         | Autor                   |
| ---------- | ------ | ----------------- | ----------------------- |
| 07/07/2021 | 1.0    | Documento Inicial | Zaú Júlio Araújo Galvão |

# 2. Contagem Indicativa (Ci)

Na contagem indicativa só é necessário analisar os **ALIs** (Arquivos Lógicos Internos) com o valor de **35 PF** cada
e os **AIEs** (Arquivos de Interface Externa) com o valor de **15 PF** cada.

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

## 2.1. Duração e custo considerando produtividade 8h/PF e Ci = 205 PF

A produtividade de python é 8h/PF (alta produtividade segundo a SERPRO).
Com Duração de 1640 horas, um dev trabalhando 8h por dia temos 205 dias de duração.
Custo de R$ 17,00 por hora, então totalizamos R$ 27880,00.

## 2.2. Duração e custo considerando produtividade 1h/PF e Ci = 133 PF

A produtividade de python com 1h/PF.
Com Duração de 133 horas, um dev trabalhando 8h por dia temos 17 dias de duração.
Custo de R$ 17,00 por hora, então totalizamos R$ 2261,00.

# 3. Contagem Estimativa

# 4. Contagem Detalhada
