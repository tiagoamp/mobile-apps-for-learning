package com.exampleapp.agenda.sinc;

import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Log;
import android.widget.Toast;

import com.exampleapp.agenda.ListaAlunosActivity;
import com.exampleapp.agenda.dao.AlunoDAO;
import com.exampleapp.agenda.dto.AlunoSync;
import com.exampleapp.agenda.event.AtualizaListaAlunoEvent;
import com.exampleapp.agenda.model.Aluno;
import com.exampleapp.agenda.preferences.AlunoPreferences;
import com.exampleapp.agenda.retrofit.RetrofitInicializador;

import org.greenrobot.eventbus.EventBus;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AlunoSincronizador {

    private final Context context;
    private EventBus bus = EventBus.getDefault();
    private AlunoPreferences preferences;

    public AlunoSincronizador(Context context) {
        this.context = context;
        preferences = new AlunoPreferences(context);
    }


    public void buscaTodos() {
        if(preferences.temVersao()) {
            buscaNovos();
        } else {
            buscaAlunos();
        }
    }

    public void sincronzaAlunosInternos() {
        final AlunoDAO dao = new AlunoDAO(context);
        List<Aluno> alunos = dao.listaNaoSincronizados();

        Call<AlunoSync> call = new RetrofitInicializador().getAlunoService().atualiza(alunos);
        call.enqueue(new Callback<AlunoSync>() {
            @Override
            public void onResponse(Call<AlunoSync> call, Response<AlunoSync> response) {
                AlunoSync alunoSync = response.body();
                dao.sincroniza(alunoSync.getAlunos());
                dao.close();
            }

            @Override
            public void onFailure(Call<AlunoSync> call, Throwable t) {

            }
        });
    }

    private void buscaNovos() {
        String versao = preferences.getVersao();
        Call<AlunoSync> call = new RetrofitInicializador().getAlunoService().novos(versao);
        call.enqueue(buscaAlunosCallback());

    }

    private void buscaAlunos() {
        Call<AlunoSync> call = new RetrofitInicializador().getAlunoService().lista();
        call.enqueue(buscaAlunosCallback());
    }

    @NonNull
    private Callback<AlunoSync> buscaAlunosCallback() {
        return new Callback<AlunoSync>() {
            @Override
            public void onResponse(Call<AlunoSync> call, Response<AlunoSync> response) {
                AlunoSync alunoSync = response.body();
                String versao = alunoSync.getMomentoDaUltimaModificacao();

                preferences.salvaVersao(versao);

                AlunoDAO dao = new AlunoDAO(context);
                dao.sincroniza(alunoSync.getAlunos());
                dao.close();

                Log.i("versao", preferences.getVersao());

                bus.post(new AtualizaListaAlunoEvent());
            }

            @Override
            public void onFailure(Call<AlunoSync> call, Throwable t) {
                Log.e("onFailure chamado", t.getMessage());
                bus.post(new AtualizaListaAlunoEvent());
            }
        };
    }

    public void deleta(final Aluno aluno) {
        Call<Void> call = new RetrofitInicializador().getAlunoService().deleta(aluno.getId());
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                AlunoDAO dao = new AlunoDAO(context);
                dao.deleta(aluno);
                dao.close();
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                // Toast.makeText(context, "Não foi possível remover o aluno.", Toast.LENGTH_SHORT).show();
            }
        });
    }

}