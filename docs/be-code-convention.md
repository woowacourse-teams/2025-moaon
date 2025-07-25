# Backend 코드 컨벤션

본 문서는 Spring Boot 기반 백엔드 개발 시 일관된 코드 품질과 가독성을 위한 코딩 스타일 가이드입니다.

## 🧩 아키텍처

### 패키지 구조

- **도메인 패키지 구조** 적용
- `controller`, `service`, `repository`, `domain`, `dto` 별개의 패키지로 분리
- **DTO는 별도의 패키지로 관리**하며, 계층별로 나누지 않고 하나의 DTO를 공유

```
src/main/java/
├── project/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── domain/
│   └── dto/
└── user/
    ├── controller/
    ├── service/
    ├── repository/
    ├── domain/
    └── dto/
```

### DTO 처리 및 서비스 계층 전달

- **컨트롤러에서 받은 DTO를 서비스에 그대로 전달**
- DTO에서 Entity로 변환하는 로직은 **서비스에서 처리**
- 변환 로직이 복잡해지면 **private 메서드로 분리**

### Repository 인터페이스 및 구현

- Repository는 **JpaRepository를 바로 확장**하여 사용

```java
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
```

## 👾 구현 규칙

### Validation 처리 위치

| 검증 유형 | 처리 위치 | 방법 | 예시 |
|-----------|----------|------|------|
| 형식 검증 | DTO | 어노테이션 | `@NotNull`, `@NotBlank`, `@Email` |
| 비즈니스 로직 검증 | 도메인(Entity/값 객체) | 직접 처리 | 이름 길이 제한, 비즈니스 규칙 |
| DB 제약 조건 | Entity | `@Column` 어노테이션 | `nullable = false` |

### 트랜잭션 처리

- **서비스 클래스**: `@Transactional(readOnly = true)` 기본 적용
- **CUD 메서드**: 별도로 `@Transactional` 적용

```java
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectService {

    @Transactional  // CUD 메서드만 별도 적용
    public ProjectSummaryResponse create(ProjectCreateRequest request) {
        // 생성 로직
    }

    public List<ProjectSummaryResponse> findAll() {
        // 조회 로직 (readOnly = true 적용됨)
    }
}
```

**적용 이유:**
- 읽기 전용 서비스임을 명확히 표현
- 영속성 컨텍스트 활용 및 지연 로딩 지원
- 변경 감지 등 JPA 이점 활용

### 예외 처리

- **예외 메시지**: ENUM으로 관리하여 메시지, 코드, 상태코드(400, 401, 403, 404, 500) 통합 관리

### 도메인 객체 메서드 재정의

- `List`를 사용하는 필드는 방어적 복사 사용

```java
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode(of = "id")
@ToString
public class Project {
    // 구현
}
```

### 설계 및 개발 방식

- **객체 설계 우선**, 그에 맞춰 DB 설계(JPA가 DB 생성) 진행
- DB 설계에 맞춰 엔티티를 만드는 방식이 아니라, **도메인 중심으로 객체를 먼저 설계**

## 🧪 테스트

### 계층별 테스트 전략

| 테스트 유형 | 도구/방법 | 작성 기준 | 검증 내용                                              |
|-------------|-----------|-----------|----------------------------------------------------|
| 통합 테스트 | RestAssured (E2E) | **필수** | 상태 코드, 응답값, DTO 검증,API 하나 당 하나의 테스트만 작성, 성공 케이스만 작성 |
| 서비스 테스트 | Repository 목킹 | 복잡한 비즈니스 로직 있을 때 | 비즈니스 로직 검증|
| 레포지터리 테스트 | H2 DB | 복잡한 쿼리(JPQL 등) 있을 때 | 쿼리 정확성 검증|

- **단순 로직**: 서비스 테스트 혹은 레포지터리 테스트 생략 가능
- **테스트 DB**: H2 사용

