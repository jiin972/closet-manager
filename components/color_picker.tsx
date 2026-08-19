"use client";

import { useState } from "react";

interface ColorOption {
  value: string;
  label: string;
  hex: string;
}

interface ColorPickerProps {
  name: string;
  options: ColorOption[];
  errors?: string[];
  defaultValue?: string;
}

export default function ColorPicker({
  name,
  options,
  errors = [],
  defaultValue,
}: ColorPickerProps) {
  const [selected, setSelected] = useState(defaultValue ?? ""); //선택된 색상값 관리(초기갑 설정)
  const [isOpen, setIsOpen] = useState(false); //팔레트 열림/닫힘 상태 관리

  //현재 선택된 색상의 전체 객체 정보 찾기
  const selectedColor = options.find((color) => color.value === selected);

  return (
    <div>
      {/* 폼 제출(Server Action/Form Submit) 시 선택된 값을 서버로 넘겨주기 위한 숨겨진 input */}
      <input type="hidden" name={name} value={selected} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full rounded-lg border border-white px-4 py-2"
      >
        {selectedColor ? (
          <>
            <span
              className="w-5 h-5 rounded-full border border-white/30"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <span>{selectedColor.label}</span>
          </>
        ) : (
          <span className="text-gray-400">색상선택</span>
        )}
      </button>
      {isOpen && (
        <div className="flex flex-wrap gap-2 p-3 border border-white rounded-lg">
          {options.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => {
                setSelected(color.value);
                setIsOpen(false);
              }}
              style={{ backgroundColor: color.hex }}
              title={color.label}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selected === color.value
                  ? "border-white scale-110"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>
      )}

      {errors.map((error, index) => (
        <span key={index} className="text-red-400 text-sm">
          {error}
        </span>
      ))}
    </div>
  );
}
