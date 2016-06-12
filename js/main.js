window.onload = function() {

    var wengers = {
        name: "Arsène Wenger",
        club: "Arsenal",
        startDate: "22-09-1996",
        daysInCharge: -1, // Calculated later.
        playersAlmostSigned: 1 / 0
    };

    // #4 - try and move to external file.
    var otherManagers = [
        {
            name: "José Mourinho",
            club: "Manchester United",
            startDate: "27-05-2016",
        }, {
            name: "Jürgen Klopp",
            club: "Liverpool",
            startDate: "10-11-2015"
        }, {
            name: "Someøne else",
            club: "Another club",
            startDate: "02-03-2001"
        }, {
            name: "Third man",
            club: "Sample club",
            startDate: "12-05-2009"
        }, {
            name: "Last managêr",
            club: "LCFC",
            startDate: "02-03-2011"
        }
    ];

    // Calculate the daysInCharge for each manager based on the startDate.
    calculateEmploymentLength([wengers]);
    calculateEmploymentLength(otherManagers);

    // Add the managers to the HTML document.
    addManagers(document.getElementById("otherManagersTable"), otherManagers);
    addManagers(document.getElementById("wengerTable"), [wengers]);

    // Calculate if Wenger or the other managers have employment periods.
    var wengerTotalDaysEmployed = sumEmploymentLengths([wengers]);
    var otherManagersTotalDaysEmployed = sumEmploymentLengths(otherManagers);
    var difference = wengerTotalDaysEmployed - otherManagersTotalDaysEmployed;

    // Display the result
    if (difference >= 0) {
        showWengerWinning();
    } else {
        showWengerLosing();
    }

    // Shows all of the given HTML elements.
    function showById() {
        for (var i = 0; i < arguments.length; ++i) {
            document.getElementById(arguments[i]).hidden = false;
        }
    }

    // Hide all of the given HTML elements.
    function hideById() {
        for (var i = 0; i < arguments.length; ++i) {
            document.getElementById(arguments[i]).hidden = true;
        }
    }

    // Adds other managers to the HTML document
    function addManagers(targetElement, managers) {
        var template = getRowTemplate();
        for (var i = 0; i < managers.length; ++i) {
            targetElement.innerHTML += template(managers[i]);
        }
    }

    function getRowTemplate() {
        return Handlebars.compile(document.getElementById("hbTableRow").innerHTML);
    }

    // Given a list of managers, calculates the length of their current employment period.
    // Saves the length of employment in the manager object under 'daysInCharge'
    function calculateEmploymentLength(managers) {
        return managers.map(
            (manager) => manager.daysInCharge = daysSince(manager.startDate)
        );
    }

    // Sums up the total daysInCharge for each manager.
    function sumEmploymentLengths(managers) {
        return managers.map((manager) => manager.daysInCharge)
                        .reduce((total, curr) => total + curr, 0);
    }

    function daysSince(date) {
        return moment(date, "DD-MM-YYYY").diff(moment(), 'days')
    }

    // Shows images and other html elements associated with a Wenger loss..
    function showWengerLosing() {
        showById("wengerLoses");
        showById("othersWin");
        hideById("wengerWins");
        hideById("othersLose");
    }

    // Shows images and other html elements associated with a Wenger victory.
    function showWengerWinning() {
        showById("wengerWins");
        showById("othersLose");
        hideById("wengerLoses");
        hideById("othersWin");

        // Also display how long until other managers catch up.
        document.getElementById("daysUntilWengerLoses").innerHTML = Math.ceil(difference / 19);
        document.getElementById("daysUntilWengerLoses").parentElement.hidden = false;
    }

};