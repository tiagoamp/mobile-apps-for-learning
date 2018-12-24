package com.exampleapp.agenda.firebase;

import android.util.Log;

import com.exampleapp.agenda.dao.AlunoDAO;
import com.exampleapp.agenda.dto.AlunoSync;
import com.exampleapp.agenda.event.AtualizaListaAlunoEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.greenrobot.eventbus.EventBus;

import java.io.IOException;
import java.util.Map;

public class AgendaMessagingService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        Map<String, String> mensagem = remoteMessage.getData();
        Log.i("mensagem recebida", String.valueOf(mensagem));

        converterParaAluno(mensagem);
        
    }

    private void converterParaAluno(Map<String, String> mensagem) {
        if (mensagem ==null) return;

        String chaveDeAcesso = "alunoSync";
        if (mensagem.containsKey(chaveDeAcesso)) {
            String json = mensagem.get(chaveDeAcesso);
            ObjectMapper mapper = new ObjectMapper();
            try {
                AlunoSync alunoSync = mapper.readValue(json, AlunoSync.class);
                AlunoDAO alunoDAO = new AlunoDAO(this);
                alunoDAO.sincroniza(alunoSync.getAlunos());
                alunoDAO.close();
                EventBus eventBus = EventBus.getDefault();
                eventBus.post(new AtualizaListaAlunoEvent());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
