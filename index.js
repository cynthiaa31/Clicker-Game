const click = document.querySelector("#luffy");
const autoClick = document.querySelector("#auto-click");
const autoClickTextPrice = document.querySelector("#auto-click .price span");

const updateScore = (luffy) => {
    const title = document.querySelector("title");
    const score = document.querySelector("#score span");

    score.innerText = luffy;
    title.innerHTML =  luffy + " luffy - Luffy Clicker"; 

    localStorage.setItem("luffy", luffy); // Sauvegarde dans localStorage
};

const updatePowerupsStorage = powerup => {
    let powerups = JSON.parse(localStorage.getItem("powerups")) || [];
    powerups.push(powerup);

    localStorage.setItem("powerups", JSON.stringify(powerups));
}



const getStorage = () => {
    const luffy = localStorage.getItem("luffy") || 0; 
    const powerups = JSON.parse(localStorage.getItem("powerups")) || [];

    const storage = {
        "luffy": luffy,
        "powerups": powerups
    }

    return storage;


};

const luffyClicked = () => {
    console.log("Score augmenté !");
    const storage = getStorage();

    const score = document.querySelector("#score span");
    const scoreValue = parseInt(score.innerText);
    let newScore;

    if(storage.powerups.includes("upgrade-click")) {
        const multiplier = storage.powerups.filter(powerup => powerup == "upgrade-click").length;
        if(multiplier == 1){
            newScore = scoreValue + 2;
        } else {
            newScore = scoreValue + (2 ** multiplier)
        }
    } else {
        newScore = scoreValue + 1;
    }

    updateScore(newScore);
};



const createParticle = (x, y) => {
    const particle = document.createElement("img");
    particle.src = "src/chap.png"; 
    
    particle.className = "luffy-particle";
    particle.style.position = "absolute";
    particle.style.left = `${x}px`; 
    particle.style.top = `${y}px`; 
    document.body.appendChild(particle);

    setTimeout(() => {
        document.body.removeChild(particle); 
    }, 1000);
};

const luffy = document.querySelector("#luffy");

luffy.addEventListener("click", (e) => {
    createParticle(e.clientX, e.clientY);
    luffyClicked()
});

const autoClickCookie = () => {
    setInterval(() => {
        const score = document.querySelector("#score span");
        const scoreValue = parseInt(score.innerText);

        newScore = scoreValue + 1;

        updateScore(newScore);
    }, 1000)
}

