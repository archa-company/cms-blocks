---
name: busca-passagens
description: Busca e compara passagens de avião e ônibus para um trecho, consultando Google Flights, Busco, Buser, FlixBus, Wemobi, BlaBlaCar e ClickBus. Use quando o usuário pedir para buscar passagem, cotar viagem, comparar ônibus e avião para um trecho, ou acionar /busca-passagens.
---

# Busca de passagens

Quando acionada, esta skill pesquisa um trecho em todas as fontes listadas abaixo e entrega um comparativo único, já filtrado pelas regras de conforto e horário do usuário.

## 1. Entender o pedido

Antes de buscar, confirme que você tem:

- **Origem e destino** (cidade; se houver mais de um aeroporto ou rodoviária, considere todos).
- **Data de ida** e, se houver, **data de volta**.
- **Flexibilidade de datas**: se o usuário não disser nada, busque também um dia antes e um dia depois quando isso puder mudar muito o preço (feriados, sextas, domingos).
- **Número de passageiros** (padrão: 1 adulto).

Se faltar origem, destino ou data, pergunte antes de começar. O resto pode seguir o padrão.

### Destino sem aeroporto grande: rotas combinadas

Quando o destino é uma cidade do interior ou tem poucos voos, monte também rotas combinadas: voo até um aeroporto próximo e ônibus ou carona até o destino final.

- Liste os aeroportos num raio razoável (até umas 6h de estrada) e busque voos para todos. Exemplo para Criciúma-SC: JJG (Jaguaruna, o mais perto), FLN, POA, NVT, JOI e CWB.
- Para cada aeroporto, busque o transporte complementar até o destino nas mesmas fontes de ônibus e no BlaBlaCar, e confira se o horário de chegada do voo encaixa com uma saída razoável (pelo menos 1h30 de folga entre pouso e embarque, contando o deslocamento até a rodoviária).
- Compare a rota combinada pelo **preço somado** e pelo **tempo total porta a porta**, lado a lado com o ônibus direto. As regras de categoria e horário valem para cada perna.

## 2. Fontes obrigatórias

Consulte **todas** as fontes, sempre:

| Fonte | Tipo | Ponto de partida |
|---|---|---|
| Google Flights | Avião | `https://www.google.com/travel/flights?q=Voos%20de%20<ORIGEM>%20para%20<DESTINO>%20em%20<AAAA-MM-DD>&hl=pt-BR&curr=BRL` |
| Busco | Ônibus (agregador) | `https://www.busco.com.br` |
| Buser | Ônibus (fretamento e rodoviário) | `https://www.buser.com.br/onibus/<origem-uf>/<destino-uf>?ida=<AAAA-MM-DD>` |
| FlixBus | Ônibus | `https://www.flixbus.com.br` |
| Wemobi | Ônibus | `https://wemobi.com.br` |
| BlaBlaCar | Carona e ônibus | `https://www.blablacar.com.br/search?fn=<origem>&tn=<destino>&db=<AAAA-MM-DD>&seats=1` |
| ClickBus | Ônibus (agregador) | `https://www.clickbus.com.br/onibus/<origem-uf>/<destino-uf>?departureDate=<AAAA-MM-DD>` |

Os formatos de URL mudam com frequência. Se um link montado não funcionar, abra a página inicial do site e faça a busca pelo formulário.

### Como acessar

1. **Navegador primeiro.** Esses sites carregam os resultados via JavaScript. Se houver um navegador disponível (Claude in Chrome, navegador embutido ou Playwright/Chromium no ambiente), use-o para abrir a busca, esperar os resultados e ler a lista. Carregue a skill do navegador correspondente antes do primeiro uso.
   O Google Flights costuma mostrar captcha e o BlaBlaCar devolve 403 para navegador automático em servidor. Nesse caso use o Claude in Chrome do usuário, se estiver conectado, ou recorra a Kayak, Skyscanner e aos sites das companhias aéreas.
