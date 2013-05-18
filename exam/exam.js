var controls = (function () {

    function buildGridView(selector,data) {
        var newGrid = new GridView(selector);
        newGrid.addHeader("Name", "Location", "Number of Courses", "Speciality");
        for (var i = 0; i < data.length; i++) {
           var row = newGrid.addRow(data[i].name, data[i].location, data[i].numberOfCourses, data[i].speciality);
            if (data[i].setOfCourses.length > 0) {
                row.addHeader
            }
        }
        newGrid.render();
    }

    function Cell(content) {
        this.content = content;

        this.render = function () {
            var item = document.createElement("td");
            item.innerHTML = this.content;
            return item;
        }
    }

    function HeaderCell(content) {
        this.content = content;

        this.render = function () {
            var item = document.createElement("th");
            item.innerHTML = this.content;
            return item;
        }
    }

    function Row(cells) {
        this.cells = cells;
        var nestedTable = new NestedGrid();

        this.getData = function () {
            return nestedTable.getData();
        }

        this.render = function () {
            var fragment = document.createDocumentFragment();
            var item = document.createElement("tr");
            for (var i = 0; i < this.cells.length; i++) {
                item.appendChild(this.cells[i].render());
            }
            fragment.appendChild(item);
            if (nestedTable.hasElements) {
                var nestedRow = document.createElement("tr");
                var nested = document.createElement("td");
                nestedRow.className = "nested";
                nestedRow.style.display = "none";
                nested.colSpan = this.cells.length;
                nested.appendChild(nestedTable.render());
                nestedRow.appendChild(nested);
                fragment.appendChild(nestedRow);
            }
            return fragment;
        }

        this.getNestedGrid = function () {
            return nestedTable;
        }

    }

    function NestedGrid() {
        var header = [];
        var rows = [];
        var coursesData = [];

        this.getData = function () {
            return coursesData;
        }

        this.hasElements = false;

        this.addHeader = function () {
            for (var i = 0; i < arguments.length; i++) {
                var item = new HeaderCell(arguments[i]);
                header.push(item);
            }
            this.hasElements = true;
        }

        this.addRow = function () {
            var course = new Course(arguments[0], arguments[1], arguments[2]);
            coursesData.push(course);

            var cells = [];
            for (var i = 0; i < arguments.length; i++) {
                var item = new Cell(arguments[i]);
                cells.push(item);
            }
            this.hasElements = true;
            var row = new Row(cells);
            rows.push(row);
            return row;
        }

        this.render = function () {
            var nestedTable = document.createElement("table");

            var headerElements = document.createElement("tr");
            for (var i = 0; i < header.length; i++) {
                headerElements.appendChild(header[i].render());
            }
            nestedTable.appendChild(headerElements);

            var tableBody = document.createElement("tbody");
            for (var i = 0; i < rows.length; i++) {
                tableBody.appendChild(rows[i].render());
            }
            nestedTable.appendChild(tableBody);
            return nestedTable;
        }
    }

    function GridView(selector) {
        var header = [];
        var rows = [];
        var grid = document.querySelector(selector);

        
        this.getGridViewData = function () {
            var schoolsData = [];
            for (var i = 0; i < rows.length; i++) {
                var name = rows[i].cells[0].content;
                var location = rows[i].cells[1].content;
                var numberOfCourses = rows[i].cells[2].content;
                var speciality = rows[i].cells[3].content;
                var setOfCourses = rows[i].getData();
                var school = new School(name, location, numberOfCourses, speciality, setOfCourses);
                schoolsData.push(school);
            }
            return schoolsData;
        }


        grid.addEventListener("click", function (ev) {
            if (!ev) {
                ev = window.event;
            }
            ev.stopPropagation();
            ev.preventDefault();
            var clickedItem = ev.target;


             if (clickedItem.parentNode instanceof HTMLTableRowElement) {
                 var rowElement = clickedItem.parentNode;
                 if (rowElement.nextSibling.className == "nested") {
                     var nestedRow = rowElement.nextSibling;
                     if (nestedRow.style.display == "none") {
                         nestedRow.style.display = "";
                     } else {
                         nestedRow.style.display = "none";
                     }
                 }
            }
            

        }, false);

        this.addHeader = function (params) {
            for (var i = 0; i < arguments.length; i++) {
                var item = new HeaderCell(arguments[i]);
                header.push(item);
            }
        }

        this.addRow = function () {

            var cells = [];
            for (var i = 0; i < arguments.length; i++) {
                var item = new Cell(arguments[i]);
                cells.push(item);
            }
            var row = new Row(cells);
            rows.push(row);
            return row;
        }

        this.render = function () {
            var headerElements = document.createElement("tr");
            for (var i = 0; i < header.length; i++) {
                headerElements.appendChild(header[i].render());
            }
            grid.appendChild(headerElements);

            var tableBody = document.createElement("tbody");
            for (var i = 0; i < rows.length; i++) {
                tableBody.appendChild(rows[i].render());
            }
            grid.appendChild(tableBody);
        }
    }
    

    return {
        getGridView: function (selector) {
            return new GridView(selector);
        },
        buildGridView: buildGridView
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