using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [Table("tasks")]
    public class Todo
    {
        [Key]
        public required string Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public bool Done { get; set; } = false;
    }
}
