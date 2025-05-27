package pe.senac.br.backend.auth.dto;

public class LoginRequest {
	  private String nomeUsuario;
	  private String senha;

	  public String getNomeUsuario() {
		  return nomeUsuario;
	  }
	  
	  public void setNomeUsuario(String nomeUsuario) {
		  this.nomeUsuario = nomeUsuario;
	  }
	  
	  public String getSenha() {
		  return senha;
	  }
	  
	  public void setSenha(String senha) {
		  this.senha = senha;
	  }
}