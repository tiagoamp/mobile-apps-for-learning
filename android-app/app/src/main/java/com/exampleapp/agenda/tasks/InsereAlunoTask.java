package com.exampleapp.agenda.tasks;

import android.os.AsyncTask;

import com.exampleapp.agenda.WebClient;
import com.exampleapp.agenda.converter.AlunoConverter;
import com.exampleapp.agenda.model.Aluno;

public class InsereAlunoTask extends AsyncTask {

    private final Aluno aluno;

    public InsereAlunoTask(Aluno aluno) {
        this.aluno = aluno;
    }

    @Override
    protected Object doInBackground(Object[] objects) {
        String json = new AlunoConverter().converterParaJSONCompleto(aluno);
        new WebClient().insere(json);
        return null;
    }
}
