from typing import NewType
import strawberry

BigInt = strawberry.scalar(
    NewType("BigInt", int),
    serialize=lambda value: int(value),
    parse_value=int
)
