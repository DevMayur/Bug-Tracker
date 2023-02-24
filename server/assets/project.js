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

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error(error);
    }
};
