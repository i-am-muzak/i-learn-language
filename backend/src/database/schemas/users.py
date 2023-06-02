from pydantic import BaseModel, EmailStr, validator
from password_strength import PasswordPolicy


class LoginUserIn(BaseModel):
    email: EmailStr
    password: str

    @validator("password")
    def check_password_validation(cls, value):
        policy = PasswordPolicy.from_names(
            length=6,
            uppercase=1,
            special=1
        )

        result = policy.test(value)
        if len(result) > 0:
            raise ValueError(
                "Your password must be at least 6 characters, must contain 1 uppercase, and 1 special character.")

        return value


class LoginUserOut(BaseModel):
    access_token: str
    token_type: str


class CreateUserOut(BaseModel):
    access_token: str
    token_type: str


class CreateUserIn(BaseModel):
    email: EmailStr
    password: str
    password_repeated: str

    @validator("password")
    def check_password_validation(cls, value):
        policy = PasswordPolicy.from_names(
            length=6,
            uppercase=1,
            special=1
        )

        result = policy.test(value)
        if len(result) > 0:
            raise ValueError(
                "Your password must be at least 6 characters, must contain 1 uppercase, and 1 special character.")

        return value

    @validator("password_repeated")
    def is_password_matches(cls, value, values):
        if 'password' in values and value != values['password']:
            raise ValueError('Your passwords do not match.')
        return value
