from fastapi import HTTPException
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
            return self.validateResponse(response=response.json())

        else:
            logger.error(response.text)
            return False

    def validateResponse(self, response: dict):
        req_id = response['id']

        if not "choices" in response:
            logger.error(
                f"There is no 'choices' in the response. Open AI ID: {req_id}")
            raise HTTPException(
                status_code=500, detail="An error occured while creating word data.")

        if not len(response["choices"]):
            logger.error(f"Choices has no length. Open AI ID: {req_id}")
            raise HTTPException(
                status_code=500, detail="An error occured while creating word data.")

        try:
            content_json = json.loads(
                response["choices"][0]["message"]["content"])
            return content_json

        except Exception as e:
            logger.exception(str(e), stack_info=True)
            raise HTTPException(
                status_code=500, detail="An error occured while creating word data.")

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

    def createWordData(self, words: list):
        content = '''
        "{0}". Fill up the following json formatted string by using these words and return the response in the same json format. Convert response into JSON. [{{"word": "","definitions": [{{"part_of_speech": "", definition: ""}}],"part_of_speeches": [],"sentences": [{{"part_of_speech": "", sentence: ""}}],"level": ""}}]
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
