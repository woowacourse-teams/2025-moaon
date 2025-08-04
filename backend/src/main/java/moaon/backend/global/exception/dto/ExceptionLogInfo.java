package moaon.backend.global.exception.dto;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public record ExceptionLogInfo(
        String httpMethod,
        String requestURI
) {

    public static ExceptionLogInfo fromCurrentRequest() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (requestAttributes == null) {
            return new ExceptionLogInfo("unknown", "unknown");
        }

        HttpServletRequest request = requestAttributes.getRequest();
        return new ExceptionLogInfo(
                request.getMethod(),
                request.getRequestURI()
        );
    }
}
