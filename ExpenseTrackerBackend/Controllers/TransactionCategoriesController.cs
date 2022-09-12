using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTrackerBackend.Models;

namespace ExpenseTrackerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionCategoriesController : ControllerBase
    {
        private readonly TransactionDbContext _context;

        public TransactionCategoriesController(TransactionDbContext context)
        {
            _context = context;
        }

        // GET: api/TransactionCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionCategory>>> GetTransactionsCategories()
        {
          if (_context.TransactionsCategories == null)
          {
              return NotFound();
          }
            return await _context.TransactionsCategories.ToListAsync();
        }

        // GET: api/TransactionCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionCategory>> GetTransactionCategory(int id)
        {
          if (_context.TransactionsCategories == null)
          {
              return NotFound();
          }
            var transactionCategory = await _context.TransactionsCategories.FindAsync(id);

            if (transactionCategory == null)
            {
                return NotFound();
            }

            return transactionCategory;
        }

        // PUT: api/TransactionCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransactionCategory(int id, TransactionCategory transactionCategory)
        {
            if (id != transactionCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(transactionCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TransactionCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TransactionCategory>> PostTransactionCategory(TransactionCategory transactionCategory)
        {
          if (_context.TransactionsCategories == null)
          {
              return Problem("Entity set 'TransactionDbContext.TransactionsCategories'  is null.");
          }
            _context.TransactionsCategories.Add(transactionCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransactionCategory", new { id = transactionCategory.Id }, transactionCategory);
        }

        // DELETE: api/TransactionCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransactionCategory(int id)
        {
            if (_context.TransactionsCategories == null)
            {
                return NotFound();
            }
            var transactionCategory = await _context.TransactionsCategories.FindAsync(id);
            if (transactionCategory == null)
            {
                return NotFound();
            }

            _context.TransactionsCategories.Remove(transactionCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransactionCategoryExists(int id)
        {
            return (_context.TransactionsCategories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
