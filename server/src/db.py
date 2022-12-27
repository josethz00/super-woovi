from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = "mongodb://superwoovi:superwoovi@localhost:27017/superwoovi?authSource=admin"

client = AsyncIOMotorClient(MONGO_DETAILS)
db = client.superwoovi
