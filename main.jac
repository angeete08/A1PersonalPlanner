enum Status {
    PENDING = "pending",
    ACTIVE = "active",
    COMPLETED = "completed"
}

obj Task {
    has name: str,
        day: int,
        month: int,
        year: int,
        description: str,
        completion: Status;
    
    def edit_task(new_items: dict[str, any]){
        if new_items["name"]{
            self.name = new_items["name"];
        }
        if new_items["day"]{
            self.day = new_items["day"];
        }
        if new_items["month"]{
            self.month = new_items["month"];
        }
        if new_items["year"]{
            self.year = new_items["year"];

        }
        if new_items["description"]{
            self.description = new_items["description"];
        }
        if new_items["completion"]{
            self.completion = new_items["completion"];
        }

    }

}

def create_task(name: str,  day: int, month: int, year: int,
                description: str, completion: Status) -> Task{

    my_task = Task(name, day, month, year, description, completion);
    return my_task;
}


with entry {
    print("Hello from Jac!");
}