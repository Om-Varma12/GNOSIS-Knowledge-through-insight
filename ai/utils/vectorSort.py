from datetime import datetime

def sortVectors(evidence_dict, descending=True):
    if "evidence" not in evidence_dict:
        return []

    evidence_map = evidence_dict["evidence"]

    # Convert dict to list
    evidence_list = list(evidence_map.values())

    # Parse date like: "July 14, 2021"
    def parse_date(item):
        try:
            return datetime.strptime(item["date"], "%B %d, %Y")
        except:
            return datetime.min

    # Sort
    evidence_sorted = sorted(
        evidence_list,
        key=parse_date,
        reverse=descending
    )

    return evidence_sorted