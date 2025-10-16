package moaon.backend.member.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.SIG;
import java.util.Date;
import javax.crypto.SecretKey;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private static final SecretKey SECRET_KEY = SIG.HS256.key().build();
    private static final long EXPIRATION_DURATION_IN_MILLISECONDS = 900_000L;

    public String createToken(Long payload) {
        Claims claims = Jwts.claims()
                .subject(payload.toString())
                .build();
        Date now = new Date();
        Date validity = new Date(now.getTime() + EXPIRATION_DURATION_IN_MILLISECONDS);

        return Jwts.builder()
                .claims(claims)
                .expiration(validity)
                .signWith(SECRET_KEY)
                .compact();
    }

    public Long extractMemberId(String token) {
        validToken(token);
        String id = Jwts.parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();

        return Long.parseLong(id);
    }

    public void validToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token);
            boolean isExpired = claims.getPayload().getExpiration().before(new Date());
            if (isExpired) {
                throw new CustomException(ErrorCode.UNAUTHORIZED_MEMBER);
            }
        } catch (JwtException | IllegalArgumentException e) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_MEMBER, e);
        }
    }
}
