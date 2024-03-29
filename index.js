function startBlob(chosenColor){
    getLeaderBoards()
    addLeaderBoard()
    startTime()
    const body = document.querySelector('body')
    // let formDiv = document.getElementById('formDiv')
    // if (!!(formDiv)) {formDiv.remove()}
    let blobDiv = document.getElementById('blobDiv')
    if (!!(blobDiv)) {blobDiv.remove()}

    // let sidebar = document.querySelector('.sidebar')
    let gameWindow;
    let canvas;

    gameWindow = document.createElement('div')
    gameWindow.setAttribute('class', 'game-window')
    // body.innerHTML = ''
    canvas = document.createElement('canvas');
    gameWindow.appendChild(canvas)
    body.appendChild(gameWindow)

    let screenSize = Math.floor(window.innerHeight * .85);
    canvas.height = screenSize;
    canvas.width = screenSize;
    
    let gravity = screenSize * 1/800;
    let jumpHeight = -(screenSize * 15/800);
    let jumped = false;
    let grabbed = false;
    let playerMove = screenSize * 5/800;
    let playerColor = chosenColor;
    let dead = false;
    let currentLevel = 0;
    let lives = 3;
    let float = false;
    let soundPlayed = false;
    let blobinfo = document.getElementById('blob').textContent
    if (blobinfo === 'Blob type: Gold'){
        playerMove = screenSize * 10/800;
        jumpHeight = -(screenSize * 20/800);
        lives = 1;
    } else if (blobinfo === 'Blob type: Fire') {
        playerMove = screenSize * 10/800;
    } else if (blobinfo === 'Blob type: Water') {
        jumpHeight = -(screenSize * 20/800);
    } else if (blobinfo === 'Blob type: Earth') {
        lives += 2;
    }else if (blobinfo === 'Blob type: Grey') {
        float = true;
    }
    const gameLevels = [[],[],[]];
    gameLevels[0].push(new Platform(0, screenSize, screenSize, screenSize * 1/80));
    gameLevels[0].push(new Platform(0, screenSize * 7/8, screenSize * 7/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(0, screenSize * 6/8, screenSize * 5/80, screenSize * 1/8));
    gameLevels[0].push(new Platform(screenSize * 5/80, screenSize * 65/80, screenSize * 5/80, screenSize * 5/80));
    gameLevels[0].push(new Platform(screenSize * 1/8, screenSize * 55/80, screenSize * 7/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(screenSize * 3/8, screenSize * 5/8, screenSize * 2/80, screenSize * 5/80));
    gameLevels[0].push(new Platform(screenSize * 5/8, screenSize * 5/8, screenSize * 2/80, screenSize * 5/80));
    gameLevels[0].push(new Platform(screenSize * 7/8, screenSize * 5/8, screenSize * 1/8, screenSize * 5/80));
    gameLevels[0].push(new Platform(0, screenSize * 4/8, screenSize * 3/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(screenSize * 35/80, screenSize * 4/8, screenSize * 2/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(screenSize * 6/8, screenSize * 4/8, screenSize * 1/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(screenSize * 1/8, screenSize * 3/8, screenSize * 7/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(screenSize * 3/8, screenSize * 23/80, screenSize * 2/80, screenSize * 7/80));
    gameLevels[0].push(new Platform(screenSize * 5/8, screenSize * 26/80, screenSize * 2/80, screenSize * 4/80));
    gameLevels[0].push(new Platform(screenSize * 5/8, screenSize * 17/80, screenSize * 2/80, screenSize * 4/80));
    gameLevels[0].push(new Platform(0, screenSize * 15/80, screenSize * 7/8, screenSize * 2/80));
    gameLevels[0].push(new Platform(0, -screenSize * 1/2, screenSize, screenSize * 1/2));

    gameLevels[1].push(new Platform(0, screenSize - screenSize * 1/80, screenSize, screenSize * 1/80, true));
    gameLevels[1].push(new Platform(screenSize * 65/80, screenSize * 7/8, screenSize * 15/80, screenSize * 2/80));
    gameLevels[1].push(new Platform(screenSize * 1/2, screenSize * 7/8, screenSize * 15/80, screenSize * 2/80));
    gameLevels[1].push(new Platform(screenSize * 1/4, screenSize * 65/80, screenSize * 15/80, screenSize * 2/80));
    gameLevels[1].push(new Platform(0, screenSize * 55/80, screenSize * 15/80, screenSize * 2/80));
    gameLevels[1].push(new Platform(screenSize * 19/80, screenSize * 45/80, screenSize * 15/80, screenSize * 2/80));
    gameLevels[1].push(new Platform(screenSize * 1/2, screenSize * 35/80, screenSize * 30/80, screenSize * 2/80));
    gameLevels[1].push(new Platform(screenSize * 55/80, screenSize * 20/80, screenSize * 15/80, screenSize * 2/80));
    gameLevels[1].push(new Platform(screenSize * 1/2, screenSize * 15/80, screenSize * 7/80, screenSize * 2/80));
    gameLevels[1].push(new Platform(screenSize * 25/80, screenSize * 15/80, screenSize * 7/80, screenSize * 2/80));
    gameLevels[1].push(new Platform(0, -screenSize * 1/2, screenSize, screenSize * 1/2));
    gameLevels[2].push(new Platform(0, screenSize - screenSize * 1/80, screenSize, screenSize * 1/80, true));
    gameLevels[2].push(new Platform(screenSize * 4/80, screenSize * 64/80, screenSize * 12/80, screenSize * 15/80));
    gameLevels[2].push(new Platform(screenSize * 1/4, screenSize * 66/80, screenSize * 12/80, screenSize * 10/80));
    gameLevels[2].push(new Platform(screenSize * 36/80, screenSize * 485/800, screenSize * 13/80, screenSize * 130/800));
    gameLevels[2].push(new Platform(screenSize * 100/800, screenSize * 484/800, screenSize * 190/800, screenSize * 30/800));
    gameLevels[2].push(new Platform(screenSize * 10/800, screenSize * 270/800, screenSize * 13/80, screenSize * 130/800));
    gameLevels[2].push(new Platform(screenSize * 185/800, screenSize * 315/800, screenSize * 50/800, screenSize * 40/800));
    gameLevels[2].push(new Platform(screenSize * 80/800, screenSize * 160/800, screenSize * 190/800, screenSize * 30/800));
    gameLevels[2].push(new Platform(screenSize * 80/800, screenSize * 160/800, screenSize * 190/800, screenSize * 30/800));
    gameLevels[2].push(new Platform(screenSize * 295/800, screenSize * 100/800, screenSize * 190/800, screenSize * 30/800));
    gameLevels[2].push(new Platform(screenSize * 420/800, screenSize * 190/800, screenSize * 190/800, screenSize * 30/800));
    gameLevels[2].push(new Platform(screenSize * 470/800, screenSize * 290/800, screenSize * 190/800, screenSize * 30/800));
    gameLevels[2].push(new Platform(screenSize * 550/800, screenSize * 420/800, screenSize * 190/800, screenSize * 30/800));
    gameLevels[2].push(new Platform(screenSize * 550/800, screenSize * 720/800, screenSize * 190/800, screenSize * 30/800));
    gameLevels[2].push(new Platform(0, -screenSize * 1/2, screenSize, screenSize * 1/2));



    const twod = canvas.getContext('2d');

    function Platform(x, y, length, height, kill=false){
        this.x = x;
        this.y = y;
        this.length = length;
        this.height = height;
        this.kill = kill;

        this.draw = function(){
            if (this.kill){
                twod.fillStyle = 'rgba(255,0,0,1)';
            } else {
                twod.fillStyle = 'rgba(0,0,0,1)';
            }
            twod.fillRect(this.x, this.y, this.length, this.height);
        }
    }

    function BouncingBall(x,y,r,floor){
        this.x = x;
        this.y = y;
        this.r = r;
        this.floor = floor;
        this.dy = -screenSize * 1/80;

        this.draw = function(){
            twod.fillStyle = 'red';
            twod.beginPath();
            twod.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            twod.fill();
        }
        
        this.update = function(){
            if (this.y + this.r  + this.dy >= floor){
                this.y = floor - this.r;
                this.dy = -this.dy;
                if (overlap(Player.x, Player.y, Player.size, this.x - this.r * 0.9, this.y - this.r * 0.9, (this.r * 0.9) * 2) > 0){
                    dead = true;
                    burnSound.play()
                }
            } else {
                this.dy += gravity;
            }
            this.y += this.dy;
            if (overlap(Player.x, Player.y, Player.size, this.x - this.r * 0.9, this.y - this.r * 0.9, (this.r * 0.9) * 2) > 0){
                dead = true;
                burnSound.play()
            }
            this.draw();
        }
    }
    
    function Goal(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.spin = this.size;
        this.spincrementer = -(screenSize * 1/800);
        this.spincolor = ['','darkgreen','green']

        this.draw = function(){
            twod.fillStyle = this.spincolor.slice(Math.round(this.spincrementer/screenSize * 800))[0];
            twod.fillRect((this.x + this.size/2 - this.spin * .5 ), this.y, this.spin, this.size);
        }

        this.update = function(){
            this.spin += this.spincrementer;
            if (this.spin < 0 || this.spin > this.size){
                this.spincrementer = -this.spincrementer;
            }
            this.draw();
        }
    }

    // Sound function and stuff

    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
          this.sound.play();
        }
        this.stop = function(){
          this.sound.pause();
        }
      }

    let landSound;
    landSound = new sound('sound/blobDrop.mp3')

    let burnSound;
    burnSound = new sound('sound/burnBlob.mp3')

    let themeSound;
    themeSound = new sound('sound/theme.mp3')
    // themeSound.play()

    let winSound;
    winSound = new sound('sound/win.mp3')

    let thudSound;
    thudSound = new sound('sound/thudBlob.mp3')

    // to play landSound do: landSound.play()  

    // end of sound related stuff


    function BlobMan(x, y){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.onGround = true;
        this.wallGrab = 0;
        this.size = screenSize * 2/80;

        this.draw = function() {
            twod.fillStyle = playerColor;
            twod.fillRect(this.x, this.y, this.size, this.size);
            twod.fillStyle = 'white';
            twod.fillRect(this.x + screenSize * 5 /800, this.y + screenSize * 3/800, screenSize * 2/800, screenSize * 5/800);
            twod.fillRect(this.x + screenSize * 13/800, this.y + screenSize * 3/800, screenSize * 2/800, screenSize * 5/800);
            twod.beginPath();
            twod.strokeStyle = 'white';
            twod.moveTo(this.x + screenSize * 3/800, this.y + screenSize * 13/800);
            twod.lineTo(this.x + screenSize * 17/800, this.y + screenSize * 13/800);
            twod.stroke();
        }
        this.update = function() {
            // console.log(`y:${this.y}, x:${this.x}, dy:${this.dy}, dx:${this.dx}, onGround:${this.onGround}, wallGrab: ${this.wallGrab}, grabbed: ${grabbed}`)
            let possibleLandings = platforms.slice().sort((a, b) => a.y - b.y);
            possibleLandings = possibleLandings.filter(plat => plat.y >= this.y + this.size + this.dy);
            possibleLandings = possibleLandings.filter(plat => plat.x <= this.x + this.size && plat.x + plat.length >= this.x)
            let platformOn = platforms.filter(plat => plat.y === this.y + this.size)
            let possibleBonks = [];
            let possibleWalls = [];
            if (this.dy < 0){
                possibleBonks = platforms.slice().sort((a, b) => b.y - a.y);
                possibleBonks = possibleBonks.filter(plat => plat.y + plat.height > this.y + this.dy && this.y > plat.y + plat.height);
                possibleBonks = possibleBonks.filter(plat => plat.x <= this.x + this.size && plat.x + plat.length >= this.x)
            }
            if (this.dy < 0 && possibleBonks.length > 0 && this.y + this.dy + this.dy <= possibleBonks[0].y + possibleBonks[0].height) {
                this.y = possibleBonks[0].y + possibleBonks[0].height;
                this.dy = 0;
            } else if (this.y + this.size + this.dy < possibleLandings[0].y){
                if (float && this.dy > 0){
                    this.dy += 0.1 * gravity;
                }
                else{
                    this.dy += gravity;
                }
                platformOn = [];
                this.onGround = false;
                soundPlayed = false;
            }
            this.y += this.dy;
            if (this.dx > 0){
                possibleWalls = platforms.slice().sort((a, b) => a.x - b.x);
                possibleWalls = possibleWalls.filter(plat => plat.y + plat.height > this.y && this.y + this.size > plat.y);
                possibleWalls = possibleWalls.filter(plat => plat.x <= this.x + this.size + this.dx && this.x < plat.x + plat.length );
                if (possibleWalls.length > 0){
                    this.dx = 0;
                    this.x = possibleWalls[0].x - this.size;
                    if(!this.onGround && this.wallGrab === 0 && !grabbed){
                        this.wallGrab = -30;
                        grabbed = true;
                        this.dy = 0;
                    }
                }
            } else if (this.dx < 0){
                possibleWalls = platforms.slice().sort((a, b) => b.x - a.x);
                possibleWalls = possibleWalls.filter(plat => plat.y + plat.height > this.y && this.y + this.size > plat.y);
                possibleWalls = possibleWalls.filter(plat => plat.x + plat.length >= this.x + this.dx && this.x > plat.x );
                if (possibleWalls.length > 0){
                    this.dx = 0;
                    this.x = possibleWalls[0].x + possibleWalls[0].length;
                    if(!this.onGround && this.wallGrab === 0 && !grabbed){
                        this.wallGrab = -30;
                        grabbed = true;
                        this.dy = 0;
                    }
                }
            }
            this.x += this.dx;
            if (this.wallGrab < 0 && (this.x === canvas.width - this.size || this.x === 0 || (possibleWalls.length > 0 && possibleWalls[0].x - this.size === this.x))){
                this.dy -= 0.9 * gravity;
                this.wallGrab++;
            }
            if (this.y + this.size + this.dy + this.dy + gravity > possibleLandings[0].y) {
                platformOn[0] = possibleLandings[0];
            }
            if (platformOn.length > 0){
                if (this.dy >= screenSize * 3/80){
                    thudSound.play()
                    dead = true;
                } else if (platformOn[0].kill){
                    burnSound.play()
                    dead = true;
                }
                this.onGround = true;
                if (!soundPlayed && !dead){
                    soundPlayed = true;
                    landSound.play()
                }

                this.y = platformOn[0].y - this.size;
                this.dy = 0;
                grabbed = false;
            }
            if (this.x < 0){
                this.x = 0;
                this.dx = 0;
                if(!this.onGround && this.wallGrab === 0 && !grabbed){
                    this.wallGrab = -30;
                    grabbed = true;
                    this.dy = 0;
                }
            } else if (this.x > canvas.width - this.size){
                this.x = canvas.width - this.size;
                this.dx = 0;
                if(!this.onGround && this.wallGrab === 0 && !grabbed){
                    this.wallGrab = -30;
                    grabbed = true;
                    this.dy = 0;
                }
            }
            this.draw();
        }
    }

    let platforms = [];
    let balls = [];
    let Player;
    let LevelGoal;

    window.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key === "ArrowLeft"){
            e.preventDefault();
            Player.dx = -playerMove;
        } else if (key === "ArrowRight"){
            e.preventDefault();
            Player.dx = playerMove;
        } else if(key === "ArrowUp"){
            e.preventDefault();
            if (Player.onGround && !jumped){
                Player.dy = jumpHeight;
                jumped = true;
                soundPlayed = false;
            } else if(Player.wallGrab < 0 && !jumped){
                Player.dy = jumpHeight;
                Player.wallGrab = 0;
            }
        }
    })

    window.addEventListener('keyup', (e) => {
        const key = e.key;
        if (key === "ArrowLeft"){
            Player.dx = 0;
        } else if (key === "ArrowRight"){
            Player.dx = 0;
        } else if (key === "ArrowUp"){
            jumped = false;
        }
    })

    function init(){
        if (lives > 0) {
            platforms = [];
            balls = [];
            gameLevels[currentLevel].forEach(plat => platforms.push(plat))
            playerColor = chosenColor;
            if (currentLevel === 0 ){
                Player = new BlobMan(0, screenSize - screenSize * 2/80)
                LevelGoal = new Goal(screenSize * 175/800, screenSize * 75/800, screenSize* 2/80);
            } else if (currentLevel === 1) {
                Player = new BlobMan(screenSize - screenSize * 2/80, screenSize * 7/8 - screenSize * 2/80)
                LevelGoal = new Goal(screenSize * 175/800, screenSize * 75/800, screenSize* 2/80);
            } else {
                Player = new BlobMan(screenSize * 45/800, screenSize * 64/80 - screenSize * 2/80);
                LevelGoal = new Goal(screenSize * 600/800, screenSize * 690/800, screenSize* 2/80);
                ball1 = new BouncingBall(screenSize * 38/80, screenSize * 3/8, screenSize * 3/80, screenSize * 485/800);
                ball2 = new BouncingBall(screenSize * 460/800, screenSize * 400/800, screenSize * 3/80, screenSize * 485/800);
                ball3 = new BouncingBall(screenSize * 175/800, screenSize * 40/800, screenSize * 3/80, screenSize * 160/800);
                ball4 = new BouncingBall(screenSize * 700/800, screenSize * 550/800, screenSize * 3/80, screenSize * 720/800);
                // console.log(ball1)
                balls.push(ball1);
                balls.push(ball2);
                balls.push(ball3);
                balls.push(ball4);
            }
            dead = false;
            paused = false;
            animate();
        }
        else {
            setTimeout(() => {
                startTime();
                currentLevel = 0;
                lives = 3;
                if (document.getElementById('blob').textContent === 'Blob type: Earth') {
                    lives +=2;
                }
                if (document.getElementById('blob').textContent === 'Blob type: Gold') {
                    lives = 1;
                }
                init();
            },3000);

        }
    }

    window.addEventListener('keydown', handlePause)

    function handlePause(e){
        if (e.key === 'Escape') {
            paused = !paused
            if (!paused){
                animate();
            }
        }
    }

    function animate() {
        if (!dead && !paused){
            twod.clearRect(0,0,canvas.width,canvas.height);
            platforms.forEach(plat => plat.draw());
            LevelGoal.update();
            if(balls.length > 0){
                balls.forEach(ball => ball.update());
            }
            Player.update();
            if(overlap(Player.x, Player.y, Player.size, LevelGoal.x, LevelGoal.y, LevelGoal.size) > 0){
                dead = true;
            }
            requestAnimationFrame(animate);
        } else if (overlap(Player.x, Player.y, Player.size, LevelGoal.x, LevelGoal.y, LevelGoal.size) > 0){
            playerColor = 'green';
            Player.draw();
            winSound.play()
            if (currentLevel + 1 < gameLevels.length){
                currentLevel++;
            }
            else {
                paused = true;
                themeSound.stop()
                twod.fillStyle = 'rgba(100,100,100,0.5)';
                twod.fillRect(0, 0, screenSize, screenSize);
                twod.fillStyle = 'green';
                twod.font = `${screenSize * 1/8}px Tahoma`;
                twod.fillText('YOU WIN AT', screenSize * 1/8, screenSize * .5);
                twod.fillText('BLOBLIFE', screenSize * 1/8, screenSize * 5/8);
                lives = 0;
                let timer = document.querySelector('.counter')
                let userid = document.querySelector('h3').id
                createScore(timer.id, userid)
            }
            paused = true;
            setTimeout(init, 2000);
        } else if (paused) {
            twod.fillStyle = 'rgba(100,100,100,0.5)';
            twod.fillRect(0, 0, screenSize, screenSize);
            twod.fillStyle = 'black';
            twod.font = `${screenSize * 1/8}px Tahoma`;
            twod.fillText('PAUSED', screenSize * 25/80, screenSize * .5);
        } else if (dead) {
            paused = true;
            playerColor = 'red';
            Player.draw();
            if (lives - 1 === 0){
                lives--;
                paused = true;
                twod.fillStyle = 'rgba(100,100,100,0.5)';
                twod.fillRect(0, 0, screenSize, screenSize);
                twod.fillStyle = 'red';
                twod.font = `${screenSize * 1/8}px Tahoma`;
                twod.fillText('GAME OVER', screenSize * 1/8, screenSize * .5);
            } else {
                lives--;
            }
            setTimeout(init, 2000);
        }
        for (let i = 0; i < lives; i++){
            const xspacing = i * (screenSize * 1/80 + screenSize * 5/800) + screenSize * 5/800
            const yspacing = screenSize * 5/800;
            twod.fillStyle = chosenColor;
            twod.fillRect(xspacing, yspacing, screenSize * 1/80, screenSize * 1/80);
            twod.fillStyle = 'white';
            twod.fillRect(xspacing + screenSize * 25/8000, yspacing + screenSize * 15/8000, screenSize * 1/800, screenSize * 25/8000);
            twod.fillRect(xspacing + screenSize * 65/8000, yspacing + screenSize * 15/8000, screenSize * 1/800, screenSize * 25/8000);
            twod.beginPath();
            twod.strokeStyle = 'white';
            twod.moveTo(xspacing + screenSize * 15/8000, yspacing + screenSize * 65/8000);
            twod.lineTo(xspacing + screenSize * 85/8000, yspacing + screenSize * 65/8000);
            twod.stroke();
        }
    }
    init();

    function overlap(x1, y1, s1, x2, y2, s2) {
        const width = Math.min(x1 + s1, x2 + s2) - Math.max(x1, x2);
        const height = -(Math.max(-y1 - s1, -y2 - s2) - Math.min(-y1, -y2));
        return width > 0 && height > 0 ? width * height : 0;
    }
}
