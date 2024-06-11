let newX = 0, newY = 0, startX = 0, startY = 0;

const card = document.getElementById('card');

card.addEventListener('mousedown', mouseDown);
card.addEventListener('touchstart', touchStart, { passive: false });

function mouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

function mouseMove(e) {
    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    card.style.top = (card.offsetTop - newY) + 'px';
    card.style.left = (card.offsetLeft - newX) + 'px';
}

function mouseUp(e) {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
}

function touchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;

    document.addEventListener('touchmove', touchMove, { passive: false });
    document.addEventListener('touchend', touchEnd, { passive: false });
}

function touchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    newX = startX - touch.clientX;
    newY = startY - touch.clientY;

    startX = touch.clientX;
    startY = touch.clientY;

    card.style.top = (card.offsetTop - newY) + 'px';
    card.style.left = (card.offsetLeft - newX) + 'px';
}

function touchEnd(e) {
    document.removeEventListener('touchmove', touchMove);
    document.removeEventListener('touchend', touchEnd);
}
