import sqlite3
import os

db_path = 'db.sqlite3'
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        # Check if column exists and update it
        cursor.execute("UPDATE todos SET category_id = NULL WHERE category_id = '';")
        print(f"Updated {cursor.rowcount} rows.")
        conn.commit()
    except sqlite3.OperationalError as e:
        print(f"Error: {e}")
    finally:
        conn.close()
else:
    print("Database not found.")