<h1>Taskiano: Projeto Arquitetural do Software</h1>

---

Criado a partir de: [Processo BSI - Projeto Arquitetural](https://docs.google.com/document/d/1i80vPaInPi5lSpI7rk4QExnO86iEmrsHBfmYRy6RDSM/edit)

---

<h2>Sumário</h2>

- [1. Descrição](#1-descrição)
  - [1.1. Histórico de revisões](#11-histórico-de-revisões)
- [2. Visão Geral](#2-visão-geral)
- [3. Requisitos Não Funcionais](#3-requisitos-não-funcionais)
- [4. Mecanismos arquiteturais](#4-mecanismos-arquiteturais)
  - [4.1. Tecnologias](#41-tecnologias)
- [5. Decisões de Design](#5-decisões-de-design)
- [6. Validação com Casos de Teste](#6-validação-com-casos-de-teste)
- [7. Componentes](#7-componentes)
- [8. Implantação](#8-implantação)
- [9. Referências](#9-referências)

## 1. Descrição

Descrição do documento. Focar no conteúdo.

### 1.1. Histórico de revisões

| Data       | Versão | Descrição         | Autor     |
| ---------- | ------ | ----------------- | --------- |
| 05/07/2021 | 1.0    | Documento Inicial | Zaú Júlio |

## 2. Visão Geral

Preparar uma imagem e descrever de forma sucinta a arquitetura.

![alt_text](images/image1.jpg "image_tooltip")

Figure 1. Imagem que representa a visão geral no documento. Fonte: [https://sites.google.com/site/projetowebsae/projeto-arquitetural](https://sites.google.com/site/projetowebsae/projeto-arquitetural)

## 3. Requisitos Não Funcionais

**Requisitos não-funcionais:** nesta fase do documento, é necessário listar os requisitos não funcionais encontrados no sistema, tais como: portabilidade, usabilidade, desempenho e etc. O objetivo é colocar o nome do requisito e descrever com detalhes suas características.

Exemplo:

<table>
  <tr>
   <td>Desempenho</td>
   <td>
      <p> <strong> 1.</strong> A página principal tem que ser carregada em no máximo 3 segundos com uma conexão mínima de 256kbps.
      <p> <strong> 2.</strong> As páginas que recuperam informações de sistemas legados, devem responder em dois segundos a cada 10.000 (contextual) em uma conexão de 256kbps.
      <p> <strong> 3.</strong> As páginas que recuperam informações de transações no banco de dados da própria aplicação, deve responder em um segundo a cada 10.000 registros (contextual), retornados em uma conexão de 256kbps.
      <p> <strong> 4.</strong> O servidor deve suportar 100.000 conexões simultâneas sem perda de desempenho.
    </td>
  </tr>
  <tr>
    <td>Interoperabilidade</td>
    <td>
      <p> <strong> 1. </strong> Deve ser desenvolvido na plataforma .NET com banco de dados SQL Server Enterprise ou Oracle 10g.
    </td>
  </tr>
</table>

## 4. Mecanismos arquiteturais

Nesta fase do documento, devemos listar os mecanismos arquiteturais encontrados no sistema, ou seja, identificar todos os mecanismos de análise, mecanismo de design e mecanismo de implementação. O intuito desta etapa é verificar e garantir que todas as preocupações técnicas relativas à arquitetura do sistema tenham sido capturadas.

Exemplo:

| Mecanismo de Análise                       | Mecanismo de Design                                                                    | Mecanismo de Implementação                           |
| ------------------------------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Persistência                               | Banco de dados relacional                                                              | SQL Server Enterprise                                |
| Integração com sistemas legados (Cobrança) | Interface utilizando XML em serviço e arquivo texto.                                   | Web Service e System.IO                              |
| Log                                        | Implementação dos recursos de log do componente de persistência.                       | ADO.NET                                              |
| Recursos avançados de Web 2.0              | Implementação de recursos para usabilidade.                                            | Silverlight e WPF (Windows Presentation Foundation). |
| Camada de distribuição                     | Classe de comunicação com o banco, classe de persistência.                             | ADO.NET Entity                                       |
| Front-End                                  | Interface de comunicação com o usuário do portal.                                      | ASP.NET, Ajax, Silverlight, WPF.                     |
| Tratamento de exceções                     | Camada para tratar as exceções criando interações diferentes para usuários e técnicos. | ASP.NET e C#.                                        |
| Build                                      | Programação da IDE para validação do código fonte.                                     | Visual Studio Team System Foundation Server.         |
| Deploy                                     | Configuração da IDE de deploy.                                                         | Visual Studio Team System Foundation Server.         |
|                                            |                                                                                        |                                                      |

### 4.1. Tecnologias

Detalhar as tecnologias utilizadas na implementação.

## 5. Decisões de Design

**Fundamentação:** nesta fase, o arquiteto deve fundamentar todas as decisões importantes de design. Além disso, deve descrever as alternativas significativas rejeitadas no projeto. Esta seção pode indicar hipóteses, restrições, resultados de análises e experiências significativas para a arquitetura.

Por exemplo:

- Porque utilizar arquitetura REST?
- Porque utilizar arquitetura monolítica e não de micro-serviço?

## 6. Validação com Casos de Teste

Nesta fase selecionar User Stories com cenários escolhidos para a validação da arquitetura apresentada. Casos de uso, backlog, requisitos de usuários ou qualquer outro nome que represente os itens relevantes para o funcionamento do sistema final, o intuito é exercitar e testar os principais aspectos de risco da arquitetura.

Exemplo:

|            |                                                   |
| ---------- | ------------------------------------------------- |
| User Story | Motivos da escolha                                |
| US 01      | Descrever o motivo e os itens que serão testados. |
| US 04      | ...                                               |
|            |                                                   |

## 7. Componentes

Nesta fase, o arquiteto deve apresentar o diagrama de componentes. É recomendado como boas práticas de mercado o uso do modelo UML para criação do diagrama, que deve apresentar os possíveis componentes e suas dependências. Além disso, o arquiteto deve criar uma tabela detalhando as responsabilidades de cada componente.

Exemplo:

![alt_text](images/image2.jpg "image_tooltip")

Figure 2. Representação gráfica com diagrama UML para representar os componentes.

|            |                                                                     |
| ---------- | ------------------------------------------------------------------- |
| Componente | Descrição                                                           |
| BackOffice | Descrever de forma sucinta as responsabilidades deste componente... |
| Assinante  |                                                                     |
| Serviço    |                                                                     |
| Financeiro |                                                                     |
| Pesquisa   |                                                                     |
| Suporte    |                                                                     |
| Log        |                                                                     |
| Segurança  |                                                                     |

## 8. Implantação

O arquiteto deve descrever as configurações de distribuição dos componentes de software na área física em que serão implantados.

Exemplo:

![alt_text](images/image3.jpg "image_tooltip")

Figure 3 Representação de um cenário para implantação

Read more:[http://www.linhadecodigo.com.br/artigo/3343/como-documentar-a-arquitetura-de-software.aspx#ixzz5AE2cXUmI](http://www.linhadecodigo.com.br/artigo/3343/como-documentar-a-arquitetura-de-software.aspx#ixzz5AE2cXUmI)

## 9. Referências

(coloque aqui, artigos, livros e sites utilizados e citados no documento)
