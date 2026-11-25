const originalSeed = `CREATE TABLE usinas(id int primary key,nome text);
INSERT INTO usinas VALUES (1,'Jupiá'),(2,'Rosana'),(3,'Ilha Solteira');
CREATE TABLE geracao_energia(id int primary key,usina_id int,unidade text,potencia_mw int,temperatura_c int);
INSERT INTO geracao_energia VALUES (1,1,'UG01',95,65),(2,1,'UG02',102,78),(3,1,'UG03',82,72),(4,2,'UG01',75,71),(5,3,'UG01',170,68),(6,3,'UG02',165,82),(7,2,'UG02',0,NULL);`;
const g='geracao_energia';
export const modules=['Fundamentos','Agregações','Relacionamentos','Consultas intermediárias','SQL avançado','Modelagem e manipulação','Engenharia de Dados'];
const rows=[
[0,'SELECT e FROM','SELECT escolhe as colunas; FROM indica a tabela.','SELECT unidade FROM geracao_energia;','Retorne todas as colunas da tabela geracao_energia.','SELECT * FROM geracao_energia','O asterisco seleciona todas as colunas.'],
[0,'Projeção','Selecione apenas os campos necessários.','SELECT id, unidade FROM geracao_energia;','Retorne unidade e potencia_mw, nesta ordem.','SELECT unidade,potencia_mw FROM geracao_energia','Separe as colunas por vírgula.'],
[0,'WHERE','WHERE filtra registros antes da agregação.','SELECT * FROM geracao_energia WHERE potencia_mw > 80;','Retorne todas as colunas das unidades com potência maior que 100 MW.','SELECT * FROM geracao_energia WHERE potencia_mw > 100','Use o operador >.'],
[0,'AND e OR','AND exige ambas as condições; OR exige pelo menos uma.','SELECT * FROM geracao_energia WHERE potencia_mw > 80 AND temperatura_c > 70;','Retorne todos os campos das unidades com potência maior que 90 e temperatura maior que 70.','SELECT * FROM geracao_energia WHERE potencia_mw > 90 AND temperatura_c > 70','Combine dois filtros com AND.'],
[0,'BETWEEN','BETWEEN inclui os dois limites.','SELECT * FROM geracao_energia WHERE potencia_mw BETWEEN 80 AND 110;','Retorne todos os campos com potência entre 70 e 100 MW, inclusive.','SELECT * FROM geracao_energia WHERE potencia_mw BETWEEN 70 AND 100','Use BETWEEN seguido de AND.'],
[0,'IN','IN verifica a presença em uma lista.','SELECT * FROM geracao_energia WHERE unidade IN (\'UG01\',\'UG03\');','Retorne todos os campos de UG01 ou UG02.','SELECT * FROM geracao_energia WHERE unidade IN (\'UG01\',\'UG02\')','Textos usam aspas simples.'],
[0,'NULL','NULL representa ausência de valor.','SELECT * FROM geracao_energia WHERE temperatura_c IS NOT NULL;','Encontre todos os registros sem temperatura.','SELECT * FROM geracao_energia WHERE temperatura_c IS NULL','Não use = NULL.'],
[0,'DISTINCT','DISTINCT elimina linhas duplicadas no resultado.','SELECT DISTINCT unidade FROM geracao_energia;','Retorne os valores distintos de usina_id.','SELECT DISTINCT usina_id FROM geracao_energia','Use DISTINCT após SELECT.'],
[0,'ORDER BY e LIMIT','ORDER BY ordena; LIMIT restringe a quantidade.','SELECT * FROM geracao_energia ORDER BY potencia_mw ASC LIMIT 2;','Retorne as três maiores potências com todos os campos, em ordem decrescente.','SELECT * FROM geracao_energia ORDER BY potencia_mw DESC LIMIT 3','DESC indica ordem decrescente.',true],
[1,'COUNT','COUNT(*) conta registros.','SELECT COUNT(*) FROM usinas;','Conte os registros de geracao_energia.','SELECT COUNT(*) FROM geracao_energia','Use COUNT(*).'],
[1,'SUM','SUM soma valores não nulos.','SELECT SUM(id) FROM usinas;','Some a potência de todas as unidades.','SELECT SUM(potencia_mw) FROM geracao_energia','A coluna vai dentro de SUM.'],
[1,'AVG','AVG calcula a média dos valores não nulos.','SELECT AVG(temperatura_c) FROM geracao_energia;','Calcule a potência média de todas as unidades.','SELECT AVG(potencia_mw) FROM geracao_energia','Use AVG.'],
[1,'GROUP BY','GROUP BY forma grupos antes de agregar.','SELECT unidade, COUNT(*) FROM geracao_energia GROUP BY unidade;','Retorne usina_id e a soma da potência por usina.','SELECT usina_id,SUM(potencia_mw) FROM geracao_energia GROUP BY usina_id','Agrupe pela chave da usina.'],
[1,'HAVING','HAVING filtra grupos após a agregação.','SELECT unidade, COUNT(*) FROM geracao_energia GROUP BY unidade HAVING COUNT(*) > 1;','Retorne usina_id e soma da potência apenas das usinas com soma superior a 200 MW.','SELECT usina_id,SUM(potencia_mw) FROM geracao_energia GROUP BY usina_id HAVING SUM(potencia_mw)>200','Use HAVING para a condição agregada.'],
[2,'INNER JOIN','INNER JOIN retorna correspondências entre tabelas.','SELECT u.nome,g.unidade FROM usinas u JOIN geracao_energia g ON u.id=g.usina_id;','Retorne nome da usina e potência de cada unidade.','SELECT u.nome,g.potencia_mw FROM usinas u JOIN geracao_energia g ON u.id=g.usina_id','Relacione id com usina_id.'],
[2,'LEFT JOIN','LEFT JOIN preserva as linhas da tabela esquerda.','SELECT u.nome,g.unidade FROM usinas u LEFT JOIN geracao_energia g ON u.id=g.usina_id;','Retorne nome de cada usina e quantidade de registros de geração usando LEFT JOIN.','SELECT u.nome,COUNT(g.id) FROM usinas u LEFT JOIN geracao_energia g ON u.id=g.usina_id GROUP BY u.nome','Conte a chave da tabela direita.'],
[3,'Subqueries','Uma subconsulta fornece valores para outra consulta.','SELECT * FROM geracao_energia WHERE potencia_mw=(SELECT MAX(potencia_mw) FROM geracao_energia);','Retorne todos os campos das unidades acima da potência média.','SELECT * FROM geracao_energia WHERE potencia_mw>(SELECT AVG(potencia_mw) FROM geracao_energia)','Compare com uma subconsulta AVG.'],
[3,'CASE WHEN','CASE cria valores condicionais.','SELECT unidade, CASE WHEN potencia_mw=0 THEN \'Parada\' ELSE \'Operando\' END FROM geracao_energia;','Retorne id e classifique temperatura maior que 75 como Alta, demais como Normal.','SELECT id,CASE WHEN temperatura_c>75 THEN \'Alta\' ELSE \'Normal\' END FROM geracao_energia','Use CASE WHEN ... THEN ... ELSE ... END.'],
[3,'CTE','WITH nomeia uma consulta temporária.','WITH dados AS (SELECT * FROM geracao_energia) SELECT COUNT(*) FROM dados;','Use uma CTE para filtrar potência maior que 100 e retorne a contagem.','WITH dados AS (SELECT * FROM geracao_energia WHERE potencia_mw>100) SELECT COUNT(*) FROM dados','WITH dados AS (...) SELECT ...'],
[4,'ROW_NUMBER','ROW_NUMBER numera linhas dentro da janela.','SELECT id,ROW_NUMBER() OVER (ORDER BY id) FROM geracao_energia;','Retorne id e posição por potência decrescente, com id crescente como desempate.','SELECT id,ROW_NUMBER() OVER(ORDER BY potencia_mw DESC,id) FROM geracao_energia','Use OVER com ORDER BY.'],
[4,'PARTITION BY','PARTITION BY divide uma janela sem reduzir linhas.','SELECT id,AVG(potencia_mw) OVER(PARTITION BY usina_id) FROM geracao_energia;','Retorne id e soma da potência da respectiva usina em cada linha.','SELECT id,SUM(potencia_mw) OVER(PARTITION BY usina_id) FROM geracao_energia','Use SUM como função de janela.'],
[4,'LAG','LAG recupera o valor da linha anterior na janela.','SELECT id,LAG(temperatura_c) OVER(ORDER BY id) FROM geracao_energia;','Retorne id e potência da linha anterior em ordem de id.','SELECT id,LAG(potencia_mw) OVER(ORDER BY id) FROM geracao_energia','Use LAG(potencia_mw).'],
[5,'COALESCE','COALESCE substitui valores nulos pelo primeiro argumento não nulo.','SELECT id,COALESCE(temperatura_c,0) FROM geracao_energia;','Retorne id e temperatura, substituindo NULL por -1.','SELECT id,COALESCE(temperatura_c,-1) FROM geracao_energia','Use COALESCE(temperatura_c,-1).'],
[5,'Chaves e qualidade','Uma chave primária identifica cada registro; contagens distintas ajudam a verificar duplicidade.','SELECT COUNT(DISTINCT id) FROM usinas;','Conte as chaves distintas de geracao_energia.','SELECT COUNT(DISTINCT id) FROM geracao_energia','Combine COUNT e DISTINCT.'],
[6,'Camada Silver','Uma camada Silver padroniza dados e remove registros inválidos.','SELECT * FROM geracao_energia WHERE temperatura_c IS NOT NULL;','Retorne todos os campos de unidades com potência positiva e temperatura preenchida.','SELECT * FROM geracao_energia WHERE potencia_mw>0 AND temperatura_c IS NOT NULL','Combine os critérios de qualidade.'],
[6,'Camada Gold','A camada Gold agrega indicadores de negócio.','SELECT usina_id,AVG(potencia_mw) FROM geracao_energia GROUP BY usina_id;','Retorne nome da usina e soma da potência, da maior para a menor.','SELECT u.nome,SUM(g.potencia_mw) FROM usinas u JOIN geracao_energia g ON u.id=g.usina_id GROUP BY u.nome ORDER BY SUM(g.potencia_mw) DESC','JOIN, GROUP BY e ORDER BY.',true]
];
export const lessons=rows.map(([module,title,theory,example,task,answer,hint,ordered],id)=>({id,module,title,theory,example,task,answer,hint,ordered:!!ordered}));
export const extraSeed="CREATE TABLE equipamentos(id int primary key,usina_id int,nome text); INSERT INTO equipamentos VALUES(1,1,'Turbina'),(2,1,'Gerador'),(3,3,'Transformador'),(4,3,'Regulador');\nCREATE TABLE eventos(id int primary key,equipamento_id int,tipo text); INSERT INTO eventos VALUES(1,1,'Alarme'),(2,1,'Falha'),(3,2,'Alarme'),(4,NULL,'Geral'),(5,99,'Órfão');\nCREATE TABLE turnos(turno text); INSERT INTO turnos VALUES('A'),('B'),('C');\nCREATE TABLE medicoes(id int primary key,equipamento_id int,instante timestamp,potencia_mw int); INSERT INTO medicoes VALUES(1,1,'2026-01-01 08:00',90),(2,1,'2026-01-01 08:30',95),(3,1,'2026-01-01 08:30',96),(4,1,'2026-01-01 09:00',100),(5,2,'2026-01-01 08:00',-5),(6,2,'2026-01-01 09:00',NULL),(7,2,'2026-01-02 08:00',120);\nCREATE TABLE treino(id int primary key,nome text,valor int); INSERT INTO treino VALUES(1,'A',10),(2,'B',20),(3,'C',30);";
export const seed=originalSeed+'\n'+extraSeed;
const extra=[
  [
    0,
    "NOT",
    "NOT inverte uma condição.",
    "SELECT * FROM geracao_energia WHERE NOT potencia_mw = 0;",
    "Retorne todos os campos das unidades que não estão paradas.",
    "SELECT * FROM geracao_energia WHERE NOT potencia_mw=0",
    "Use NOT ou <>."
  ],
  [
    0,
    "LIKE",
    "LIKE usa % para qualquer sequência e _ para um caractere.",
    "SELECT nome FROM usinas WHERE nome LIKE 'R%';",
    "Retorne nomes das usinas que começam com I.",
    "SELECT nome FROM usinas WHERE nome LIKE 'I%'",
    "Use I%."
  ],
  [
    0,
    "Desafio de fundamentos",
    "Combine filtros, projeção e ordenação.",
    "SELECT unidade FROM geracao_energia WHERE potencia_mw>0 ORDER BY id;",
    "Retorne id e potência das unidades acima de 80 MW e com temperatura preenchida, da maior potência para a menor.",
    "SELECT id,potencia_mw FROM geracao_energia WHERE potencia_mw>80 AND temperatura_c IS NOT NULL ORDER BY potencia_mw DESC",
    "Combine WHERE, AND e ORDER BY.",
    true
  ],
  [
    1,
    "MIN e MAX",
    "MIN e MAX retornam extremos.",
    "SELECT MIN(potencia_mw) FROM geracao_energia;",
    "Retorne a menor e a maior temperatura, nessa ordem.",
    "SELECT MIN(temperatura_c),MAX(temperatura_c) FROM geracao_energia",
    "Use duas agregações."
  ],
  [
    1,
    "COUNT e NULL",
    "COUNT(coluna) ignora nulos, COUNT(*) não.",
    "SELECT COUNT(temperatura_c) FROM geracao_energia;",
    "Retorne a quantidade de registros e de temperaturas preenchidas.",
    "SELECT COUNT(*),COUNT(temperatura_c) FROM geracao_energia",
    "Compare as duas contagens."
  ],
  [
    1,
    "Agregação com WHERE",
    "WHERE filtra antes de GROUP BY.",
    "SELECT AVG(potencia_mw) FROM geracao_energia WHERE potencia_mw>0;",
    "Retorne usina_id e potência média apenas das unidades operando.",
    "SELECT usina_id,AVG(potencia_mw) FROM geracao_energia WHERE potencia_mw>0 GROUP BY usina_id",
    "Filtre a potência antes de agrupar."
  ],
  [
    1,
    "Desvio padrão",
    "STDDEV_POP mede dispersão da população.",
    "SELECT STDDEV_POP(potencia_mw) FROM geracao_energia;",
    "Calcule o desvio padrão populacional da temperatura.",
    "SELECT STDDEV_POP(temperatura_c) FROM geracao_energia",
    "Use STDDEV_POP."
  ],
  [
    1,
    "Desafio de agregação",
    "HAVING e ORDER BY combinam análise e classificação.",
    "SELECT usina_id,COUNT(*) FROM geracao_energia GROUP BY usina_id;",
    "Retorne usina_id e soma da potência, apenas somas acima de 100, da maior para a menor.",
    "SELECT usina_id,SUM(potencia_mw) FROM geracao_energia GROUP BY usina_id HAVING SUM(potencia_mw)>100 ORDER BY SUM(potencia_mw) DESC",
    "HAVING filtra o total.",
    true
  ],
  [
    2,
    "Chaves relacionais",
    "Chaves estrangeiras apontam para chaves de outra tabela.",
    "SELECT id,nome FROM usinas;",
    "Retorne id de cada equipamento e sua chave usina_id.",
    "SELECT id,usina_id FROM equipamentos",
    "Observe as duas chaves."
  ],
  [
    2,
    "RIGHT JOIN",
    "RIGHT JOIN mantém todas as linhas à direita.",
    "SELECT u.nome,e.nome FROM equipamentos e RIGHT JOIN usinas u ON e.usina_id=u.id;",
    "Retorne nome da usina e nome de equipamento, incluindo usinas sem equipamento, usando RIGHT JOIN.",
    "SELECT u.nome,e.nome FROM equipamentos e RIGHT JOIN usinas u ON e.usina_id=u.id",
    "Usinas devem estar à direita."
  ],
  [
    2,
    "FULL OUTER JOIN",
    "FULL JOIN preserva não correspondências em ambos os lados.",
    "SELECT e.id,a.id FROM equipamentos e FULL JOIN eventos a ON e.id=a.equipamento_id;",
    "Retorne id do equipamento e id do evento, incluindo não correspondências.",
    "SELECT e.id,a.id FROM equipamentos e FULL OUTER JOIN eventos a ON e.id=a.equipamento_id",
    "Use FULL OUTER JOIN."
  ],
  [
    2,
    "CROSS JOIN",
    "CROSS JOIN gera o produto cartesiano.",
    "SELECT u.nome,t.turno FROM usinas u CROSS JOIN turnos t;",
    "Conte todas as combinações entre usinas e turnos.",
    "SELECT COUNT(*) FROM usinas CROSS JOIN turnos",
    "Não há ON."
  ],
  [
    2,
    "JOIN de três tabelas",
    "Encadeie relacionamentos por suas chaves.",
    "SELECT e.nome,u.nome FROM equipamentos e JOIN usinas u ON e.usina_id=u.id;",
    "Retorne id do evento, nome do equipamento e nome da usina, somente eventos associados.",
    "SELECT a.id,e.nome,u.nome FROM eventos a JOIN equipamentos e ON a.equipamento_id=e.id JOIN usinas u ON e.usina_id=u.id",
    "Relacione evento ao equipamento e depois à usina."
  ],
  [
    2,
    "JOIN com filtro",
    "Filtre depois de relacionar as tabelas.",
    "SELECT u.nome,g.id FROM usinas u JOIN geracao_energia g ON u.id=g.usina_id WHERE g.potencia_mw>100;",
    "Retorne nome da usina e id de unidade com temperatura acima de 75.",
    "SELECT u.nome,g.id FROM usinas u JOIN geracao_energia g ON u.id=g.usina_id WHERE g.temperatura_c>75",
    "Use WHERE na tabela de geração."
  ],
  [
    2,
    "Anti-join",
    "LEFT JOIN com IS NULL identifica ausência.",
    "SELECT e.id FROM equipamentos e LEFT JOIN eventos a ON e.id=a.equipamento_id WHERE a.id IS NULL;",
    "Retorne nome das usinas sem equipamentos.",
    "SELECT u.nome FROM usinas u LEFT JOIN equipamentos e ON u.id=e.usina_id WHERE e.id IS NULL",
    "Teste a chave da tabela direita."
  ],
  [
    2,
    "Cardinalidade",
    "Relacionamentos 1:N multiplicam linhas.",
    "SELECT e.id,COUNT(a.id) FROM equipamentos e LEFT JOIN eventos a ON e.id=a.equipamento_id GROUP BY e.id;",
    "Retorne ids de equipamentos com mais de um evento.",
    "SELECT equipamento_id FROM eventos WHERE equipamento_id IS NOT NULL GROUP BY equipamento_id HAVING COUNT(*)>1",
    "Agrupe pela chave estrangeira."
  ],
  [
    2,
    "Auto-relacionamento",
    "SELF JOIN relaciona linhas da mesma tabela.",
    "SELECT a.id,b.id FROM geracao_energia a JOIN geracao_energia b ON a.usina_id=b.usina_id AND a.id<b.id;",
    "Retorne pares de ids de equipamentos da mesma usina, sem repetir pares nem comparar consigo.",
    "SELECT a.id,b.id FROM equipamentos a JOIN equipamentos b ON a.usina_id=b.usina_id AND a.id<b.id",
    "Use aliases e a.id < b.id."
  ],
  [
    2,
    "Desafio de JOIN",
    "Agregue ocorrências sem perder entidades sem eventos.",
    "SELECT u.nome,COUNT(e.id) FROM usinas u LEFT JOIN equipamentos e ON u.id=e.usina_id GROUP BY u.nome;",
    "Retorne nome de todas as usinas e quantidade de eventos associados a seus equipamentos, inclusive zero.",
    "SELECT u.nome,COUNT(a.id) FROM usinas u LEFT JOIN equipamentos e ON u.id=e.usina_id LEFT JOIN eventos a ON e.id=a.equipamento_id GROUP BY u.nome",
    "Encadeie dois LEFT JOIN."
  ],
  [
    3,
    "EXISTS",
    "EXISTS testa se a subconsulta produz uma linha.",
    "SELECT nome FROM usinas u WHERE EXISTS(SELECT 1 FROM equipamentos e WHERE e.usina_id=u.id);",
    "Retorne nome dos equipamentos com pelo menos um evento.",
    "SELECT nome FROM equipamentos e WHERE EXISTS(SELECT 1 FROM eventos a WHERE a.equipamento_id=e.id)",
    "Correlacione a subconsulta."
  ],
  [
    3,
    "NOT EXISTS",
    "NOT EXISTS encontra ausência de correspondência.",
    "SELECT nome FROM usinas u WHERE NOT EXISTS(SELECT 1 FROM equipamentos e WHERE e.usina_id=u.id);",
    "Retorne ids de equipamentos sem eventos.",
    "SELECT id FROM equipamentos e WHERE NOT EXISTS(SELECT 1 FROM eventos a WHERE a.equipamento_id=e.id)",
    "Use NOT EXISTS."
  ],
  [
    3,
    "Subconsulta correlacionada",
    "Uma subconsulta correlacionada usa a linha externa.",
    "SELECT id,(SELECT COUNT(*) FROM eventos a WHERE a.equipamento_id=e.id) FROM equipamentos e;",
    "Retorne id da usina e potência máxima de suas unidades usando subconsulta.",
    "SELECT id,(SELECT MAX(potencia_mw) FROM geracao_energia g WHERE g.usina_id=u.id) FROM usinas u",
    "Use o id da linha externa."
  ],
  [
    3,
    "NULLIF",
    "NULLIF retorna NULL quando os argumentos são iguais.",
    "SELECT NULLIF(0,0);",
    "Retorne id e potência, convertendo zero em NULL.",
    "SELECT id,NULLIF(potencia_mw,0) FROM geracao_energia",
    "Use NULLIF."
  ],
  [
    3,
    "UNION",
    "UNION combina resultados e elimina duplicados.",
    "SELECT id FROM usinas UNION SELECT usina_id FROM equipamentos;",
    "Retorne os ids de usinas cadastradas ou referenciadas por equipamentos, sem repetição.",
    "SELECT id FROM usinas UNION SELECT usina_id FROM equipamentos",
    "As colunas devem ser compatíveis."
  ],
  [
    3,
    "UNION ALL",
    "UNION ALL mantém duplicados.",
    "SELECT usina_id FROM equipamentos UNION ALL SELECT usina_id FROM geracao_energia;",
    "Retorne todas as referências a usinas em equipamentos e geração, incluindo duplicatas.",
    "SELECT usina_id FROM equipamentos UNION ALL SELECT usina_id FROM geracao_energia",
    "Não use apenas UNION."
  ],
  [
    3,
    "INTERSECT",
    "INTERSECT retorna elementos comuns.",
    "SELECT id FROM usinas INTERSECT SELECT usina_id FROM equipamentos;",
    "Retorne ids de usina presentes tanto em equipamentos quanto em geração.",
    "SELECT usina_id FROM equipamentos INTERSECT SELECT usina_id FROM geracao_energia",
    "Use INTERSECT."
  ],
  [
    3,
    "EXCEPT",
    "EXCEPT retorna elementos da primeira consulta ausentes na segunda.",
    "SELECT id FROM usinas EXCEPT SELECT usina_id FROM equipamentos;",
    "Retorne ids de equipamentos que não aparecem em eventos.",
    "SELECT id FROM equipamentos EXCEPT SELECT equipamento_id FROM eventos",
    "A ordem das consultas importa."
  ],
  [
    3,
    "CTEs encadeadas",
    "CTEs podem alimentar outras CTEs.",
    "WITH a AS (SELECT * FROM geracao_energia),b AS (SELECT * FROM a WHERE potencia_mw>0) SELECT COUNT(*) FROM b;",
    "Retorne a soma das potências acima de 100 usando CTE.",
    "WITH a AS (SELECT potencia_mw FROM geracao_energia WHERE potencia_mw>100) SELECT SUM(potencia_mw) FROM a",
    "Defina o conjunto antes de somar."
  ],
  [
    3,
    "Agregação condicional",
    "FILTER restringe as linhas de uma agregação.",
    "SELECT COUNT(*) FILTER(WHERE potencia_mw>0) FROM geracao_energia;",
    "Retorne quantidade operando e quantidade parada, nessa ordem.",
    "SELECT COUNT(*) FILTER(WHERE potencia_mw>0),COUNT(*) FILTER(WHERE potencia_mw=0) FROM geracao_energia",
    "Use dois FILTER."
  ],
  [
    3,
    "Desafio intermediário",
    "Combine CTE, agregação e filtro.",
    "WITH t AS(SELECT usina_id,SUM(potencia_mw) total FROM geracao_energia GROUP BY usina_id) SELECT * FROM t;",
    "Retorne usina_id e potência total das usinas acima da média dos totais por usina.",
    "WITH t AS(SELECT usina_id,SUM(potencia_mw) total FROM geracao_energia GROUP BY usina_id) SELECT usina_id,total FROM t WHERE total>(SELECT AVG(total) FROM t)",
    "Calcule a média dos totais na CTE."
  ],
  [
    4,
    "RANK",
    "RANK mantém empates e pula posições.",
    "SELECT id,RANK() OVER(ORDER BY potencia_mw DESC) FROM geracao_energia;",
    "Retorne id e ranking por temperatura decrescente, NULL por último.",
    "SELECT id,RANK() OVER(ORDER BY temperatura_c DESC NULLS LAST) FROM geracao_energia",
    "NULLS LAST."
  ],
  [
    4,
    "DENSE_RANK",
    "DENSE_RANK não pula posições após empates.",
    "SELECT id,DENSE_RANK() OVER(ORDER BY usina_id) FROM geracao_energia;",
    "Retorne id e ranking denso por usina_id crescente.",
    "SELECT id,DENSE_RANK() OVER(ORDER BY usina_id) FROM geracao_energia",
    "Use DENSE_RANK."
  ],
  [
    4,
    "LEAD",
    "LEAD acessa a próxima linha da janela.",
    "SELECT id,LEAD(potencia_mw) OVER(ORDER BY id) FROM geracao_energia;",
    "Retorne id e temperatura da próxima linha, ordenando a janela por id.",
    "SELECT id,LEAD(temperatura_c) OVER(ORDER BY id) FROM geracao_energia",
    "Use LEAD."
  ],
  [
    4,
    "Soma acumulada",
    "Um frame ROWS define linhas da janela.",
    "SELECT id,SUM(potencia_mw) OVER(ORDER BY id ROWS UNBOUNDED PRECEDING) FROM geracao_energia;",
    "Retorne id e soma acumulada da potência em ordem de id.",
    "SELECT id,SUM(potencia_mw) OVER(ORDER BY id ROWS UNBOUNDED PRECEDING) FROM geracao_energia",
    "Defina ROWS."
  ],
  [
    4,
    "Média móvel",
    "Uma janela móvel pode incluir linhas anteriores.",
    "SELECT id,AVG(potencia_mw) OVER(ORDER BY id ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) FROM geracao_energia;",
    "Retorne id e média móvel de até três registros por id.",
    "SELECT id,AVG(potencia_mw) OVER(ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) FROM geracao_energia",
    "Duas linhas anteriores mais a atual."
  ],
  [
    4,
    "NTILE",
    "NTILE divide linhas em grupos de tamanho semelhante.",
    "SELECT id,NTILE(2) OVER(ORDER BY id) FROM geracao_energia;",
    "Retorne id e quartil por potência crescente com desempate por id.",
    "SELECT id,NTILE(4) OVER(ORDER BY potencia_mw,id) FROM geracao_energia",
    "NTILE(4)."
  ],
  [
    4,
    "Datas",
    "DATE representa uma data sem horário.",
    "SELECT id,instante::date FROM medicoes;",
    "Retorne id e data de cada medição.",
    "SELECT id,CAST(instante AS date) FROM medicoes",
    "Converta para date."
  ],
  [
    4,
    "DATE_TRUNC",
    "DATE_TRUNC reduz a precisão de data ou timestamp.",
    "SELECT date_trunc('day',instante) FROM medicoes;",
    "Retorne hora truncada e média de potência por hora.",
    "SELECT date_trunc('hour',instante),AVG(potencia_mw) FROM medicoes GROUP BY date_trunc('hour',instante)",
    "Agrupe pela hora truncada."
  ],
  [
    4,
    "EXTRACT",
    "EXTRACT extrai componentes do timestamp.",
    "SELECT EXTRACT(YEAR FROM instante) FROM medicoes;",
    "Retorne id e hora de cada medição.",
    "SELECT id,EXTRACT(HOUR FROM instante) FROM medicoes",
    "Use HOUR."
  ],
  [
    4,
    "INTERVAL",
    "INTERVAL representa uma duração.",
    "SELECT instante+INTERVAL '1 hour' FROM medicoes;",
    "Retorne id e instante acrescido de 15 minutos.",
    "SELECT id,instante+INTERVAL '15 minutes' FROM medicoes",
    "Use INTERVAL."
  ],
  [
    4,
    "Strings",
    "UPPER, LOWER e TRIM transformam textos.",
    "SELECT UPPER(nome) FROM usinas;",
    "Retorne nome das usinas em maiúsculas.",
    "SELECT UPPER(nome) FROM usinas",
    "Use UPPER."
  ],
  [
    4,
    "CTE recursiva",
    "WITH RECURSIVE repete um termo até a condição de parada.",
    "WITH RECURSIVE n(x) AS(VALUES(1) UNION ALL SELECT x+1 FROM n WHERE x<3) SELECT x FROM n;",
    "Gere os inteiros de 1 a 5 usando CTE recursiva.",
    "WITH RECURSIVE n(x) AS(VALUES(1) UNION ALL SELECT x+1 FROM n WHERE x<5) SELECT x FROM n",
    "A condição deve terminar a recursão."
  ],
  [
    4,
    "Desafio analítico",
    "Funções de janela preservam a granularidade.",
    "SELECT id,ROW_NUMBER() OVER(PARTITION BY usina_id ORDER BY potencia_mw DESC) FROM geracao_energia;",
    "Retorne usina_id, id e potência da unidade mais potente de cada usina, desempate pelo menor id.",
    "WITH r AS(SELECT *,ROW_NUMBER() OVER(PARTITION BY usina_id ORDER BY potencia_mw DESC,id) pos FROM geracao_energia) SELECT usina_id,id,potencia_mw FROM r WHERE pos=1",
    "Numere por usina e filtre pos=1."
  ],
  [
    5,
    "CREATE TABLE",
    "CREATE TABLE define estrutura e tipos.",
    "CREATE TABLE exemplo(id INT PRIMARY KEY);",
    "Crie cadastro_teste com coluna id inteira e chave primária.",
    "CREATE TABLE cadastro_teste(id INT PRIMARY KEY)",
    "Use CREATE TABLE e PRIMARY KEY.",
    false,
    "SELECT column_name,data_type,is_nullable FROM information_schema.columns WHERE table_name='cadastro_teste' ORDER BY ordinal_position"
  ],
  [
    5,
    "INSERT",
    "INSERT adiciona registros.",
    "INSERT INTO treino VALUES(4,'Nova',40);",
    "Insira em treino o registro (4,'Nova',40).",
    "INSERT INTO treino VALUES(4,'Nova',40)",
    "Use VALUES.",
    false,
    "SELECT * FROM treino ORDER BY id"
  ],
  [
    5,
    "UPDATE",
    "UPDATE altera registros; WHERE restringe a alteração.",
    "UPDATE treino SET valor=15 WHERE id=1;",
    "Altere apenas o valor do registro 2 para 99.",
    "UPDATE treino SET valor=99 WHERE id=2",
    "Não esqueça WHERE.",
    false,
    "SELECT * FROM treino ORDER BY id"
  ],
  [
    5,
    "DELETE",
    "DELETE remove registros selecionados.",
    "DELETE FROM treino WHERE id=1;",
    "Remova apenas o registro de id 3.",
    "DELETE FROM treino WHERE id=3",
    "Restrinja com WHERE.",
    false,
    "SELECT * FROM treino ORDER BY id"
  ],
  [
    5,
    "ALTER TABLE",
    "ALTER TABLE modifica a estrutura.",
    "ALTER TABLE treino ADD COLUMN status TEXT;",
    "Adicione a coluna status de tipo text à tabela treino.",
    "ALTER TABLE treino ADD COLUMN status TEXT",
    "Use ADD COLUMN.",
    false,
    "SELECT column_name,data_type FROM information_schema.columns WHERE table_name='treino' ORDER BY ordinal_position"
  ],
  [
    5,
    "TRUNCATE",
    "TRUNCATE esvazia a tabela sem apagar sua estrutura.",
    "TRUNCATE TABLE treino;",
    "Esvazie completamente a tabela treino.",
    "TRUNCATE TABLE treino",
    "Use TRUNCATE; apenas no sandbox.",
    false,
    "SELECT COUNT(*) FROM treino"
  ],
  [
    5,
    "DROP TABLE",
    "DROP TABLE remove uma tabela e sua estrutura.",
    "DROP TABLE treino;",
    "Remova a tabela treino do banco de treinamento.",
    "DROP TABLE treino",
    "Nunca execute em produção sem autorização.",
    false,
    "SELECT table_name FROM information_schema.tables WHERE table_name='treino'"
  ],
  [
    5,
    "FOREIGN KEY",
    "Uma FK protege a integridade referencial.",
    "CREATE TABLE teste_fk(id INT,usina_id INT REFERENCES usinas(id));",
    "Crie teste_fk com id inteiro e usina_id inteiro referenciando usinas(id).",
    "CREATE TABLE teste_fk(id INT,usina_id INT REFERENCES usinas(id))",
    "Use REFERENCES.",
    false,
    "SELECT constraint_type FROM information_schema.table_constraints WHERE table_name='teste_fk' ORDER BY constraint_type"
  ],
  [
    5,
    "UNIQUE",
    "UNIQUE evita valores duplicados.",
    "ALTER TABLE treino ADD UNIQUE(nome);",
    "Adicione uma restrição UNIQUE à coluna nome de treino.",
    "ALTER TABLE treino ADD UNIQUE(nome)",
    "Use ADD UNIQUE.",
    false,
    "SELECT constraint_type FROM information_schema.table_constraints WHERE table_name='treino' ORDER BY constraint_type"
  ],
  [
    5,
    "Views",
    "VIEW guarda uma consulta reutilizável.",
    "CREATE VIEW operando AS SELECT * FROM geracao_energia WHERE potencia_mw>0;",
    "Crie a view operando com todos os campos das unidades com potência positiva.",
    "CREATE VIEW operando AS SELECT * FROM geracao_energia WHERE potencia_mw>0",
    "Use CREATE VIEW AS.",
    false,
    "SELECT * FROM operando"
  ],
  [
    5,
    "Materialized views",
    "Uma materialized view persiste os resultados até REFRESH.",
    "CREATE MATERIALIZED VIEW totais AS SELECT usina_id,SUM(potencia_mw) total FROM geracao_energia GROUP BY usina_id;",
    "Crie a materialized view totais com usina_id e soma da potência como total.",
    "CREATE MATERIALIZED VIEW totais AS SELECT usina_id,SUM(potencia_mw) total FROM geracao_energia GROUP BY usina_id",
    "Use CREATE MATERIALIZED VIEW.",
    false,
    "SELECT * FROM totais"
  ],
  [
    5,
    "Transações e ROLLBACK",
    "BEGIN inicia uma transação; ROLLBACK desfaz alterações não confirmadas.",
    "BEGIN; UPDATE treino SET valor=0; ROLLBACK;",
    "Inicie uma transação, altere o valor de todos os registros para zero e desfaça com ROLLBACK.",
    "BEGIN; UPDATE treino SET valor=0; ROLLBACK;",
    "Use os três comandos.",
    false,
    "SELECT * FROM treino ORDER BY id"
  ],
  [
    6,
    "Índices",
    "Um índice pode acelerar buscas seletivas ao custo de escrita.",
    "CREATE INDEX idx_treino_valor ON treino(valor);",
    "Crie o índice idx_treino_valor sobre valor em treino.",
    "CREATE INDEX idx_treino_valor ON treino(valor)",
    "Use CREATE INDEX ... ON.",
    false,
    "SELECT indexname FROM pg_indexes WHERE tablename='treino' ORDER BY indexname"
  ],
  [
    6,
    "EXPLAIN",
    "EXPLAIN exibe o plano estimado sem executar a consulta.",
    "EXPLAIN SELECT * FROM treino WHERE id=1;",
    "Use EXPLAIN para analisar a consulta de treino por id=2.",
    "EXPLAIN SELECT * FROM treino WHERE id=2",
    "EXPLAIN antes do SELECT."
  ],
  [
    6,
    "EXPLAIN ANALYZE",
    "EXPLAIN ANALYZE executa e mede a consulta. Cuidado com escritas.",
    "EXPLAIN ANALYZE SELECT * FROM treino WHERE id=1;",
    "Analise a consulta SELECT * FROM treino WHERE id=2 com EXPLAIN ANALYZE.",
    "EXPLAIN ANALYZE SELECT * FROM treino WHERE id=2",
    "Use EXPLAIN ANALYZE."
  ],
  [
    6,
    "Predicados indexáveis",
    "Evite aplicar funções desnecessárias sobre colunas filtradas.",
    "SELECT id FROM medicoes WHERE instante >= TIMESTAMP '2026-01-01' AND instante < TIMESTAMP '2026-01-02';",
    "Retorne ids das medições de 1 de janeiro de 2026 usando intervalo semiaberto.",
    "SELECT id FROM medicoes WHERE instante>=TIMESTAMP '2026-01-01' AND instante<TIMESTAMP '2026-01-02'",
    "Use >= e <."
  ],
  [
    6,
    "Projeção eficiente",
    "Leia somente as colunas necessárias ao consumo.",
    "SELECT id,instante FROM medicoes;",
    "Retorne apenas instante e potência das medições.",
    "SELECT instante,potencia_mw FROM medicoes",
    "Evite SELECT *."
  ],
  [
    6,
    "Deduplicação",
    "ROW_NUMBER ajuda a manter o registro mais recente de cada chave.",
    "SELECT id,ROW_NUMBER() OVER(PARTITION BY equipamento_id,instante ORDER BY id DESC) FROM medicoes;",
    "Retorne id de uma medição por equipamento e instante, mantendo o maior id.",
    "WITH r AS(SELECT id,ROW_NUMBER() OVER(PARTITION BY equipamento_id,instante ORDER BY id DESC) n FROM medicoes) SELECT id FROM r WHERE n=1",
    "Particione pela chave lógica."
  ],
  [
    6,
    "Ingestão incremental",
    "Watermarks filtram dados posteriores ao último processamento.",
    "SELECT * FROM medicoes WHERE instante>TIMESTAMP '2026-01-01 08:00';",
    "Retorne todos os campos das medições posteriores a 08:30 de 1 de janeiro de 2026.",
    "SELECT * FROM medicoes WHERE instante>TIMESTAMP '2026-01-01 08:30'",
    "Use comparação estrita."
  ],
  [
    6,
    "UPSERT",
    "ON CONFLICT permite inserir ou atualizar de modo idempotente.",
    "INSERT INTO treino VALUES(1,'A',20) ON CONFLICT(id) DO UPDATE SET valor=EXCLUDED.valor;",
    "Faça upsert do registro (2,'B',55), atualizando valor em caso de conflito por id.",
    "INSERT INTO treino VALUES(2,'B',55) ON CONFLICT(id) DO UPDATE SET valor=EXCLUDED.valor",
    "Use EXCLUDED.",
    false,
    "SELECT * FROM treino ORDER BY id"
  ],
  [
    6,
    "Validação de qualidade",
    "Valide faixas e obrigatoriedade antes da camada Silver.",
    "SELECT id FROM medicoes WHERE potencia_mw IS NULL OR potencia_mw<0;",
    "Retorne ids de medições com potência nula ou negativa.",
    "SELECT id FROM medicoes WHERE potencia_mw IS NULL OR potencia_mw<0",
    "Combine IS NULL e OR."
  ],
  [
    6,
    "Integridade de dados",
    "Anti-joins detectam referências órfãs.",
    "SELECT a.id FROM eventos a LEFT JOIN equipamentos e ON a.equipamento_id=e.id WHERE e.id IS NULL;",
    "Retorne ids de eventos cuja referência de equipamento é preenchida mas inexistente.",
    "SELECT a.id FROM eventos a LEFT JOIN equipamentos e ON a.equipamento_id=e.id WHERE a.equipamento_id IS NOT NULL AND e.id IS NULL",
    "Distinga referência nula de órfã."
  ],
  [
    6,
    "Camada Bronze",
    "Bronze mantém dados brutos; derive métricas sem sobrescrever a origem.",
    "SELECT COUNT(*) FROM medicoes;",
    "Retorne equipamento_id e quantidade de medições brutas por equipamento.",
    "SELECT equipamento_id,COUNT(*) FROM medicoes GROUP BY equipamento_id",
    "Agrupe sem deduplicar."
  ],
  [
    6,
    "Séries temporais",
    "LAG calcula mudanças entre instantes de uma mesma série.",
    "SELECT id,potencia_mw-LAG(potencia_mw) OVER(PARTITION BY equipamento_id ORDER BY instante,id) FROM medicoes;",
    "Retorne id e diferença de potência para a medição anterior do mesmo equipamento, ordenando por instante e id.",
    "SELECT id,potencia_mw-LAG(potencia_mw) OVER(PARTITION BY equipamento_id ORDER BY instante,id) FROM medicoes",
    "Use PARTITION BY e LAG."
  ],
  [
    6,
    "Indicador de disponibilidade",
    "Agregações condicionais permitem calcular proporções.",
    "SELECT COUNT(*) FILTER(WHERE potencia_mw>0)*100.0/COUNT(*) FROM geracao_energia;",
    "Retorne usina_id e percentual de unidades com potência positiva sobre o total de unidades cadastradas.",
    "SELECT usina_id,COUNT(*) FILTER(WHERE potencia_mw>0)*100.0/COUNT(*) FROM geracao_energia GROUP BY usina_id",
    "Use 100.0 para divisão decimal."
  ],
  [
    6,
    "Desafio final: pipeline",
    "Deduplicar, validar e agregar são etapas típicas de ELT.",
    "WITH r AS(SELECT *,ROW_NUMBER() OVER(PARTITION BY equipamento_id,instante ORDER BY id DESC) n FROM medicoes) SELECT * FROM r WHERE n=1;",
    "Deduplicate por equipamento e instante mantendo maior id, descarte potências nulas ou negativas e retorne equipamento_id e potência média válida.",
    "WITH r AS(SELECT *,ROW_NUMBER() OVER(PARTITION BY equipamento_id,instante ORDER BY id DESC) n FROM medicoes) SELECT equipamento_id,AVG(potencia_mw) FROM r WHERE n=1 AND potencia_mw>=0 GROUP BY equipamento_id",
    "Use CTE, ROW_NUMBER, filtro e GROUP BY."
  ],
  [
    1,
    "STRING_AGG",
    "STRING_AGG concatena textos de um grupo com um separador.",
    "SELECT usina_id,STRING_AGG(unidade,', ' ORDER BY unidade) FROM geracao_energia GROUP BY usina_id;",
    "Retorne usina_id e os nomes dos equipamentos concatenados por vírgula e espaço em ordem alfabética.",
    "SELECT usina_id,STRING_AGG(nome,', ' ORDER BY nome) FROM equipamentos GROUP BY usina_id",
    "Use STRING_AGG(nome, ', ' ORDER BY nome)."
  ],
  [
    1,
    "ROLLUP",
    "ROLLUP gera subtotais hierárquicos e o total geral na mesma consulta.",
    "SELECT usina_id,COUNT(*) FROM geracao_energia GROUP BY ROLLUP(usina_id);",
    "Retorne usina_id e soma da potência por usina incluindo o total geral com ROLLUP.",
    "SELECT usina_id,SUM(potencia_mw) FROM geracao_energia GROUP BY ROLLUP(usina_id)",
    "Use GROUP BY ROLLUP(usina_id)."
  ],
  [
    3,
    "Múltiplas CTEs com JOIN",
    "Você pode declarar várias CTEs separadas por vírgula e combiná-las com JOIN.",
    "WITH pot AS(SELECT usina_id,SUM(potencia_mw) total FROM geracao_energia GROUP BY usina_id),eq AS(SELECT usina_id,COUNT(*) qtd FROM equipamentos GROUP BY usina_id) SELECT pot.usina_id,pot.total,eq.qtd FROM pot JOIN eq ON pot.usina_id=eq.usina_id;",
    "Crie duas CTEs — soma da potência por usina e contagem de equipamentos por usina — e retorne nome da usina, soma da potência e contagem de equipamentos (zero se ausente).",
    "WITH pot AS(SELECT usina_id,SUM(potencia_mw) total FROM geracao_energia GROUP BY usina_id),eq AS(SELECT usina_id,COUNT(*) qtd FROM equipamentos GROUP BY usina_id) SELECT u.nome,COALESCE(pot.total,0),COALESCE(eq.qtd,0) FROM usinas u LEFT JOIN pot ON u.id=pot.usina_id LEFT JOIN eq ON u.id=eq.usina_id",
    "Combine usinas com as duas CTEs usando LEFT JOIN e COALESCE."
  ],
  [
    3,
    "LATERAL JOIN",
    "LATERAL permite que uma subconsulta no FROM referencie colunas das tabelas anteriores.",
    "SELECT u.nome,top.unidade FROM usinas u JOIN LATERAL(SELECT unidade FROM geracao_energia g WHERE g.usina_id=u.id ORDER BY potencia_mw DESC LIMIT 1) top ON true;",
    "Use LATERAL para retornar o nome de cada usina e a maior potência registrada nela.",
    "SELECT u.nome,top.potencia_mw FROM usinas u JOIN LATERAL(SELECT potencia_mw FROM geracao_energia g WHERE g.usina_id=u.id ORDER BY potencia_mw DESC LIMIT 1) top ON true",
    "Use JOIN LATERAL (...) top ON true com ORDER BY e LIMIT 1."
  ],
  [
    4,
    "FIRST_VALUE",
    "FIRST_VALUE retorna o primeiro valor de cada janela ordenada.",
    "SELECT id,FIRST_VALUE(unidade) OVER(PARTITION BY usina_id ORDER BY potencia_mw DESC,id) FROM geracao_energia;",
    "Retorne id e a maior potência da mesma usina em cada linha usando FIRST_VALUE.",
    "SELECT id,FIRST_VALUE(potencia_mw) OVER(PARTITION BY usina_id ORDER BY potencia_mw DESC,id) FROM geracao_energia",
    "Ordene a partição por potencia_mw DESC, id."
  ],
  [
    4,
    "LAST_VALUE e frame completo",
    "Por padrão o frame termina na linha atual; para LAST_VALUE na partição inteira, use UNBOUNDED FOLLOWING.",
    "SELECT id,LAST_VALUE(unidade) OVER(PARTITION BY usina_id ORDER BY potencia_mw DESC,id ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) FROM geracao_energia;",
    "Retorne id e a menor potência da respectiva usina em cada linha usando LAST_VALUE com frame completo.",
    "SELECT id,LAST_VALUE(potencia_mw) OVER(PARTITION BY usina_id ORDER BY potencia_mw DESC,id ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) FROM geracao_energia",
    "Inclua ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING."
  ],
  [
    4,
    "LAG com valor padrão",
    "LAG aceita deslocamento e valor padrão para substituir NULL na primeira linha da janela.",
    "SELECT id,LAG(potencia_mw,1,0) OVER(ORDER BY id) FROM geracao_energia;",
    "Retorne id e a potência da linha anterior na mesma usina (ordenada por id), usando 0 quando não houver anterior.",
    "SELECT id,LAG(potencia_mw,1,0) OVER(PARTITION BY usina_id ORDER BY id) FROM geracao_energia",
    "Use LAG(potencia_mw, 1, 0) com PARTITION BY usina_id."
  ],
  [
    4,
    "PERCENT_RANK",
    "PERCENT_RANK calcula a posição relativa de cada linha entre 0 e 1.",
    "SELECT id,ROUND(PERCENT_RANK() OVER(ORDER BY potencia_mw)::numeric,2) FROM geracao_energia;",
    "Retorne id e o PERCENT_RANK por potência crescente arredondado para 2 casas decimais.",
    "SELECT id,ROUND(PERCENT_RANK() OVER(ORDER BY potencia_mw)::numeric,2) FROM geracao_energia",
    "Converta para numeric antes de usar ROUND(..., 2)."
  ],
  [
    4,
    "CUME_DIST",
    "CUME_DIST indica a fração acumulada de linhas com valor menor ou igual ao atual.",
    "SELECT id,ROUND(CUME_DIST() OVER(ORDER BY potencia_mw)::numeric,2) FROM geracao_energia;",
    "Retorne id e a distribuição acumulada (CUME_DIST) por potência crescente arredondada para 2 casas.",
    "SELECT id,ROUND(CUME_DIST() OVER(ORDER BY potencia_mw)::numeric,2) FROM geracao_energia",
    "Use ROUND(CUME_DIST() OVER(ORDER BY potencia_mw)::numeric, 2)."
  ],
  [
    4,
    "Participação percentual na janela",
    "Dividir o valor da linha por SUM(...) OVER(...) calcula a participação sem perder o detalhe.",
    "SELECT id,ROUND(potencia_mw*100.0/SUM(potencia_mw) OVER(),2) FROM geracao_energia;",
    "Retorne id e o percentual de potência de cada unidade em relação ao total da própria usina, arredondado em 2 casas.",
    "SELECT id,ROUND(potencia_mw*100.0/SUM(potencia_mw) OVER(PARTITION BY usina_id),2) FROM geracao_energia",
    "Divida potencia_mw * 100.0 por SUM(potencia_mw) OVER(PARTITION BY usina_id)."
  ],
  [
    4,
    "Cláusula WINDOW nomeada",
    "A cláusula WINDOW nomeia uma especificação de janela para reutilizá-la em várias funções.",
    "SELECT id,SUM(potencia_mw) OVER w,AVG(potencia_mw) OVER w FROM geracao_energia WINDOW w AS(PARTITION BY usina_id);",
    "Usando uma janela nomeada por usina_id, retorne id, soma e média da potência da respectiva usina.",
    "SELECT id,SUM(potencia_mw) OVER w,AVG(potencia_mw) OVER w FROM geracao_energia WINDOW w AS(PARTITION BY usina_id)",
    "Declare WINDOW w AS (PARTITION BY usina_id) ao final."
  ],
  [
    5,
    "CHECK e DEFAULT",
    "CHECK valida regras de domínio e DEFAULT define valores automáticos na inserção.",
    "CREATE TABLE sensores(id INT PRIMARY KEY,ativo BOOLEAN DEFAULT true,leitura INT CHECK(leitura>=0));",
    "Crie a tabela sensores com id inteiro PK, ativo booleano com DEFAULT true e leitura inteira com CHECK(leitura >= 0).",
    "CREATE TABLE sensores(id INT PRIMARY KEY,ativo BOOLEAN DEFAULT true,leitura INT CHECK(leitura>=0))",
    "Use PRIMARY KEY, DEFAULT true e CHECK(leitura >= 0).",
    false,
    "SELECT column_name,column_default FROM information_schema.columns WHERE table_name='sensores' ORDER BY ordinal_position"
  ],
  [
    5,
    "INSERT com RETURNING",
    "RETURNING devolve as linhas inseridas ou alteradas no mesmo comando DML.",
    "INSERT INTO treino VALUES(4,'D',40) RETURNING id,nome;",
    "Insira em treino o registro (5,'E',50) usando INSERT ... RETURNING id, valor.",
    "INSERT INTO treino VALUES(5,'E',50) RETURNING id,valor",
    "Adicione RETURNING id, valor ao final do INSERT.",
    false,
    "SELECT * FROM treino ORDER BY id"
  ],
  [
    6,
    "GROUPING SETS",
    "GROUPING SETS calcula múltiplos níveis de agregação em uma única varredura.",
    "SELECT usina_id,unidade,SUM(potencia_mw) FROM geracao_energia GROUP BY GROUPING SETS((usina_id),(unidade),());",
    "Retorne usina_id e soma da potência agrupando por usina_id e também o total geral usando GROUPING SETS.",
    "SELECT usina_id,SUM(potencia_mw) FROM geracao_energia GROUP BY GROUPING SETS((usina_id),())",
    "Use GROUP BY GROUPING SETS((usina_id), ())."
  ],
  [
    6,
    "JSONB",
    "PostgreSQL manipula dados semiestruturados com JSONB, jsonb_build_object e o operador ->>.",
    "SELECT id,jsonb_build_object('unidade',unidade,'mw',potencia_mw)->>'unidade' FROM geracao_energia;",
    "Retorne id e o campo 'nome' extraído como texto de um jsonb_build_object('nome', nome) para cada usina.",
    "SELECT id,jsonb_build_object('nome',nome)->>'nome' FROM usinas",
    "Use jsonb_build_object('nome', nome)->>'nome'."
  ],
  [
    6,
    "ARRAY_AGG",
    "ARRAY_AGG agrupa valores de um grupo em um array ordenado.",
    "SELECT usina_id,ARRAY_AGG(unidade ORDER BY unidade) FROM geracao_energia GROUP BY usina_id;",
    "Retorne usina_id e o array de nomes de equipamentos ordenados alfabeticamente por usina.",
    "SELECT usina_id,ARRAY_AGG(nome ORDER BY nome) FROM equipamentos GROUP BY usina_id",
    "Use ARRAY_AGG(nome ORDER BY nome)."
  ]
];
for(const [module,title,theory,example,task,answer,hint,ordered,verify] of extra)lessons.push({id:lessons.length,module,title,theory,example,task,answer,hint,ordered:!!ordered,verify});
export const sequence=lessons.slice().sort((a,b)=>a.module-b.module||a.id-b.id).map(l=>l.id);
