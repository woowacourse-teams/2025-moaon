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
  errorMessage?: string;
}

function SelectionInputFormField<K extends string>({
  entries,
  title,
  name,
  value,
  type,
  onChange,
  required = true,
  errorMessage,
  readOnly,
}: SelectionInputFormFieldProps<K>) {
  const isCheckbox = type === "checkbox";

  const handleChange = (key: K) => () => {
    if (isCheckbox) {
      const currentValues = Array.isArray(value) ? value : [];
      const nextValues = currentValues.includes(key)
        ? currentValues.filter((v) => v !== key)
        : [...currentValues, key];
      onChange(nextValues as K[]);
    } else {
      onChange(key);
    }
  };

  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={`${name}-0`}>
          <FormField.Title disabled={readOnly}>{title}</FormField.Title>
          {required && <FormField.RequiredMark disabled={readOnly} />}
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
                onChange={!readOnly ? handleChange(key) : () => {}}
                required={required}
                label={label}
                readOnly={readOnly}
              />
            );
          })}
        </S.SelectionInputFormFieldGroup>
        <FormField.ErrorBox>
          {errorMessage && <FormField.Error>{errorMessage}</FormField.Error>}
        </FormField.ErrorBox>
      </FormField.Wrapper>
    </FormField>
  );
}

export default SelectionInputFormField;
