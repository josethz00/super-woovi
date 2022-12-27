from typing import Optional
import strawberry

from .AnswerTypes import AnswerType

from ...models.Question import QuestionModel
from .BigInt import BigInt

@strawberry.experimental.pydantic.type(model=QuestionModel)
class QuestionType:
    _id: str
    main_question: strawberry.auto
    question_description: strawberry.auto
    tags: strawberry.auto
    message_id: strawberry.auto
    user_id: strawberry.auto
    answers: Optional[list[AnswerType]]
    createdAt: strawberry.auto
    updatedAt: strawberry.auto

@strawberry.experimental.pydantic.input(model=QuestionModel)
class CreateQuestionInput:
    main_question: strawberry.auto
    question_description: strawberry.auto
    tags: strawberry.auto
    user_id: strawberry.auto
    tw_username: str

@strawberry.type
class CreateQuestionOutput:
    _id: str
