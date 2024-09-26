const cursor = document.querySelector('#cursor');
const stickyElement = document.querySelector('#stickyElement');
const lerp = (x, y, a) => x * (1 - a) + y * a;

const windowMouseMove = (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        ease: 'expo',
        duration: 0.5
    });
};
window.addEventListener('mousemove', windowMouseMove)
const rotate = (e) => {
    const angle = Math.atan2(e.y, e.x)
    gsap.to(cursor, {
        rotate: `${angle}rad`,
        duration: 0.1
    });
}

stickyElement.addEventListener('mousemove', (dets) => {
    window.removeEventListener('mousemove', windowMouseMove);
    const stickyElemDims = stickyElement.getBoundingClientRect();
    const xMap = gsap.utils.mapRange(stickyElemDims.left, stickyElemDims.width + stickyElemDims.left, 0, 1, dets.clientX);
    const yMap = gsap.utils.mapRange(stickyElemDims.top, stickyElemDims.height + stickyElemDims.top, 0, 1, dets.clientY);
    const center = {
        x: stickyElemDims.left + stickyElemDims.width / 2,
        y: stickyElemDims.top + stickyElemDims.height / 2
    };
    const cursorDims = {
        height: cursor.offsetHeight,
        width: cursor.offsetWidth
    }
    const distance = {
        x: dets.clientX - center.x,
        y: dets.clientY - center.y
    }
    rotate(distance)
    const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y))
    const xMapRange = gsap.utils.mapRange(0, cursorDims.width / 2, 1, 1.1, absDistance)
    const yMapRange = gsap.utils.mapRange(0, cursorDims.height / 2, 1, .9, absDistance)
    gsap.to(cursor, {
        x: center.x,
        y: center.y,
        scaleX: xMapRange,
        scaleY: yMapRange,
        height: "80px",
        width: "80px",
        ease: 'expo',
        duration: 0.5
    });
    gsap.to(stickyElement, {
        x: lerp(-50, 50, xMap),
        y: lerp(-50, 50, yMap),
    });
});

stickyElement.addEventListener('mouseleave', () => {
    window.addEventListener('mousemove', windowMouseMove);
    gsap.to(cursor, {
        scaleX: 1,
        scaleY: 1,
        height: "20px",
        width: "20px",
        ease: 'expo',
        duration: 0.5
    });
    gsap.to(stickyElement, {
        x: 0,
        y: 0,
    });
});
