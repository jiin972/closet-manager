import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// Iron-session에 저장될 데이터 형태 - 로그인한 유저의 id만 담음
interface SessionContent {
  id: string;
}

const getCookieOptions = () => {
  return {
    cookieName: "smartest-managing",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true, // js가 쿠키를 가로채지 못하게 방어
      path: "/", // 사이트 전체에 쿠키 사용
    },
  };
};
/**
 * 현재 요청의 세션객체를 가져옴
 * - cookies(): 요청의 쿠키 저장소 참조
 * - getCookieOptions(): 쿠키 이름, 암호화 password등 설정값,
 *
 * 반환된 session 객체로 session.id 읽기/쓰기 및 session.save() 가능
 */
//iron-Session Init
// 세션 객체를 만들어서 돌려주는 역할(바로 return)
export default async function getSession() {
  return getIronSession<SessionContent>(await cookies(), getCookieOptions());
}

/**
 * 미들웨어(Edge 런타임) 전용 세션 조회 함수
 * - 일반 서버 코드에서 쓰는 getSession()은 next/header의 cookies()를 사용하는데(Node.js전용API),
 * - 미들웨어는 제한된 별도의 JS실행 환경에서 실행되어 해당 방식이 지원되지 않음
 * - 그래서 iron-session이 제공하는 "request/response 직접 전달" 방식을 사용
 * @param reqeust
 * @returns
 */
export async function getProxySession(reqeust: NextRequest) {
  return getIronSession<SessionContent>(
    reqeust as unknown as Request, // 타입 강제로 우회, 브라우저가 보낸 쿠키를 읽음
    new Response(), //실세 사용안되는 빈 응답객체 전송(session.save()사용 불가) - api형식 맞추기
    getCookieOptions(), //미들웨어에서도 배포환경과 동일한 secure옵션 제공
  );
}
