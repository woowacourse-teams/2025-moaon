package moaon.backend.global.exception.dto;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public record ExceptionLogInfo(
        String httpMethod,
        String requestURI,
        String clientIP,
        String userAgent
) {

    public static ExceptionLogInfo fromCurrentRequest() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (requestAttributes == null) {
            return new ExceptionLogInfo("unknown", "unknown", "unknown", "unknown");
        }

        HttpServletRequest request = requestAttributes.getRequest();
        return new ExceptionLogInfo(
                request.getMethod(),
                request.getRequestURI(),
                request.getRemoteAddr(),
                request.getHeader(HttpHeaders.USER_AGENT)
        );
    }
}
