import { toast } from "@shared/components/Toast/toast";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { COMPANY_LIST, type Company } from "../../constants/company";

type UseValidateCompanyPageParamsReturn =
  | { isValidating: true; company: null }
  | { isValidating: false; company: Company };

const useValidateCompanyPageParams = (): UseValidateCompanyPageParamsReturn => {
  const { company } = useParams();
  const navigate = useNavigate();

  const isValid = COMPANY_LIST.includes(company as Company);
  useEffect(() => {
    if (!isValid) {
      navigate("/wooteco");
      toast.error("존재하지 않는 페이지 입니다.");
    }
  }, [isValid, navigate]);

  // isValid가 false인 경우 navigate가 동작하기 전까지는 loading 상태를 유지
  const isValidating = !isValid;
  const validationPageParams = isValidating
    ? { isValidating, company: null }
    : { isValidating, company: company as Company };

  return validationPageParams;
};

export default useValidateCompanyPageParams;
