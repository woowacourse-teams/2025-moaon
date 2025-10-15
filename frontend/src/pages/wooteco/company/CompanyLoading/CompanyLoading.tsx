import type { Company } from "../../constants/company";
import LightLogoLoading from "./LightLogoLoading/LightLogoLoading";
import MotionLogoLoading from "./MotionLogoLoading/MotionLogoLoading";

interface CompanyLoadingProps {
  company: Company;
  onLoadingComplete: () => void;
}

function CompanyLoading({ company, onLoadingComplete }: CompanyLoadingProps) {
  if (company === "toss" || company === "line") {
    return (
      <MotionLogoLoading
        company={company}
        onLoadingComplete={onLoadingComplete}
      />
    );
  }

  return (
    <LightLogoLoading company={company} onLoadingComplete={onLoadingComplete} />
  );
}

export default CompanyLoading;
