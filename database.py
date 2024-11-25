import psycopg
import os

host = os.getenv('host', 'localhost')
dbname = 'biblioteca'
user = 'admin'         
password = 'admin'       

conn = None

def conectar_db():
    global conn
    conn = psycopg.connect(f"dbname={dbname} user={user} password={password} host={host}")
    print("Conexión exitosa a la base de datos")

def obtener_db() -> psycopg.Connection:
    global conn
    if not conn:
        conectar_db()
    return conn

def cerrar_db():
    global conn
    if conn:
        conn.close()
        print("Conexión a la base de datos cerrada")