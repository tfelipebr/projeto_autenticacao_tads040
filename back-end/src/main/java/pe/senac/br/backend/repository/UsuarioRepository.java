package pe.senac.br.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pe.senac.br.backend.model.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
  Optional<Usuario> findByNomeUsuario(String nomeUsuario);
}
