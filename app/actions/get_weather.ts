"use server";

interface WeatherResponse {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: { temp: number; feels_like: number; humidity: number };
  name: string;
}

/**
 * openWeatherMap에서 날씨를 읽어오는 함수
 * -  API키 노출을 막기 위해 서버에서만 사용, 클라이언트에 노출하지 않음
 *@param latitude 위도
 *@param longitude 경도
 */

export async function getWeather(latitude: number, longitude: number) {
  const apiKey = process.env.OPEN_WEATHER_MAP_API;
  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
  );
  const data: WeatherResponse = await result.json();
  return {
    city: data.name,
    icon: data.weather[0].icon,
    temp: Math.round(data.main.temp),
    description: data.weather[0].main,
  };
}
