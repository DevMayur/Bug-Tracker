var lastSelectedIssue;
var projectId;

const updateForm = document.querySelector("#update-form");
const updateButton = document.querySelector("#update-button");

updateButton.addEventListener("click", event => {
    event.preventDefault();
    const updateInput = document.querySelector("#update-input").value;
    if (lastSelectedIssue != null || lastSelectedIssue != undefined) {
        const issueId = lastSelectedIssue;
        createActivity(projectId, issueId, updateInput);
    } else {
        console.log(lastSelectedIssue);
    }
});

function setSelectedItem(issue) {
    lastSelectedIssue = issue;
    fetch(`/api/users/issues/${issue}/activities`)
        .then(response => response.json())
        .then(data => {
            // Update the activities list with the new activities
            const activityList = document.getElementById("activityList");
            activityList.innerHTML = "";
            data.activities.forEach(function (activity) {
                const activityItem = `
          <li class="timeline-item mb-5">
            <h5 class="fw-bold">${activity.action}</h5>
            <p class="text-muted mb-2 fw-bold">
            ${activity.user.username}
            </p>
            <p class="text-muted">${timeSince(activity.updatedAt)}</p>
          </li>
        `;
                activityList.innerHTML += activityItem;
            });
        })
        .catch(error => console.error(error));
}

function setProjectId(project) {
    projectId = project;
}

const createActivity = async (projectId, issueId, updateInput) => {
    try {
        const response = await fetch(
            `/api/users/project/${projectId}/issues/${issueId}/createActivity`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: updateInput,
                    user: localStorage.getItem("userId"),
                }),
            }
        );

        setSelectedItem(lastSelectedIssue);
    } catch (error) {
        console.error(error);
    }
};

function timeSince(timestamp) {
    let time = Date.parse(timestamp);
    let now = Date.now();
    let secondsPast = (now - time) / 1000;
    let suffix = "ago";

    let intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (let i in intervals) {
        let interval = intervals[i];
        if (secondsPast >= interval) {
            let count = Math.floor(secondsPast / interval);
            return `${count} ${i} ${count > 1 ? "s" : ""} ${suffix}`;
        }
    }
}
