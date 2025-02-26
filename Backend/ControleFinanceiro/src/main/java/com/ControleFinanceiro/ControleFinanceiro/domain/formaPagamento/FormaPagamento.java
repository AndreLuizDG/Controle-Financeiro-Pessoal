package com.ControleFinanceiro.ControleFinanceiro.domain.formaPagamento;

import com.ControleFinanceiro.ControleFinanceiro.domain.transacao.Transacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Table(name = "formaPagamento")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormaPagamento {

    @GeneratedValue
    private UUID id_forma_pagamento;
    private String nome;
    private String tipo;

    @OneToMany
    @JoinColumn(name = "id_transacao")
    private Transacao transacao;
}
