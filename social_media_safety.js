// js/social_media_safety.js

document.addEventListener('DOMContentLoaded', () => {
    // Platform-Specific Guides (Tabs) functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');

            // Display the corresponding content
            const platform = button.dataset.platform;
            document.getElementById(platform).classList.add('active');
        });
    });

    // Interactive Quiz: "Are You Socially Secure?" functionality
    const quizQuestions = [
        {
            question: "You receive an email from your 'bank' asking you to verify your account details by clicking a link. What should you do?",
            options: [
                "Click the link immediately to prevent account suspension.",
                "Reply to the email asking for more information.",
                "Delete the email and log into your bank's official website directly if concerned.",
                "Forward the email to a friend to see if it's legitimate."
            ],
            answer: 2, // Index of the correct option (0-indexed)
            feedback: "Correct! Banks will never ask for personal details via email. Always go directly to their official site if you have concerns."
        },
        {
            question: "Which of these is the strongest password?",
            options: [
                "Password123",
                "MyBirthday2000",
                "L0ckX$afetY!",
                "12345678"
            ],
            answer: 2,
            feedback: "Correct! A mix of uppercase, lowercase, numbers, and symbols makes a password strong and unique."
        },
        {
            question: "You're connecting to public Wi-Fi at a coffee shop. What's the safest activity to perform?",
            options: [
                "Checking your bank account.",
                "Shopping online with your credit card.",
                "Browsing general news websites.",
                "Logging into your main email account."
            ],
            answer: 2,
            feedback: "Correct! Public Wi-Fi is often unsecured, making sensitive activities risky. Stick to non-sensitive browsing."
        },
        {
            question: "What does 'Two-Factor Authentication' (2FA) do?",
            options: [
                "It requires you to create a longer password.",
                "It sends an alert if your account is hacked.",
                "It adds a second layer of verification beyond just a password.",
                "It automatically changes your password every month."
            ],
            answer: 2,
            feedback: "Correct! 2FA requires something you know (password) and something you have (phone code/app) for login."
        },
        {
            question: "You're about to post a photo on social media. What privacy setting should you consider first?",
            options: [
                "Setting your entire profile to 'Public' for maximum reach.",
                "Checking who can view the post (e.g., 'Friends only' or 'Custom list').",
                "Tagging as many people as possible.",
                "Posting it without any privacy review."
            ],
            answer: 1,
            feedback: "Correct! Always control who sees your content. Limiting visibility protects your personal information."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let quizActive = false; // Flag to prevent multiple selections per question

    const quizQuestionElement = document.getElementById('quiz-question');
    const quizOptionsElement = document.getElementById('quiz-options');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const quizFeedbackElement = document.getElementById('quiz-feedback');
    const quizResultsElement = document.getElementById('quiz-results');
    const finalScoreElement = document.getElementById('final-score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const resultMessageElement = document.getElementById('result-message');
    const retakeQuizBtn = document.getElementById('retake-quiz-btn');

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizActive = true;
        quizResultsElement.classList.remove('active');
        nextQuestionBtn.style.display = 'block';
        retakeQuizBtn.style.display = 'none';
        loadQuestion();
    }

    function loadQuestion() {
        quizFeedbackElement.innerHTML = ''; // Clear previous feedback
        quizFeedbackElement.classList.remove('correct-feedback', 'incorrect-feedback');
        nextQuestionBtn.style.display = 'none'; // Hide next button until answer is selected

        if (currentQuestionIndex < quizQuestions.length) {
            const currentQ = quizQuestions[currentQuestionIndex];
            quizQuestionElement.textContent = `Q${currentQuestionIndex + 1}: ${currentQ.question}`;
            quizOptionsElement.innerHTML = '';
            currentQ.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('quiz-option-btn');
                button.textContent = option;
                button.dataset.index = index;
                button.addEventListener('click', handleOptionClick);
                quizOptionsElement.appendChild(button);
            });
            quizOptionsElement.style.display = 'flex'; // Show options
            quizQuestionElement.style.display = 'flex'; // Show question
            quizActive = true; // Re-enable interaction for the new question
        } else {
            showResults();
        }
    }

    function handleOptionClick(event) {
        if (!quizActive) return; // Prevent multiple clicks

        quizActive = false; // Disable further clicks for this question

        const selectedOptionIndex = parseInt(event.target.dataset.index);
        const currentQ = quizQuestions[currentQuestionIndex];
        const allOptionButtons = quizOptionsElement.querySelectorAll('.quiz-option-btn');

        allOptionButtons.forEach(button => {
            button.removeEventListener('click', handleOptionClick); // Disable further clicks
            if (parseInt(button.dataset.index) === currentQ.answer) {
                button.classList.add('correct'); // Highlight correct answer
            }
            if (parseInt(button.dataset.index) === selectedOptionIndex && selectedOptionIndex !== currentQ.answer) {
                button.classList.add('incorrect'); // Highlight incorrect chosen answer
            }
        });

        if (selectedOptionIndex === currentQ.answer) {
            score++;
            quizFeedbackElement.textContent = currentQ.feedback;
            quizFeedbackElement.classList.add('correct-feedback');
        } else {
            quizFeedbackElement.textContent = "Incorrect. " + currentQ.feedback;
            quizFeedbackElement.classList.add('incorrect-feedback');
        }

        nextQuestionBtn.style.display = 'block'; // Show next button
    }

    function showResults() {
        quizQuestionElement.style.display = 'none';
        quizOptionsElement.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
        quizFeedbackElement.innerHTML = '';

        finalScoreElement.textContent = score;
        totalQuestionsElement.textContent = quizQuestions.length;

        let message = "";
        if (score === quizQuestions.length) {
            message = "Outstanding! You're a true social media safety pro! Keep up the great work.";
        } else if (score >= quizQuestions.length / 2) {
            message = "Great job! You have solid knowledge, but there's always room to learn more!";
        } else {
            message = "Keep learning! Don't worry, every step is progress. Explore our Awareness Hub for more tips.";
        }
        resultMessageElement.textContent = message;

        quizResultsElement.classList.add('active');
        retakeQuizBtn.style.display = 'block';
    }

    // Event Listeners for quiz navigation
    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    retakeQuizBtn.addEventListener('click', startQuiz);

    // Initial call to start the quiz
    if (quizQuestionElement && quizOptionsElement) {
        startQuiz();
    }
});