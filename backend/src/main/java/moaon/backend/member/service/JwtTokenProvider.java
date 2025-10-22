package moaon.backend.member.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private static final long EXPIRATION_DURATION_IN_MILLISECONDS = 24 * 60 * 60 * 1000L;

    private final SecretKey secretKey;

    public JwtTokenProvider(@Value("${jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    public String createToken(Long payload) {
        Claims claims = Jwts.claims()
                .subject(payload.toString())
                .build();
        Date now = new Date();
        Date validity = new Date(now.getTime() + EXPIRATION_DURATION_IN_MILLISECONDS);

        return Jwts.builder()
                .claims(claims)
                .expiration(validity)
                .signWith(secretKey)
                .compact();
    }

    public Long extractMemberId(String token) {
        if (!isValidToken(token)) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_MEMBER);
        }

        String id = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();

        return Long.parseLong(id);
    }

    public boolean isValidToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
            return claims.getPayload().getExpiration().after(new Date());
        } catch (JwtException e) {
            return false;
        }
    }
}
