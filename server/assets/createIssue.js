const issueForm = document.querySelector("#issue-form");

issueForm.addEventListener("submit", async event => {
    event.preventDefault();

    const subject = issueForm.elements["subject"].value;
    const description = issueForm.elements["description"].value;
    const labels = issueForm.elements["labels"].value;
    const author = issueForm.elements["userId"].value;
    const projectId = issueForm.elements["projectId"].value;

    try {
        const response = await fetch(`/api/users/project/${projectId}/issues`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ subject, description, labels, author }),
        });

        const data = await response.json();

        window.location.href = `/client/users/project/${data.issue.project}/issues/${data.issue._id}`;

        console.log(data);
    } catch (error) {
        console.error(error);
    }
});