using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/todos")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoController(AppDbContext context)
        {
            _context = context;
        }

        // Método GET em api/todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            return await _context.Tasks.ToListAsync();
        }

        // Método GET em api/todos/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(string id)
        {
            var todo = await _context.Tasks.FindAsync(id);
            if (todo == null) return NotFound();
            return todo;
        }

        // Método POST em api/todos
        [HttpPost]
        public async Task<ActionResult<Todo>> CreateTodo(Todo todo)
        {
            _context.Tasks.Add(todo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
        }

        // Método PUT em api/todos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(string id, Todo todo)
        {
            if (id != todo.Id) return BadRequest();

            _context.Entry(todo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Método DELETE em api/todos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(string id)
        {
            var todo = await _context.Tasks.FindAsync(id);
            if (todo == null) return NotFound();

            _context.Tasks.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
