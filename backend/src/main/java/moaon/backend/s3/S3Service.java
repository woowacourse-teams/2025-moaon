package moaon.backend.s3;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3 s3Client;

    @Value("${s3.bucket}")
    private String bucket;

    @Transactional(readOnly = true)
    public List<S3UrlResponse> getPutS3Url(List<String> fileNames) {
        return fileNames.stream()
                .map(fileName -> {
                    String key = "moaon/projects/" + UUID.randomUUID() + "-" + fileName;
                    GeneratePresignedUrlRequest request = getPutGeneratePresignedUrlRequest(key, getExpiration());
                    URL url = s3Client.generatePresignedUrl(request);
                    return new S3UrlResponse(url.toExternalForm(), fileName, key);
                }).toList();
    }

    private GeneratePresignedUrlRequest getPutGeneratePresignedUrlRequest(String fileName, Date expiration) {
        GeneratePresignedUrlRequest generatePresignedUrlRequest
                = new GeneratePresignedUrlRequest(bucket, fileName)
                .withMethod(HttpMethod.PUT)
                .withKey(fileName)
                .withExpiration(expiration);
        generatePresignedUrlRequest.addRequestParameter(
                Headers.S3_CANNED_ACL,
                CannedAccessControlList.PublicRead.toString());
        return generatePresignedUrlRequest;
    }

    private Date getExpiration() {
        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 30;
        expiration.setTime(expTimeMillis);
        return expiration;
    }
}
