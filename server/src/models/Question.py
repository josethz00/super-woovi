from typing import Any, Optional
from datetime import datetime
from pydantic import BaseModel, Field

from .Answer import AnswerModel
from ..gql.types.BigInt import BigInt

class QuestionModel(BaseModel):
    main_question: str = Field(..., max_length=150)
    question_description: Optional[str] = Field(None, max_length=500)
    tags: Optional[list[str]] = Field(None)
    message_id: Optional[str] = Field(None, max_length=50)
    user_id: str = Field(..., max_length=50)
    answers: Optional[list[AnswerModel]] = Field(None)
    createdAt: datetime = datetime.utcnow()
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        schema_extra: dict[str, dict[str, Any]] = {
            "example": {
                "main_question": "How to create a REST API with Python?",
                "question_description": "I'm trying to create a REST API with Python and I'm having some problems...",
                "tags": ["python", "rest-api"],
                "message_id": 123456789,
                "userId": "60c9b9e6b0b6e1f6c1b6f0f6",
                "answers": [],
                "createdAt": "2021-06-18 18:00:00",
                "updatedAt": "2021-06-18 18:00:00"
            }
        }
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
