package pe.senac.br.backend.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.senac.br.backend.auth.repository.UsuarioRepository;

@Service
public class AuthService {

  @Autowired
  private UsuarioRepository repo;

  /**
   * Verifica se há um usuário com esse nome e senha.
   * @return true se credenciais válidas, false caso contrário
   */
  public boolean autenticar(String nomeUsuario, String senha) {
    return repo.findByNomeUsuario(nomeUsuario)
               .map(u -> u.getSenha().equals(senha))
               .orElse(false);
  }
}