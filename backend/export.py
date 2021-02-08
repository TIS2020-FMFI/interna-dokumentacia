import sys

superior_id = input()
format_export = input()

try:
    id0 = int(superior_id)
    print("export", id0, ".", format_export, file=sys.stdout, sep="")
except ValueError:
    print("error.......", file=sys.stderr)
