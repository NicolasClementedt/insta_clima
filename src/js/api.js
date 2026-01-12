// Responsabilidade: fazer chamadas HTTP para Open-Meteo (Geocoding + Weather).
// Exporta funções reutilizáveis e com tratamento de erros claros.

const GEOCODING_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_BASE = 'https://api.open-meteo.com/v1/forecast';

/**
 * Converte um nome de cidade em latitude/longitude usando Open-Meteo Geocoding API.
 * Retorna um objeto { name, latitude, longitude, country } ou lança erro em caso de falha.
 */
export async function geocodeCity(city, { count = 1 } = {}) {
  if (!city || typeof city !== 'string') {
    throw new TypeError('Parâmetro "city" inválido.');
  }

  const params = new URLSearchParams({
    name: city,
    count: String(count),
    language: 'pt',
  });

  const url = `${GEOCODING_BASE}?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Falha no geocoding: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    // Nenhuma correspondência encontrada
    throw new Error(`Nenhuma localização encontrada para "${city}".`);
  }

  const first = data.results[0];
  return {
    name: first.name,
    latitude: first.latitude,
    longitude: first.longitude,
    country: first.country,
    admin1: first.admin1, // estado/região, se disponível
  };
}

/**
 * Busca o tempo atual (current_weather) para latitude/longitude.
 * Retorna objeto com current_weather (temperature, windspeed, weathercode, time).
 */
export async function getCurrentWeather(latitude, longitude, { temperature_unit = 'celsius' } = {}) {
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    throw new TypeError('latitude e longitude devem ser números.');
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current_weather: 'true',
    temperature_unit,
    timezone: 'auto'
  });

  const url = `${WEATHER_BASE}?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Falha ao buscar temperatura: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (!data.current_weather) {
    throw new Error('Resposta inesperada da API de clima (sem current_weather).');
  }

  return {
    latitude: data.latitude,
    longitude: data.longitude,
    current: data.current_weather
  };
}