"use client";

import ColorPicker from "@/components/color_picker";
import FormSelect from "@/components/form_select";
import { useActionState, useState } from "react";
import { createItem } from "./action";
import FormInput from "@/components/form_input";
import { PhotoIcon } from "@heroicons/react/20/solid";

export default function AddItems() {
  const [state, formAction, isPending] = useActionState(createItem, null);
  //선택이미지 미리보기 구현
  const [preview, setPreview] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event; //event.target.files 구조분해 할당
    if (!files) return;
    const file = files[0]; //선택한 첫 파일 가져오기(파일정보)
    if (!file.type.includes("image/")) {
      return alert("이미지만 업로드 가능합니다.");
    }
    if (file.size > 4 * 1024 * 1024) {
      return alert("4MB 이하의 파일만 업로드 가능합니다.");
    }
    const url = URL.createObjectURL(file); // 임시 미리보기 생성(클라이언트)
    setPreview(url);
  };

  return (
    <div className="flex flex-col gap-1 p-2 min-h-screen bg-app-gradient ">
      <h1>Add your item easily</h1>
      <h2>직접추가</h2>
      <form action={formAction} className="flex flex-col gap-2 mt-1">
        <input
          type="file"
          onChange={onImageChange}
          className="hidden"
          id="photo"
          name="photo"
        />
        <label
          htmlFor="photo"
          style={{
            backgroundImage: `url(${preview})`,
          }}
          className={`border-2 border-dashed rounded-md aspect-square flex flex-col items-center justify-center
            hover:cursor-pointer bg-cover bg-center
            `}
        >
          {preview === "" && (
            <>
              <PhotoIcon className="w-5" />
              <div>
                <span>사진을 추가해 주세요</span>
              </div>
            </>
          )}
        </label>

        <FormSelect
          name="category"
          options={[
            { value: "top", label: "상의" },
            { value: "bottom", label: "하의" },
            { value: "outer", label: "아우터" },
            { value: "shoes", label: "신발" },
            { value: "accessory", label: "액세서리" },
          ]}
          errors={state?.flattenError.category}
        />
        <FormSelect
          name="season"
          options={[
            { value: "spring", label: "봄" },
            { value: "summer", label: "여름" },
            { value: "autumn", label: "가을" },
            { value: "winter", label: "겨울" },
          ]}
          errors={state?.flattenError.season}
        />
        <ColorPicker
          name="color"
          options={[
            { value: "black", label: "검정", hex: "#000000" },
            { value: "white", label: "흰색", hex: "#FFFFFF" },
            { value: "gray", label: "회색", hex: "#9CA3AF" },
            { value: "beige", label: "베이지", hex: "#D4C4A8" },
            { value: "brown", label: "브라운", hex: "#78350F" },
            { value: "navy", label: "네이비", hex: "#1E3A5F" },
            { value: "red", label: "빨강", hex: "#DC2626" },
          ]}
          errors={state?.flattenError.color}
        />
        <FormSelect
          name="purpose"
          options={[
            { value: "", label: "선택 안 함 (선택사항)" },
            { value: "daily", label: "데일리/일상" },
            { value: "office", label: "출근/오피스" },
            { value: "date", label: "데이트/모임" },
            { value: "formal", label: "경조사/격식" },
            { value: "sports", label: "운동/아웃도어" },
            { value: "travel", label: "여행/휴가" },
            { value: "home", label: "홈웨어/이지웨어" },
          ]}
          errors={state?.flattenError?.purpose}
        />
        <FormInput
          type="text"
          name="brand"
          placeholder="브랜드 입력(선택사항)"
          errors={state?.flattenError?.brand}
        />
        <button
          type="submit"
          disabled={isPending}
          className="mt-5 rounded-lg border-none  text-white px-4 py-2 hover:bg-white hover:text-slate-900 font-semibold transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isPending ? "등록 중.." : "등록"}
        </button>
      </form>
    </div>
  );
}