## 🎀 코드 스타일 및 컨벤션

### 클래스 구조

- **클래스 선언부 첫 줄은 띄우고, 마지막 중괄호 전에는 띄우지 않음**
- **메서드 순서**: 생성자 → public → private 순서로 작성
- **인터페이스 구현 클래스**: 인터페이스의 메서드 순서를 그대로 유지

### final 키워드 사용

| 적용 대상 | 규칙 | 이유 |
|-----------|------|------|
| 필드 | `final` 붙임 | 불변성 보장 |
| 지역 변수 | `final` 붙이지 않음 | 가독성 중시 |
| 메서드 파라미터 | `final` 붙이지 않음 | 가독성 중시 |
| 클래스 | `final` 붙이지 않음 | 확장 가능성 유지 |

## 📝 계층별 코드 작성 가이드

### Controller

```java
@RestController                    // 어노테이션 순서 준수
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    // 메서드명: API 이름으로 모든 맥락 표현
    @GetMapping
    public ResponseEntity<List<ProjectSummaryResponse>> findAllProjects() {
        return ResponseEntity.ok(projectService.findAll());
    }
}
```

**Controller 규칙:**
- `ResponseEntity`와 `@RestController` 일괄 사용
- 컨트롤러 메서드 이름은 해당 API 이름으로 간주하여 **모든 맥락을 표현할 수 있게 작성**

### Domain (Entity)

```java
@Entity                           // 어노테이션 순서 준수
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode(of = "id")
@ToString
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)      // nullable, unique 옵션 필수 고려
    private String title;

    // 생성자, public 메서드, private 메서드 순서로 작성
}
```

**Domain 규칙:**
- `@Column` 어노테이션의 `nullable` 옵션과 `unique` 옵션은 **필수로 고려**

### DTO

```java
public record ProjectSummaryResponse(
        long id,
        String title,
        String thumbnail
) {
    // 엔티티를 응답 DTO로 변환: from() 정적 팩토리 메서드
    public static ProjectSummaryResponse from(Project project) {
        return new ProjectSummaryResponse(
                project.getId(),
                project.getTitle(),
                project.getThumbnail()
        );
    }

    // 엔티티 리스트를 DTO 리스트로 변환: convert() 메서드
    public static List<ProjectSummaryResponse> convert(List<Project> projects) {
        return projects.stream()
                .map(ProjectSummaryResponse::from)
                .toList();
    }
}
```

**DTO 규칙:**
- **엔티티 → 응답 DTO 변환**: `from()`, `of()` 정적 팩토리 메서드 사용
- **엔티티 리스트 → DTO 리스트 변환**: `convert()` 메서드 사용
- Request DTO: validation 어노테이션 적용

```java
public record ProjectCreateRequest(
        @NotBlank String title,
        @NotBlank String thumbnail,  
        @NotBlank String description
) {
}
```

### Service

```java
@Service                          // 어노테이션 순서 준수
@Transactional(readOnly = true)   // 기본값
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Transactional                // CUD 메서드만 별도 적용
    public ProjectSummaryResponse create(ProjectCreateRequest request) {
        // 생성 로직
    }

    public List<ProjectSummaryResponse> findAll() {
        // 조회 로직
    }
}
```

### Test

#### API Test (통합 테스트)

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
class ProjectApiTest {

    @LocalServerPort
    private int port;

    @Autowired
    ProjectRepository projectRepository;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @DisplayName("GET /projects : 프로젝트 목록 조회 API")
    @Test
    void findAllProjects() {
        // given - 테스트 데이터 준비
        // when - API 호출
        // then - 응답 검증 (상태 코드, 응답값, DTO)
    }
}
```

#### Service Test (단위 테스트)

```java
@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @DisplayName("프로젝트를 저장한다.")
    @Test
    void save() {
        // given - Mock 설정
        // when - 서비스 메서드 호출
        // then - 비즈니스 로직 검증
    }
}
```
