# SOLID API

## Requisitos Funcionais (RF)

Na aplicação, deve ser possível de:

- [ ] o `usuário` se cadastrar (autorização);
- [ ] o `usuário` se autenticar;
- [ ] obter o perfil de um `usuário` logado;
- [ ] obter o número de _check-ins_ realizados pelo `usuário` logado;
- [ ] o `usuário` obter seu histórico de _check-ins_;
- [ ] o `usuário` buscar `academias` próximas;
- [ ] o `usuário` buscar `academias` pelo nome;
- [ ] o `usuário` realizar check-in em uma `academia`;
- [ ] validatar o check-in de um `usuário`;
- [ ] cadastrar uma `academia`;

## Regras de Negócio (RN)

As restrições para a aplicação são que:

- [ ] o `usuário` não deve poder se cadastrar com um _e-mail_ duplicado;
- [ ] o `usuário` não pode fazer 2 _check-ins_ no mesmo dia;
- [ ] o `usuário` não pode fazer check-in se não tiver perto (100m) da `academia`;
- [ ] o _check-in_ só pode ser validado até 20 minutos após criado;
- [ ] o _check-in_ só pode ser validado por `administradores`;
- [ ] a `academia` só pode ser cadastrada por `administradores`;

## Requisitos Não Funcionais (RNF)

De forma descritiva, é necessário que:

- [ ] a senha do usuário precisa estar criptogradafa;
- [ ] os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] todas as listas de dados precisam estar paginadas em 20 itens por página;
- [ ] o usuário deve ser identificado or JWT (JSON Web Token);

## Tabela de Comandos Primas

| Comando             | Descrição                                                           |
| ------------------- | ------------------------------------------------------------------- |
| npx prisma init     | Inicia um banco de dados prisma                                     |
| npx prisma generate | Creia de forma automatizada a timagem dos schemas (`schema.prisma`) |
