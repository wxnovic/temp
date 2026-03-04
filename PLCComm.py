import snap7
from snap7.util import get_bool, get_int, get_real, get_string

TAGS = {
    "start":   {"db": 200, "type": "bool",   "byte": 1,  "bit": 1},
    "count":   {"db": 201, "type": "int",    "byte": 10},
    "name":    {"db": 202, "type": "string", "byte": 20, "maxlen": 10},
    "temp":    {"db": 201, "type": "real",   "byte": 4},
}

TYPE_SIZE = {
    "bool": 1, "byte": 1, "int": 2, "real": 4, "string": None
}

def read_tag(client, key: str):
    t = TAGS[key]
    db = t["db"]
    offset = t["byte"]

    if t["type"] == "bool":
        data = client.db_read(db, offset, 1)
        return get_bool(data, 0, t["bit"])

    if t["type"] == "byte":
        data = client.db_read(db, offset, 1)
        return int(data[0])

    if t["type"] == "int":
        data = client.db_read(db, offset, 2)
        return get_int(data, 0)

    if t["type"] == "real":
        data = client.db_read(db, offset, 4)
        return get_real(data, 0)

    if t["type"] == "string":
        maxlen = t["maxlen"]
        data = client.db_read(db, offset, 2 + maxlen)  # S7 STRING 헤더 포함
        return get_string(data, 0, maxlen)

    raise ValueError("Unknown type")

# 사용 예:
# v = read_tag(client, "start")
