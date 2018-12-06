package com.exampleapp.agenda;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.Toast;

import com.exampleapp.agenda.converter.AlunoConverter;
import com.exampleapp.agenda.dao.AlunoDAO;
import com.exampleapp.agenda.model.Aluno;

import java.util.List;

public class EnviaAlunosTask extends AsyncTask<Void, Void, String> {

    private Context context;
    private ProgressDialog dialog;


    public EnviaAlunosTask(Context context) {
        this.context = context;
    }


    @Override
    protected void onPreExecute() {
        dialog = ProgressDialog.show(context, "Aguarde", "Enviando alunos...", true, true);
    }

    @Override
    protected String doInBackground(Void... objects) {
        AlunoDAO dao = new AlunoDAO(context);
        List<Aluno> alunos = dao.buscaAlunos();
        dao.close();

        AlunoConverter conversor = new AlunoConverter();
        String json = conversor.converterParaJSON(alunos);

        WebClient client = new WebClient();
        String resposta = client.post(json);

        return resposta;
    }

    @Override
    protected void onPostExecute(String o) {
        dialog.dismiss();
        Toast.makeText(context, o, Toast.LENGTH_LONG).show();
    }
}
