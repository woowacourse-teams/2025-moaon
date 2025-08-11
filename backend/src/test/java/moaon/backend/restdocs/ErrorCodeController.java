package moaon.backend.restdocs;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;
import moaon.backend.global.exception.custom.ErrorCode;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Profile("test")
@RestController
public class ErrorCodeController {

    @GetMapping("/error-code")
    public Map<String, ErrorCodeResponse> findErrorCodes() {
        return Arrays.stream(ErrorCode.values())
                .collect(
                        Collectors.toMap(
                                ErrorCode::name,
                                ErrorCodeResponse::new
                        )
                );
    }
}
