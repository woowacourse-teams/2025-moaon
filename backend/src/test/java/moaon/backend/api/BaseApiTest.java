package moaon.backend.api;

import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.operation.preprocess.Preprocessors;
import org.springframework.restdocs.restassured.RestAssuredRestDocumentation;
import org.springframework.restdocs.restassured.RestDocumentationFilter;
import org.springframework.restdocs.snippet.Snippet;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ExtendWith(RestDocumentationExtension.class)
public abstract class BaseApiTest {

    @LocalServerPort
    protected int port;

    protected RequestSpecification documentationSpecification;

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

    protected RestDocumentationFilter document(Snippet... snippets) {
        return RestAssuredRestDocumentation.document("{class-name}/{method-name}", snippets);
    }
} 
