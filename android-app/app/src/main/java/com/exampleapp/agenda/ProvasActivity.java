package com.exampleapp.agenda;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;

import com.exampleapp.agenda.model.Prova;

public class ProvasActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_provas);

        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction tx = fragmentManager.beginTransaction();

        tx.replace(R.id.frame_principal, new ListaProvasFragment());
        if (estaNoModoPaisagem()) {
            tx.replace(R.id.frame_secundario, new DetalhesProvaFragment());
        }

        tx.commit();
    }


    public void selecionaProva(Prova prova) {
        FragmentManager manager = getSupportFragmentManager();

        if (!estaNoModoPaisagem()) {
            FragmentTransaction tx = manager.beginTransaction();

            DetalhesProvaFragment detalhesFragment = new DetalhesProvaFragment();
            Bundle parametros = new Bundle();
            parametros.putSerializable("prova", prova);
            detalhesFragment.setArguments(parametros);

            tx.replace(R.id.frame_principal, detalhesFragment);
            tx.addToBackStack(null);   // back to include the fragment to the stack

            tx.commit();

        } else {
            DetalhesProvaFragment detalhesFragment = (DetalhesProvaFragment) manager.findFragmentById(R.id.frame_secundario);
            detalhesFragment.populaCamposCom(prova);
        }

    }


    private boolean estaNoModoPaisagem() {
        return getResources().getBoolean(R.bool.modoPaisagem);
    }


}
