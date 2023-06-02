from fastapi import FastAPI

# Routers
from router.api_router import api_router
from router.auth_router import auth_router

app = FastAPI()
app.include_router(api_router)
app.include_router(auth_router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
