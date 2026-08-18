import { NextRequest, NextResponse } from "next/server";
import { getProxySession } from "./lib/session";

interface Routes {
  [route: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/create-account": true,
  "/login": true,
};

/**
 * 모든 페이지 요청이 실제로 렌더링되기 전에 먼저 실행되는 함수
 * - 로그인 여부(session.id 존재 여부)를 확인해서,
 *    - 미들웨어는 Edge런타임이라, next/headers의 cookies()사용불가
 *    - 따라서, request 객체에서 직접 쿠키를 읽음
 * - 페이지별로 접근을 허용/차단(redirect)하는 역
 * @param request
 */
export async function proxy(request: NextRequest) {
  const session = await getProxySession(request); // 페이지 이동마다 쿠키 호출
  const isLoggedIn = Boolean(session.id);
  const { pathname } = request.nextUrl; //경로탐색
  const isPublicOnly = publicOnlyUrls[pathname];

  //로그인 전 상태 - publicOnly의 차단
  if (!isLoggedIn) {
    //로그인 안한 상태에서 보호경로 접근시도 - 로그인페이지로 redirect
    if (!isPublicOnly) {
      return NextResponse.redirect(new URL("/", request.url)); //현재 유저의 기본 도메인주소에 지정경로를 결합
    }
  } else {
    // 로그인한 유저의 이동경로 설정(불필요한 이동 제한)
    if (isPublicOnly) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

//특정 파일, url, api에서 미들웨어(proxy)제외 되도록 Regex정의
//정적파일 이외, api/public이미지 폴더 등도 미들웨어 감사에서 제외
//페이지 이동만 미들웨어가 신경쓰도록 함
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
