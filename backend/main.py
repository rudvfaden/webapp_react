import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import BaseModel, StringConstraints
from typing import List
import sqlite3
import os
from contextlib import contextmanager

app = FastAPI()

origins = [
    "http://localhost:3000",  # Existing frontend URL
    "http://localhost:5173",
    "http://localhost:8000",  # Add this to match your frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Ensure database directory exists
# Get the directory of the current file
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DATABASE_DIR = os.path.join(ROOT_DIR, 'database')
os.makedirs(DATABASE_DIR, exist_ok=True)

# Correctly set the database path
DB_PATH = os.path.join(DATABASE_DIR, 'database.db')


@contextmanager
def get_db_connection():
    connection = None
    try:
        connection = sqlite3.connect(DB_PATH)
        connection.row_factory = sqlite3.Row
        yield connection
    finally:
        if connection:
            connection.close()


def get_db_cursor():
    with get_db_connection() as connection:
        cursor = connection.cursor()
        yield cursor
        connection.commit()


def create_tables_and_insert_data():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS table_of_tables (
            table_name TEXT PRIMARY KEY,
            description TEXT
        )
        """)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS table_of_columns (
            table_name TEXT,
            column_name TEXT,
            description TEXT,
            PRIMARY KEY (table_name, column_name),
            FOREIGN KEY (table_name) REFERENCES table_of_tables(table_name)
        )
        """)
        cursor.execute("""
        INSERT OR IGNORE INTO table_of_tables (table_name, description) \
            VALUES ('example_table', 'An example table')
        """)
        cursor.execute("""
        INSERT OR IGNORE INTO table_of_columns (table_name, column_name,\
            description) VALUES ('example_table', 'example_column',\
                'An example column')
        """)
        conn.commit()


class TableDescription(BaseModel):
    table_name: Annotated[str, StringConstraints(max_length=32)]
    description: str


class ColumnDescription(BaseModel):
    table_name: Annotated[str, StringConstraints(max_length=32)]
    column_name: str
    description: str


@app.on_event("startup")
def on_startup():
    create_tables_and_insert_data()


@app.get("/tables", response_model=List[TableDescription])
def get_tables():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT table_name, description FROM table_of_tables")
        tables = cursor.fetchall()
        return [TableDescription(table_name=row[0],
                                 description=row[1]) for row in tables]


@app.get("/columns/{table_name}", response_model=List[ColumnDescription])
def get_columns(table_name: str):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT column_name, description FROM table_of_columns\
                WHERE table_name = ?", (table_name,))
        columns = cursor.fetchall()
        return [ColumnDescription(table_name=table_name, column_name=row[0],
                description=row[1]) for row in columns]


@app.post("/tables", response_model=TableDescription)
def update_table_description(table_desc: TableDescription):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE table_of_tables SET description = ?\
            WHERE table_name = ?",
                       (table_desc.description, table_desc.table_name))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Table not found")
        return table_desc


@app.post("/columns", response_model=ColumnDescription)
def update_column_description(column_desc: ColumnDescription):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE table_of_columns SET description = ? \
            WHERE table_name = ? AND column_name = ?",
                       (column_desc.description, column_desc.table_name,
                        column_desc.column_name))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Column not found")
        return column_desc


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
