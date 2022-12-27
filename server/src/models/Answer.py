from typing import Any, Optional
from datetime import datetime

from pydantic import BaseModel, Field

class AnswerModel(BaseModel):
    answer: str = Field(..., max_length=500)
    user_id: str = Field(..., max_length=50)
    createdAt: datetime = datetime.utcnow()
    updatedAt: Optional[datetime] = Field(default_factory=datetime.utcnow)
    question_id: str = Field(..., max_length=50)

    class Config:
        schema_extra: dict[str, dict[str, Any]] = {
            "example": {
                "answer": "You can use FastAPI to create a REST API with Python.",
                "userId": "60c9b9e6b0b6e1f6c1b6f0f6",
                "createdAt": "2021-06-18 18:00:00",
                "updatedAt": "2021-06-18 18:00:00"
            }
        }
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
