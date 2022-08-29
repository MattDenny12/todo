function defaults() {
    return {
        name: '',
        summary: '',
        dateStarted: require('moment').now(),
        totalTime: 0
    }
}

class Task {
    constructor(taskObject = defaults()) {
        this.task = taskObject;
    }

    // Accessors

    name() {
        return this.task.name;
    }

    summary() {
        return this.task.summary;
    }

    dateStarted() {
        return this.task.dateStarted;
    }

    totalTime() {
        return this.task.totalTime;
    }


    // Modifiers

    name(value) {
        this.task.name = value;
        return this;
    }

    summary(value) {
        this.task.summary = value;
        return this;
    }

    dateStarted(value) {
        this.task.dateStarted = value;
        return this;
    }

    totalTime(value) {
        this.task.totalTime = value;
        return this;
    }
}

export default Task;