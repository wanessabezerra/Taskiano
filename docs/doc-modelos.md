# Documento de Modelos

Neste documento temos o modelo de Dados (Entidade-Relacionamento). Temos também a descrição das entidades e o dicionário de dados.


## Modelo de Dados

Abaixo apresentamos o modelo dados (Entidade-Relacionamento) usando o **BrModelo**.

 ![Modelo UML](yuml/monitoria-modelo.png)

## Descrição das Entidades


## Dicionário de Dados

Dicionário de dados centraliza informações sobre o conjunto de dados (dataset) sob análise. Seu propósito é melhorar a comunicação entre todos os envolvidos no projeto, além de ser um repositório (documento) que descreve de forma estruturada, o significado, origem, relacionamento e uso dos dados.

## Tabela: Doador

| Atributo           | Chave       | Tipo de dado  | Tamanho      | Descrição                            |
|--------------------|:-----------:|:-------------:|:------------:|--------------------------------------|
| codigo             | PK          |  NUMERIC      |       4      | Identificador incremental de doador. |
| nome               | NN          |  VARCHAR[100] |     100      | Nome do doador.                      |
| sexo               | NN          |  CHAR[1]      |       1      | Sexo do doador (M/F).                |
| tipo de sangue     | NN          |  CHAR[3]      |       3      | Tipo sanguineo.                      |
| data_de_nascimento | NN          |  CHAR[10]     |      10      | Data formato (XX/XX/XXXX).           |
| cod_endereco       | FK          |  NUMERIC      |              | Chave para um endereço.              |

## Tabela: Telefone

| Atributo           | Chave      | Tipo de dado  | Tamanho      | Descrição                            |
|--------------------|:----------:|:-------------:|:------------:|--------------------------------------|
| cod_doador         |     FK     |  NUMERIC      |              | Chave para um doador.                |
| numero_fone        |     NN     |  CHAR[14]     |     14       | Telefone com formato: (XX)XXXXX-XXXX.|

## Tabela: Endereço

| Atributo        | Chave  | Tipo de dado  | Tamanho      | Descrição                                     |
|-----------------|:------:|:-------------:|:------------:|-----------------------------------------------|
| codigo          |  PK    |   NUMERIC     |      4       |  Identificador incremental de endereço.       |
| rua             |  NN    |   VARCHAR[50] |      50      |  Rua limitada a 50 caracteres.                |
| numero          |  NN    |   NUMERIC     |       4      |  Numero limitada a 4 caracteres.              |
| bairro          |  NN    |   VARCHAR[50] |      50      |  Bairro limitada a 50 caracteres.             |
| cidade          |  NN    |   VARCHAR[50] |      50      |  Cidade limitada a 50 caracteres.             |
| estado          |  NN    |   VARCHAR[50] |      50      |  Estado limitada a 50 caracteres.             |
| cep             |  NN    |   NUMERIC     |      10      |  Cep limitada a 10 caracteres.                |

## Tabela: Funcionário  

| Atributo             | Chave       | Tipo de dado  | Tamanho      | Descrição                                     |
|----------------------|:-----------:|:-------------:|:------------:|-----------------------------------------------|
| codigo               | PK          |   NUMERIC     |      4       | Identificador incremental de funcionario.     |
| nome                 | NN          |   CHAR[100]   |     100      | Nome do usuario/funcionario de acesso.        |
| email                | NN          |   CHAR[256]   |     256      | Email com limite padrão de 256 caracteres.    |
| username             | NN          |   CHAR[100]   |     100      | Identificação unica.                          |
| cod_endereco         | FK          |   NUMERIC     |              | Chave para um endereço.                       |

## Tabela: Banco de Sangue

| Atributo      | Chave | Tipo de dado  | Tamanho      | Descrição                                       |
|-------------- |:-----:|:-------------:|:------------:|-------------------------------------------------|
| codigo        | PK    |   NUMERIC     |      4       | Identificador incremental de banco de sangue.   |
| nome          | NN    |   VARCHAR[50] |      50      | Limite de caracteres varia.                     |
| capacidade    | NN    |   NUMERIC     |      4       | Capacidade maxima do banco.                     |

## Tabela: FuncionarioBanco_de_Sangue

| Atributo           | Chave      | Tipo de dado  | Tamanho | Descrição                     |
|--------------------|:----------:|:-------------:|:-------:|-------------------------------|
| cod_funcionario    |     FK     |  NUMERIC      |         | Chave para um funcionário.    |
| cod_banco_de_sangue|     FK     |  NUMERIC      |         | Chave para um banco de sangue.|

