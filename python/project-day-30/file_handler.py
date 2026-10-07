import pickle

def read_log_file(filename):
    try:
        with open(filename, "r") as file:
            return file.readlines()

    except FileNotFoundError:
        print("Error: Log file not found.")
        return []

    except PermissionError:
        print("Error: Permission denied.")
        return []

    except OSError as error:
        print("File error:", error)
        return []


def write_invalid_records(filename, records):
    try:
        with open(filename, "w") as file:
            for record in records:
                file.write(" ".join(record) + "\n")

    except OSError as error:
        print("Error writing invalid records:", error)


def save_pickle(filename, records):
    try:
        with open(filename, "wb") as file:
            pickle.dump(records, file)

    except OSError as error:
        print("Error saving pickle file:", error)


def load_pickle(filename):
    try:
        with open(filename, "rb") as file:
            return pickle.load(file)

    except FileNotFoundError:
        print("Pickle file not found.")
        return []

    except (OSError, pickle.PickleError) as error:
        print("Error loading pickle file:", error)
        return []