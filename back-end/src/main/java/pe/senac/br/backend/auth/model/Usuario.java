package pe.senac.br.backend.auth.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
  
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "nome_usuario", nullable = false, unique = true)
  private String nomeUsuario;

  @Column(nullable = false)
  private String senha;

  // getters e setters
  public Integer getId() { return id; }
  public void setId(Integer id) { this.id = id; }
  public String getNomeUsuario() { return nomeUsuario; }
  public void setNomeUsuario(String nomeUsuario) { this.nomeUsuario = nomeUsuario; }
  public String getSenha() { return senha; }
  public void setSenha(String senha) { this.senha = senha; }
}
