from fastapi import FastAPI
from server.app.api.v1.router import api_router
from server.app.core.config import settings
from fastapi.staticfiles import StaticFiles


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
)


app.mount(
    "/static",
    StaticFiles(directory="server/static"),
    name="static"
)

app.include_router(api_router)

@app.get("/") 
def root():
    return {"status": "Backend running"}
