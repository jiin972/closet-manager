import FormInput from "@/components/form_input";
import { getUserProfile, logOut, updateNickName } from "./action";
import PasswordModla from "@/components/password_modal";

export default async function Profile() {
  const user = await getUserProfile();
  return (
    <div className="p-2 min-h-screen bg-app-gradient-sandbeige ">
      <div className="flex justify-between items-center">
        <h1>반가워요! {user?.name ? user.name : user?.email} 님</h1>
        <form action={logOut} className="hover:font-semibold transition-all">
          <button type="submit">Log out</button>
        </form>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <h2>유저정보</h2>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">이메일</p>
          <p>{user?.email}</p>
        </div>
        <form action={updateNickName}>
          <p className="text-sm text-gray-500">닉네임</p>
          <FormInput
            name="name"
            defaultValue={user?.name ?? ""}
            placeholder="닉네임을 입력하세요."
          />
        </form>
        <PasswordModla />
      </div>
    </div>
  );
}
