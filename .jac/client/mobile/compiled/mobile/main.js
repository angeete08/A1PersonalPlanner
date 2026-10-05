/* Source: /home/angee/EECS449/A1PersonalPlanner/mobile/main.jac */
import {__jacJsx} from "@jac/runtime";
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet } from "@jac/mobui";
import { __jacCallFunction } from "@jac/runtime";
import { useJacState } from "@jac/runtime";
import { useEffect } from "@jac/runtime";
async function add_task(name, description, due_at) {
  return await __jacCallFunction("add_task", {"name": name, "description": description, "due_at": due_at}, {"app": "web", "route": "/api/web", "contract": "[\"web\",\"tasks.jac\",\"func\",\"add_task\"]"});
}
async function get_tasks() {
  return await __jacCallFunction("get_tasks", {}, {"app": "web", "route": "/api/web", "contract": "[\"web\",\"tasks.jac\",\"func\",\"get_tasks\"]"});
}
async function toggle_task_status(task_id) {
  return await __jacCallFunction("toggle_task_status", {"task_id": task_id}, {"app": "web", "route": "/api/web", "contract": "[\"web\",\"tasks.jac\",\"func\",\"toggle_task_status\"]"});
}
let styles = StyleSheet.create({screen: {flex: 1, backgroundColor: "#edf3ed"}, content: {paddingHorizontal: 20, paddingTop: 28, paddingBottom: 36, gap: 22}, header: {gap: 10}, eyebrow: {color: "#b44d36", fontSize: 11, fontWeight: "800"}, title: {color: "#20372e", fontSize: 32, fontWeight: "700"}, intro: {color: "#65776d", fontSize: 15, lineHeight: 22}, count: {flexDirection: "row", alignItems: "center", gap: 10, marginTop: 4}, count_number: {color: "#20372e", fontSize: 26, fontWeight: "700"}, count_label: {color: "#65776d", fontSize: 13}, panel: {padding: 18, gap: 15, borderRadius: 8, borderWidth: 1, borderColor: "#d8e3da", backgroundColor: "#fffefa"}, panel_title: {color: "#20372e", fontSize: 18, fontWeight: "700"}, field_group: {gap: 7}, field_label: {color: "#40584c", fontSize: 12, fontWeight: "700"}, field_note: {color: "#89968e", fontSize: 11}, input: {minHeight: 46, paddingHorizontal: 12, borderWidth: 1, borderColor: "#d4dfd7", borderRadius: 5, backgroundColor: "#ffffff", color: "#20372e", fontSize: 14}, input_multiline: {minHeight: 70, paddingTop: 12, textAlignVertical: "top"}, add_button: {minHeight: 46, paddingHorizontal: 14, borderRadius: 5, backgroundColor: "#b94f38", alignItems: "center", justifyContent: "center"}, add_button_text: {color: "#ffffff", fontSize: 14, fontWeight: "700"}, list_heading: {flexDirection: "row", alignItems: "center", justifyContent: "space-between"}, list_title: {color: "#20372e", fontSize: 19, fontWeight: "700"}, list_total: {color: "#65776d", fontSize: 12}, task_list: {gap: 10}, task_row: {padding: 15, gap: 14, borderRadius: 7, borderWidth: 1, borderColor: "#d8e3da", backgroundColor: "#fffefa"}, task_title: {color: "#20372e", fontSize: 16, fontWeight: "700"}, task_description: {marginTop: 5, color: "#65776d", fontSize: 13, lineHeight: 19}, task_meta: {flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 10}, meta_text: {color: "#74857b", fontSize: 11}, task_footer: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10}, status_pending: {color: "#a54833", fontSize: 11, fontWeight: "700"}, status_complete: {color: "#4f765c", fontSize: 11, fontWeight: "700"}, task_action: {minHeight: 36, paddingHorizontal: 12, borderRadius: 5, borderWidth: 1, borderColor: "#cbd8ce", alignItems: "center", justifyContent: "center"}, task_action_text: {color: "#365345", fontSize: 12, fontWeight: "700"}, empty_state: {paddingVertical: 28, paddingHorizontal: 18, alignItems: "center", gap: 8, borderWidth: 1, borderColor: "#d8e3da", borderRadius: 7, backgroundColor: "#fffefa"}, empty_title: {color: "#20372e", fontSize: 16, fontWeight: "700"}, empty_copy: {color: "#65776d", fontSize: 13, textAlign: "center", lineHeight: 19}});
function TaskRow(props) {
  const {t, on_toggle} = props;
  async function handle_toggle() {
    await on_toggle(t["id"]);
  }
  return __jacJsx(View, {"style": styles.task_row}, [__jacJsx(View, {}, [__jacJsx(Text, {"style": styles.task_title}, [t["name"]]), (() => {
    let __jac_view_kids = [false];
    if ((t["description"] !== "")) {
      __jac_view_kids[0] = __jacJsx(Text, {"style": styles.task_description}, [t["description"]]);
    }
    return __jacJsx(null, {}, __jac_view_kids);
  })(), __jacJsx(View, {"style": styles.task_meta}, [__jacJsx(Text, {"style": styles.meta_text}, ["Added ", t["created_at"]]), __jacJsx(Text, {"style": styles.meta_text}, ["Due ", t["due_at"]])])]), __jacJsx(View, {"style": styles.task_footer}, [__jacJsx(Text, {"style": ((t["status"] === "completed") ? styles.status_complete : styles.status_pending)}, [((t["status"] === "completed") ? "Completed" : "In progress")]), __jacJsx(Pressable, {"style": styles.task_action, "onPress": handle_toggle}, [__jacJsx(Text, {"style": styles.task_action_text}, [((t["status"] === "completed") ? "Reopen" : "Complete")])])])]);
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
      __jacS_tasks.set(await __jacCallFunction("get_tasks", {}, {"contract": "[\"web\",\"tasks.jac\",\"func\",\"get_tasks\"]"}));
    })();
  }, []);
  async function handle_add() {
    if ((__jacS_new_name.val.trim() !== "")) {
      __jacS_tasks.set(await __jacCallFunction("add_task", {"name": __jacS_new_name.val.trim(), "description": __jacS_new_desc.val.trim(), "due_at": __jacS_new_due_at.val.trim()}, {"contract": "[\"web\",\"tasks.jac\",\"func\",\"add_task\"]"}));
      __jacS_new_name.set("");
      __jacS_new_desc.set("");
      __jacS_new_due_at.set("");
    }
  }
  async function handle_toggle(task_id) {
    __jacS_tasks.set(await __jacCallFunction("toggle_task_status", {"task_id": task_id}, {"contract": "[\"web\",\"tasks.jac\",\"func\",\"toggle_task_status\"]"}));
  }
  return __jacJsx(ScrollView, {"style": styles.screen, "contentContainerStyle": styles.content}, [__jacJsx(View, {"style": styles.header}, [__jacJsx(Text, {"style": styles.eyebrow}, ["PERSONAL PLANNER"]), __jacJsx(Text, {"style": styles.title}, ["A calmer day."]), __jacJsx(Text, {"style": styles.intro}, ["Keep the next thing clear and the whole list in reach."]), __jacJsx(View, {"style": styles.count}, [__jacJsx(Text, {"style": styles.count_number}, [__jacS_tasks.val.length]), __jacJsx(Text, {"style": styles.count_label}, [((__jacS_tasks.val.length === 1) ? "task" : "tasks")])])]), __jacJsx(View, {"style": styles.panel}, [__jacJsx(Text, {"style": styles.panel_title}, ["Make a plan"]), __jacJsx(View, {"style": styles.field_group}, [__jacJsx(Text, {"style": styles.field_label}, ["Task"]), __jacJsx(TextInput, {"style": styles.input, "value": __jacS_new_name.val, "placeholder": "e.g. Prepare project notes", "placeholderTextColor": "#9aa79f", "onChangeText": value => {
    __jacS_new_name.set(value);
  }}, [])]), __jacJsx(View, {"style": styles.field_group}, [__jacJsx(Text, {"style": styles.field_label}, ["Due date"]), __jacJsx(TextInput, {"style": styles.input, "value": __jacS_new_due_at.val, "placeholder": "YYYY-MM-DD", "placeholderTextColor": "#9aa79f", "onChangeText": value => {
    __jacS_new_due_at.set(value);
  }}, [])]), __jacJsx(View, {"style": styles.field_group}, [__jacJsx(Text, {"style": styles.field_label}, ["Details ", __jacJsx(Text, {"style": styles.field_note}, ["Optional"])]), __jacJsx(TextInput, {"style": styles.input_multiline, "value": __jacS_new_desc.val, "placeholder": "Add a useful note", "placeholderTextColor": "#9aa79f", "multiline": true, "onChangeText": value => {
    __jacS_new_desc.set(value);
  }}, [])]), __jacJsx(Pressable, {"style": styles.add_button, "onPress": handle_add, "disabled": (__jacS_new_name.val.trim() === "")}, [__jacJsx(Text, {"style": styles.add_button_text}, ["Add task"])])]), __jacJsx(View, {"style": styles.list_heading}, [__jacJsx(Text, {"style": styles.list_title}, ["Tasks"]), __jacJsx(Text, {"style": styles.list_total}, [__jacS_tasks.val.length, " ", ((__jacS_tasks.val.length === 1) ? "item" : "items")])]), __jacJsx(View, {"style": styles.task_list}, [(() => {
    let __jac_view_kids_1 = [false];
    if ((__jacS_tasks.val.length === 0)) {
      __jac_view_kids_1[0] = __jacJsx(View, {"style": styles.empty_state}, [__jacJsx(Text, {"style": styles.empty_title}, ["A clear start"]), __jacJsx(Text, {"style": styles.empty_copy}, ["Your list is empty. Add a task above when you are ready."])]);
    }
    return __jacJsx(null, {}, __jac_view_kids_1);
  })(), (() => {
    let __jac_view_kids_2 = [false];
    __jac_view_kids_2[0] = (() => {
      let __jac_view_kids_3 = [];
      for (const t of __jacS_tasks.val) {
        __jac_view_kids_3.push(__jacJsx(TaskRow, {"key": t["id"], "t": t, "on_toggle": handle_toggle}, []));
      }
      return __jac_view_kids_3;
    })();
    return __jacJsx(null, {}, __jac_view_kids_2);
  })()])]);
}
const app = App;
/*jac:refresh-boundary*/;
export {TaskRow, app};
//# sourceMappingURL=main.js.map
