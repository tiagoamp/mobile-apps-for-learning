package com.exampleapp.agenda;

import android.support.annotation.Nullable;

import java.io.IOException;
import java.io.PrintStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

public class WebClient {

    public String post(String json) {
        String endereco = "https://www.caelum.com.br/mobile";
        return realizaConexao(json, endereco);
    }

    public void insere(String json) {
        String endereco = "http://10.107.7.27:8080/api/aluno";
        realizaConexao(json, endereco);
    }

    @Nullable
    private String realizaConexao(String json, String endereco) {
        try {
            URL url = new URL(endereco);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestProperty("Content-type","application/json");
            connection.setRequestProperty("Accept","application/json");
            connection.setDoOutput(true);
            PrintStream output = new PrintStream(connection.getOutputStream());
            output.println(json);
            connection.connect();

            Scanner scanner = new Scanner(connection.getInputStream());
            String resposta = scanner.next();
            return resposta;

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

}
