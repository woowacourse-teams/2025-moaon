import tooltip from "@assets/icons/tooltip.svg";
import FormField from "@shared/components/FormField/FormField";
import type { ComponentProps } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface TextareaFormFieldProps extends ComponentProps<"textarea"> {
  title: string;
  name: string;
  errorMessage?: string;
  descriptionToken: number;
}

function TextareaFormField({
  title,
  name,
  value,
  onChange,
  required = true,
  placeholder,
  errorMessage,
  disabled,
  descriptionToken,
}: TextareaFormFieldProps) {
  const hasError = !!errorMessage;
  return (
    <FormField>
      <FormField.Wrapper>
        <FormField.Header inputId={name}>
          <FormField.Title disabled={disabled}>{title}</FormField.Title>
          {required && <FormField.RequiredMark disabled={disabled} />}
          <button
            type="button"
            aria-label={`요약 안내 정보`}
            data-tooltip-id="summary-guide"
            className="tooltip-trigger"
          >
            <img src={tooltip} alt="" />
          </button>
        </FormField.Header>
        <FormField.Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          hasError={hasError}
        />
        <FormField.ErrorBox>
          {errorMessage && <FormField.Error>{errorMessage}</FormField.Error>}
        </FormField.ErrorBox>
      </FormField.Wrapper>
      <Tooltip id="summary-guide" style={{ borderRadius: "10px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            alignItems: "center",
          }}
        >
          <p>자동 요약은 하루 최대 20번 사용 가능합니다.</p>
          <p>{descriptionToken}번 남았습니다.</p>
        </div>
      </Tooltip>
    </FormField>
  );
}

export default TextareaFormField;
