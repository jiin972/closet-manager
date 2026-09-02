"use client";

import { useState } from "react";
import { InitItemProps } from "./item-detail";

/**
 * Ollama server에 보낼 prompt를 button과 연결해
 * `/api/recommend`로 fetch통신을 통해 전달
 */
export default function OllamaBtn({
  itemId,
  initItem,
}: {
  itemId: string;
  initItem: InitItemProps;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleOllamaBtnClick = async () => {
    try {
      setIsLoading(true);

      const result = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "이 옷과 어울리는 조합을 추천해줘." }),
      });
      if (!result.ok) throw new Error("서버응답없음");
      const data = await result.json();
      console.log(data.result);
    } catch (e) {
      console.log("요청중 에러발생:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Now Loading..</div>
      ) : (
        <button type="button" onClick={handleOllamaBtnClick}>
          AI 매칭 테스트
        </button>
      )}
    </>
  );
}
