import psycopg
import os

# Recupera la URL de la base de datos desde la variable de entorno
db_url = os.getenv('DB_URL')
dbname =  os.getenv('DB_NAME')
user = os.getenv('DB_USER')        
password = os.getenv('DB_PASSWORD')
host =  os.getenv('DB_HOST')   

conn = None

def conectar_db():
    global conn
    if not db_url:
        raise ValueError("La variable de entorno DB_URL no está configurada")
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
