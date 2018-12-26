package com.exampleapp.agenda.dao;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.support.annotation.NonNull;

import com.exampleapp.agenda.model.Aluno;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class AlunoDAO extends SQLiteOpenHelper {

    public AlunoDAO (Context context) {
        super(context, "Agenda", null, 7);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String sql = "CREATE TABLE Alunos (id CHAR(36) PRIMARY KEY, nome TEXT NOT NULL, endereco TEXT, telefone TEXT, site TEXT, nota REAL, caminhoFoto TEXT, sincronizado INT DEFAULT 0, desativado INT DEFAULT 0);";
        db.execSQL(sql);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String sql = "";
        switch (oldVersion) {

            case 2:
                sql = "ALTER TABLE Alunos ADD COLUMN caminhoFoto TEXT";
                db.execSQL(sql);

            case 3:
                String criandoTabelaNova = "CREATE TABLE Alunos_novo " +
                        "(id CHAR(36) PRIMARY KEY, " +
                        "nome TEXT NOT NULL, " +
                        "endereco TEXT, " +
                        "telefone TEXT, " +
                        "site TEXT, " +
                        "nota REAL, " +
                        "caminhoFoto TEXT);";
                db.execSQL(criandoTabelaNova);

                String inserindoAlunosNaTabelaNova = "INSERT INTO Alunos_novo " +
                        "(id, nome, endereco, telefone, site, nota, caminhoFoto) "+
                        "SELECT id, nome, endereco, telefone, site, nota, caminhoFoto " +
                        "FROM Alunos";
                db.execSQL(inserindoAlunosNaTabelaNova);

                String removendoTabelaAntiga = "DROP TABLE Alunos";
                db.execSQL(removendoTabelaAntiga);

                String alterandoNomeDaTabelaNova = "ALTER TABLE Alunos_novo RENAME TO Alunos";
                db.execSQL(alterandoNomeDaTabelaNova);

            case 4:
                String buscaAlunos = "SELECT * FROM Alunos";
                Cursor cursor = db.rawQuery(buscaAlunos, null);
                List<Aluno> alunos = populaAlunos(cursor);

                String alteraIdAluno = "UPDATE Alunos SET id = ? WHERE id = ?";
                for (Aluno aluno : alunos) {
                    db.execSQL(alteraIdAluno, new String[] {geraUUID(), aluno.getId()});
                }

                cursor.close();

            case 5:
                 String adicionaCampoSicronizado = "ALTER TABLE Alunos ADD COLUMN sincronizado INT DEFAULT 0";
                 db.execSQL(adicionaCampoSicronizado);

            case 6:
                String adicionaCampoDesativado = "ALTER TABLE Alunos ADD COLUMN desativado INT DEFAULT 0";
                db.execSQL(adicionaCampoDesativado);

        }
    }

    private String geraUUID() {
        return UUID.randomUUID().toString();
    }

    public void insere(Aluno aluno) {
        SQLiteDatabase db = getWritableDatabase();
        insereIdSeNecessario(aluno);
        ContentValues dados = pegaDadosDoAluno(aluno);
        long id = db.insert("Alunos", null, dados );
        //aluno.setId(id);
    }

    private void insereIdSeNecessario(Aluno aluno) {
        if (aluno.getId() == null) {
            aluno.setId(geraUUID());
        }
    }

    public List<Aluno> buscaAlunos() {
        String sql = "SELECT * FROM Alunos WHERE desativado = 0;";
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery(sql, null);

        List<Aluno> alunos = populaAlunos(c);
        c.close();

        return alunos;
    }

    @NonNull
    private ContentValues pegaDadosDoAluno(Aluno aluno) {
        ContentValues dados = new ContentValues();
        dados.put("id", aluno.getId());
        dados.put("nome", aluno.getNome());
        dados.put("endereco", aluno.getEndereco());
        dados.put("telefone", aluno.getTelefone());
        dados.put("site", aluno.getSite());
        dados.put("nota", aluno.getNota());
        dados.put("caminhoFoto", aluno.getCaminhoFoto());
        dados.put("sincronizado", aluno.getSincronizado());
        dados.put("desativado", aluno.getDesativado());
        return dados;
    }

    @NonNull
    private List<Aluno> populaAlunos(Cursor cursor) {
        List<Aluno> alunos = new ArrayList<Aluno>();
        while (cursor.moveToNext()) {
            Aluno aluno = new Aluno();
            aluno.setId(cursor.getString(cursor.getColumnIndex("id")));
            aluno.setNome(cursor.getString(cursor.getColumnIndex("nome")));
            aluno.setEndereco(cursor.getString(cursor.getColumnIndex("endereco")));
            aluno.setTelefone(cursor.getString(cursor.getColumnIndex("telefone")));
            aluno.setSite(cursor.getString(cursor.getColumnIndex("site")));
            aluno.setNota(cursor.getDouble(cursor.getColumnIndex("nota")));
            aluno.setCaminhoFoto(cursor.getString(cursor.getColumnIndex("caminhoFoto")));
            aluno.setSincronizado(cursor.getInt(cursor.getColumnIndex("sincronizado")));
            aluno.setDesativado((cursor.getInt(cursor.getColumnIndex("desativado"))));
            alunos.add(aluno);
        }
        return alunos;
    }

    public void deleta(Aluno aluno) {
        SQLiteDatabase db = getWritableDatabase();
        String [] params = {String.valueOf(aluno.getId())};

        if (aluno.estaDesativado()) {
            db.delete("Alunos", "id = ?", params);
        } else {
            aluno.desativa();
            aluno.desincroniza();
            altera(aluno);
        }

    }

    public void altera(Aluno aluno) {
        SQLiteDatabase db = getWritableDatabase();

        ContentValues dados = pegaDadosDoAluno(aluno);

        String[] params ={aluno.getId().toString()};
        db.update("Alunos", dados, "id = ?", params);
    }

    public boolean isFromAluno(String telefone) {
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM Alunos WHERE telefone = ?", new String[]{telefone});
        int resultados = c.getCount();
        c.close();
        return resultados > 0;
    }

    public void sincroniza(List<Aluno> alunos) {
        for (Aluno aluno: alunos) {
            aluno.sincroniza();

            if (existe(aluno)) {
                if (aluno.estaDesativado()) {
                    deleta(aluno);
                } else {
                    altera(aluno);
                }
            } else if (!aluno.estaDesativado()) {
                insere(aluno);
            }

        }
    }

    private boolean existe(Aluno aluno) {
        SQLiteDatabase db = getReadableDatabase();
        String sqlExiste = "SELECT id FROM Alunos WHERE id = ? LIMIT 1";
        Cursor cursor = db.rawQuery(sqlExiste, new String[]{aluno.getId()});
        int quantidade = cursor.getCount();
        return quantidade > 0;
    }

    public List<Aluno> listaNaoSincronizados() {
        SQLiteDatabase db = getReadableDatabase();
        String sql = "SELECT * FROM Alunos WHERE sincronizado = 0";
        Cursor cursor = db.rawQuery(sql, null);
        return populaAlunos(cursor);
    }

}
