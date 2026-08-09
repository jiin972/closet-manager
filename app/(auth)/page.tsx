import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 bg-app-gradient">
      <div className="my-auto flex flex-col items-center gap-5 text-center max-w-lg">
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          AI 옷장 코디
        </span>
        <h1 className="text-4xl font-bold text-white leading-tight">
          AI와 함께하는
          <br />
          나만의 스마트 옷장
        </h1>
        <p className="text-xl text-gray-200 font-medium mt-4">
          반가워요! 오늘은 뭐 입을까요?
        </p>
        <p className="text-base text-gray-400 leading-relaxed">
          지금 로그인하고 내 옷장을 정리해 보세요.
        </p>
      </div>
      <div className="w-full max-w-xs flex flex-col items-center gap-4 mb-4">
        <Link
          href="/create-account"
          className="w-full text-center bg-primary rounded-xl px-3 py-1 text-lg font-semibold hover:bg-emerald-700 transition-colors hover:no-underline"
        >
          시작하기
        </Link>
        <div className="flex gap-2 text-sm text-gray-400">
          <span>이미 계정이 있나요?</span>
          <Link
            href="/login"
            className="text-primary hover:underline font-semibold"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
