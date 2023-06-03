from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

# Config
from sqlalchemy.orm import Session
from sqlalchemy import func
from config.database import get_db
from config.auth import get_current_user
from config.settings import Settings

# Models
from database.models.user_tasks import UserTask
from database.models.user_words import UserWord
from database.models.rel_user_tasks_words import RelUserTaskWord
from database.models.words import Word

# Cruds
from database import cruds

# Schemas
from database.schemas.user_tasks import (
    UserTaskView
)

# Logging
from config.logger import logger

# Lib
from lib.chat_gpt import ChatGptManager

# Native
import json
import time

router = APIRouter(prefix="/user-tasks", tags=["user-tasks"])
settings = Settings()


@router.get("/all", response_model=List[UserTaskView], description="Fetch all tasks of authenticated user from database.")
def fetchTasks(db: Session = Depends(get_db), user=Depends(get_current_user)):
    tasks = db.query(UserTask).filter(UserTask.user_id == user["sub"]).all()
    return tasks


@router.post("/create", response_model=UserTaskView, description="Create a new task.")
def createTask(db: Session = Depends(get_db), user=Depends(get_current_user)):
    # Fetch the words that user already learnt.
    user_words = db.query(UserWord) \
        .filter(UserWord.user_id == user["sub"]) \
        .all()

    # Fetch the words that tasks included earlier.
    rel_user_tasks_words = db.query(RelUserTaskWord) \
        .join(UserTask, UserTask.id == RelUserTaskWord.task_id) \
        .filter(UserTask.user_id == user["sub"]).all()

    used_ids = [i.word_id for i in rel_user_tasks_words]
    word_ids = [i.word_id for i in user_words]

    # Generate random words by excluding learnt & used words.
    random_words = db.query(Word) \
        .filter(Word.id.not_in(word_ids + used_ids)) \
        .order_by(func.random()) \
        .limit(5) \
        .all()

    # If no words fetched, it means DB is empty or User has already learnt every single word.
    if not len(random_words):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="No words left to learn.")

    words = [word.word for word in random_words]
    words_ids = [word.id for word in random_words]

    logger.info(
        f"User - {user['sub']} tries to create a task. Words fetched: {json.dumps(words)}")

    # From now, we can interact with ChatGPT since we fetched words successfuly.
    chatGpt = ChatGptManager(access_token=settings.OPEN_AI_ACCESS_TOKEN)

    resp = chatGpt.createTaskDescription(words=words)
    if not resp:
        raise HTTPException(
            status_code=400, detail="An error occured between API's.")

    # Check choices from Open AI's Response. Details: https://platform.openai.com/docs/api-reference/chat/create
    choices = resp["choices"] if "choices" in resp else []

    if not len(choices):
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="An error occured while fetching choices from Open AI response. Try again later.")

    try:
        # Get the description we've created.
        task_description = choices[0]["message"]["content"]
        task_description = json.loads(task_description)

        # We told ChatGPT to create response in spesific JSON format. However, we can still check the generated response for avoiding any errors.
        if not "sentence" in task_description:
            logger.error(
                f"There is no sentence key in the generated response. Open AI Request ID: {resp['id']}")
            raise HTTPException(
                status_code=400, detail="An error occured while creating description for task. Try again later!")

        task_description = task_description["sentence"]

        # Get User's Task Count.
        count = db.query(UserTask).filter(
            UserTask.user_id == user["sub"]).count()

        # Create Task
        task = cruds.user_tasks.put(db=db, data={
            "user_id": user["sub"],
            "title": f"Task - #{count+1}",
            "description": task_description,
            "created_at": int(time.time()),
            "status_id": 1
        })

        # Create Task_Word
        for word in words_ids:
            cruds.rel_user_tasks_words.put(db=db, data={
                "task_id": task.id,
                "word_id": word,
            })

        return task

    except Exception as e:
        logger.exception(str(e), stack_info=True)
