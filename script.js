document.addEventListener('DOMContentLoaded', function () {
    const buttonContainer = document.querySelector(".button-container");
    const h1 = document.getElementById('typewriter-h1');
    const h2 = document.getElementById('typewriter-h2');
    const YesButton = document.getElementById('YesButton');
    const NoButton = document.getElementById('NoButton');
    const animateMove = (element, prop, pixels) => anime({
        targets: element,
        [prop]: `${pixels}px`,
        easing: "easeOutCirc"
    });

    ["mouseover", "click"].forEach(function (el) {
        NoButton.addEventListener(el, function (event) {
            const top = getRandomNumber(window.innerHeight - this.offsetHeight);
            const left = getRandomNumber(window.innerWidth - this.offsetWidth);

            animateMove(this, "left", left).play();
            animateMove(this, "top", top).play();
        });
    });

    const getRandomNumber = (num) => {
        return Math.floor(Math.random() * (num + 1));
    };

    let noButtonClickCount = 0;

    function createTrailingHeart(x, y, index) {
        const trailingHeart = document.createElement('div');
        trailingHeart.className = 'trailing-heart';
        trailingHeart.style.left = x + 'px';
        trailingHeart.style.top = y + 'px';
        document.body.appendChild(trailingHeart);
        trailingHeart.offsetWidth;
        trailingHeart.style.transform = 'translate(-50%, -50%) scale(0)';
        trailingHeart.style.opacity = '0';
        setTimeout(() => {
            trailingHeart.remove();
        }, 500 * index);
    }

    const activeHearts = [];
    document.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const heartIndex = activeHearts.length;
        createTrailingHeart(mouseX, mouseY, heartIndex);
        activeHearts.push(heartIndex);
        if (activeHearts.length > 5) {
            const oldestHeartIndex = activeHearts.shift();
            const oldestHeart = document.querySelector('.trailing-heart:nth-child(' + oldestHeartIndex + ')');
            if (oldestHeart) {
                oldestHeart.remove();
            }
        }
    });

    function createPulsingHeart() {
        const heartContainer = document.createElement('div');
        heartContainer.className = 'heart-container';
        const heart = document.createElement('div');
        heart.className = 'heart';
        heartContainer.appendChild(heart);
        document.body.appendChild(heartContainer);
    }

    function typeWriter(element, text, speed, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                const currentSpeed = text[i] === '.' ? speed / 3 : speed;
                element.innerHTML += text[i] === ',' || text[i] === '.' ? text[i] + '<br>' : text[i];
                i++;
                setTimeout(type, currentSpeed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    createPulsingHeart();

    typeWriter(h1, "Dear Isabel,", 50, function () {
        setTimeout(function () {
            const poemLines = [
                "In whispers soft, as stories blend,",
                "A love note to Izz, I intend.",
                "Before the moment fades away,",
                "Here's my heartfelt plea today:"
            ];
            let lineIndex = 0;
            function typePoemLine() {
                if (lineIndex < poemLines.length) {
                    typeWriter(h2, poemLines[lineIndex], 75, function () {
                        lineIndex++;
                        setTimeout(typePoemLine, 1500);
                    });
                } else {
                    setTimeout(function () {
                        h2.innerHTML = '';
                        typeWriter(h2, "Will you be my valentine?", 75, function () {
                            h2.innerHTML += '<br>';
                            setTimeout(function () {
                                typeWriter(h2, "Just you and me?", 75, function () {
                                    setTimeout(function () {
                                        buttonContainer.style.display = 'flex';
                                    }, 2000);
                                });
                            }, 2000);
                        });
                    }, 1000);
                }
            }
            typePoemLine();
        }, 2000);
    });

    buttonContainer.style.display = 'none';

    function moveNoButton() {
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);
        NoButton.style.position = 'absolute';
        NoButton.style.left = randomX + 'px';
        NoButton.style.top = randomY + 'px';
        buttonContainer.style.flexDirection = 'column';
    }

    function displayImage(src, callback) {
        document.body.innerHTML = '';
        
        const img = document.createElement('img');
        img.src = src;
        img.style.width = '50%'; // or any other size like '500px'
        img.style.height = 'auto'; // maintain aspect ratio
        img.onload = function() {
            if (callback) callback();
        };
        img.onerror = function() {
            console.error("Error loading the image.");
        };
        document.body.appendChild(img);
        document.body.style.backgroundColor = 'black';
    }

    function displayPromiseMessage(callback) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        messageContainer.innerText = "I promise you won't regret it";
        messageContainer.style.fontSize = '32px';
        messageContainer.style.color = 'white';
        messageContainer.style.textAlign = 'center';
        messageContainer.style.marginTop = '20px';
    
        document.body.appendChild(messageContainer);
        
        setTimeout(function() {
            if (callback) callback();
        },   2000);
    }
    
    function showDrawingBoard() {
        document.body.innerHTML = '';
        const drawingBoard = document.getElementById('drawing-board');
        drawingBoard.classList.remove('hidden');
    }
    
    function setUpCanvas() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let drawing = false;
        
        function startDrawing(e) {
            if (e.button === 1) {
                drawing = true;
                draw(e);
            }
        }
        
        
        function endDrawing() {
            drawing = false;
            ctx.beginPath();
        }
        
        function draw(e) {
            if (!drawing) return;
            ctx.beginPath(); // Start a new path
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }
        
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mousemove', draw);

        canvas.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
}

        
    
    YesButton.addEventListener('click', function () {
        alert('Yayyy :)');
        NoButton.style.position = 'static';
        buttonContainer.style.flexDirection = 'row';

        displayImage('IMG_0292.JPG', function() {
            displayPromiseMessage(function() {
                displayImage('IMG_1613.jpg');
            
            });
        });
    });

    NoButton.addEventListener('click', function () {
        noButtonClickCount++;

        moveNoButton();
        if (noButtonClickCount === 3) {
            alert('Please :(');
            noButtonClickCount = 0;
        }
    });
});