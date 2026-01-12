// Ponto de entrada do app: liga UI + API.
// Usa fetch + async/await e captura erros para mensagens amigáveis.

import { geocodeCity, getCurrentWeather } from './api.js';
import { getElements, showMessage, renderWeather, setLoading } from './ui.js';

const { form, input, result, button } = getElements();

// Validação simples do campo
function validateCityInput(value) {
  if (!value) return 'Por favor informe o nome de uma cidade.';
  if (value.trim().length < 2) return 'Informe pelo menos 2 caracteres.';
  return null;
}

async function handleSearch(event) {
  event.preventDefault();
  const city = input.value.trim();

  const validationError = validateCityInput(city);
  if (validationError) {
    showMessage(result, validationError, { isError: true });
    return;
  }

  setLoading(button, true);
  showMessage(result, 'Buscando...');

  try {
    // 1. Geocode
    const location = await geocodeCity(city, { count: 1 });
    console.info('Geocoding result:', location);

    // 2. Weather
    const weatherResp = await getCurrentWeather(location.latitude, location.longitude);
    console.info('Weather API response:', weatherResp);

    // 3. Show results (console + UI)
    console.log(`Tempo em ${location.name}:`, weatherResp.current);
    renderWeather(result, location, weatherResp.current);
  } catch (err) {
    // Tratamento de erros amigável ao usuário; log completo no console para debug.
    console.error(err);
    showMessage(result, err.message || 'Erro desconhecido. Confira o console.', { isError: true });
  } finally {
    setLoading(button, false);
  }
}

form.addEventListener('submit', handleSearch);

// Opcional: busca ao pressionar Enter no input já é tratada pelo submit do form.
// Pronto — o app está isolado em módulos e fácil de manter/estender.