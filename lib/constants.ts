//상수화
/** 매직넘버(magic number)제거 */

export const PASSWORD_MIN_LENGTH = 5;
export const MY_OLLAMA = "gemma4:e4b";

/**
 * AI와 HTTP통신을 할 함수에 전달할 프롬프트 상수변수
 * @param item 객체를 인자로 받음
 * @param closet 객체의 배열을 인자로 받음
 */
export const PROMPT_FOR_DETAIL_PAGE = (
  item: object | null,
  closet: object[],
) => `
  너는 패션 코디네이터야.
  아래 [내 옷] 하나와 어울리는 조합을 [내 옷장 목록]에서만 찾아줘.
  [내 옷]: ${JSON.stringify(item)}
  [내 옷장 목록]: ${JSON.stringify(closet)}

  [응답 규칙]:
  1. 반드시 순수 JSON 형식으로만 응답할 것.마크다운 코드블럭이나 다른 텍스트, 인사말, 설명은 절대 포함하지 말 것.
  2. 각 카테고리(top, bottom, outer, shoes)에는 [내 옷장 목록]에 있는 실제 id 값만 넣을 것.
  3. 해당 카테고리가 옷장에 없으면 null로 표시할 것.
  4. [내 옷]과 같은 카테고리는 절대 추천하지 말 것. (예: [내 옷]이 상의라면, top 필드는 항상 null이어야 함)

  응답 형식 예시:
  {
    "top": "실제id값",
    "bottom": "실제id값",
    "outer": null,
    "shoes": "실제id값"
  }
  `;
