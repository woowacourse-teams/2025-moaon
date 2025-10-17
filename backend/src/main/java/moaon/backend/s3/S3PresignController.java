package moaon.backend.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/s3")
public class S3PresignController {

    private final S3Service s3Service;

    @GetMapping(value = "/posturl")
    public ResponseEntity<S3UrlResponse> getPostS3Url(String filename) {
        S3UrlResponse s3UrlResponse = s3Service.getPutS3Url(filename);
        return new ResponseEntity<>(s3UrlResponse, HttpStatusCode.valueOf(200));
    }
}
