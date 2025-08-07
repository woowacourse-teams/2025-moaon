package moaon.backend.restdocs;

import static org.springframework.restdocs.snippet.Attributes.key;

import io.restassured.RestAssured;
import java.util.Arrays;
import java.util.List;
import moaon.backend.api.BaseApiTest;
import moaon.backend.global.exception.custom.ErrorCode;
import org.junit.jupiter.api.Test;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.restassured.RestAssuredRestDocumentation;

public class ErrorCodeTest extends BaseApiTest {

    @Test
    void errorCodes() {
        RestAssured.given(documentationSpecification)
                .filter(RestAssuredRestDocumentation.document("error-code-test",
                                new CustomResponseFieldsSnippet(
                                        "error-response",
                                        fieldDescriptors(),
                                        true
                                )
                        )
                )
                .when().get("/error-code");
    }

    private List<FieldDescriptor> fieldDescriptors() {
        return Arrays.stream(ErrorCode.values())
                .map(errorCode -> PayloadDocumentation.fieldWithPath(errorCode.name())
                        .attributes(
                                key("code").value(errorCode.getId()),
                                key("name").value(errorCode.name()),
                                key("message").value(errorCode.getMessage()),
                                key("status").value(errorCode.getHttpStatus().value()))
                ).toList();
    }
}
