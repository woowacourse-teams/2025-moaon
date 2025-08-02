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

@Slf4j
public class RequestLoggingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        long startTime = System.currentTimeMillis();

        chain.doFilter(request, response);

        int status = httpServletResponse.getStatus();
        if (status >= 400) {
            return;
        }

        long responseTime = System.currentTimeMillis() - startTime;
        String method = httpServletRequest.getMethod();
        String requestURI = httpServletRequest.getRequestURI();
        String queryString = httpServletRequest.getQueryString();
        String clientIP = httpServletRequest.getRemoteAddr();

        log.info("[API Request] {} {} | Status: {} | Time: {}ms | IP: {}",
                method,
                requestURI + (queryString != null ? "?" + queryString : ""),
                status,
                responseTime,
                clientIP
        );
    }
}
