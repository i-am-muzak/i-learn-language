# FastApi Stuff
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import JWTError, jwt
from typing import Annotated

# SqlAlchemy
from sqlalchemy.orm import Session

# Config
from config.settings import Settings
from config.logger import logger
from config.database import get_db

# Models
from database.models.blacklist import Blacklist

# Native
import time

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
settings = Settings()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(sub: str):
    expire = int(time.time()) + (60 * 60 * 24 * 14)  # 14 days
    data = {
        "exp": expire,
        "iat": int(time.time()),
        "sub": str(sub),
        "token_type": "bearer"
    }

    encoded_jwt = jwt.encode(data, settings.JWT_SECRET,
                             algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET,
                             algorithms=[settings.JWT_ALGORITHM])
        user_id: str = payload.get("sub")

        if user_id is None:
            raise credentials_exception

        # Check if user is banned.
        blacklist = db.query(Blacklist).filter(Blacklist.user_id == user_id).filter(
            Blacklist.finish_at >= int(time.time())).first()

        if blacklist:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Your account has been blocked.")

        return payload

    except JWTError as e:
        logger.error(str(e))
        raise credentials_exception
