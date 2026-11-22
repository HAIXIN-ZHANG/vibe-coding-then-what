"""Return the actual one-based destinations Chrome emitted for native PDF links."""
import json
import sys
from urllib.parse import unquote
from pypdf import PdfReader

reader = PdfReader(sys.argv[1])
targets = {unquote(name.removeprefix("/")): {
    "page": reader.get_destination_page_number(dest) + 1,
    "top": float(dest.top) if dest.top is not None else None,
} for name, dest in reader.named_destinations.items()}
print(json.dumps(targets, ensure_ascii=False))
