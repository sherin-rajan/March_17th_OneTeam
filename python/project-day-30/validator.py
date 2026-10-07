import re

EMAIL_PATTERN = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

TIME_PATTERN = r"^(?:[01]\d|2[0-3]):[0-5]\d$"

def is_valid_email(email):
    return re.match(EMAIL_PATTERN, email) is not None

def is_valid_time(login_time):
    return re.match(TIME_PATTERN, login_time) is not None

def is_valid_record(record):
    username, email, login_time = record

    return (is_valid_email(email) and is_valid_time(login_time))