2. **Sem navegador:** use WebFetch nas URLs de busca e WebSearch (ex.: `passagem ônibus São Paulo Curitiba 12/12 leito clickbus`) para achar preços publicados.
3. **Nunca invente dados.** Se uma fonte não carregar, bloquear acesso ou não tiver o trecho, registre isso no relatório ("Wemobi: não opera o trecho" ou "FlixBus: página não carregou"). Preço sem fonte verificada não entra na tabela.
4. **Não compre nada** e não preencha dados pessoais. A skill só pesquisa e compara.

Para cada opção encontrada, anote: fonte, empresa, tipo (avião, ônibus, carona), data, horário de saída e chegada, duração, categoria/classe, preço total por pessoa (com taxas, quando o site mostrar), local de embarque e desembarque, e o link.

## 3. Regras de filtro e avaliação

### Categoria do ônibus (regra rígida)

- Viagem de ônibus com **mais de 5 horas**: só vale **leito, leito-cama, cama ou cama premium**. Descarte convencional, executivo e semi-leito. Elas podem aparecer no relatório só como nota ("havia semi-leito por R$ X, descartado pela regra").
- Viagem de até 5 horas: qualquer categoria serve, mas prefira executivo ou superior.
- No Buser e em fretamentos, confira o nome real da poltrona (ex.: "Cama", "Leito Individual") em vez de confiar no rótulo do filtro.
- Carona no BlaBlaCar acima de 5 horas entra apenas como alternativa, nunca como recomendação principal, a não ser que seja muito mais barata e o usuário tenha aceitado esse tipo de viagem.
- **BlaBlaCar não pode virar a noite.** Descarte qualquer carona que esteja em andamento entre meia-noite e 5h (por exemplo, sai às 22h e chega às 3h, ou sai às 4h). Ela pode aparecer só na lista de descartadas.

### Horário

- **Ônibus longo (mais de 5h): prefira saídas à noite**, entre 19h e 23h59, que chegam de manhã. Assim a noite de viagem substitui a hospedagem.
- Ônibus curto: prefira saídas de manhã ou começo da tarde.
- **Avião**: prefira saídas entre 7h e 21h. Voos de madrugada (antes das 6h) ou com chegada depois da meia-noite perdem pontos.
- Considere o tempo e o custo de chegar ao aeroporto ou à rodoviária quando a diferença for relevante.

### Avião

- Prefira voo direto. Conexão longa (mais de 3h) perde pontos.
- Indique se a tarifa inclui bagagem despachada. Se não incluir, avise e, quando possível, estime o custo.

### Preço

- Compare sempre o **valor total por pessoa**, com taxas de serviço e embarque.
- Na mesma empresa e horário vendidos por mais de um site (ex.: ClickBus e Busco), mostre o mais barato e cite a diferença.

## 4. Entrega

Responda em português, com texto direto e natural, sem travessões e sem exagero de adjetivos. Estrutura:

1. **Resumo em uma linha** com a melhor opção geral e o motivo.
2. **Tabela comparativa** com as opções válidas, ordenadas do melhor custo-benefício para o pior:

| # | Tipo | Fonte | Empresa | Data | Saída | Chegada | Duração | Categoria | Preço | Obs. |
|---|---|---|---|---|---|---|---|---|---|---|

3. **Destaques**, um por linha:
   - Mais barata (dentro das regras)
   - Melhor horário
   - Mais rápida
   - Melhor custo-benefício geral (recomendação)
4. **Ônibus x avião**: uma comparação curta considerando preço, tempo total porta a porta e se a viagem noturna economiza uma diária de hotel.
5. **Descartadas**: lista curta do que ficou de fora e por quê (categoria abaixo de leito, carona que vira a noite, horário ruim, conexão longa).
6. **Status das fontes**: uma linha por site dizendo se foi consultado, se não opera o trecho ou se falhou.
7. **Links** para cada opção recomendada.

Inclua a data e hora da consulta, já que os preços mudam rápido.

Se houver ida e volta, faça uma tabela para cada sentido e indique a combinação mais vantajosa.
