import CheckIcon from "@shared/components/CheckIcon/CheckIcon";
import * as S from "./ProgressStepper.styled";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

function ProgressStepper({ steps, currentStep }: StepperProps) {
  return (
    <S.ProgressStepperContainer>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <S.StepWrapper key={step}>
            <S.Circle isCompleted={isCompleted} isActive={isActive}>
              {isCompleted ? <CheckIcon /> : <span>{stepNumber}</span>}
            </S.Circle>
            <S.Label isActive={isActive} isCompleted={isCompleted}>
              {step}
            </S.Label>
            {index < steps.length - 1 && (
              <S.Divider isCompleted={isCompleted} />
            )}
          </S.StepWrapper>
        );
      })}
    </S.ProgressStepperContainer>
  );
}

export default ProgressStepper;
