from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routers
from router.api_router import api_router
from router.auth_router import auth_router

origins = [
    "http://localhost:3000",
]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router)
app.include_router(auth_router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
