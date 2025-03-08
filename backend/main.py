import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import sqlite3

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

# Database connection
conn = sqlite3.connect('database.db', check_same_thread=False)
cursor = conn.cursor()


def create_tables_and_insert_data():
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
    INSERT OR IGNORE INTO table_of_tables (table_name, description) VALUES ('example_table', 'An example table')
    """)
    cursor.execute("""
    INSERT OR IGNORE INTO table_of_columns (table_name, column_name, description) VALUES ('example_table', 'example_column', 'An example column')
    """)
    conn.commit()


class TableDescription(BaseModel):
    table_name: str
    description: str


class ColumnDescription(BaseModel):
    table_name: str
    column_name: str
    description: str


@app.on_event("startup")
def on_startup():
    create_tables_and_insert_data()


@app.get("/tables", response_model=List[TableDescription])
def get_tables():
    cursor.execute("SELECT table_name, description FROM table_of_tables")
    tables = cursor.fetchall()
    return [TableDescription(table_name=row[0], description=row[1]) for row in tables]


@app.get("/columns/{table_name}", response_model=List[ColumnDescription])
def get_columns(table_name: str):
    cursor.execute(
        "SELECT column_name, description FROM table_of_columns WHERE table_name = ?", (table_name,))
    columns = cursor.fetchall()
    return [ColumnDescription(table_name=table_name, column_name=row[0], description=row[1]) for row in columns]


@app.post("/tables", response_model=TableDescription)
def update_table_description(table_desc: TableDescription):
    cursor.execute("UPDATE table_of_tables SET description = ? WHERE table_name = ?",
                   (table_desc.description, table_desc.table_name))
    conn.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Table not found")
    return table_desc


@app.post("/columns", response_model=ColumnDescription)
def update_column_description(column_desc: ColumnDescription):
    cursor.execute("UPDATE table_of_columns SET description = ? WHERE table_name = ? AND column_name = ?",
                   (column_desc.description, column_desc.table_name, column_desc.column_name))
    conn.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Column not found")
    return column_desc


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
