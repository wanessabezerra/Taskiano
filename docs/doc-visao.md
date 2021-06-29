# Documento de Visão

## Equipe e Definição de Papéis

| Membro    | Papel                                      | E-mail                      | GitHub                                            |
| --------- | ------------------------------------------ | --------------------------- | ------------------------------------------------- |
| Adalberto | Gerente, Analista, Testador, Desenvolvedor | btow.m@hotmail.com          |[Clique aqui :octocat:](https://github.com/batbeto)              |
| Lucas     | Gerente, Analista, Testador, Desenvolvedor | santoslucas9956@gmail.com   |[Clique aqui :octocat:](https://github.com/LucasSilva01)    |
| Wanessa   | Gerente, Analista, Testador, Desenvolvedor | wanessaparelhas68@gmail.com |[Clique aqui :octocat:](https://github.com/wanessabezerra)|
| Zau       | Gerente, Analista, Testador, Desenvolvedor | zauhdf@gmail.com            |[Clique aqui :octocat:](https://github.com/ZauJulio)            |

### Matriz de Competências

| Membro    | Competências                                                                                                      |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| Adalberto | Desenvolvedor JavaScript, Python, Hibernate, JSP, JPA, TypeScript, Spring Boot, React                             |
| Lucas     | Desenvolvedor Javascript, React, NexjtJS, Python, MongoDB, MySQL                                                  |
| Wanessa   | Gerente e Desenvolvedora Python, C, Django, HTML, CSS, JavaScript                                                 |
| Zaú       | Software Tester e Desenvolvedor Javascript, Typescript, React, Nexjtjs, Python, Qt, Firebase, MongoDB, PostgreSQL |

## Perfis dos Usuários

O sistema poderá ser utilizado por usuários. Temos os seguintes perfis/atores:

| Perfil        | Descrição                                                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Administrador | Este usuário utiliza qualquer função.                                                                                                                          |
| Usuário       | Este usuário utiliza as funções de cadastro, edição, alteração e exclusão das tarefas, assim como pode sugerir tarefas para outros usuários e compartilha-las. |

## Lista de Requisitos Funcionais

| Requisito                                         | Descrição                                                                   | Ator    |
| ------------------------------------------------- | --------------------------------------------------------------------------- | ------- |
| RF01 - Incluir Tarefa                             | Uma tarefa tem os atributos nome, data, descrição curta, contatos, situação | Usuário |
| RF02 - Alterar Tarefa                             | A alteração permite a mudança de todos os atributos de uma tarefa           | Usuário |
| RF03 - Listar Tarefas                             | Lista todas as suas tarefas ativas                                          | Usuário |
| RF04 - Visualizar Tarefas                         | Visualiza a tarefa compartilhada                                            | Usuário |
| RF05 - Excluir Tarefas                            | Remove as tarefas                                                           | Usuário |
| RF06 - Solicitar Alterações de Tarefa             | Solicita acesso a uma tarefa visualizada                                    | Usuário |
| RF07 – Criar Projetos de Tarefas                  | Cria um projeto de tarefas para agrupa-las                                  | Usuário |
| RF08 – Excluir Projetos de Tarefas                | Remove o projeto de tarefas                                                 | Usuário |
| RF09 – Alterar Projetos de Tarefas                | Altera o nome do projeto                                                    | Usuário |
| RF10 – Arquivar Projetos de Tarefas               | Arquiva todo o projeto, incluindo tarefas                                   | Usuário |
| RF11 – Incluir Comentários nas Tarefas            | Inclui comentários que podem ser observados pelos usuários                  | Usuário |
| RF12 – Incluir Imagens nas Tarefas                | Inclui imagens que podem ser observados pelos usuários                      | Usuário |
| RF13 – Incluir Links nas Tarefas                  | Inclui imagens que podem ser observados pelos usuários                      | Usuário |
| RF14 – Colocar Prioridades em Tarefas ou Projetos | Coloca prioridade das tarefas para aumentar eficiência                      | Usuário |
| RF15 – Alterar Usuário                            | Altera dados cadastrais do usuário                                          | Usuário |
| RF16 – Cadastrar Usuário                          | Um usuário contém nome, email, username e data de nascimento                | Usuário |
| RF17 – Consultar Usuário                          | Exibe as informações básicas do usuário cosultado                           | Usuário |
| RF18 – Vizualizar detalhes do Usuário             | Exibe as informações detalhadas do usuário cosultado                        | Usuário |
| RF19 – Excluir Usuário                            | Remove a conta do usuário do sistema                                        | Usuário |

## Lista de Requisitos Não-Funcionais

| Requisito                                    | Descrição                                                                     |
| -------------------------------------------- | ----------------------------------------------------------------------------- |
| RNF001 - Deve ser acessível via navegador    | Deve abrir perfeitamento no Firefox e no Chrome.                              |
| RNF002 - Consultas deve ser eficiente        | O sistema deve executar as consultas em milessegundos.                        |
| RNF003 - Log e histórico de acesso e funções | Deve manter um log de todos os acessos e das funções executadas pelo usuário. |

## Riscos

Tabela com o mapeamento dos riscos do projeto, as possíveis soluções e os responsáveis.

| Data       | Risco                                                                  | Prioridade | Responsável | Status  | Providência/Solução                                            |
| ---------- | ---------------------------------------------------------------------- | ---------- | ----------- | ------- | -------------------------------------------------------------- |
| 24/06/2021 | Não aprendizado das ferramentas utilizadas pelos componentes da equipe | Alta       | Gerente     | Vigente | Reforçar estudos sobre as ferramentas.                         |
| 24/06/2021 | Ausência por qualquer membro da equipe                                 | Média      | Gerente     | Vigente | Planejar o cronograma tendo em base a agenda dos membros.      |
| 24/06/2021 | Divisão de tarefas mal sucedida                                        | Baixa      | Gerente     | Vigente | Acompanhar de perto o desenvolvimento de cada membro da equipe |
