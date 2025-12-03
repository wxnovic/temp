CREATE DATABASE sts2web;

CREATE USER sts2web WITH PASSWORD '비밀번호';

GRANT ALL PRIVILEGES ON DATABASE sts2web TO sts2web;

GRANT ALL ON SCHEMA public TO sts2web;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON TABLES TO sts2web;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON SEQUENCES TO sts2web;




-- 16

-- 1. DB 생성
CREATE DATABASE sts2web;

-- 2. 유저 생성
CREATE USER sts2web WITH PASSWORD '비밀번호';

-- 3. DB 접근 권한
GRANT ALL PRIVILEGES ON DATABASE sts2web TO sts2web;

-- 4. 스키마 권한
GRANT ALL ON SCHEMA public TO sts2web;

-- 5. 이미 존재하는 테이블 권한
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sts2web;

-- 6. 이미 존재하는 시퀀스 권한
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO sts2web;

-- 7. 앞으로 생성될 테이블의 기본 권한
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON TABLES TO sts2web;

-- 8. 앞으로 생성될 시퀀스의 기본 권한
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON SEQUENCES TO sts2web;

| 기능         | MySQL                          | PostgreSQL                   |
| ---------- | ------------------------------ | ---------------------------- |
| DB 목록 보기   | `SHOW DATABASES;`              | `\l`                         |
| DB 변경      | `USE dbname;`                  | `\c dbname` (USE 없음)         |
| 테이블 목록     | `SHOW TABLES;`                 | `\dt`                        |
| 테이블 구조     | `DESC table;`                  | `\d table`                   |
| 컬럼 상세      | `SHOW COLUMNS FROM table;`     | `\d table` or `\d+ table`    |
| 현재 DB      | `SELECT DATABASE();`           | `SELECT current_database();` |
| 유저 목록      | `SELECT user FROM mysql.user;` | `\du`                        |
| SQL 실행 툴   | mysql CLI                      | psql CLI                     |
| 자동 증가      | AUTO_INCREMENT                 | SERIAL 또는 IDENTITY           |
| JSON 기능    | 약함                             | 매우 강력함                       |
| 트랜잭션       | 약함                             | 매우 강력함                       |
| 기본 정규화/무결성 | 낮음                             | 매우 엄격                        |

