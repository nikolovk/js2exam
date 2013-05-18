var schoolsRepository = (function () {
    var save = function (key, data) {
        localStorage.setObject(key, data);
    }
    var load = function (key) {
        return localStorage.getObject(key);
    }

    return {
        save: save,
        load: load
    }

})();

function School(name, location, numberOfCourses, speciality, setOfCourses) {
    this.name = name;
    this.location = location;
    this.numberOfCourses = numberOfCourses;
    this.speciality = speciality;
    this.setOfCourses = [];
    if (setOfCourses) {
        this.setOfCourses = setOfCourses;
    }
}

function Course(title, startDate, totalStudents, setOfStudents) {
    this.title = title;
    this.startDate = startDate;
    this.totalStudents = totalStudents;
    this.setOfStudents = [];
    if (setOfStudents) {
        this.setOfStudents = setOfStudents;
    }
}

function Student(firstName, lastName, grade) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.grade = grade;
}