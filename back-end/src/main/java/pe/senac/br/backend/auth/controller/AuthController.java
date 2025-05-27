package pe.senac.br.backend.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import pe.senac.br.backend.auth.dto.LoginRequest;
import pe.senac.br.backend.auth.dto.LoginResponse;
import pe.senac.br.backend.auth.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")   // <— libera só esse front-end
public class AuthController {

  @Autowired
  private AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {
    boolean ok = authService.autenticar(req.getNomeUsuario(), req.getSenha());
    if (ok) {
      return ResponseEntity.ok(new LoginResponse(true, "Login bem-sucedido"));
    } else {
      return ResponseEntity
              .status(HttpStatus.UNAUTHORIZED)
              .body(new LoginResponse(false, "Credenciais inválidas"));
    }
  }
}