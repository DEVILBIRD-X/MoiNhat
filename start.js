document.getElementById('start-button').addEventListener('click', function() {
    document.querySelector('.start-screen').style.display = 'none';
    document.querySelector('.world1-screen').style.display = 'block';
});

// Xử lý khi người dùng chọn màn chơi Level
document.querySelectorAll('.level-button').forEach(button => {
    button.addEventListener('click', function() {
        const level = this.getAttribute('data-level');
        alert(`Starting Level ${level}`);
        // Thực hiện logic để bắt đầu màn chơi Level đã chọn
        // Ví dụ: chuyển hướng sang trang game với level tương ứng
    });
});