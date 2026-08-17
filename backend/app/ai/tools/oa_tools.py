from langchain_core.tools import BaseTool, tool

from db.models.employee import Employee
from db.repository.employee_repo import EmployeeRepository
from db.models.department import Department
from db.repository.department_repo import DepartmentRepository
from db.database import async_session_maker
from dataclasses import dataclass, asdict
from fastapi import Depends
from ai.rag.chromaClient import hand_book_vector_store

