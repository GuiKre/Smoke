using System.ComponentModel.DataAnnotations;
namespace Smoke.Models
{
    public class Game
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(100, ErrorMessage = "O nome precisa ter no máximo 100 caracteres.")]
        public String Nome { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(30, ErrorMessage = "O gênero precisa ter no máximo 30 caracteres.")]
        public String Genero { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(50, ErrorMessage = "O desenvolvedor precisa ter no máximo 50 caracteres.")]
        public String Desenvolvedor { get; set; }
    }
}