from dataclasses import dataclass

from langgraph.graph.state import CompiledStateGraph
from pydantic import BaseModel, Field
from ai.agent.oa_assistant import oa_assistant
from ai.agent.multi_agent import supervisor_agent


DEFAULT_AGENT = "oa-assistant"

class AgentInfo(BaseModel):
    """Info about an available agent."""

    key: str = Field(
        description="Agent key.",
        examples=["oa-assistant"],
    )
    description: str = Field(
        description="Description of the agent.",
        examples=["A oa assistant for company"],
    )

@dataclass
class Agent:
    description: str
    graph: CompiledStateGraph
