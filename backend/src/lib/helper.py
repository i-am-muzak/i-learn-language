def check_email_provider(email: str) -> bool:
    current_provider = email.split("@")

    if len(current_provider) == 1:
        return False

    if current_provider[-1].split(".")[0] in ["gmail", "yahoo", "yandex", "outlook", "hotmail"]:
        return True

    return False


def spacesToDash(text: str):
    return text.replace(" ", "-")
