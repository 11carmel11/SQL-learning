const express = require("express");
const mysql = require("mysql2");

// Should be kept as environment variable
const mysqlConfig = {
  host: process.env.MYSQL_DATABASE || "mysql_server",
  user: process.env.MYSQL_USER || "student",
  password: process.env.MYSQL_PASSWORD || "secret",
  database: process.env.MYSQL_ROOT_PASSWORD || "test_db",
};

const port = process.env.PORT || 3000;

// Connecting to mysql container
const con = mysql.createConnection(mysqlConfig);
con.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

module.exports = con;

const app = express();

app.get("/", function (req, res) {
  res.send("Testing my server");
});

//  Creating first table "numbers"
app.get("/create-table", function (req, res) {
  const sql = `
    CREATE TABLE IF NOT EXISTS numbers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      number INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=INNODB;
  `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send("numbers table created");
  });
});

// Adding a random number ti "numbers" table
app.get("/insert", function (req, res) {
  const number = Math.round(Math.random() * 100);
  const sql = `INSERT INTO numbers (number) VALUES (${number})`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(`${number} inserted into table`);
  });
});

// Fetching number's table
app.get("/fetch", function (req, res) {
  const sql = `SELECT * FROM numbers`;
  con.query(sql, function (err, result, fields) {
    console.log(result[0].id);
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});

/**
USE `test_db` ;

-- -----------------------------------------------------
-- Table `test_db`.`classes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `classes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test_db`.`pupils`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pupils` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `classes_id` INT NOT NULL,
  PRIMARY KEY (`id`, `classes_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_pupils_classes1_idx` (`classes_id` ASC) VISIBLE,
  CONSTRAINT `fk_pupils_classes1`
    FOREIGN KEY (`classes_id`)
    REFERENCES `classes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test_db`.`teachers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test_db`.`subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `subjects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(45) NOT NULL,
  `teachers_id` INT NOT NULL,
  PRIMARY KEY (`id`, `teachers_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_subjects_teachers1_idx` (`teachers_id` ASC) VISIBLE,
  CONSTRAINT `fk_subjects_teachers1`
    FOREIGN KEY (`teachers_id`)
    REFERENCES `teachers` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test_db`.`pupils_has_subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pupils_has_subjects` (
  `pupils_id` INT NOT NULL,
  `subjects_id` INT NOT NULL,
  PRIMARY KEY (`pupils_id`, `subjects_id`),
  INDEX `fk_pupils_has_subjects_subjects1_idx` (`subjects_id` ASC) VISIBLE,
  INDEX `fk_pupils_has_subjects_pupils_idx` (`pupils_id` ASC) VISIBLE,
  CONSTRAINT `fk_pupils_has_subjects_pupils`
    FOREIGN KEY (`pupils_id`)
    REFERENCES `pupils` (`id`),
  CONSTRAINT `fk_pupils_has_subjects_subjects1`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `subjects` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- SET SQL_MODE=@OLD_SQL_MODE;
-- SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
-- SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
 */
