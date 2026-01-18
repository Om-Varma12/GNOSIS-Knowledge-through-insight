def normalize_payload(payload: dict, score: float):
    # Force universal schema — keys ALWAYS exist
    out = {
        "label": "",
        "title": "",
        "text": "",
        "url": "",
        "image_url": "",
        "video_url": "",
        "score": float(score),
    }

    if isinstance(payload, dict):
        out["label"] = payload.get("label", "") or ""
        out["title"] = payload.get("title", "") or ""

        # Text may come from different fields
        out["text"] = (
            payload.get("chunk_text")
            or payload.get("text")
            or ""
        )

        # URL may come from different fields
        out["url"] = (
            payload.get("news_url")
            or payload.get("url")
            or ""
        )

        out["image_url"] = payload.get("image_url", "") or ""
        out["video_url"] = payload.get("video_url", "") or ""

    return out