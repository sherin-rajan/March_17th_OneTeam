from file_handler import (read_log_file, write_invalid_records, save_pickle, load_pickle)
from validator import is_valid_record
from processor import process_records

def main():
    print('Secure Log Analyzer & Backup System')
    lines = read_log_file("log.txt")
    records = []

    for line in lines:
        parts = line.strip().split()

        if len(parts) == 3:
            records.append(tuple(parts))
        else:
            print("Invalid record format:", line.strip())

    invalid_records = list(filter(lambda record: not is_valid_record(record), records))

    valid_records = process_records(records)

    print("\nValid Records:")
    for record in valid_records:
        print(record)

    write_invalid_records("invalid_log.txt", invalid_records)

    save_pickle("valid_records.pkl", valid_records)

    stored_records = load_pickle("valid_records.pkl")

    print("\nStored Records:")
    for record in stored_records:
        print(record)


if __name__ == "__main__":
    main()