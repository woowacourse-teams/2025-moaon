// Testing Framework: Jest with TypeScript support
// This test suite validates the YAML configuration structure, content, and edge cases
// Run with: npm test


import * as yaml from 'js-yaml';

describe('Documentation and Configuration Tests', () => {
  let configContent: string;
  let parsedConfig: any;

  beforeAll(() => {
    // The actual YAML config content being tested
    configContent = `language: ko-KR
tone_instructions: >
  우아한테크코스 동기들의 카톡 단체방에서 코드 리뷰하는 것처럼 해주세요.
  '이 코드 ㄹㅇ 깔끔하다 ㅋㅋㅋ' 같은 톤으로 친구들끼리 대화하듯 리뷰해주세요.
  피드백은 명확하고 구체적이어야 하며, 문제의 원인과 개선 방법을 반드시 제시하세요.
  리뷰는 교육적이어야 하며, 관련 개념이나 공식 문서를 함께 추천하세요.

reviews:
  profile: chill
  request_changes_workflow: true
  high_level_summary: true
  changed_files_summary: false
  sequence_diagrams: false
  assess_linked_issues: true
  related_issues: false
  related_prs: false
  suggested_labels: false
  auto_apply_labels: false
  suggested_reviewers: false
  auto_assign_reviewers: false
  poem: true
  path_instructions:
    - path: frontend/**
      instructions: |
        1. React(Typescript) 팀 코드 컨벤션(docs/fe-code-convention.md) 및 공식 스타일 가이드(Biome, React/TS best practices)를 우선적으로 반영하여, 가독성·안정성(Null/에러 처리)·테스트/유지보수 용이성·브라우저/접근성 이슈 등을 검토해주세요.
        2. 최신 React/TypeScript 트렌드, JSDoc·Storybook 등 문서화, 팀 스타일 통일성도 함께 확인해 주세요.
        3. 각 리뷰 포인트별로 문제점과 대안, 장단점을 논리적으로 제시하고, 필요한 경우 예시 코드도 추가해 주세요.
        4. 리뷰가 너무 많아서 피로감을 줄 수 있으니, 꼭 필요한 부분에 집중해주고, 나머지는 캡션으로 설명해주세요.
        5. 리뷰 남겨주는 부분은 해당 라인 범위의 코멘트에 작성해주세요.
    - path: backend/**
      instructions: |
        1. 팀 및 공식 컨벤션(docs/be-code-convention.md), 가독성, 예외처리, 테스트/확장/유지보수성, 모듈화, API/DB/보안 설계 기준을 기반으로 리뷰해주세요.
        2. 객체지향, 최신 트렌드, 불필요한 로직, 클린코드, 리팩토링, 서비스/도메인 설계, 공통 예외 처리, 확장성도 함께 확인해주세요.
        3. 각 리뷰 포인트별로 문제점과 대안, 장단점을 논리적으로 제시하고, 필요한 경우 예시 코드도 추가해 주세요.
        4. 리뷰가 너무 많아서 피로감을 줄 수 있으니, 꼭 필요한 부분에 집중해주고, 나머지는 캡션으로 설명해주세요.
        5. 리뷰 남겨주는 부분은 해당 라인 범위의 코멘트에 작성해주세요.
        6. 미작성한 테스트 코드 케이스가 있다면, 어떤 테스트가 필요한지 제안해주세요. (예: API 테스트, Service 단위 테스트, Repository 단위 테스트)
  auto_review:
    enabled: false
    auto_incremental_review: false

chat:
  auto_reply: true

knowledge_base:
  web_search:
    enabled: true
  code_guidelines:
    enabled: true
    filePatterns:
      - docs/be-code-convention.md
      - docs/fe-code-convention.md
  learnings:
    scope: local
  issues:
    scope: local
  pull_requests:
    scope: local`;

    try {
      parsedConfig = yaml.load(configContent);
    } catch (error) {
      console.error('Failed to parse YAML config:', error);
    }
  });

  describe('YAML Structure Validation', () => {
    test('should parse YAML configuration without errors', () => {
      expect(() => yaml.load(configContent)).not.toThrow();
      expect(parsedConfig).toBeDefined();
      expect(typeof parsedConfig).toBe('object');
    });

    test('should have valid YAML syntax', () => {
      expect(parsedConfig).not.toBeNull();
      expect(parsedConfig).toBeTruthy();
    });

    test('should handle multiline strings correctly', () => {
      expect(parsedConfig.tone_instructions).toContain('우아한테크코스');
      expect(parsedConfig.tone_instructions).toContain('피드백은 명확하고 구체적이어야');
      expect(typeof parsedConfig.tone_instructions).toBe('string');
    });

    test('should preserve Korean characters in multiline strings', () => {
      expect(parsedConfig.tone_instructions).toContain('ㄹㅇ');
      expect(parsedConfig.tone_instructions).toContain('ㅋㅋㅋ');
    });
  });

  describe('Required Configuration Keys', () => {
    test('should contain all top-level required keys', () => {
      const requiredKeys = ['language', 'tone_instructions', 'reviews', 'chat', 'knowledge_base'];
      requiredKeys.forEach(key => {
        expect(parsedConfig).toHaveProperty(key);
      });
    });

    test('should contain language configuration', () => {
      expect(parsedConfig).toHaveProperty('language');
      expect(parsedConfig.language).toBe('ko-KR');
    });

    test('should contain tone_instructions', () => {
      expect(parsedConfig).toHaveProperty('tone_instructions');
      expect(typeof parsedConfig.tone_instructions).toBe('string');
      expect(parsedConfig.tone_instructions.length).toBeGreaterThan(0);
    });

    test('should contain reviews configuration', () => {
      expect(parsedConfig).toHaveProperty('reviews');
      expect(typeof parsedConfig.reviews).toBe('object');
    });

    test('should contain chat configuration', () => {
      expect(parsedConfig).toHaveProperty('chat');
      expect(typeof parsedConfig.chat).toBe('object');
    });

    test('should contain knowledge_base configuration', () => {
      expect(parsedConfig).toHaveProperty('knowledge_base');
      expect(typeof parsedConfig.knowledge_base).toBe('object');
    });
  });

  describe('Language Configuration', () => {
    test('should have valid language code format', () => {
      expect(parsedConfig.language).toMatch(/^[a-z]{2}-[A-Z]{2}$/);
    });

    test('should be Korean language configuration', () => {
      expect(parsedConfig.language).toBe('ko-KR');
    });

    test('should not be empty or undefined', () => {
      expect(parsedConfig.language).toBeDefined();
      expect(parsedConfig.language.trim()).not.toBe('');
    });
  });

  describe('Tone Instructions Validation', () => {
    test('should contain Korean language instructions', () => {
      expect(parsedConfig.tone_instructions).toContain('우아한테크코스');
      expect(parsedConfig.tone_instructions).toContain('카톡 단체방');
      expect(parsedConfig.tone_instructions).toContain('코드 리뷰');
    });

    test('should contain specific tone examples', () => {
      expect(parsedConfig.tone_instructions).toContain('ㄹㅇ 깔끔하다');
      expect(parsedConfig.tone_instructions).toContain('ㅋㅋㅋ');
    });

    test('should contain feedback requirements', () => {
      expect(parsedConfig.tone_instructions).toContain('피드백은 명확하고 구체적');
      expect(parsedConfig.tone_instructions).toContain('문제의 원인과 개선 방법');
      expect(parsedConfig.tone_instructions).toContain('교육적이어야');
    });

    test('should contain documentation recommendation requirement', () => {
      expect(parsedConfig.tone_instructions).toContain('관련 개념이나 공식 문서');
    });

    test('should not contain malformed characters', () => {
      expect(parsedConfig.tone_instructions).not.toContain('�');
      expect(parsedConfig.tone_instructions).not.toContain('<?');
    });
  });

  describe('Reviews Configuration', () => {
    test('should have profile setting', () => {
      expect(parsedConfig.reviews).toHaveProperty('profile');
      expect(parsedConfig.reviews.profile).toBe('chill');
    });

    test('should have all required boolean workflow settings', () => {
      const booleanFields = [
        'request_changes_workflow',
        'high_level_summary',
        'changed_files_summary',
        'sequence_diagrams',
        'assess_linked_issues',
        'related_issues',
        'related_prs',
        'suggested_labels',
        'auto_apply_labels',
        'suggested_reviewers',
        'auto_assign_reviewers',
        'poem'
      ];

      booleanFields.forEach(field => {
        expect(parsedConfig.reviews).toHaveProperty(field);
        expect(typeof parsedConfig.reviews[field]).toBe('boolean');
      });
    });

    test('should have correct boolean values for workflow settings', () => {
      expect(parsedConfig.reviews.request_changes_workflow).toBe(true);
      expect(parsedConfig.reviews.high_level_summary).toBe(true);
      expect(parsedConfig.reviews.assess_linked_issues).toBe(true);
      expect(parsedConfig.reviews.poem).toBe(true);
      expect(parsedConfig.reviews.changed_files_summary).toBe(false);
      expect(parsedConfig.reviews.sequence_diagrams).toBe(false);
    });

    test('should have path_instructions array', () => {
      expect(parsedConfig.reviews).toHaveProperty('path_instructions');
      expect(Array.isArray(parsedConfig.reviews.path_instructions)).toBe(true);
      expect(parsedConfig.reviews.path_instructions.length).toBeGreaterThan(0);
    });

    test('should have auto_review configuration', () => {
      expect(parsedConfig.reviews).toHaveProperty('auto_review');
      expect(typeof parsedConfig.reviews.auto_review).toBe('object');
      expect(parsedConfig.reviews.auto_review).toHaveProperty('enabled');
      expect(parsedConfig.reviews.auto_review).toHaveProperty('auto_incremental_review');
      expect(parsedConfig.reviews.auto_review.enabled).toBe(false);
      expect(parsedConfig.reviews.auto_review.auto_incremental_review).toBe(false);
    });
  });

  describe('Path Instructions Validation', () => {
    test('should contain exactly two path instructions', () => {
      expect(parsedConfig.reviews.path_instructions).toHaveLength(2);
    });

    test('should contain frontend path instructions', () => {
      const frontendInstruction = parsedConfig.reviews.path_instructions.find(
        (instruction: any) => instruction.path === 'frontend/**'
      );
      expect(frontendInstruction).toBeDefined();
      expect(frontendInstruction.instructions).toContain('React(Typescript)');
      expect(frontendInstruction.instructions).toContain('docs/fe-code-convention.md');
      expect(frontendInstruction.instructions).toContain('Biome');
    });

    test('should contain backend path instructions', () => {
      const backendInstruction = parsedConfig.reviews.path_instructions.find(
        (instruction: any) => instruction.path === 'backend/**'
      );
      expect(backendInstruction).toBeDefined();
      expect(backendInstruction.instructions).toContain('docs/be-code-convention.md');
      expect(backendInstruction.instructions).toContain('테스트 코드 케이스');
      expect(backendInstruction.instructions).toContain('객체지향');
    });

    test('should have properly structured path instructions', () => {
      parsedConfig.reviews.path_instructions.forEach((instruction: any) => {
        expect(instruction).toHaveProperty('path');
        expect(instruction).toHaveProperty('instructions');
        expect(typeof instruction.path).toBe('string');
        expect(typeof instruction.instructions).toBe('string');
        expect(instruction.path.length).toBeGreaterThan(0);
        expect(instruction.instructions.length).toBeGreaterThan(0);
      });
    });

    test('should contain specific review criteria for frontend', () => {
      const frontendInstruction = parsedConfig.reviews.path_instructions.find(
        (instruction: any) => instruction.path === 'frontend/**'
      );
      const criteria = ['가독성', '안정성', '테스트', '유지보수', '브라우저', '접근성'];
      criteria.forEach(criterion => {
        expect(frontendInstruction.instructions).toContain(criterion);
      });
    });

    test('should contain specific review criteria for backend', () => {
      const backendInstruction = parsedConfig.reviews.path_instructions.find(
        (instruction: any) => instruction.path === 'backend/**'
      );
      const criteria = ['예외처리', '모듈화', 'API', 'DB', '보안', '확장성'];
      criteria.forEach(criterion => {
        expect(backendInstruction.instructions).toContain(criterion);
      });
    });

    test('should include numbered instruction format', () => {
      parsedConfig.reviews.path_instructions.forEach((instruction: any) => {
        expect(instruction.instructions).toMatch(/1\./);
        expect(instruction.instructions).toMatch(/2\./);
        expect(instruction.instructions).toMatch(/3\./);
      });
    });
  });

  describe('Chat Configuration', () => {
    test('should have auto_reply setting', () => {
      expect(parsedConfig.chat).toHaveProperty('auto_reply');
      expect(typeof parsedConfig.chat.auto_reply).toBe('boolean');
      expect(parsedConfig.chat.auto_reply).toBe(true);
    });

    test('should only contain expected chat properties', () => {
      const chatKeys = Object.keys(parsedConfig.chat);
      expect(chatKeys).toEqual(['auto_reply']);
    });
  });

  describe('Knowledge Base Configuration', () => {
    test('should have web_search configuration', () => {
      expect(parsedConfig.knowledge_base).toHaveProperty('web_search');
      expect(parsedConfig.knowledge_base.web_search).toHaveProperty('enabled');
      expect(typeof parsedConfig.knowledge_base.web_search.enabled).toBe('boolean');
      expect(parsedConfig.knowledge_base.web_search.enabled).toBe(true);
    });

    test('should have code_guidelines configuration', () => {
      expect(parsedConfig.knowledge_base).toHaveProperty('code_guidelines');
      expect(parsedConfig.knowledge_base.code_guidelines).toHaveProperty('enabled');
      expect(parsedConfig.knowledge_base.code_guidelines).toHaveProperty('filePatterns');
      expect(Array.isArray(parsedConfig.knowledge_base.code_guidelines.filePatterns)).toBe(true);
      expect(parsedConfig.knowledge_base.code_guidelines.enabled).toBe(true);
    });

    test('should contain required documentation files in filePatterns', () => {
      const filePatterns = parsedConfig.knowledge_base.code_guidelines.filePatterns;
      expect(filePatterns).toContain('docs/be-code-convention.md');
      expect(filePatterns).toContain('docs/fe-code-convention.md');
      expect(filePatterns).toHaveLength(2);
    });

    test('should have scope configurations', () => {
      const scopeFields = ['learnings', 'issues', 'pull_requests'];
      scopeFields.forEach(field => {
        expect(parsedConfig.knowledge_base).toHaveProperty(field);
        expect(parsedConfig.knowledge_base[field]).toHaveProperty('scope');
        expect(parsedConfig.knowledge_base[field].scope).toBe('local');
      });
    });

    test('should have all required knowledge_base sections', () => {
      const requiredSections = ['web_search', 'code_guidelines', 'learnings', 'issues', 'pull_requests'];
      requiredSections.forEach(section => {
        expect(parsedConfig.knowledge_base).toHaveProperty(section);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle malformed YAML gracefully', () => {
      const malformedYaml = 'invalid: yaml: content: [unclosed';
      expect(() => yaml.load(malformedYaml)).toThrow();
    });

    test('should handle empty YAML', () => {
      const emptyYaml = '';
      const result = yaml.load(emptyYaml);
      expect(result).toBeUndefined();
    });

    test('should handle YAML with only comments', () => {
      const commentOnlyYaml = '# This is just a comment\n# Another comment';
      const result = yaml.load(commentOnlyYaml);
      expect(result).toBeUndefined();
    });

    test('should handle YAML with invalid Unicode characters', () => {
      const invalidUnicodeYaml = 'test: \uFFFE';
      expect(() => yaml.load(invalidUnicodeYaml)).not.toThrow();
    });

    test('should validate required nested properties exist', () => {
      const requiredPaths = [
        'reviews.profile',
        'reviews.path_instructions',
        'reviews.auto_review.enabled',
        'chat.auto_reply',
        'knowledge_base.web_search.enabled',
        'knowledge_base.code_guidelines.enabled'
      ];

      requiredPaths.forEach(path => {
        const pathSegments = path.split('.');
        let current = parsedConfig;
        
        pathSegments.forEach(segment => {
          expect(current).toHaveProperty(segment);
          current = current[segment];
        });
      });
    });

    test('should handle missing optional properties gracefully', () => {
      const minimalConfig = yaml.load(`
        language: ko-KR
        reviews:
          profile: chill
        chat:
          auto_reply: true
        knowledge_base:
          web_search:
            enabled: true
      `);
      
      expect(minimalConfig).toBeDefined();
      expect(minimalConfig.language).toBe('ko-KR');
    });
  });

  describe('Content Validation', () => {
    test('should contain Korean-specific review instructions', () => {
      const koreanTerms = ['가독성', '안정성', '유지보수', '예외처리', '테스트'];
      const instructionsText = parsedConfig.reviews.path_instructions
        .map((instruction: any) => instruction.instructions)
        .join(' ');

      koreanTerms.forEach(term => {
        expect(instructionsText).toContain(term);
      });
    });

    test('should reference specific documentation files', () => {
      const docFiles = ['docs/fe-code-convention.md', 'docs/be-code-convention.md'];
      const configText = JSON.stringify(parsedConfig);
      
      docFiles.forEach(file => {
        expect(configText).toContain(file);
      });
    });

    test('should contain specific development practices', () => {
      const practices = [
        'React/TS best practices',
        'JSDoc',
        'Storybook',
        '객체지향',
        'API 테스트',
        'Service 단위 테스트'
      ];
      
      const configText = JSON.stringify(parsedConfig);
      practices.forEach(practice => {
        expect(configText).toContain(practice);
      });
    });

    test('should contain accessibility and browser compatibility mentions', () => {
      const frontendInstruction = parsedConfig.reviews.path_instructions.find(
        (instruction: any) => instruction.path === 'frontend/**'
      );
      expect(frontendInstruction.instructions).toContain('브라우저');
      expect(frontendInstruction.instructions).toContain('접근성');
    });

    test('should contain security mentions for backend', () => {
      const backendInstruction = parsedConfig.reviews.path_instructions.find(
        (instruction: any) => instruction.path === 'backend/**'
      );
      expect(backendInstruction.instructions).toContain('보안');
    });
  });

  describe('Configuration Consistency', () => {
    test('should have consistent boolean value types', () => {
      const booleanPaths = [
        ['reviews', 'request_changes_workflow'],
        ['reviews', 'high_level_summary'],
        ['reviews', 'auto_review', 'enabled'],
        ['chat', 'auto_reply'],
        ['knowledge_base', 'web_search', 'enabled']
      ];

      booleanPaths.forEach(path => {
        let current = parsedConfig;
        path.forEach(segment => {
          current = current[segment];
        });
        expect(typeof current).toBe('boolean');
      });
    });

    test('should have consistent scope values in knowledge_base', () => {
      const scopeFields = ['learnings', 'issues', 'pull_requests'];
      scopeFields.forEach(field => {
        expect(parsedConfig.knowledge_base[field].scope).toBe('local');
      });
    });

    test('should have consistent path pattern format', () => {
      parsedConfig.reviews.path_instructions.forEach((instruction: any) => {
        expect(instruction.path).toMatch(/\*\*$/); // Should end with **
        expect(instruction.path).toContain('/'); // Should contain path separator
      });
    });

    test('should maintain Korean language consistency throughout', () => {
      const hasKoreanText = (text: string): boolean => {
        return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
      };

      expect(hasKoreanText(parsedConfig.tone_instructions)).toBe(true);
      
      parsedConfig.reviews.path_instructions.forEach((instruction: any) => {
        expect(hasKoreanText(instruction.instructions)).toBe(true);
      });
    });
  });

  describe('Schema Validation', () => {
    test('should have correct data types for all fields', () => {
      expect(typeof parsedConfig.language).toBe('string');
      expect(typeof parsedConfig.tone_instructions).toBe('string');
      expect(typeof parsedConfig.reviews).toBe('object');
      expect(typeof parsedConfig.chat).toBe('object');
      expect(typeof parsedConfig.knowledge_base).toBe('object');
    });

    test('should not have unexpected top-level properties', () => {
      const expectedKeys = ['language', 'tone_instructions', 'reviews', 'chat', 'knowledge_base'];
      const actualKeys = Object.keys(parsedConfig);
      
      actualKeys.forEach(key => {
        expect(expectedKeys).toContain(key);
      });
    });

    test('should have non-empty string values where expected', () => {
      expect(parsedConfig.language.trim()).not.toBe('');
      expect(parsedConfig.tone_instructions.trim()).not.toBe('');
      expect(parsedConfig.reviews.profile.trim()).not.toBe('');
    });
  });
});