from validator import is_valid_record
from utils.decorator import log_execution

@log_execution
def process_records(records):
    valid_records = list(filter(is_valid_record, records))
    valid_records = list(map(lambda record:(record[0].upper(),record[1],record[2]), valid_records))
    return valid_records