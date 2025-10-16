import { createContext, useContext } from "react";

export const FormFieldContext = createContext<{} | null>(null);

export const useFormFieldContext = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error("폼 필드 컨텍스트를 사용할 수 없습니다.");
  }

  return context;
};
