import from "@jac/mobui" { View, Text, Pressable, TextInput, ScrollView, StyleSheet }
import from tasks { add_task, get_tasks, toggle_task_status }

glob styles = StyleSheet.create({
    screen: {flex: 1, backgroundColor: "#edf3ed"},
    content: {paddingHorizontal: 20, paddingTop: 28, paddingBottom: 36, gap: 22},
    header: {gap: 10},
    eyebrow: {color: "#b44d36", fontSize: 11, fontWeight: "800"},
    title: {color: "#20372e", fontSize: 32, fontWeight: "700"},
    intro: {color: "#65776d", fontSize: 15, lineHeight: 22},
    count: {flexDirection: "row", alignItems: "center", gap: 10, marginTop: 4},
    count_number: {color: "#20372e", fontSize: 26, fontWeight: "700"},
    count_label: {color: "#65776d", fontSize: 13},
    panel: {padding: 18, gap: 15, borderRadius: 8, borderWidth: 1, borderColor: "#d8e3da", backgroundColor: "#fffefa"},
    panel_title: {color: "#20372e", fontSize: 18, fontWeight: "700"},
    field_group: {gap: 7},
    field_label: {color: "#40584c", fontSize: 12, fontWeight: "700"},
    field_note: {color: "#89968e", fontSize: 11},
    input: {minHeight: 46, paddingHorizontal: 12, borderWidth: 1, borderColor: "#d4dfd7", borderRadius: 5, backgroundColor: "#ffffff", color: "#20372e", fontSize: 14},
    input_multiline: {minHeight: 70, paddingTop: 12, textAlignVertical: "top"},
    add_button: {minHeight: 46, paddingHorizontal: 14, borderRadius: 5, backgroundColor: "#b94f38", alignItems: "center", justifyContent: "center"},
    add_button_text: {color: "#ffffff", fontSize: 14, fontWeight: "700"},
    list_heading: {flexDirection: "row", alignItems: "center", justifyContent: "space-between"},
    list_title: {color: "#20372e", fontSize: 19, fontWeight: "700"},
    list_total: {color: "#65776d", fontSize: 12},
    task_list: {gap: 10},
    task_row: {padding: 15, gap: 14, borderRadius: 7, borderWidth: 1, borderColor: "#d8e3da", backgroundColor: "#fffefa"},
    task_title: {color: "#20372e", fontSize: 16, fontWeight: "700"},
    task_description: {marginTop: 5, color: "#65776d", fontSize: 13, lineHeight: 19},
    task_meta: {flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 10},
    meta_text: {color: "#74857b", fontSize: 11},
    task_footer: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10},
    status_pending: {color: "#a54833", fontSize: 11, fontWeight: "700"},
    status_complete: {color: "#4f765c", fontSize: 11, fontWeight: "700"},
    task_action: {minHeight: 36, paddingHorizontal: 12, borderRadius: 5, borderWidth: 1, borderColor: "#cbd8ce", alignItems: "center", justifyContent: "center"},
    task_action_text: {color: "#365345", fontSize: 12, fontWeight: "700"},
    empty_state: {paddingVertical: 28, paddingHorizontal: 18, alignItems: "center", gap: 8, borderWidth: 1, borderColor: "#d8e3da", borderRadius: 7, backgroundColor: "#fffefa"},
    empty_title: {color: "#20372e", fontSize: 16, fontWeight: "700"},
    empty_copy: {color: "#65776d", fontSize: 13, textAlign: "center", lineHeight: 19},
});

def:pub TaskRow(t: dict[str, str], on_toggle: any) -> JsxElement {
    async def handle_toggle {
        await on_toggle(t["id"]);
    }

    <View style={styles.task_row}>
        <View>
            <Text style={styles.task_title}>{t["name"]}</Text>
            {if t["description"] != "" {
                <Text style={styles.task_description}>{t["description"]}</Text>
            }}
            <View style={styles.task_meta}>
                <Text style={styles.meta_text}>Added {t["created_at"]}</Text>
                <Text style={styles.meta_text}>Due {t["due_at"]}</Text>
            </View>
        </View>
        <View style={styles.task_footer}>
            <Text style={styles.status_complete if t["status"] == "completed" else styles.status_pending}>
                {"Completed" if t["status"] == "completed" else "In progress"}
            </Text>
            <Pressable style={styles.task_action} onPress={handle_toggle}>
                <Text style={styles.task_action_text}>
                    {"Reopen" if t["status"] == "completed" else "Complete"}
                </Text>
            </Pressable>
        </View>
    </View>
}

def:pub app -> JsxElement {
    has tasks: list[dict[str, str]] = [],
        new_name: str = "",
        new_desc: str = "",
        new_due_at: str = "";

    async can with entry {
        tasks = await get_tasks();
    }

    async def handle_add {
        if new_name.strip() != "" {
            tasks = await add_task(
                name=new_name.strip(),
                description=new_desc.strip(),
                due_at=new_due_at.strip()
            );
            new_name = "";
            new_desc = "";
            new_due_at = "";
        }
    }

    async def handle_toggle(task_id: str) {
        tasks = await toggle_task_status(task_id);
    }

    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.header}>
            <Text style={styles.eyebrow}>PERSONAL PLANNER</Text>
            <Text style={styles.title}>A calmer day.</Text>
            <Text style={styles.intro}>Keep the next thing clear and the whole list in reach.</Text>
            <View style={styles.count}>
                <Text style={styles.count_number}>{len(tasks)}</Text>
                <Text style={styles.count_label}>{"task" if len(tasks) == 1 else "tasks"}</Text>
            </View>
        </View>

        <View style={styles.panel}>
            <Text style={styles.panel_title}>Make a plan</Text>
            <View style={styles.field_group}>
                <Text style={styles.field_label}>Task</Text>
                <TextInput
                    style={styles.input}
                    value={new_name}
                    placeholder="e.g. Prepare project notes"
                    placeholderTextColor="#9aa79f"
                    onChangeText={lambda (value: str) { new_name = value; }}
                />
            </View>
            <View style={styles.field_group}>
                <Text style={styles.field_label}>Due date</Text>
                <TextInput
                    style={styles.input}
                    value={new_due_at}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#9aa79f"
                    onChangeText={lambda (value: str) { new_due_at = value; }}
                />
            </View>
            <View style={styles.field_group}>
                <Text style={styles.field_label}>Details <Text style={styles.field_note}>Optional</Text></Text>
                <TextInput
                    style={styles.input_multiline}
                    value={new_desc}
                    placeholder="Add a useful note"
                    placeholderTextColor="#9aa79f"
                    multiline={True}
                    onChangeText={lambda (value: str) { new_desc = value; }}
                />
            </View>
            <Pressable style={styles.add_button} onPress={handle_add} disabled={new_name.strip() == ""}>
                <Text style={styles.add_button_text}>Add task</Text>
            </Pressable>
        </View>

        <View style={styles.list_heading}>
            <Text style={styles.list_title}>Tasks</Text>
            <Text style={styles.list_total}>{len(tasks)} {"item" if len(tasks) == 1 else "items"}</Text>
        </View>
        <View style={styles.task_list}>
            {if len(tasks) == 0 {
                <View style={styles.empty_state}>
                    <Text style={styles.empty_title}>A clear start</Text>
                    <Text style={styles.empty_copy}>Your list is empty. Add a task above when you are ready.</Text>
                </View>
            }}
            {for t in tasks {
                <TaskRow key={t["id"]} t={t} on_toggle={handle_toggle} />
            }}
        </View>
    </ScrollView>
}