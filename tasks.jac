import datetime;

enum Status {
    PENDING = "pending",
    ACTIVE = "active",
    COMPLETED = "completed"
}

node Task {
    has id: str,
        name: str,
        description: str,
        created_at: str,
        due_at: str,
        status: Status = Status.PENDING;
}

def:pub get_tasks -> list[dict[str, str]] {
    return [
        {
            "id": t.id,
            "name": t.name,
            "description": t.description,
            "created_at": t.created_at,
            "due_at": t.due_at,
            "status": t.status.value if hasattr(t.status, "value") else str(t.status)
        }
        for t in [root-->][?:Task]
    ];
}

def:pub add_task(name: str, description: str, due_at: str) -> list[dict[str, str]] {
    import uuid;
    task_id = str(uuid.uuid4())[:8];
    today_str = datetime.date.today().isoformat();

    root ++> Task(
        id=task_id,
        name=name,
        description=description,
        created_at=today_str,
        due_at=due_at if due_at != "" else today_str,
        status=Status.PENDING
    );

    return get_tasks();
}

def:pub toggle_task_status(task_id: str) -> list[dict[str, str]] {
    for t in [root-->][?:Task] {
        if t.id == task_id {
            if t.status == Status.COMPLETED {
                t.status = Status.PENDING;
            } else {
                t.status = Status.COMPLETED;
            }
        }
    }
    return get_tasks();
}