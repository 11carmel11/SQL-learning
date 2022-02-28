USE test_db ;

-- -----------------------------------------------------
-- Table classes
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'classes' (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table pupils
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS pupils (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  classes_id INT NOT NULL,
  PRIMARY KEY (id, classes_id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX fk_pupils_classes1_idx (classes_id ASC) VISIBLE,
  CONSTRAINT fk_pupils_classes1
    FOREIGN KEY (classes_id)
    REFERENCES classes (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table teachers
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS teachers (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table subjects
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS subjects (
  id INT NOT NULL AUTO_INCREMENT,
  subject VARCHAR(45) NOT NULL,
  teachers_id INT NOT NULL,
  PRIMARY KEY (id, teachers_id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX fk_subjects_teachers1_idx (teachers_id ASC) VISIBLE,
  CONSTRAINT fk_subjects_teachers1
    FOREIGN KEY (teachers_id)
    REFERENCES teachers (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table pupils_has_subjects
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS pupils_has_subjects (
  pupils_id INT NOT NULL,
  subjects_id INT NOT NULL,
  PRIMARY KEY (pupils_id, subjects_id),
  INDEX fk_pupils_has_subjects_subjects1_idx (subjects_id ASC) VISIBLE,
  INDEX fk_pupils_has_subjects_pupils_idx (pupils_id ASC) VISIBLE,
  CONSTRAINT fk_pupils_has_subjects_pupils
    FOREIGN KEY (pupils_id)
    REFERENCES pupils (id),
  CONSTRAINT fk_pupils_has_subjects_subjects1
    FOREIGN KEY (subjects_id)
    REFERENCES subjects (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;