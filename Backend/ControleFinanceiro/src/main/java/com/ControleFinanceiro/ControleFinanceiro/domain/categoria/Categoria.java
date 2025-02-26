package com.ControleFinanceiro.ControleFinanceiro.domain.categoria;

import com.ControleFinanceiro.ControleFinanceiro.domain.transacao.Transacao;
import com.ControleFinanceiro.ControleFinanceiro.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Table(name = "categoria")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Categoria {

    @GeneratedValue
    private UUID id_categoria;
    private String nome;
    private Integer teto_de_gastos;

    @OneToMany
    @JoinColumn(name = "id_transacao")
    private Transacao transacao;

}
