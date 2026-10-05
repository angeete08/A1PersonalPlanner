import argparse;
import sys;

import from tasks { add_task, get_tasks, toggle_task_status }

def build_parser -> argparse.ArgumentParser {
    parser = argparse.ArgumentParser(
        prog="jac run cli --",
        description="Manage Personal Planner tasks."
    );
    commands = parser.add_subparsers(dest="command", required=True);

    commands.add_parser("list", help="List all tasks");

    add_command = commands.add_parser("add", help="Add a task");
    add_command.add_argument("name", help="Task name");
    add_command.add_argument("--description", "-d", `default="", help="Optional task details");
    add_command.add_argument("--due", `default="", help="Due date in YYYY-MM-DD format");

    toggle_command = commands.add_parser("toggle", help="Complete or reopen a task");
    toggle_command.add_argument("task_id", help="Task ID shown by the list command");

    return parser;
}

def print_tasks(tasks: list[dict[str, str]]) {
    if len(tasks) == 0 {
        print("No tasks yet. Add one with: jac run cli -- add \"Task name\"");
        return;
    }

    for task in tasks {
        status = "DONE" if task["status"] == "completed" else "OPEN";
        print(f"[{status}] {task['id']}  {task['name']}");
        print(f"  Added: {task['created_at']}  Due: {task['due_at']}");
        if task["description"] != "" {
            print(f"  Details: {task['description']}");
        }
    }
}

def run_command(args: argparse.Namespace) {
    if args.command == "list" {
        print_tasks(get_tasks());
    } elif args.command == "add" {
        tasks = add_task(
            name=args.name,
            description=args.description,
            due_at=args.due
        );
        print("Task added.");
        print_tasks(tasks);
    } elif args.command == "toggle" {
        tasks = get_tasks();
        found = False;
        for task in tasks {
            if task["id"] == args.task_id {
                found = True;
            }
        }
        if not found {
            print(f"No task found with ID {args.task_id}.");
            sys.exit(1);
        }
        print_tasks(toggle_task_status(args.task_id));
    }
}

def main {
    args = build_parser().parse_args(sys.argv[1:]);
    run_command(args);
}

with entry {
    main();
}