function shiftPage(toPageId) {
    const allPagesWithShowClass = document.querySelectorAll('.page.show');
    allPagesWithShowClass.forEach(page => page.classList.remove('show'));

    const toPage = document.getElementById(toPageId);
    toPage.classList.add('show');
}

function gameClose() {
    window.close();
}