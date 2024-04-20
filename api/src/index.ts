import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { z } from 'zod'

type Bindings = {
  DB: D1Database
};

const TODO_APP_FRONT_ROOT_URL = 'https://todo-app-ccq.pages.dev'

const app = new Hono<{Bindings: Bindings}>()

// Todoアイテムのスキーマ
const todoSchema = z.object({
  task: z.string(),
  status: z.enum(['todo', 'in_progress', 'done']),
});

app.use('/todos/*', cors({
  origin: TODO_APP_FRONT_ROOT_URL,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type'],
}));

// GET /todos - 全てのTodoアイテムを取得
app.get('/todos', async (c) => {
  try {
    const results = (await c.env.DB.prepare('SELECT * FROM todos').all()).results;
    return c.json(results)
  } catch (e) {
    return c.json(`エラってるわ：${e}`, 500);
  }
});

// POST /todos - 新しいTodoアイテムを作成
app.post('/todos', async (c) => {
  try {
    const todo = await todoSchema.parseAsync(await c.req.json());
    const result = await c.env.DB.prepare('INSERT INTO todos (task, status) VALUES (?, ?)')
      .bind(todo.task, todo.status)
      .run();
    return c.json({ id: result }, 201);
  } catch (e) {
    return c.json(`エラってるわ：${e}`, 500);
  }
});

// PUT /todos/:id - 指定したIDのTodoアイテムを更新
app.put('/todos/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const todo = await todoSchema.parseAsync(await c.req.json());
    const result = await c.env.DB.prepare('UPDATE todos SET task = ?, status = ? WHERE id = ?')
      .bind(todo.task, todo.status, id)
      .run();
    if (result.error) {
      return c.json({ message: 'Todo not found' }, 404);
    }
    return c.json({ message: 'Todo updated' });
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

// DELETE /todos/:id - 指定したIDのTodoアイテムを削除
app.delete('/todos/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const result = await c.env.DB.prepare('DELETE FROM todos WHERE id = ?')
      .bind(id)
      .run();
    if (result.error) {
      return c.json({ message: 'Todo not found' }, 404);
    }
    return c.json({ message: 'Todo deleted' });
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

export default app;