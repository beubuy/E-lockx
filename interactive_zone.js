document.addEventListener('DOMContentLoaded', () => {
    // Global utility functions from script.js might be loaded first

    // --- Password Strength Meter ---
    const passwordInput = document.getElementById('password-input');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', updatePasswordStrength);
    }

    function updatePasswordStrength() {
        const password = passwordInput.value;
        let score = 0;
        const feedback = [];

        // Length
        if (password.length > 0) score += 1;
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length < 8 && password.length > 0) feedback.push("Aim for at least 8 characters.");

        // Uppercase
        if (/[A-Z]/.test(password)) score += 1;
        else if (password.length > 0) feedback.push("Include uppercase letters.");

        // Lowercase
        if (/[a-z]/.test(password)) score += 1;
        else if (password.length > 0) feedback.push("Include lowercase letters.");

        // Numbers
        if (/[0-9]/.test(password)) score += 1;
        else if (password.length > 0) feedback.push("Include numbers.");

        // Symbols
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        else if (password.length > 0) feedback.push("Include symbols (e.g., !@#$%^&*).");

        // Update UI
        let strength = "";
        let barColor = "";
        let barWidth = 0;

        if (password.length === 0) {
            strength = "";
            barColor = "#eee";
            barWidth = 0;
            strengthText.textContent = "";
        } else if (score < 3) {
            strength = "Weak";
            barColor = "#ff5e5e"; // Blush Pink
            barWidth = 25;
        } else if (score < 5) {
            strength = "Medium";
            barColor = "#f7b267"; // Orange-ish
            barWidth = 50;
        } else if (score < 7) {
            strength = "Strong";
            barColor = "var(--mint-green)";
            barWidth = 75;
        } else {
            strength = "Excellent";
            barColor = "var(--sky-blue)";
            barWidth = 100;
        }

        strengthBar.style.width = `${barWidth}%`;
        strengthBar.style.backgroundColor = barColor;
        strengthBar.className = `strength-bar ${strength.toLowerCase()}`;
        strengthText.textContent = feedback.length > 0 ? `Feedback: ${feedback.join(" ")}` : `Strength: ${strength}`;
    }

    // --- Spot the Fake Email Mini-Game ---
    const phishingScenarios = [
        {
            id: 'email-scenario-1',
            image: 'phishing_scenario_1.png', // Placeholder image for email simulation
            text: `<strong>From:</strong> &lt;service.update@amzon-support.com&gt;<br>
                   <strong>Subject:</strong> Your Amazon Account Has Been Hacked - Urgent Action Required<br>
                   <strong>Body:</strong> <br>
                   Dear Customer,<br><br>
                   We detected unusual activity on your account. Someone accessed your account from an unknown device. To secure your account, please verify your identity immediately by clicking the link below:<br><br>
                   <a href="#" class="suspicious-link">VERIFY ACCOUNT NOW</a><br><br>
                   Failure to do so will result in temporary account suspension.<br><br>
                   Thank You,<br>
                   Amazon Security Team`,
            isPhishing: true,
            explanation: "This is a classic phishing attempt! Look for the misspelled 'amzon-support.com' in the sender's email, the urgent and threatening tone, and the suspicious link. Always check the sender's real email address and hover over links before clicking."
        },
        {
            id: 'email-scenario-2',
            image: 'phishing_scenario_2.png', // Placeholder image for email simulation
            text: `<strong>From:</strong> &lt;noreply@microsoft.com&gt;<br>
                   <strong>Subject:</strong> Microsoft Account Security Alert<br>
                   <strong>Body:</strong> <br>
                   Dear [Your Name],<br><br>
                   We noticed a login from an unusual location on your Microsoft account on [Date] at [Time] from [Country]. If this was you, you can disregard this email. If this wasn't you, please review your recent activity and secure your account here:<br><br>
                   <a href="#" class="legitimate-link">Review activity</a><br><br>
                   Thank you for being a Microsoft customer.<br><br>
                   Microsoft Account Team`,
            isPhishing: false,
            explanation: "This appears to be a legitimate security alert. Legitimate companies often send alerts about unusual activity and provide a secure link to review it. The sender's domain is correct, and the tone is informative rather than threatening. Always verify by directly visiting the service's website rather than clicking links in emails if you're unsure."
        },
        {
            id: 'email-scenario-3',
            image: 'phishing_scenario_3.png', // Placeholder image for email simulation
            text: `<strong>From:</strong> &lt;paypal.service@safeupdate.co&gt;<br>
                   <strong>Subject:</strong> Your PayPal account has been limited<br>
                   <strong>Body:</strong> <br>
                   Hello,<br><br>
                   Your PayPal account has been permanently limited due to a violation of our User Agreement. You will no longer be able to send or receive money.<br>
                   To restore your account access and avoid further issues, you must confirm your information by clicking on the link below:<br><br>
                   <a href="#" class="suspicious-link">Secure My Account Now</a><br><br>
                   Thank you for your cooperation.<br><br>
                   The PayPal Team`,
            isPhishing: true,
            explanation: "This is phishing. The sender's email domain 'safeupdate.co' is not PayPal's official domain. Phishing emails often use urgency and threats (like account limitation) to pressure you into clicking malicious links. Always log directly into your PayPal account through their official website to check for any alerts."
        }
    ];

    let currentPhishingScenarioIndex = 0;
    let phishingScore = 0;

    const emailScenarioDiv = document.querySelector('.email-scenario');
    const scenarioTextP = emailScenarioDiv.querySelector('.scenario-text');
    const phishingFeedbackP = document.getElementById('phishing-feedback');
    const phishingLegitimateBtn = document.getElementById('phishing-legitimate');
    const phishingPhishingBtn = document.getElementById('phishing-phishing');
    const nextPhishingScenarioBtn = document.getElementById('next-phishing-scenario');
    const retakePhishingQuizBtn = document.getElementById('retake-phishing-quiz');

    if (phishingLegitimateBtn && phishingPhishingBtn) {
        phishingLegitimateBtn.addEventListener('click', () => checkPhishingAnswer(false));
        phishingPhishingBtn.addEventListener('click', () => checkPhishingAnswer(true));
        nextPhishingScenarioBtn.addEventListener('click', loadNextPhishingScenario);
        retakePhishingQuizBtn.addEventListener('click', resetPhishingQuiz);
        loadPhishingScenario(currentPhishingScenarioIndex);
    }

    function loadPhishingScenario(index) {
        const scenario = phishingScenarios[index];
        if (scenario) {
            let emailImageDiv = emailScenarioDiv.querySelector('.email-image');
            if (!emailImageDiv) {
                emailImageDiv = document.createElement('div');
                emailImageDiv.classList.add('email-image');
                emailScenarioDiv.prepend(emailImageDiv);
            }
            if (scenario.image) {
                emailImageDiv.style.backgroundImage = `url(assets/images/${scenario.image})`;
                emailImageDiv.style.display = 'block';
            } else {
                emailImageDiv.style.display = 'none'; // Hide if no image for this scenario
            }

            scenarioTextP.innerHTML = scenario.text;
            phishingFeedbackP.textContent = "";
            phishingFeedbackP.className = "phishing-feedback";
            phishingLegitimateBtn.style.display = 'inline-block';
            phishingPhishingBtn.style.display = 'inline-block';
            nextPhishingScenarioBtn.style.display = 'none';
            retakePhishingQuizBtn.style.display = 'none';
        }
    }

    function checkPhishingAnswer(userGuessedPhishing) {
        const scenario = phishingScenarios[currentPhishingScenarioIndex];
        phishingLegitimateBtn.style.display = 'none';
        phishingPhishingBtn.style.display = 'none';

        if (userGuessedPhishing === scenario.isPhishing) {
            phishingScore++;
            phishingFeedbackP.textContent = `Correct! ${scenario.explanation}`;
            phishingFeedbackP.classList.add('correct');
        } else {
            phishingFeedbackP.textContent = `Incorrect. ${scenario.explanation}`;
            phishingFeedbackP.classList.add('incorrect');
        }

        if (currentPhishingScenarioIndex < phishingScenarios.length - 1) {
            nextPhishingScenarioBtn.style.display = 'inline-block';
        } else {
            displayPhishingQuizResults();
        }
    }

    function loadNextPhishingScenario() {
        currentPhishingScenarioIndex++;
        if (currentPhishingScenarioIndex < phishingScenarios.length) {
            loadPhishingScenario(currentPhishingScenarioIndex);
        }
    }

    function displayPhishingQuizResults() {
        phishingFeedbackP.textContent = `Quiz Complete! You scored ${phishingScore} out of ${phishingScenarios.length}.`;
        phishingFeedbackP.classList.remove('correct', 'incorrect'); // Clear previous styling
        phishingFeedbackP.classList.add(phishingScore >= phishingScenarios.length / 2 ? 'correct' : 'incorrect');
        retakePhishingQuizBtn.style.display = 'inline-block';
        nextPhishingScenarioBtn.style.display = 'none';
    }

    function resetPhishingQuiz() {
        currentPhishingScenarioIndex = 0;
        phishingScore = 0;
        loadPhishingScenario(currentPhishingScenarioIndex);
    }


    // --- Cyber Safety Bingo ---
    const bingoGrid = document.getElementById('bingo-grid');
    const bingoSquares = document.querySelectorAll('.bingo-square');
    const bingoScoreElem = document.getElementById('bingo-score');
    const bingoMessageElem = document.getElementById('bingo-message');
    const resetBingoBtn = document.getElementById('reset-bingo');

    let selectedBingoSquares = new Set();
    const bingoLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    if (bingoGrid) {
        bingoSquares.forEach((square, index) => {
            square.dataset.index = index; // Assign index for easy lookup
            square.addEventListener('click', toggleBingoSquare);
        });
        resetBingoBtn.addEventListener('click', resetBingo);
        updateBingoDisplay();
    }

    function toggleBingoSquare(event) {
        const square = event.currentTarget;
        const index = parseInt(square.dataset.index);

        if (selectedBingoSquares.has(index)) {
            selectedBingoSquares.delete(index);
            square.classList.remove('selected');
        } else {
            selectedBingoSquares.add(index);
            square.classList.add('selected');
        }
        updateBingoDisplay();
    }

    function checkBingo() {
        for (const line of bingoLines) {
            const isBingo = line.every(index => selectedBingoSquares.has(index));
            if (isBingo) {
                return true;
            }
        }
        return false;
    }

    function updateBingoDisplay() {
        bingoScoreElem.textContent = `Practices Followed: ${selectedBingoSquares.size}`;
        if (checkBingo()) {
            bingoMessageElem.textContent = "BINGO! You're a Cyber Safety Champion!";
            bingoMessageElem.style.color = 'var(--mint-green)';
        } else {
            bingoMessageElem.textContent = "Keep going! How many more can you check off?";
            bingoMessageElem.style.color = 'var(--medium-grey)';
        }
    }

    function resetBingo() {
        selectedBingoSquares.clear();
        bingoSquares.forEach(square => {
            square.classList.remove('selected');
        });
        updateBingoDisplay();
    }

    // --- Mobile Navigation Toggle (re-use from global script.js or define if not global) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburgerMenu.querySelector('i').classList.toggle('fa-bars');
            hamburgerMenu.querySelector('i').classList.toggle('fa-times');
        });

        // Close nav when a link is clicked (for single-page navigation)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    hamburgerMenu.querySelector('i').classList.add('fa-bars');
                    hamburgerMenu.querySelector('i').classList.remove('fa-times');
                }
            });
        });
    }

});