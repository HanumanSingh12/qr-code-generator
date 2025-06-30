let qrCodeInstance = null;

// Function to set default size based on device
function setDefaultSize() {
    const sizeInput = document.getElementById('sizeInput');
    if (window.innerWidth <= 768) {
        // Mobile device - set to 200px
        sizeInput.value = 200;
    } else {
        // Desktop device - set to 300px
        sizeInput.value = 300;
    }
}

// Set default size on page load
window.addEventListener('load', setDefaultSize);

// Update size on window resize
window.addEventListener('resize', function() {
    const sizeInput = document.getElementById('sizeInput');
    if (!sizeInput.dataset.userModified) {
        setDefaultSize();
    }
});

function generateQR() {
    const text = document.getElementById('textInput').value.trim();
    const size = parseInt(document.getElementById('sizeInput').value);
    const color = document.getElementById('colorInput').value;

    if (!text) {
        alert('Please enter some text or URL to generate QR code');
        return;
    }

    // Validate size range
    if (size < 100 || size > 1000) {
        alert('Please enter a size between 100 and 1000 pixels');
        return;
    }

    const canvas = document.getElementById('qrcode');
    const container = document.getElementById('qrContainer');

    try {
        qrCodeInstance = new QRious({
            element: canvas,
            value: text,
            size: size,
            foreground: color,
            background: '#ffffff',
            level: 'M'
        });

        container.classList.remove('hidden');
        canvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
        alert('Error generating QR code. Please check your input.');
        console.error('QR Code generation error:', error);
    }
}

function downloadQR() {
    if (!qrCodeInstance) {
        alert('Please generate a QR code first');
        return;
    }

    const canvas = document.getElementById('qrcode');
    const link = document.createElement('a');
    const text = document.getElementById('textInput').value.trim();
    
    // Create filename based on content
    let filename = 'qrcode';
    if (text.length > 0) {
        // Clean the text for filename
        const cleanText = text.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
        filename = `qrcode_${cleanText}`;
    }
    
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function fillExample(text) {
    document.getElementById('textInput').value = text;
    // Auto-generate QR code when example is clicked
    generateQR();
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Text input - generate on Enter key
    document.getElementById('textInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateQR();
        }
    });

    // Size input - real-time update
    document.getElementById('sizeInput').addEventListener('input', function() {
        // Mark that user has manually modified the size
        this.dataset.userModified = 'true';
        
        const text = document.getElementById('textInput').value.trim();
        if (text && qrCodeInstance) {
            generateQR();
        }
    });

    // Color input - real-time update
    document.getElementById('colorInput').addEventListener('change', function() {
        const text = document.getElementById('textInput').value.trim();
        if (text && qrCodeInstance) {
            generateQR();
        }
    });

    // Auto-focus on text input
    document.getElementById('textInput').focus();
});

// Utility function to validate URL
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Add some visual feedback for better UX
function showGeneratingFeedback() {
    const button = document.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Generating...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 500);
}
