package com.exampleapp.agenda.dto;

import com.exampleapp.agenda.model.Aluno;

import java.util.List;

public class AlunoSync {

    private List<Aluno> alunos;
    private String momentoDaUltimaModificacao;


    public List<Aluno> getAlunos() {
        return alunos;
    }
    public void setAlunos(List<Aluno> alunos) {
        this.alunos = alunos;
    }
    public String getMomentoDaUltimaModificacao() {
        return momentoDaUltimaModificacao;
    }
    public void setMomentoDaUltimaModificacao(String momentoDaUltimaModificacao) {
        this.momentoDaUltimaModificacao = momentoDaUltimaModificacao;
    }

}
