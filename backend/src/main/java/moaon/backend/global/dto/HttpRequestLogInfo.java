package moaon.backend.global.dto;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public record HttpRequestLogInfo(
        String httpMethod,
        String requestURI
) {

    public static HttpRequestLogInfo fromCurrentRequest() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (requestAttributes == null) {
            return new HttpRequestLogInfo("unknown", "unknown");
        }

        HttpServletRequest request = requestAttributes.getRequest();
        return new HttpRequestLogInfo(
                request.getMethod(),
                request.getRequestURI()
        );
    }
}
