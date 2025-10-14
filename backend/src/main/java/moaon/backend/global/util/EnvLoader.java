package moaon.backend.global.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class EnvLoader {

    public static String getEnv(String key) {
        try (Stream<String> lines = Files.lines(Paths.get(".env"))) {
            Map<String, String> env = lines
                    .filter(line -> line.contains("="))
                    .map(line -> line.split("=", 2))
                    .collect(Collectors.toMap(
                            arr -> arr[0].trim(),
                            arr -> arr[1].trim()
                    ));

            if (!env.containsKey(key)) {
                throw new IllegalArgumentException("[ERROR] env 파일에 존재하지 않는 파라미터입니다.");
            }

            return env.get(key);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.UNKNOWN, e);
        }
    }
}
