package moaon.backend.article.api.s3;

public record S3UrlResponse(
        String preSignedUrl,
        String fileName,
        String key
) {
}
