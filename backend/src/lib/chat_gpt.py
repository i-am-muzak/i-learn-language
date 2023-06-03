import requests
import json
from config.logger import logger


class ChatGptManager:
    def __init__(self, access_token: str, model: str = "gpt-3.5-turbo") -> None:
        self.access_token = access_token
        self.model = model

    def request(self, method: str, url: str, data: dict):
        logger.info(
            f"Sent request into {url} - {method}. Params: {json.dumps(data)}")
        url = f"https://api.openai.com/v1/{url}"

        headers = {
            "Authorization": f"Bearer {self.access_token}"
        }

        response = requests.request(
            method=method,
            url=url,
            params=data if method.lower() == "get" else None,
            json=data if method.lower() != "get" else None,
            headers=headers
        )

        if response.status_code >= 200 and response.status_code <= 299:
            logger.info(response.text)
            return response.json()

        else:
            logger.error(response.text)
            return False

    def createTaskDescription(self, words: list):
        content = '''
        "{0}" Create one sentence that brightenes someone's day with these words. You do not have to use all words in the sentence if they are not meaningful together. Response must be in the following json format and it must be a valid json: {{"sentence": "..."}}
        '''.format(", ".join(words)).strip()

        data = {
            "model": self.model,
            "messages": [
                {"role": "user", "content": content}
            ]
        }

        response = self.request(
            method="POST", url="chat/completions", data=data)
        return response
