import hashlib
import subprocess
import pickle
import sqlite3


# F052: SQL injection
def get_user(db_path, user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = " + user_id)
    return cursor.fetchone()


# F085: Weak hash algorithm
def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()


# F004: Command injection
def ping_host(host):
    result = subprocess.call("ping -c 1 " + host, shell=True)
    return result == 0


# F143: Insecure deserialization
def load_session(data):
    return pickle.loads(data)
