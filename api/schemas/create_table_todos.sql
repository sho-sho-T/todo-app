-- todosテーブルが存在する場合は削除
DROP TABLE IF EXISTS todos;

-- todosテーブルを作成
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task TEXT NOT NULL,
  status TEXT CHECK(status IN ('todo', 'in_progress', 'done')) DEFAULT 'todo'
);

-- 初期データを挿入
INSERT INTO todos (task, status) VALUES
  ('Buy groceries', 'todo'),
  ('Clean the house', 'in_progress'),
  ('Pay bills', 'done'),
  ('Walk the dog', 'todo'),
  ('Finish project', 'in_progress');