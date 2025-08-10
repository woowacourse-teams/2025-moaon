package moaon.backend.global.domain;

/**
 * SOURCE 타입 파라미터를 받아서 RESULT 타입을 리턴합니다. <br>
 * <p>
 * -- 예시 --<br> QueryModifier< QueryCondition, BooleanExpression > <br> QueryCondition객체로부터 Where절을 제작하는 전략 객체
 */
public interface QueryModifier<RESULT, SOURCE> {

    RESULT modify(SOURCE source);
}
