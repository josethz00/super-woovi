import strawberry, strawberry.tools as strawberry_tools
from bson import ObjectId

from ...db import db
from ..types.QuestionTypes import *
from ...discord_bot import discord_bot

@strawberry.field
async def find_all_questions(self) -> list[QuestionType]:
    questions = await db.question.find().to_list(None)

    for index in range(len(questions)):
        questions[index]["_id"] = str(questions[index]["_id"])
        questions[index]["answers"] = [
            AnswerType(**a) async for a in db.answer.find(
                { "_id":
                    {
                        "$in": questions[index]["answers"]
                    }
                }
            )
        ] if len(questions[index]["answers"]) > 0 else []

        questions[index] = QuestionType(**questions[index])
    return questions


@strawberry.field
async def find_question_by_id(self, _id: str) -> QuestionType | None:
    question = await db.question.find_one({ "_id": ObjectId(_id) })
    if question:
        return QuestionType(**question)

@strawberry.mutation
async def create_question(self, input: CreateQuestionInput) -> CreateQuestionOutput | None:
    valid_input = input.to_pydantic().dict()

    channel = discord_bot.get_channel(1055513524933238924)
    message = await channel.send(f"New question asked by @{input.__getattribute__('tw_username')} from twitter: {input.__getattribute__('main_question')}")

    question = await db.question.insert_one({ **valid_input, "answers": [], "message_id": str(message.id) })

    return CreateQuestionOutput(_id=str(question.inserted_id))

@strawberry.mutation
async def delete_question(self, _id: str) -> bool | None:
    question = await db.question.find_one_and_delete({ "_id": ObjectId(_id) }, projection={ "answers": True, "message_id": True })
    if question:
        await db.answer.delete_many({ "_id": { "$in": question["answers"] } })
        channel = discord_bot.get_channel(int(question["message_id"]))
        await channel.send(
           "This question has been deleted by the author or a moderator. So this thread will be closed for new answers."
        )
        await channel.edit(locked=True, archived=True)
        return True

class QuestionResolver:
    QuestionQueries = strawberry_tools.create_type("QuestionQueries", [find_question_by_id, find_all_questions])
    QuestionMutations = strawberry_tools.create_type("QuestionMutations", [create_question, delete_question])
