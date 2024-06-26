// Chonman.js

document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra trạng thái lưu trữ của người chơi (localStorage)
    const level1Completed = localStorage.getItem('level1Completed') === 'true';

    if (level1Completed) {
        unlockLevel(2);
    }

    // Lấy ra tất cả các nút level trong màn chơi World 1
    const levelButtons = document.querySelectorAll('.level-button');

    // Lặp qua từng nút và thêm sự kiện click
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const level = button.getAttribute('data-level');
            
            if (button.classList.contains('locked')) {
                alert('This level is locked. Complete previous levels to unlock.');
            } else {
                navigateToLevel(level);
            }
        });
    });

    // Hàm xử lý điều hướng đến màn chơi tương ứng
    function navigateToLevel(level) {
        console.log(`Chosen level: ${level}`);

        // Điều hướng đến trang game tương ứng
        window.location.href = `level${level}.html`;

        // Thực hiện các hành động cần thiết khi chọn màn chơi, ví dụ như chuyển hướng đến màn chơi thực tế
        // Thay đổi nội dung này tùy thuộc vào logic và cấu trúc của game của bạn
        // Ví dụ:
        // window.location.href = `level${level}.html`; // Chuyển hướng đến file level tương ứng
        // Hoặc
        // Gọi hàm khởi tạo màn chơi với level được chọn

        // Sau khi chọn level, bạn có thể thay đổi file CSS và JavaScript cho màn chơi tiếp theo
        updateGameFilesForLevel(level);
    }

    // Giả sử bạn có hàm để khởi động Level trò chơi
    function startGameLevel(level) {
        // Ví dụ: sau khi hoàn thành Level 1, lưu trạng thái vào localStorage
        if (level === '1') {
            localStorage.setItem('level1Completed', 'true');
            unlockLevel(2);
        }

        // Chuyển hướng đến màn chơi tương ứng
        // window.location.href = `level${level}.html`;
    }

    // Hàm mở khóa các cấp độ
    function unlockLevel(level) {
        const button = document.querySelector(`.level-button[data-level="${level}"]`);
        if (button) {
            button.classList.remove('locked');
            button.removeAttribute('disabled');
        }
    }

    // Hàm cập nhật các file CSS và JavaScript cho màn chơi mới
    function updateGameFilesForLevel(level) {
        // Đường dẫn tới file CSS mới
        const newCSSFile = 'TroChoiPhan.css';

        // Đường dẫn tới file JavaScript mới
        const newJSFile = 'TroChoiPhan.js';

        // Lấy phần tử head của HTML
        const head = document.head;

        // Xóa các file CSS và JavaScript cũ nếu có
        removeOldFiles();

        // Tạo thẻ link cho file CSS mới
        const newCSSLink = document.createElement('link');
        newCSSLink.rel = 'stylesheet';
        newCSSLink.href = newCSSFile;

        // Thêm thẻ link vào head
        head.appendChild(newCSSLink);

        // Tạo thẻ script cho file JavaScript mới
        const newScript = document.createElement('script');
        newScript.src = newJSFile;

        // Thêm script vào cuối body để đảm bảo đã tải xong các phần tử HTML
        document.body.appendChild(newScript);
    }

    // Hàm xóa các file CSS và JavaScript cũ
    function removeOldFiles() {
        const oldCSS = document.querySelector('link[href*="TroChoiPhan"]');
        if (oldCSS) {
            oldCSS.remove();
        }

        const oldJS = document.querySelector('script[src*="TroChoiPhan"]');
        if (oldJS) {
            oldJS.remove();
        }
    }
});