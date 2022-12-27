import strawberry, strawberry.tools as strawberry_tools

from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
import asyncio

from .gql.resolvers.QuestionResolver import QuestionResolver
from .discord_bot import discord_bot

@strawberry.type
class HelloQuery:
    @strawberry.field
    def hello(self) -> str:
        return "Hello World"

@strawberry.type
class HelloMutation:
    @strawberry.mutation
    def hello(self, name: str) -> str:
        return f"Hello {name}!"

def mount_schema():
    return {
        'query': strawberry_tools.merge_types("Query", (HelloQuery, QuestionResolver.QuestionQueries)),
        'mutation': strawberry_tools.merge_types("Mutation", (HelloMutation, QuestionResolver.QuestionMutations))
    }

def app() -> FastAPI:
    unified_schema = mount_schema()
    schema = strawberry.Schema(query=unified_schema['query'], mutation=unified_schema['mutation'])
    graphql_app = GraphQLRouter(schema)
    fastapi_app = FastAPI()
    fastapi_app.include_router(graphql_app, prefix="/graphql")

    @fastapi_app.on_event("startup")
    async def startup_event():
        asyncio.create_task(discord_bot.start("MTA1MzczNzI3MTE3NTY4NDE0Nw.GEq49Z.dOR7TO-dtTI9frXi9aQYCqoK0j_smqLWgRrZTM"))

    return fastapi_app
