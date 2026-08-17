from typing import Annotated, AsyncGenerator

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, SQLModel, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
