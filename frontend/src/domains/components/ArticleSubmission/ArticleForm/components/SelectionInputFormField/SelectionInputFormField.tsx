import FormField from "@shared/components/FormField/FormField";
import type { ComponentProps } from "react";
import * as S from "./SelectionInputFormField.styled";

type EntryTuple<K> = readonly [K, { label: string; imgUrl?: string }];
type ExcludedInputProps = Omit<ComponentProps<"input">, "onChange" | "value">;

interface SelectionInputFormFieldProps<K> extends ExcludedInputProps {
  entries: ReadonlyArray<EntryTuple<K>>;
  title: string;
  name: string;
  type: "radio" | "checkbox";
  value: K | K[];
  onChange: (next: K | K[]) => void;
}

function SelectionInputFormField<K extends string>({
  entries,
  title,
  name,
  value,
  type,
  onChange,
  required = true,
}: SelectionInputFormFieldProps<K>) {
  const isCheckbox = type === "checkbox";
  const handleChange = (key: K) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCheckbox) {
      const checked = e.currentTarget.checked;
      const current = Array.isArray(value) ? (value as K[]) : [];
      const next = checked
        ? [...current, key]
        : current.filter((v) => v !== key);
      onChange(next as K[]);
    } else {
      onChange(key);
    }
  };
  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={`${name}-0`}>
          <FormField.Title>{title}</FormField.Title>
          {required && <FormField.RequiredMark />}
        </FormField.Header>
        <S.SelectionInputFormFieldGroup
          role={type === "radio" ? "radiogroup" : "group"}
          aria-labelledby={`${name}-label`}
        >
          {entries.map(([key, { label, imgUrl }], idx) => {
            const checked = isCheckbox
              ? Array.isArray(value) && (value as K[]).includes(key)
              : value === key;
            return (
              <FormField.SelectionInput
                key={key}
                type={type}
                id={`${name}-${idx}`}
                name={name}
                value={key}
                imgUrl={imgUrl}
                checked={checked}
                onChange={handleChange(key)}
                required={required}
                label={label}
              />
            );
          })}
        </S.SelectionInputFormFieldGroup>
      </FormField.Wrapper>
    </FormField>
  );
}

export default SelectionInputFormField;
