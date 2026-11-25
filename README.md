# SQLingo v1.0

PWA mobile-first em português. 110 lições em sete módulos de PostgreSQL, com dados fictícios de geração de energia. Login e persistência de progresso em PostgreSQL; PGlite em workers efêmeros para consultas educacionais (incluindo DDL/DML). 

## Recursos
Diagnóstico de cinco questões, provas práticas de três desafios por módulo, revisão espaçada (1/3/7/14/30 dias), laboratório SQL somente leitura, trilha progressiva, aquecimento de completar código, SQL real, revisão de erros, XP inicial e revisão diária, metas e missões, calendário de ofensiva, conquistas, gemas, proteção de ofensiva, ranking semanal com opção de privacidade, amizade com convites, incentivos e desafio cooperativo semanal, alteração de senha.

## Executar
Node 22, npm install, DATABASE_URL apontando para um PostgreSQL dedicado, npm start. NODE_ENV=production exige HTTPS. Railway: Dockerfile, /health. npm test executa soluções das 110 lições. Migrações aditivas e IDs históricos preservados. Baixe módulos e o motor PGlite no navegador; pratique offline e sincronize as consultas ao retornar. O servidor revalida as soluções, com recibos idempotentes e XP/ofensiva atribuídos à data da sincronização. Somente a última conta autenticada pode abrir seu perfil offline; nenhuma senha é armazenada localmente. Dados locais dependem do armazenamento do navegador. Ranking, avaliações, loja e recursos sociais requerem internet. 

## Limites
PWA instalável, não aplicativo binário de loja; execução de lições baixadas funciona offline; sincronização requer internet. Não há equivalência integral com Duolingo, pagamentos, notificações push, áudio, recuperação por e-mail ou promoção automática entre ligas. Validação por estado/resultado no sandbox não prova equivalência universal; EXPLAIN tem validação textual. Não há dados industriais reais. Ofensiva usa fuso America/Sao_Paulo; proteção cobre um dia perdido após retornar ao app, não períodos longos de ausência. 

GitHub Actions executa teste de sintaxe, soluções de referência e integração em PostgreSQL descartável. Conquistas são permanentes após desbloqueio.