## Tabela: Bolsa de Sangue

| Atributo                  | Chave | Tipo de dado  | Tamanho      | Descrição                                     |
|---------------------------|:-----:|:-------------:|:------------:|-----------------------------------------------|
| codigo                    | PK    |   NUMERIC     |      4       | Identificador incremental de tipo sanguineo.  |
| identificacao_da_doacao   | NN    |   NUMERIC     |      4       | Identificador da doacao.                      |
| data_hora_coleta          | NN    |   DATATIME    |     10       | Coleta de sangue.                             |
| tipo_de_doacao            | NN    |   CHAR[20]    |     20       | Se a doação é Voluntária, Autóloga.           |
| data_hora_de_validade     | NN    |   DATATIME    |     10       | Data de validade do sangue coletado.          |
| cod_tipo_sanguineo        | FK    |   NUMERIC     |              | Chave para um tipo sanguíneo.                 |
| cod_tipo_de_hemocomponente| FK    |   NUMERIC     |              | Chave para um tipo de hemocomponente presente.|

## Tabela: Tipo sanguíneo

| Atributo        | Chave  | Tipo de dado  | Tamanho      | Descrição                                     |
|-----------------|:------:|:-------------:|:------------:|-----------------------------------------------|
| codigo          |  PK    |   NUMERIC     |      4       | Identificador incremental de tipo sanguíneo.  |
| nome            |  NN    |   VARCHAR[50] |      50      | Identificação do tipo sanguineo coletado.     |

## Tabela: Tipo de hemocomponente

| Atributo        | Chave | Tipo de dado  | Tamanho      | Descrição                                     |
|-----------------|:-----:|:-------------:|:------------:|-----------------------------------------------|
| codigo          | PK    |   NUMERIC     |      4       | Identificador incremental de hemocomponente.  |
| nome            | NN    |   VARCHAR[100]|    100       | Nome do homocomponente.                       |
| descricao       | NN    |   VARCHAR[256]|    256       | Descrição do homocomponente.                  |

## Tabela: DoadorBolsa_de_Sangue

| Atributo           | Chave      | Tipo de dado  | Tamanho | Descrição                     |
|--------------------|:----------:|:-------------:|:-------:|-------------------------------|
| cod_doador         |     FK     |  NUMERIC      |         | Chave para um doador.         |
| cod_bolsa_de_sangue|     FK     |  NUMERIC      |         | Chave para um bolsa de sangue.|

## Tabela: Bolsa_de_SangueBanco_de_Sangue

| Atributo           | Chave      | Tipo de dado  | Tamanho | Descrição                     |
|--------------------|:----------:|:-------------:|:-------:|-------------------------------|
| cod_bolsa_de_sangue|     FK     |  NUMERIC      |         | Chave para um bolsa de sangue.|
| cod_banco_de_sangue|     FK     |  NUMERIC      |         | Chave para um banco de sangue.|

## Tabela: Saída

| Atributo          | Chave | Tipo de dado  | Tamanho      | Descrição                                     |
|:----------------- |:-----:|:-------------:|:------------:|-----------------------------------------------|
| codigo            | PK    |  NUMERIC      |     4        | Identificador incremental de saída.           |
| nome_do_hospital  | NN    |  VARCHAR[100] |     100      | Nome do hospital.                             |
| nome_do_paciente  | NN    |  VARCHAR[100] |     100      | Nome do paciente.                             |
| data_hora_de_saida| NN    |  DATETIME     |     10       | Data de saida.                                |

## Tabela: Bolsa_de_SangueSaida

| Atributo           | Chave      | Tipo de dado  | Tamanho | Descrição                     |
|--------------------|:----------:|:-------------:|:-------:|-------------------------------|
| cod_bolsa_de_sangue|     FK     |  NUMERIC      |         | Chave para um bolsa de sangue.|
| cod_saida          |     FK     |  NUMERIC      |         | Chave para uma saída.         |

### Referências

[Exemplo de Dicionário - IBM](https://publib.boulder.ibm.com/tividd/td/ITMFTP/GC23-4803-00/pt_BR/HTML/TMTPmst80.htm)

[Dicionário de Dados](https://www.luis.blog.br/dicionario-de-dados.html)

[Dicionário de Dados Portal Dados Abertos](https://tce.pe.gov.br/internet/docs/dadosabertos/TomeConta2017DicionarioDados.pdf)
