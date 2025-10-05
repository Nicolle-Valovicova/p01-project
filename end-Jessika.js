// Get elements from the DOM
const scoreDisplay = document.getElementById('scoreDisplay');
const correctCount = document.getElementById('correctCount');
const accuracy = document.getElementById('accuracy');
const finalScoreElement = document.getElementById('finalScore');

// Function to display the final results
function displayResults() {
    console.log("📄 Loading results from localStorage...");
    
    // Debug: Show all localStorage contents
    console.log("🔍 All localStorage contents:");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`  ${key}: ${localStorage.getItem(key)}`);
    }
    
    // Get data from localStorage with proper parsing
    const finalScore = localStorage.getItem('mostRecentScore');
    const correctAnswers = localStorage.getItem('correctAnswers');
    const totalQuestions = localStorage.getItem('totalQuestions');
    
    console.log("📊 Retrieved quiz data:", {
        finalScore: finalScore,
        correctAnswers: correctAnswers,
        totalQuestions: totalQuestions
    });
    
    // Convert to numbers, with fallbacks
    const scoreNum = finalScore ? parseInt(finalScore) : 0;
    const correctNum = correctAnswers ? parseInt(correctAnswers) : 0;
    const totalNum = totalQuestions ? parseInt(totalQuestions) : 20;
    
    console.log("🔢 Parsed numbers:", {
        scoreNum: scoreNum,
        correctNum: correctNum,
        totalNum: totalNum
    });
    
    // Calculate accuracy
    const accuracyPercentage = totalNum > 0 
        ? Math.round((correctNum / totalNum) * 100) 
        : 0;
    
    console.log("📈 Calculated accuracy:", accuracyPercentage + "%");
    
    // Update the display
    scoreDisplay.textContent = scoreNum;
    correctCount.textContent = `${correctNum}/${totalNum}`;
    accuracy.textContent = `${accuracyPercentage}%`;
    
    console.log('✅ Final Results Displayed:', {
        score: scoreNum,
        correct: correctNum,
        total: totalNum,
        accuracy: accuracyPercentage
    });
    
    // Add visual feedback based on score
    addScoreFeedback(scoreNum, accuracyPercentage);
    
    // Show success message
    showDataStatus(true);
}

// Function to show data status
function showDataStatus(hasData) {
    const statusElement = document.createElement('div');
    statusElement.style.padding = '10px';
    statusElement.style.margin = '10px 0';
    statusElement.style.borderRadius = '5px';
    statusElement.style.textAlign = 'center';
    
    if (hasData) {
        statusElement.style.background = '#4CAF50';
        statusElement.style.color = 'white';
        statusElement.textContent = '✅ Quiz data loaded successfully!';
    } else {
        statusElement.style.background = '#FF9800';
        statusElement.style.color = 'white';
        statusElement.textContent = '⚠️ No quiz data found. Please complete a quiz first.';
    }
    
    document.querySelector('#stats').appendChild(statusElement);
}

// Function to add visual feedback based on performance
function addScoreFeedback(score, accuracy) {
    let message = "Quiz Completed!";
    let emoji = "🎯";
    let color = "#ff6b00";
    
    if (accuracy >= 90) {
        message = "Excellent!";
        emoji = "🏆";
        color = "#4CAF50";
    } else if (accuracy >= 70) {
        message = "Great Job!";
        emoji = "👍";
        color = "#2196F3";
    } else if (accuracy >= 50) {
        message = "Good Effort!";
        emoji = "💪";
        color = "#FF9800";
    } else {
        message = "Keep Practicing!";
        emoji = "📚";
        color = "#F44336";
    }
    
    finalScoreElement.textContent = `${message} ${emoji}`;
    finalScoreElement.style.color = color;
}

// Test function with sample data
function testWithSampleData() {
    console.log("🧪 Testing with sample data...");
    
    // Set sample data
    localStorage.setItem('mostRecentScore', '850');
    localStorage.setItem('correctAnswers', '17');
    localStorage.setItem('totalQuestions', '20');
    localStorage.setItem('quizCompleted', new Date().getTime().toString());
    
    // Reload the display
    location.reload();
}

// Clear all data function
function clearAllData() {
    localStorage.clear();
    console.log("🗑️ All localStorage cleared");
    alert('All data cleared! Refresh the page.');
}

// Add debug buttons
function addDebugButtons() {
    const debugContainer = document.createElement('div');
    debugContainer.style.margin = '20px 0';
    debugContainer.style.textAlign = 'center';
    
    const testBtn = document.createElement('button');
    testBtn.textContent = 'Test: Load Sample Data';
    testBtn.onclick = testWithSampleData;
    
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear All Data';
    clearBtn.onclick = clearAllData;
    
    const refreshBtn = document.createElement('button');
    refreshBtn.textContent = 'Refresh Page';
    refreshBtn.onclick = () => location.reload();
    
    // Style buttons
    [testBtn, clearBtn, refreshBtn].forEach(btn => {
        btn.style.margin = '5px';
        btn.style.padding = '8px 12px';
        btn.style.background = '#666';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        debugContainer.appendChild(btn);
    });
    
    document.querySelector('.end-buttons').parentNode.insertBefore(debugContainer, document.querySelector('.end-buttons'));
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log("🏁 End page loaded");
    
    // Check if we have quiz data
    const hasQuizData = localStorage.getItem('quizCompleted') !== null;
    
    console.log("📋 Has quiz data:", hasQuizData);
    
    if (hasQuizData) {
        displayResults();
    } else {
        console.log("❌ No quiz data found in localStorage");
        finalScoreElement.textContent = "No Quiz Data Found";
        finalScoreElement.style.color = "#F44336";
        showDataStatus(false);
    }
    
    // Add debug buttons
    addDebugButtons();
    
    // Add animations
    animateStats();
});

// Add smooth animation to stats
function animateStats() {
    const statsElements = document.querySelectorAll('#stats p');
    statsElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });
}