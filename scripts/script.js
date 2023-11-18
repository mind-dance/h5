document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById('video');
    const shutter = document.getElementById('shutter');
    const fileInput = document.getElementById('fileInput'); // 新增文件上传输入
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('downloadLink');
    const resultDiv = document.getElementById('result');
    const historyDiv = document.getElementById('history');
    const previewImage = document.getElementById('previewImage'); // 新增用于预览图片的元素

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error('无法获取摄像头画面:', error);
        });

        shutter.addEventListener('click', function () {
        takePicture();
    });

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            processImage(file);
        }
    });

    function takePicture() {
        canvas.style.display = 'block';
        const context = canvas.getContext('2d');
        const width = video.videoWidth;
        const height = video.videoHeight;

        canvas.width = width;
        canvas.height = height;

        context.drawImage(video, 0, 0, width, height);

        const imageDataUrl = canvas.toDataURL('image/png');
        localStorage.setItem('capturedImage', imageDataUrl);

        downloadLink.href = imageDataUrl;
        downloadLink.download = 'captured_image.png';
        downloadLink.style.display = 'block';

        const result = recognizeImage(imageDataUrl);
        resultDiv.innerHTML = `识别结果：${result}`;

        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push({ image: imageDataUrl, result });
        localStorage.setItem('history', JSON.stringify(history));

        updateHistoryDisplay(history);
    }

    function processImage(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageDataUrl = event.target.result;

            // 显示预览图片
            previewImage.src = imageDataUrl;
            previewImage.style.display = 'block';

            const result = recognizeImage(imageDataUrl);
            resultDiv.innerHTML = `识别结果：${result}`;
        };
        reader.readAsDataURL(file);
    }

    function recognizeImage(imageDataUrl) {
        // 简单的示例：判断图像中是否有动物
        const image = new Image();
        image.src = imageDataUrl;

        // 假设我们使用一个简单的规则判断是否有动物（这里仅作为示例）
        const hasAnimal = Math.random() > 0.5;

        return hasAnimal ? '图像中有动物' : '图像中是人类';
    }

    function updateHistoryDisplay(history) {
        historyDiv.innerHTML = '<h2>历史记录</h2>';

        for (const entry of history) {
            const entryDiv = document.createElement('div');
            entryDiv.innerHTML = `
                <img src="${entry.image}" alt="History Image" style="max-width: 100%;">
                <p>识别结果：${entry.result}</p>
            `;
            historyDiv.appendChild(entryDiv);
        }
    }
});