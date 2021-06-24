# Documento de Visão

## Equipe e Definição de Papéis

Membro     |  Papel                 |   E-mail                    |
---------  | ---------------------- | --------------------------- |
Adalberto  | Desenvolvedor          | btow.m@hotmail.com          |
Lucas      | Desenvolvedor          | santoslucas9956@gmail.com   |
Wanessa    | Gerente, Desenvolvedor | wanessaparelhas68@gmail.com |
Zau        | Analista, Testador     | zauhdf@gmail.com            |

### Matriz de Competências

Membro     |  Competências                                                                              |
---------  | ------------------------------------------------------------------------------------------ |
Adalberto  | Desenvolvedor JavaScript, Python, Hibernate, JSP, JPA, TypeScript, Spring Boot, React, etc |
Lucas      | Desenvolvedor JavaScript, Python, Hibernate, JSP, JPA, TypeScript, Spring, React, etc |
Wanessa    | Gerente e Desenvolvedora Python, JavaScript, Hibernate, JSP, JPA, TypeScript, Spring, React, etc |
Zau        | Software Tester e Desenvolvedor JavaScript, Python, Hibernate, JSP, JPA, TypeScript, Spring,     |

## Perfis dos Usuários

O sistema poderá ser utilizado por usuários. Temos os seguintes perfis/atores:

Perfil        | Descrição                                                                            |
------------- | ------------------------------------------------------------------------------------ |
Administrador | Este usuário utiliza qualquer função.                                                |
Usuário       | Este usuário utiliza as funções de cadastro, edição, alteração e exclusão das tarefas, assim como pode sugerir tarefas para outros usuários e compartilha-las.|

## Lista de Requisitos Funcionais

Requisito                                 | Descrição   | Ator |
---------                                 | ----------- | ---------- |
RF01 - Incluir Tarefa | Uma tarefa tem os atributos nome, data, descrição curta, contatos, situação | Administrador/Usuário |
RF02 - Alterar Tarefa | A alteração permite a mudança de todos os atributos de uma tarefa.          | Administrador/Usuário |
RF03 - Listar Tarefas | Lista todas as suas tarefas ativas                                          | Administrador/Usuário |
RF04 - Visualizar Tarefas | Visualiza a tarefa compartilhada | Administrador/Usuário |
RF05 - Excluir Tarefas | Remove as tarefas | Administrador/Usuário |
RF06 - Solicitar Alterações de Tarefa | Solicita acesso a uma tarefa visualizada | Administrador/Usuário |
RF07 – Criar Quadros de Tarefas | Cria um quadro de tarefas para agrupa-las | Administrador/Usuário |
RF08 – Excluir Quadros de Tarefas | Remove o quadro de tarefas | Administrador/Usuário |
RF09 – Alterar Quadros de Tarefas | Altera o nome do quadro |Administrador/Usuário |
RF10 – Arquivar Quadros de Tarefas | Arquiva todo o quadro, incluindo tarefas | Administrador/Usuário |
RF11 – Compartilhar Quadros de Tarefas | Permite convidar outros usuarios para vê o quadro | Administrador/Usuário |
RF12 – Incluir Comentários nas Tarefas | Inclui comentarios que podem ser observados pelos usuarios | Administrador/Usuário |
RF13 – Colocar Ranking de Sucesso da Tarefa | Coloca um ranking de eficiência da tarefa | Administrador/Usuário |
RF14 – Colocar Prioridades em Tarefas ou Quadros | Coloca prioridade das tarefas para aumentar eficiência | Administrador/Usuário |
RF15 – Remover Usuário | Remove o usuario da base de dados, não permitindo mais o acesso | Administrador |
RF16 – Suspender Usuário | Puni o usuario durante um periodo de tempo, impedindo de usar a ferramenta | Administrador |
RF17 – Alterar Usuário | Altera dados cadastrais do usuario | Administrador/ Usuário |

### Modelo Conceitual

#### Descrição das Entidades

## Lista de Requisitos Não-Funcionais

Requisito                                    | Descrição                                                          |
------------------------------------------   | ------------------------------------------------------------------ |
RNF001 - Deve ser acessível via navegador    | Deve abrir perfeitamento no Firefox e no Chrome.                   |
RNF002 - Consultas deve ser eficiente        | O sistema deve executar as consultas em milessegundos.             |
RNF003 - Log e histórico de acesso e funções | Deve manter um log de todos os acessos e das funções executadas pelo usuário. |

## Riscos

Tabela com o mapeamento dos riscos do projeto, as possíveis soluções e os responsáveis.

Data | Risco | Prioridade | Responsável | Status | Providência/Solução |
------ | ------ | ------ | ------ | ------ | ------ |
24/06/2021|Não aprendizado das ferramentas utilizadas pelos componentes da equipe | Alta | Gerente | Vigente | Reforçar estudos sobre as ferramentas.
24/06/2021 |Ausência por qualquer membro da equipe | Média | Gerente | Vigente | Planejar o cronograma tendo em base a agenda dos membros.
24/06/2021 |Divisão de tarefas mal sucedida | Baixa | Gerente | Vigente |Acompanhar de perto o desenvolvimento de cada membro da equipe

### Referências
