package moaon.backend.s3;

public record S3UrlResponse(
        String preSignedUrl,
        String key
) {
}
