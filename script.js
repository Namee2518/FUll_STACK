$(document).ready(function () {

    const questions = [
        {
            question: "What is the capital of India?",
            options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
            answer: 1
        },
        {
            question: "Which language runs in a web browser?",
            options: ["Java", "C", "Python", "JavaScript"],
            answer: 3
        },
        {
            question: "What does CSS stand for?",
            options: [
                "Central Style Sheets",
                "Cascading Style Sheets",
                "Computer Style Sheets",
                "Creative Style Sheets"
            ],
            answer: 1
        },
        {
            question: "Which company developed jQuery?",
            options: ["Microsoft", "Google", "OpenJS Foundation", "Oracle"],
            answer: 2
        }
    ];

    let currentQuestion = 0;
    let userAnswers = new Array(questions.length).fill(null);

    $("#totalQ").text(questions.length);

    function loadQuestion() {
        const q = questions[currentQuestion];

        $("#currentQ").text(currentQuestion + 1);
        $("#question").text(q.question);
        $("#options").empty();
        $("#error").text("");

        $.each(q.options, function (index, option) {
            const checked = userAnswers[currentQuestion] === index ? "checked" : "";
            $("#options").append(
                `<label>
                    <input type="radio" name="option" value="${index}" ${checked}>
                    ${option}
                </label>`
            );
        });

        $("#prevBtn").prop("disabled", currentQuestion === 0);
        $("#nextBtn").text(currentQuestion === questions.length - 1 ? "Finish" : "Next");
    }

    $(document).on("change", "input[name='option']", function () {
        userAnswers[currentQuestion] = parseInt($(this).val());
    });

    $("#nextBtn").click(function () {

        if (userAnswers[currentQuestion] === null) {
            $("#error").text("Please select an answer before proceeding!");
            return;
        }

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            showResult();
        }
    });

    $("#prevBtn").click(function () {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    });

    function showResult() {

        let score = 0;
        $("#answer-review").empty();

        $.each(questions, function (index, q) {

            const userAns = userAnswers[index];
            const correctAns = q.answer;

            if (userAns === correctAns) {
                score++;
            }

            $("#answer-review").append(`
                <div class="review-item">
                    <strong>Q${index + 1}: ${q.question}</strong><br>
                    Your Answer: ${q.options[userAns]}<br>
                    Correct Answer: ${q.options[correctAns]}
                </div>
            `);
        });

        $("#quiz-box").hide();
        $("#result-box").show();

        $("#score").html(
            `<strong>Total Marks:</strong> ${score} / ${questions.length}`
        );
    }

    $("#restartBtn").click(function () {
        currentQuestion = 0;
        userAnswers = new Array(questions.length).fill(null);
        $("#result-box").hide();
        $("#quiz-box").show();
        loadQuestion();
    });

    loadQuestion();

});
