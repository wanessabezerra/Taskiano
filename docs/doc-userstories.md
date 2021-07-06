# Documento Lista de User Stories

Documento construído a partido do **Modelo BSI - Doc 004 - Lista de User Stories** que pode ser encontrado no
link: <https://docs.google.com/document/d/1Ns2J9KTpLgNOpCZjXJXw_RSCSijTJhUx4zgFhYecEJg/edit?usp=sharing>

## Descrição

Este documento descreve os User Stories criados a partir da Lista de Requisitos no [Documento 001 - Documento de Visão](doc-visao.md). Este documento também pode ser adaptado para descrever Casos de Uso. Modelo de documento baseado nas características do processo easYProcess (YP).

## Histórico de revisões

| Data       | Versão |                           Descrição                            | Autor                    |
| :--------- | :----: | :------------------------------------------------------------: | :----------------------- |
| 25/06/2021 | 0.0.1  |               Template e descrição do documento                | Wanessa da Silva Bezerra |
| 29/06/2021 | 0.0.2  |                Detalhamento do User Story US01                 | Lucas da Silva santos    |
| 05/07/2021 | 0.1.0  |                  Correções do User Story US01                  | Zaú Júlio Araújo Galvão  |
| 05/07/2021 | 0.2.0  |                Detalhamento do User Story US02                 | Wanessa da Silva Bezerra |
| 16/07/2021 | 1.0.0  | Documento completo com o detalhamento de todos os User Stories |                          |

### User Story US01 - Manter Usuário

|               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descrição** | O sistema deve manter um cadastro de usuário que tem acesso ao sistema via login e senha. Um usuário tem os atributos name, id, email, username, data de nascimento, tipo de usuário, status, password, avatarURL. O email será o login e ele pode registrar-se diretamente no sistema, o avatarURL é um link para uma foto de seu perfil. Além disso o usuário poderá alterar alguns dados, como o e-mail ou a senha. O usuário administrador do sistema pode realizar as operações de adicionar, alterar, remover e listar os usuários comuns do sistema. |

| **Requisitos envolvidos** |                                |
| ------------------------- | :----------------------------- |
| RF15                      | Cadastrar Usuário              |
| RF16                      | Alterar Usuário                |
| RF17                      | Consultar Usuários             |
| RF18                      | Vizualizar detalhes do Usuário |
| RF19                      | Excluir Usuário                |

|                         |           |
| ----------------------- | :-------- |
| **Prioridade**          | Essencial |
| **Estimativa**          | 8 h       |
| **Tempo Gasto (real):** |           |
| **Tamanho Funcional**   | 7 PF      |

| Testes de Aceitação (TA) |                                           |
| ------------------------ | ----------------------------------------- |
| **Código**               | **Descrição**                             |
| **TA01.01**              | Descrever o teste de aceitação 01 do US01 |
| **TA01.02**              | Descrever o teste de aceitação 02 do US01 |
| **TA01.03**              | Descrever o teste de aceitação 03 do US01 |
| **TA01.04**              | Descrever o teste de aceitação 04 do US01 |

### User Story US02 - Manter Tarefa

|               |                                                                                                                                                                                                                                    |
| ------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descrição** | O sistema deve manter um cadastro de tarefas. Uma tarefa tem os atributos id, fixed, name, note, super, createDate, completeDate, priority, timer. O código será a chave primeira e os atributos serão registrados pelo o usuário. |

| **Requisitos envolvidos** |                                           |
| ------------------------- | :---------------------------------------- |
| RF01                      | Cadastrar Tarefa                          |
| RF02                      | Alterar Tarefa                            |
| RF03                      | Consultar Usuários                        |
| RF04                      | Vizualizar detalhes do Usuário            |
| RF05                      | Excluir Usuário                           |
| RF06                      | Solicitar acesso a uma tarefa visualizada |

|                         |           |
| ----------------------- | :-------- |
| **Prioridade**          | Essencial |
| **Estimativa**          | 8 h       |
| **Tempo Gasto (real):** |           |
| **Tamanho Funcional**   | 7 PF      |

| Testes de Aceitação (TA) |                                                                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Código**               | **Descrição**                                                                                                                                                                                                                         |
| **TA02.01**              | O usuário informa, na tela Tarefa, todos os dados da tarefa para registrar corretamente, ao clicar em salvar ele é notificado com uma mensagem de sucesso. Mensagem: Cadastro realizado com sucesso.                                  |
| **TA02.02**              | O usuário informa, na tela Tarefa, os dados da tarefa para registrar incorretamente, ao clicar em salvar ele é notificado com uma mensagem de erro. Mensagem: Cadastro não realizado, o campo “xxxx” não foi informado corretamente.  |
| **TA02.03**              | O usuário informa, na tela Tarefa, todos os dados da Tarefa para que ele deseja atualizar corretamente, ao clicar em salvar ele é notificado com uma mensagem de sucesso. Mensagem: Tarefa atualizada com sucesso.                    |
| **TA02.04**              | O usuário informa, na tela Tarefa, os dados da tarefa para atualizar incorretamente, ao clicar em salvar ele é notificado com uma mensagem de erro. A tarefa não foi atualizado, o campo “xxxx” não foi informado corretamente.       |
| **TA02.05**              | O usuário informa, na tela Tarefa, a tarefa que ele deseja excluir corretamente, ao clicar em salvar ele é notificado com uma mensagem de sucesso. Mensagem: Tarefa deletada com sucesso.                                             |
| **TA02.06**              | O usuário informa, na tela Tarefa, os dados da tarefa que deseja excluir incorretamente, ao clicar em salvar ele é notificado com uma mensagem de erro. A tarefa não foi deletado, o código da tarefa não foi informado corretamente. |
