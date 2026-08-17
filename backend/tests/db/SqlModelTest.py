from typing import Annotated, AsyncGenerator

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, SQLModel, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    age: int | None = Field(default=None, index=True)
    secret_name: str = Field()


sqlite_file_name = "../../app/resource/database.db"
sqlite_url = f"sqlite+aiosqlite:///{sqlite_file_name}"
mysql_url = "mysql+aiomysql://root:root@localhost/ai-chatkit"
