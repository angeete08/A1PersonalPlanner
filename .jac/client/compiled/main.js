/* Source: /home/angee/EECS449/A1PersonalPlanner/main.jac */
import {__jacJsx} from "@jac/runtime";
import "./styles.css";
import { useJacState } from "@jac/runtime";
import { __jacCallFunction } from "@jac/runtime";
import { useEffect } from "@jac/runtime";
const Status = Object.freeze({PENDING: "pending", ACTIVE: "active", COMPLETED: "completed"});
class Task {
  constructor(props = {}) {
    this.id = (Object.hasOwn(props, "id") ? props.id : null);
    this.name = (Object.hasOwn(props, "name") ? props.name : null);
    this.description = (Object.hasOwn(props, "description") ? props.description : null);
    this.created_at = (Object.hasOwn(props, "created_at") ? props.created_at : null);
    this.due_at = (Object.hasOwn(props, "due_at") ? props.due_at : null);
    this.status = (Object.hasOwn(props, "status") ? props.status : null);
    this._jac_id = (Object.hasOwn(props, "_jac_id") ? props._jac_id : null);
  }
  static __from_wire(d) {
    if (((d === null) || (d === undefined)))     return d;
    return new Task(d);
  }
  __to_wire() {
    return {"__type__": "Task", "id": this.id, "name": this.name, "description": this.description, "created_at": this.created_at, "due_at": this.due_at, "status": this.status, "_jac_id": this._jac_id};
  }
}
function TaskItem(props) {
  const {t, on_toggle} = props;
  async function handle_click() {
    await on_toggle(t["id"]);
  }
  return __jacJsx("article", {"class": ((t["status"] !== "completed") ? "task-row" : "task-row is-complete")}, [__jacJsx("div", {"class": "task-copy"}, [__jacJsx("h3", {}, [t["name"]]), (() => {
    let __jac_view_kids = [false];
    if ((t["description"] !== "")) {
      __jac_view_kids[0] = __jacJsx("p", {"class": "task-description"}, [t["description"]]);
    }
    return __jacJsx(null, {}, __jac_view_kids);
  })(), __jacJsx("p", {"class": "task-meta"}, [__jacJsx("span", {}, ["Added ", t["created_at"]]), __jacJsx("span", {"class": "meta-divider"}, []), __jacJsx("span", {}, ["Due ", t["due_at"]])])]), __jacJsx("div", {"class": "task-actions"}, [__jacJsx("span", {"class": ((t["status"] !== "completed") ? "status-pill" : "status-pill status-done")}, [((t["status"] !== "completed") ? "In progress" : "Completed")]), __jacJsx("button", {"class": "task-toggle", "onClick": handle_click}, [((t["status"] !== "completed") ? "Complete" : "Reopen")])])]);
}
function App() {
  const __jacS_tasks = useJacState([]);
  const setTasks = __jacS_tasks.set;
  const __jacS_new_name = useJacState("");
  const setNew_name = __jacS_new_name.set;
  const __jacS_new_desc = useJacState("");
  const setNew_desc = __jacS_new_desc.set;
  const __jacS_new_due_at = useJacState("");
  const setNew_due_at = __jacS_new_due_at.set;
  useEffect(() => {
    (async () => {
      __jacS_tasks.set(await __jacCallFunction("get_tasks", {}, {"contract": "[\"\",\"main\",\"func\",\"get_tasks\"]"}));
    })();
  }, []);
  function handle_name_change(e) {
    __jacS_new_name.set(e.target.value);
  }
  function handle_desc_change(e) {
    __jacS_new_desc.set(e.target.value);
  }
  function handle_due_change(e) {
    __jacS_new_due_at.set(e.target.value);
  }
  async function handle_add() {
    if ((__jacS_new_name.val.trim() !== "")) {
      __jacS_tasks.set(await __jacCallFunction("add_task", {"name": __jacS_new_name.val.trim(), "description": __jacS_new_desc.val.trim(), "due_at": __jacS_new_due_at.val}, {"contract": "[\"\",\"main\",\"func\",\"add_task\"]"}));
      __jacS_new_name.set("");
      __jacS_new_desc.set("");
      __jacS_new_due_at.set("");
    }
  }
  async function handle_toggle(task_id) {
    __jacS_tasks.set(await __jacCallFunction("toggle_task_status", {"task_id": task_id}, {"contract": "[\"\",\"main\",\"func\",\"toggle_task_status\"]"}));
  }
  return __jacJsx("main", {"class": "planner-shell"}, [__jacJsx("header", {"class": "page-header"}, [__jacJsx("p", {"class": "eyebrow"}, ["PERSONAL PLANNER"]), __jacJsx("div", {"class": "heading-row"}, [__jacJsx("div", {}, [__jacJsx("h1", {}, ["Your day, in focus."]), __jacJsx("p", {"class": "page-intro"}, ["A little clarity for everything on your list."])]), __jacJsx("div", {"class": "task-count"}, [__jacJsx("strong", {}, [String(__jacS_tasks.val.length)]), __jacJsx("span", {}, [((__jacS_tasks.val.length === 1) ? "task" : "tasks")])])])]), __jacJsx("section", {"class": "composer", "aria-label": "Add a task"}, [__jacJsx("div", {"class": "section-heading"}, [__jacJsx("span", {"class": "section-mark"}, ["+"]), __jacJsx("div", {}, [__jacJsx("h2", {}, ["Make a plan"]), __jacJsx("p", {}, ["Get the next thing out of your head and onto the list."])])]), __jacJsx("div", {"class": "form-grid"}, [__jacJsx("label", {"class": "field field-name"}, [__jacJsx("span", {}, ["Task"]), __jacJsx("input", {"type": "text", "placeholder": "e.g. Prepare project notes", "value": __jacS_new_name.val, "onChange": handle_name_change}, [])]), __jacJsx("label", {"class": "field field-date"}, [__jacJsx("span", {}, ["Due date"]), __jacJsx("input", {"type": "date", "value": __jacS_new_due_at.val, "onChange": handle_due_change}, [])]), __jacJsx("label", {"class": "field field-description"}, [__jacJsx("span", {}, ["Details ", __jacJsx("em", {}, ["Optional"])]), __jacJsx("input", {"type": "text", "placeholder": "Add a note or a useful detail", "value": __jacS_new_desc.val, "onChange": handle_desc_change}, [])]), __jacJsx("button", {"class": "add-button", "onClick": handle_add}, ["Add task ", __jacJsx("span", {}, ["+"])])])]), __jacJsx("section", {"class": "task-section", "aria-label": "Your tasks"}, [__jacJsx("div", {"class": "list-heading"}, [__jacJsx("h2", {}, ["Tasks"]), __jacJsx("span", {}, [__jacS_tasks.val.length, " ", ((__jacS_tasks.val.length === 1) ? "item" : "items")])]), __jacJsx("div", {"class": "task-list"}, [(() => {
    let __jac_view_kids_1 = [false];
    if ((__jacS_tasks.val.length === 0)) {
      __jac_view_kids_1[0] = __jacJsx("div", {"class": "empty-state"}, [__jacJsx("span", {"class": "empty-icon"}, ["01"]), __jacJsx("h3", {}, ["A clear start"]), __jacJsx("p", {}, ["Your list is empty. Add a task above when you're ready."])]);
    }
    return __jacJsx(null, {}, __jac_view_kids_1);
  })(), (() => {
    let __jac_view_kids_2 = [false];
    __jac_view_kids_2[0] = (() => {
      let __jac_view_kids_3 = [];
      for (const t of __jacS_tasks.val) {
        __jac_view_kids_3.push(__jacJsx(TaskItem, {"key": t["id"], "t": t, "on_toggle": handle_toggle}, []));
      }
      return __jac_view_kids_3;
    })();
    return __jacJsx(null, {}, __jac_view_kids_2);
  })()])]), __jacJsx("footer", {"class": "page-footer"}, ["Small steps count."])]);
}
const app = App;
/*jac:refresh-boundary*/;
export {TaskItem, app};
if (typeof globalThis !== "undefined") { if (!globalThis.__jacEndpointEffects__) globalThis.__jacEndpointEffects__ = {}; Object.assign(globalThis.__jacEndpointEffects__, {"[\"\",\"main\",\"func\",\"get_tasks\"]": {"app": "", "module": "main", "kind": "func", "name": "get_tasks", "reads": ["*"], "writes": ["*"], "assumptions": [], "unknown": true, "observed_tags": []}, "[\"\",\"main\",\"func\",\"add_task\"]": {"app": "", "module": "main", "kind": "func", "name": "add_task", "reads": ["*"], "writes": ["*"], "assumptions": [], "unknown": true, "observed_tags": ["Task"]}, "[\"\",\"main\",\"func\",\"toggle_task_status\"]": {"app": "", "module": "main", "kind": "func", "name": "toggle_task_status", "reads": ["*"], "writes": ["*"], "assumptions": [], "unknown": true, "observed_tags": []}}); };
//# sourceMappingURL=main.js.map
