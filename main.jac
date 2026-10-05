import "./styles.css";
import from tasks { add_task, get_tasks, toggle_task_status }

# --- Frontend Component ---

def:pub TaskItem(t: dict[str, str], on_toggle: any) -> JsxElement {
    async def handle_click {
        await on_toggle(t["id"]);
    }

    <article class={"task-row" if t["status"] != "completed" else "task-row is-complete"}>
        <div class="task-copy">
            <h3>{t["name"]}</h3>
            {if t["description"] != "" {
                <p class="task-description">{t["description"]}</p>
            }}
            <p class="task-meta">
                <span>Added {t["created_at"]}</span>
                <span class="meta-divider"></span>
                <span>Due {t["due_at"]}</span>
            </p>
        </div>
        <div class="task-actions">
            <span class={"status-pill" if t["status"] != "completed" else "status-pill status-done"}>
                {"In progress" if t["status"] != "completed" else "Completed"}
            </span>
            <button class="task-toggle" onClick={handle_click}>
                {"Complete" if t["status"] != "completed" else "Reopen"}
            </button>
        </div>
    </article>
}

def:pub app -> JsxElement {
    has tasks: list[dict[str, str]] = [],
        new_name: str = "",
        new_desc: str = "",
        new_due_at: str = "";

    async can with entry {
        tasks = await get_tasks();
    }

    def handle_name_change(e: ChangeEvent) {
        new_name = e.target.value;
    }

    def handle_desc_change(e: ChangeEvent) {
        new_desc = e.target.value;
    }

    def handle_due_change(e: ChangeEvent) {
        new_due_at = e.target.value;
    }

    async def handle_add {
        if new_name.strip() != "" {
            tasks = await add_task(
                name=new_name.strip(),
                description=new_desc.strip(),
                due_at=new_due_at
            );
            new_name = "";
            new_desc = "";
            new_due_at = "";
        }
    }

    async def handle_toggle(task_id: str) {
        tasks = await toggle_task_status(task_id);
    }

    <main class="planner-shell">
        <header class="page-header">
            <p class="eyebrow">PERSONAL PLANNER</p>
            <div class="heading-row">
                <div>
                    <h1>Your day, in focus.</h1>
                    <p class="page-intro">A little clarity for everything on your list.</p>
                </div>
                <div class="task-count">
                    <strong>{str(len(tasks))}</strong>
                    <span>{"task" if len(tasks) == 1 else "tasks"}</span>
                </div>
            </div>
        </header>

        <section class="composer" aria-label="Add a task">
            <div class="section-heading">
                <span class="section-mark">+</span>
                <div>
                    <h2>Make a plan</h2>
                    <p>Get the next thing out of your head and onto the list.</p>
                </div>
            </div>
            <div class="form-grid">
                <label class="field field-name">
                    <span>Task</span>
                    <input type="text" placeholder="e.g. Prepare project notes" value={new_name} onChange={handle_name_change} />
                </label>
                <label class="field field-date">
                    <span>Due date</span>
                    <input type="date" value={new_due_at} onChange={handle_due_change} />
                </label>
                <label class="field field-description">
                    <span>Details <em>Optional</em></span>
                    <input type="text" placeholder="Add a note or a useful detail" value={new_desc} onChange={handle_desc_change} />
                </label>
                <button class="add-button" onClick={handle_add}>Add task <span>+</span></button>
            </div>
        </section>

        <section class="task-section" aria-label="Your tasks">
            <div class="list-heading">
                <h2>Tasks</h2>
                <span>{len(tasks)} {"item" if len(tasks) == 1 else "items"}</span>
            </div>
            <div class="task-list">
                {if len(tasks) == 0 {
                    <div class="empty-state">
                        <span class="empty-icon">01</span>
                        <h3>A clear start</h3>
                        <p>Your list is empty. Add a task above when you're ready.</p>
                    </div>
                }}
                {for t in tasks {
                    <TaskItem key={t["id"]} t={t} on_toggle={handle_toggle} />
                }}
            </div>
        </section>
        <footer class="page-footer">Small steps count.</footer>
    </main>
}

with entry {

}