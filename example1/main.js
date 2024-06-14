document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const dropZones = document.querySelectorAll('.base, #off');
    let selectedCard = null;
    let currentDropZone = null;

    function setSelectedCard(event) {
        console.log("Event: ", event);
        selectedCard = event.target.closest('.card');
        const dropZone = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY).closest('.base, #off');
        currentDropZone = dropZone;
        console.log("Drop Zone touch start: ", dropZone);
        console.log(selectedCard.id);
    }

    function putCardInDropZone(dropZone) {
        if (selectedCard) {
            dropZone.prepend(selectedCard);
            selectedCard.style.position = 'static';
            console.log("Element prepend to selected Drop Zone: ", dropZone);
            if (currentDropZone?.id != dropZone?.id) {
                selectedCard = null;
                currentDropZone = null;
            }
        }
    }

    function handleTouchStart(event) {
        event.preventDefault();
        setSelectedCard(event);
    }

    function handleTouchMove(event) {
        event.preventDefault();
        const touch = event.touches[0];
        selectedCard.style.position = 'absolute';
        selectedCard.style.left = `${touch.pageX - selectedCard.offsetWidth / 2}px`;
        selectedCard.style.top = `${touch.pageY - selectedCard.offsetHeight / 2}px`;
    }

    function handleTouchEnd(event) {
        event.preventDefault();
        console.log("Event: ", event);
        const dropZone = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY).closest('.base, #off');
        console.log("Drop Zone: ", dropZone);
        if (dropZone) {
            putCardInDropZone(dropZone);
        }
    }

    cards.forEach(card => {
        card.addEventListener('dragstart', setSelectedCard);
        card.addEventListener('touchstart', handleTouchStart, { passive: false });
        card.addEventListener('touchmove', handleTouchMove, { passive: false });
        card.addEventListener('touchend', handleTouchEnd, { passive: false });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        zone.addEventListener('drop', (event) => {
            event.preventDefault();
            console.log("drop event");
            console.log(selectedCard?.id);
            putCardInDropZone(zone);
        });
        zone.addEventListener('touchend', handleTouchEnd, {passive: false});
    });
});
