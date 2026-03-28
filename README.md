# Notes App (PHP + MySQL)

This is a simple note app that performs full **CRUD (Create, Read, Update, Delete)** operations using PHP (PDO) and MySQL.

---

## Screenshot

<img width="1920" height="1040" alt="image" src="https://github.com/user-attachments/assets/0ad16e19-2b62-459e-887a-81dc419e6337" />

---

## Features

- Create notes
- Read / display notes
- Update notes
- Delete notes
- Simple UI
- PDO prepared statements

---

## Database Structure

**Table: `notes`**

| Field   | Type         | Attributes              |
|----------|-------------|------------------------|
| id       | int(11)      | Primary Key, Auto Increment |
| title    | varchar(100) | NOT NULL              |
| content  | text         | NOT NULL              |
| date     | datetime     | NOT NULL              |

---

## Sample Data

```sql
INSERT INTO notes (title, content, date) VALUES
('Meeting Notes', 'Discussed project timeline and deliverables.', NOW()),
('Grocery List', 'Milk, Eggs, Bread, Coffee.', NOW()),
('Workout Plan', 'Monday: Chest, Back, Legs rotation.', NOW()),
('Ideas', 'Build a notes app with CRUD functionality.', NOW()),
('Reminder', 'Pay bills before due date.', NOW()),
('Study Notes', 'Review PHP PDO prepared statements.', NOW()),
('Travel Plans', 'Visit Japan in spring.', NOW()),
('Books', 'Clean Code, Atomic Habits, Deep Work.', NOW()),
('Journal', 'Today I learned CRUD with PHP.', NOW()),
('Tasks', 'Finish backend API and testing.', NOW());
