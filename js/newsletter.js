function showError(fieldId, message) {
    var errorEl = document.getElementById(fieldId + "-error");
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = "block";
    }
}

function clearError(fieldId) {
    var errorEl = document.getElementById(fieldId + "-error");
    if (errorEl) {
        errorEl.style.display = "none";
        errorEl.textContent = "";
    }
}

function isAllDigits(str) {
    if (str.length === 0) return false;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (code < 48 || code > 57) {
            return false;
        }
    }
    return true;
}

function isValidEmail(email) {
    var atIndex = email.indexOf("@");
    if (atIndex < 1) return false;
    var afterAt = email.substring(atIndex + 1);
    if (afterAt.indexOf(".") < 1) return false;
    if (afterAt.indexOf(".") === afterAt.length - 1) return false; 
    return true;
}

function validateForm(event) {
    event.preventDefault();

    var isValid = true;
    
    var name     = document.getElementById("name").value.trim();
    var email    = document.getElementById("email").value.trim();
    var phone    = document.getElementById("phone").value.trim();
    var topic    = document.getElementById("topic").value;
    var updates  = document.getElementById("updates").value;
    
    clearError("name");
    if (name.length === 0) {
        showError("name", "Full name is required.");
        isValid = false;
    }
    
    if (name.length > 0 && name.length < 2) {
        showError("name", "Name must be at least 2 characters.");
        isValid = false;
    }
    
    clearError("email");
    if (email.length === 0) {
        showError("email", "Email address is required.");
        isValid = false;
    }
    
    if (email.length > 0 && !isValidEmail(email)) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
    }
    
    clearError("phone");
    if (phone.length === 0) {
        showError("phone", "Phone number is required.");
        isValid = false;
    }
    
    if (phone.length > 0 && !isAllDigits(phone)) {
        showError("phone", "Phone number must contain digits only.");
        isValid = false;
    }
    
    if (phone.length > 0 && isAllDigits(phone) && phone.length < 10) {
        showError("phone", "Phone number must be at least 10 digits.");
        isValid = false;
    }

    clearError("topic");
    if (topic === "") {
        showError("topic", "Please select a topic of interest.");
        isValid = false;
    }

    clearError("updates");
    if (updates === "") {
        showError("updates", "Please select your preferred update frequency.");
        isValid = false;
    }

    if (isValid) {
        document.getElementById("newsletter-form").style.display = "none";
        document.getElementById("success-msg").style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("newsletter-form");
    if (form) {
        form.addEventListener("submit", validateForm);
    }
});
