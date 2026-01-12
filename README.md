# Clima Simples (Open-Meteo) — ES6 puro

Descrição rápida:
- App simples que converte o nome da cidade em lat/lon (Open-Meteo Geocoding) e busca a temperatura atual (Open-Meteo).
- Código modular em ES modules (fetch + async/await). Resultado é logado no console e exibido na página.

Como rodar localmente:
1. Recomendo usar um servidor estático (módulos ES não funcionam bem via `file://` em alguns navegadores).
2. Exemplos rápidos:
   - VS Code + Live Server (extensão): abra a pasta e clique em "Open with Live Server".
   - Python 3: `python -m http.server 8000` e acesse `http://localhost:8000/`.
3. Abra o DevTools (console) para ver logs detalhados das respostas da API.

Observações:
- As APIs usadas (Open-Meteo) não requerem chave para os endpoints públicos usados aqui.
- Para produção, pensar em:
  - Tratamento de rate-limits / cache.
  - Fallbacks (ex.: usar mais de 1 resultado geocoding).
  - Internationalização das mensagens.
  - Testes automatizados (unit + e2e).