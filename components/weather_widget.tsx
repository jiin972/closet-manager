"use client";

import { getWeather } from "@/app/actions/get_weather";
import { useEffect, useState } from "react";

interface Weather {
  city: string;
  temp: number;
  icon: string;
  description: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null); // 날씨 상태 저장,
  const [error, setError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords; //현재 위치 정보를 담아 넘겨주는 객체
        const result = await getWeather(latitude, longitude); //fetch대신 서버액션 호출
        setWeather(result);
      },
      () => setError(true), //위치 권한거부등 에러 처리
    );
  }, []);
  if (error) {
    return (
      <div className="p-4 rounded-xl bg-gray-100 text-sm text-gray-500">
        위치 정보를 가져올 수 없어요.
      </div>
    );
  }
  if (!weather) {
    return <div className="p-4 rounded-xl bg-gray-100 animate-pulse h-20" />;
  }
  return (
    <div className="flex items-center gap-5 px-4 py-2 rounded-xl bg-linear-to-r from-slate-50 to-slate-100 border border-neutral-200 text-black">
      <p className="text-sm font-bold">{weather.temp}°C</p>
      <p className="text-sm opacity-80">{weather.city}</p>
      <p className="text-sm">{weather.description}</p>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 ml-auto">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="w-6 h-6"
        />
      </div>
    </div>
  );
}
