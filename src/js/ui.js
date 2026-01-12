// Pequenas funções para interagir com o DOM.
// Mantemos responsabilidades de apresentação separadas da lógica de rede.

const selectors = {
  form: '#search-form',
  input: '#city-input',
  result: '#result',
  button: '#search-btn',
};

export function getElements() {
  return {
    form: document.querySelector(selectors.form),
    input: document.querySelector(selectors.input),
    result: document.querySelector(selectors.result),
    button: document.querySelector(selectors.button),
  };
}

export function showMessage(container, message, { isError = false } = {}) {
  if (!container) return;
  container.textContent = message;
  container.style.color = isError ? 'crimson' : 'inherit';
}

export function renderWeather(container, location, weather) {
  if (!container) return;
  // Exibe versão simples; pode ser expandida futuramente
  container.innerHTML = `
    <div>
      <strong>${location.name}${location.admin1 ? ', ' + location.admin1 : ''} — ${location.country || ''}</strong>
    </div>
    <div>Temperatura: ${weather.temperature}° (unidade local)</div>
    <div>Vento: ${weather.windspeed} ${weather.windspeed_unit || 'm/s'}</div>
    <div>Horário: ${weather.time}</div>
  `;
}

export function setLoading(button, isLoading) {
  if (!button) return;
  button.disabled = isLoading;
  button.textContent = isLoading ? 'Buscando...' : 'Buscar';
}