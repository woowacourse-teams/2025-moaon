package moaon.backend.global.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class HttpLoggingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        String requestURI = httpServletRequest.getRequestURI();
        if (requestURI.startsWith("/actuator")) {
            chain.doFilter(request, response);
            return;
        }

        doRequestLogging(httpServletRequest);

        long startTime = System.currentTimeMillis();
        try {
            chain.doFilter(request, response);
            long responseTime = System.currentTimeMillis() - startTime;
            int status = httpServletResponse.getStatus();
            if (is2xxStatus(status)) {
                doResponseLogging(status, responseTime);
            }
        } finally {
            MDC.clear();
        }
    }

    private void doRequestLogging(HttpServletRequest httpServletRequest) {
        String method = httpServletRequest.getMethod();
        String requestURI = httpServletRequest.getRequestURI();
        String queryString = httpServletRequest.getQueryString();
        String fullPath = requestURI + (queryString != null ? "?" + queryString : "");

        log.info("[REQUEST] {} {}",
                method,
                fullPath
        );
    }

    private void doResponseLogging(int status, long responseTime) {
        log.info("[RESPONSE] Status: {} | Time(ms): {}",
                status,
                responseTime
        );
    }

    private boolean is2xxStatus(int status) {
        return status >= 200 && status < 300;
    }
}
