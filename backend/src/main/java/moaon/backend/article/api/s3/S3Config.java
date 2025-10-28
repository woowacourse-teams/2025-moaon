package moaon.backend.article.api.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {

    @Bean
    public AmazonS3 amazonS3Client(@Value("${s3.region}") String region) {
        return AmazonS3ClientBuilder
                .standard()
                .withRegion(region)
                .build();
    }
}
