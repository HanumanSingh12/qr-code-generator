let qrCodeInstance = null;

function generateQR() {
    const text = document.getElementById('textInput').value.trim();
    const size = parseInt(document.getElementById('sizeInput').value);
    const color = document.getElementById('colorInput').value;

    if (!text) {
        alert('Please enter some text or URL to generate QR code');
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
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function fillExample(text) {
    document.getElementById('textInput').value = text;
}

document.getElementById('textInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateQR();
    }
});

document.getElementById('sizeInput').addEventListener('change', function() {
    const text = document.getElementById('textInput').value.trim();
    if (text && qrCodeInstance) {
        generateQR();
    }
});

document.getElementById('colorInput').addEventListener('change', function() {
    const text = document.getElementById('textInput').value.trim();
    if (text && qrCodeInstance) {
        generateQR();
    }
});
