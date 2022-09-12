﻿using System;
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
    public class TransactionTypesController : ControllerBase
    {
        private readonly TransactionDbContext _context;

        public TransactionTypesController(TransactionDbContext context)
        {
            _context = context;
        }

        // GET: api/TransactionTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionType>>> GetTransactionsTypes()
        {
          if (_context.TransactionsTypes == null)
          {
              return NotFound();
          }
            return await _context.TransactionsTypes.ToListAsync();
        }

        // GET: api/TransactionTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionType>> GetTransactionType(int id)
        {
          if (_context.TransactionsTypes == null)
          {
              return NotFound();
          }
            var transactionType = await _context.TransactionsTypes.FindAsync(id);

            if (transactionType == null)
            {
                return NotFound();
            }

            return transactionType;
        }

        // PUT: api/TransactionTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransactionType(int id, TransactionType transactionType)
        {
            if (id != transactionType.Id)
            {
                return BadRequest();
            }

            _context.Entry(transactionType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionTypeExists(id))
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

        // POST: api/TransactionTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TransactionType>> PostTransactionType(TransactionType transactionType)
        {
          if (_context.TransactionsTypes == null)
          {
              return Problem("Entity set 'TransactionDbContext.TransactionsTypes'  is null.");
          }
            _context.TransactionsTypes.Add(transactionType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransactionType", new { id = transactionType.Id }, transactionType);
        }

        // DELETE: api/TransactionTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransactionType(int id)
        {
            if (_context.TransactionsTypes == null)
            {
                return NotFound();
            }
            var transactionType = await _context.TransactionsTypes.FindAsync(id);
            if (transactionType == null)
            {
                return NotFound();
            }

            _context.TransactionsTypes.Remove(transactionType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransactionTypeExists(int id)
        {
            return (_context.TransactionsTypes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
