// psychometric.js

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("psychometricForm");
    const resultDiv = document.getElementById("result");
    const resultMessage = document.getElementById("resultMessage");
    const suggestions = document.getElementById("suggestions");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        let totalScore = 0;
        const questions = form.querySelectorAll("select");

        questions.forEach(question => {
            totalScore += parseInt(question.value); // Sum the values of selected options
        });

        // Calculate and display result
        let feedback = "";
        let actions = [];

        if (totalScore <= 5) {
            feedback = "You seem to be in a good mental state!";
            actions.push("Continue engaging in activities that bring you joy.");
            actions.push("Stay connected with loved ones.");
        } else if (totalScore <= 10) {
            feedback = "You might be experiencing mild depression.";
            actions.push("Consider talking to someone you trust.");
            actions.push("Try to engage in physical activities.");
        } else if (totalScore <= 15) {
            feedback = "You may be dealing with moderate depression.";
            actions.push("It might be helpful to seek professional help.");
            actions.push("Practice mindfulness or relaxation techniques.");
        } else {
            feedback = "You may be experiencing severe depression.";
            actions.push("Seek professional help immediately.");
            actions.push("Consider joining a support group.");
        }

        resultMessage.textContent = feedback;
        suggestions.innerHTML = ""; // Clear previous suggestions

        actions.forEach(action => {
            const li = document.createElement("li");
            li.textContent = action;
            suggestions.appendChild(li);
        });

        resultDiv.style.display = "block"; // Show results
    });
});
