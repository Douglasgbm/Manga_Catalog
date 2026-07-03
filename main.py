from fastapi import FastAPI, HTTPException # Certifique-se que o HTTPException está aqui
from pydantic import BaseModel
import json 
import os   
from fastapi.middleware.cors import CORSMiddleware # Importa o middleware

app = FastAPI()

# --- CONFIGURAÇÃO DE CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permite que qualquer site acesse a API (em dev é ok)
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (GET, POST, PUT, DELETE, OPTIONS)
    allow_headers=["*"], # Permite todos os cabeçalhos
)

# --- MODELOS ---
class Manga(BaseModel):
    nome: str
    volume: int
    autor: str
    preco: float
    capa: str
    estoque: int = 0

class MangaComId(Manga):
    id: int

ARQUIVO_DB = "mangas.json"

# --- FUNÇÕES DE PERSISTÊNCIA ---

def salvar_dados():
    """Transforma a lista de objetos em texto e salva no arquivo JSON"""
    dados_para_salvar = [manga.dict() for manga in banco_de_mangas]
    with open(ARQUIVO_DB, "w", encoding="utf-8") as f:
        json.dump(dados_para_salvar, f, indent=4, ensure_ascii=False)

def carregar_dados():
    """Lê o arquivo JSON e transforma de volta em objetos MangaComId"""
    if not os.path.exists(ARQUIVO_DB):
        return [] 
    
    with open(ARQUIVO_DB, "r", encoding="utf-8") as f:
        try:
            dados_brutos = json.load(f)
            return [MangaComId(**item) for item in dados_brutos]
        except json.JSONDecodeError:
            return []

# --- INICIALIZAÇÃO ---

banco_de_mangas = carregar_dados()

if banco_de_mangas:
    contador_id = max(manga.id for manga in banco_de_mangas) + 1
else:
    contador_id = 1

# --- ROTAS ---

@app.get("/")
def read_root():
    return {"mensagem": "Olá Douglas! A API de Mangás está online."}

@app.post("/mangas/")
def criar_manga(manga: Manga):
    global contador_id
    novo_manga = MangaComId(**manga.dict(), id=contador_id)
    banco_de_mangas.append(novo_manga)
    contador_id += 1
    salvar_dados() 
    return {"mensagem": "Mangá cadastrado com sucesso!", "manga": novo_manga}

@app.get("/mangas/")
def listar_mangas():
    return {"todos_os_mangas": banco_de_mangas}

@app.put("/mangas/{manga_id}")
def atualizar_manga(manga_id: int, manga_atualizado: Manga):
    for i, manga in enumerate(banco_de_mangas):
        if manga.id == manga_id:
            banco_de_mangas[i] = MangaComId(**manga_atualizado.dict(), id=manga_id)
            salvar_dados()
            return {"mensagem": "Mangá atualizado com sucesso!", "manga": banco_de_mangas[i]}
    raise HTTPException(status_code=404, detail="Mangá não encontrado")


@app.get("/status")
def check_status():
    return {"status": "Funcionando", "versão": "1.0.1"}

@app.post("/login/")
def login(dados: dict):
    usuario = dados.get("usuario")
    senha = dados.get("senha")

    # Aqui definimos o usuário e senha do ADM (Hardcoded para teste)
    # Você pode mudar "douglas" e "1234" para o que quiser
    if usuario == "douglas" and senha == "1234":
        return {"mensagem": "Login realizado com sucesso!", "status": "sucesso"}
    
    # Se o usuário ou senha estiverem errados, retorna erro 401
    raise HTTPException(status_code=401, detail="Usuário ou senha incorretos")

@app.delete("/mangas/{manga_id}")
def excluir_manga(manga_id: int):
    global banco_de_mangas
    # Filtra a lista mantendo apenas quem NÃO tem o id que queremos apagar
    banco_de_mangas = [manga for manga in banco_de_mangas if manga.id != manga_id]
    salvar_dados()
    return {"mensagem": "Mangá removido com sucesso!"}