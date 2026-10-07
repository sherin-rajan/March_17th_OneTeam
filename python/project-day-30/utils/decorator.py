def log_execution(func):

    def wrapper(*args, **kwargs):
        print("Function started")
        result = func(*args, **kwargs)
        print("Function completed")
        return result

    return wrapper