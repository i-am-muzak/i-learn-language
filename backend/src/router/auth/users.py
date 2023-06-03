from fastapi import APIRouter, Depends, HTTPException

# Config
from sqlalchemy.orm import Session
from config.database import get_db

# Models
from database.models.users import User
from database.models.blacklist import Blacklist

# Cruds
from database import cruds

# Schemas
from database.schemas.users import (
    CreateUserIn,
    CreateUserOut,
    LoginUserIn,
    LoginUserOut
)

# Auth Functions
from config.auth import (get_password_hash, create_access_token)

# Native
import time

# Helpers
from lib.helper import (check_email_provider)

router = APIRouter(tags=["auth"])

# Router used for register.


@router.post("/register", description="Create a new user.", response_model=CreateUserOut)
def register(createUser: CreateUserIn, db: Session = Depends(get_db)):
    check_email = check_email_provider(email=createUser.email)
    # Check email provider for spammers.
    if not check_email:
        raise HTTPException(
            status_code=400, detail="Your email address is not from a valid provider. Try Gmail, Outlook, Yahoo etc.")

    userExist = db.query(User).filter(User.email == createUser.email).first()

    if userExist:
        raise HTTPException(status_code=400, detail="Email is already in use.")

    user = cruds.users.put(db=db, data={
        "email": createUser.email,
        "hashed_password": get_password_hash(password=createUser.password),
        "created_at": int(time.time())
    })

    token = create_access_token(sub=user.id)

    return {
        "access_token": token,
        "token_type": "Bearer"
    }


# Router used for login.
@router.post("/login", description="Login with email.", response_model=LoginUserOut)
def login(credentials: LoginUserIn, db: Session = Depends(get_db)):
    check_email = check_email_provider(email=credentials.email)
    # Check email provider for spammers.
    if not check_email:
        raise HTTPException(
            status_code=400, detail="Your email address is not from a valid provider. Try Gmail, Outlook, Yahoo etc.")

    user = db.query(User).filter(User.email == credentials.email).first()

    if not user:
        raise HTTPException(
            status_code=400, detail="Password or email do not match.")

    blacklist = db.query(Blacklist).filter(Blacklist.user_id == user.id).filter(
        Blacklist.finish_at >= int(time.time())).first()

    if blacklist:
        raise HTTPException(
            status_code=400, detail="Your account is blacklisted.")

    token = create_access_token(sub=user.id)

    return {
        "access_token": token,
        "token_type": "Bearer"
    }
