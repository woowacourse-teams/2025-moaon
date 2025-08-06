package moaon.backend.restdocs;

import static org.springframework.restdocs.snippet.Attributes.key;

import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;
import java.util.Arrays;
import java.util.List;
import moaon.backend.fixture.RepositoryHelper;
import moaon.backend.global.config.QueryDslConfig;
import moaon.backend.global.exception.custom.ErrorCode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.operation.preprocess.Preprocessors;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.restassured.RestAssuredRestDocumentation;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Import({RepositoryHelper.class, QueryDslConfig.class})
@ExtendWith(RestDocumentationExtension.class)
public class ErrorCodeTest {

    @LocalServerPort
    private int port;

    private RequestSpecification documentationSpecification;

    @BeforeEach
    void setUp(RestDocumentationContextProvider restDocumentation) {
        RestAssured.port = port;
        this.documentationSpecification = new RequestSpecBuilder()
                .addFilter(RestAssuredRestDocumentation.documentationConfiguration(restDocumentation)
                        .operationPreprocessors()
                        .withRequestDefaults(
                                Preprocessors.prettyPrint(),
                                Preprocessors.modifyUris()
                                        .scheme("https")
                                        .host("api.moaon.site")
                                        .removePort()
                        )
                        .withResponseDefaults(Preprocessors.prettyPrint()))
                .build();
    }

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
