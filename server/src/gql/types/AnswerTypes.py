import strawberry

from ...models.Answer import AnswerModel

@strawberry.experimental.pydantic.type(model=AnswerModel)
class AnswerType:
    _id: str
    answer: strawberry.auto
    user_id: strawberry.auto
    question_id: strawberry.auto
    createdAt: strawberry.auto
    updatedAt: strawberry.auto
