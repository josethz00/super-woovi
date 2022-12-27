import discord
from bson import ObjectId
from .db import db

class DiscordBot(discord.Client):
    async def on_ready(self):
        print("Logged on as {0}!".format(self.user))

    async def on_message(self, message):
        channel = message.channel

        if channel.id == 1055513524933238924:
            await channel.create_thread(name=f'Question {message.id}', message=message, auto_archive_duration=1440)

        question = await db.question.find_one({ "message_id": str(channel.id) })

        if question:
            try:
                answer = await db.answer.insert_one({
                    "answer": message.content,
                    "user_id": str(message.author.id),
                    "question_id": str(question["_id"]),
                    "createdAt": message.created_at,
                    "updatedAt": message.created_at
                })
                await db.question.update_one({ "_id": question["_id"] }, { "$push": { "answers": ObjectId(answer.inserted_id) } })
            except Exception as e:
                print(e)


    async def send_message(self, message):
        await self.send_message(message)

intents = discord.Intents.default()
intents.message_content = True
intents.members = True
intents.messages = True

permissions = discord.Permissions(permissions=8)

discord_bot = DiscordBot(intents=intents, permissions=permissions, options={
    "guild_subscriptions": True,
    "message_cache_size": 100,
    "member_cache_flags": discord.MemberCacheFlags.from_intents(intents),
    "intents": intents,
    "permissions": permissions
})
