package com.ControleFinanceiro.ControleFinanceiro.domain.transacao;

import com.ControleFinanceiro.ControleFinanceiro.domain.categoria.Categoria;
import com.ControleFinanceiro.ControleFinanceiro.domain.formaPagamento.FormaPagamento;
import com.ControleFinanceiro.ControleFinanceiro.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Table(name = "transacao")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transacao {

    @GeneratedValue
    private UUID id_transacao;
    private Integer valor;
    private String tipo;
    private String descricao;
    private Date data_transacao;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "id_forma_pagamento")
    private FormaPagamento formaPagamento;

}
