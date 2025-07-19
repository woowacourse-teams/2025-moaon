package moaon.backend.global.exception.custom;

import org.springframework.http.HttpStatus;

public class NotFoundException extends CustomException {

    public NotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.NOT_FOUND;
    }
}
