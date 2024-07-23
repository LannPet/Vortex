
const allCircles = [
    { 
        name: "fullCircle",
        pos: 0
    },
    { 
        name: "fadedCircle",
        pos: 0
    },
    { 
        name: "fullBlueInnerCircle",
        pos: 1
    },
    { 
        name: "fadedBlueInnerCircle",
        pos: 1
    },
    {
        name: "fullRedCircle",
        pos: 2
    },
    {
        name: "fadedRedCircle",
        pos: 2
    },
    {
        name:"fullYellowCircle",
        pos: 3
    },
    {
        name: "fadedYellowCircle",
        pos: 3
    },
    
]


let container = document.getElementById('svgBox');


// Initial target positions for each circle
const targets = {
    fullCircle: { cx: 100, cy: 100},
    fadedCircle: { cx: 100, cy: 100 },
    fullBlueInnerCircle: { cx: 100, cy: 100 },
    fadedBlueInnerCircle: { cx: 100, cy: 100 },
    fullRedCircle: { cx: 100, cy: 100 },
    fadedRedCircle: { cx: 100, cy: 100},
    fullYellowCircle: { cx: 100, cy: 100 },
    fadedYellowCircle: { cx: 100, cy: 100 }
};

const lerp = (start, end, t) => start * (1 - t) + end * t;

function animateCircle(crcName) {
    const circle = document.getElementById(crcName);
    const target = targets[crcName];
    
    const currentX = parseFloat(circle.getAttribute('cx'));
    const currentY = parseFloat(circle.getAttribute('cy'));

    const newX = lerp(currentX, target.cx, 0.08); // Adjust t for speed
    const newY = lerp(currentY, target.cy, 0.08); // Adjust t for speed

    circle.setAttribute('cx', newX);
    circle.setAttribute('cy', newY);
    
    requestAnimationFrame(() => animateCircle(crcName));
}

function getCoordinates(crc, e) {
    let circle = document.getElementById(crc.name);

    if (!container || !circle) return; // Ensure elements exist

    // Get SVG bounding box relative to viewport
    const containerRect = container.getBoundingClientRect();
    const circleRadius = parseFloat(circle.getAttribute('r'));

    // Calculate SVG center coordinates
    const containerCenterX = containerRect.left + containerRect.width / 2;
    const containerCenterY = containerRect.top + containerRect.height / 2;

    // Mouse coordinates relative to the viewport
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate maximum movement in SVG coordinates
    const maxMoveX = containerRect.width / 2 - circleRadius //- crc.pos * 5;
    const maxMoveY = containerRect.height / 2 - circleRadius //- crc.pos * 5;

    // Calculate circle position relative to the center
    const moveX = Math.max(-maxMoveX, Math.min(maxMoveX, (mouseX - containerCenterX) / containerRect.width * maxMoveX));
    const moveY = Math.max(-maxMoveY, Math.min(maxMoveY, (mouseY - containerCenterY) / containerRect.height * maxMoveY));

    // Update target positions for smooth transition
    targets[crc.name].cx = 100 - moveX; // Initial cx coordinate
    targets[crc.name].cy = 100 - moveY; // Initial cy coordinate

}

function disableFollow(crc, e) {
    let circle = document.getElementById(crc.name);

    // Reset target positions to initial coordinates
    targets[crc.name].cx = 100; // Initial cx coordinate
    targets[crc.name].cy = 100; // Initial cy coordinate
}

function enableFollow(crcs, e, state) {
    crcs.forEach(crc => {
        if (state) {
            getCoordinates(crc, e);
        } else {
            disableFollow(crc, e);
        }
    });
}

// Start animation loops for all circles
allCircles.forEach(crc => {
    requestAnimationFrame(() => animateCircle(crc.name));
});


