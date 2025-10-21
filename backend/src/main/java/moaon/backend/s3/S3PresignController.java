package moaon.backend.s3;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/s3")
public class S3PresignController {

    private final S3Service s3Service;

    @GetMapping(value = "/posturl")
    public ResponseEntity<List<S3UrlResponse>> getPostS3Url(@RequestParam("fileNames") List<String> fileNames) {
        List<S3UrlResponse> presignedUrls = s3Service.getPutS3Url(fileNames);
        return new ResponseEntity<>(presignedUrls, HttpStatusCode.valueOf(200));
    }
}
