from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_DETAILS = os.getenv("MONGODB_URI")

client = AsyncIOMotorClient(MONGO_DETAILS)
db = client.superwoovi
