const dataRef = "playerCard";

function defaultCardData() {
    var cardData = new Object;
    cardData.name = "BloodBowl_Card";
    cardData.cardName = i18next.t('card.caracteristics.player_name');
    cardData.teamName = i18next.t('card.caracteristics.team_name');
    cardData.playerType = "roster";
    cardData.playsFor = "";
    cardData.specialRules = "";
    cardData.keywords = "";
    cardData.footer = "100,000";
    cardData.positionName = "";
    cardData.cardText = i18next.t('card.caracteristics.body_text');
    cardData.ma = 4;
    cardData.st = 4;
    cardData.ag = 3;
    cardData.pa = 3;
    cardData.av = 9;
    cardData.base64Image = null;
    cardData.imageUrl = null;
    cardData.imageProperties = getDefaultModelImageProperties();
    cardData.p_agility = false;
    cardData.p_devious = false;
    cardData.p_general = false;
    cardData.p_passing = false;
    cardData.p_mutations = false;
    cardData.p_strength = false;
    cardData.s_agility = false;
    cardData.s_devious = false;
    cardData.s_general = false;
    cardData.s_passing = false;
    cardData.s_mutations = false;
    cardData.s_strength = false;

    return cardData;
}

function drawCardText(value, yStart, maxLinesForNormalFont, keywords=false) {
    let context = getContext();
    if(keywords == true){
        context.font = 'italic 22px brothers-regular';
        context.fillStyle = '#203c77';
        context.textAlign = "left";
        context.textBaseline = "middle";
    }
    else{
        context.textAlign = "left";
        context.textBaseline = "middle";
    }
    
    let maxCharactersForThreeLines = 140;
    let minFontSize = 24;

    let playerType = document.getElementById("playerType").value;
    //let yStart = (playerType === "star") ? 680 : 730;
    let xStart = 265;

    let fontSize = 26;
    let lineHeight = 22;
    let fitWidth = 900; // Reduced fitWidth for accommodating 4 lines at smaller font size

    let textLines = splitWordWrap(context, value, fitWidth);

    if (value.length > maxCharactersForThreeLines) {
        maxLinesForNormalFont = 9; // Allow 4 lines if there are more than 300 characters
    }

    if (textLines.length > maxLinesForNormalFont) {
        let fontReductionStep = 2;
        while (textLines.length > maxLinesForNormalFont) {
            fontSize -= fontReductionStep;
            lineHeight = fontSize * 1.2;
            fitWidth = 350 / (fontSize / 36); // Adjust fit width proportionally to the font size
            textLines = splitWordWrap(context, value, fitWidth);
        }
        fontSize = Math.max(fontSize, minFontSize);
        lineHeight = fontSize * 1.2;
    }
    if(keywords == true){

        let fillStyle = '#203c77';
        context.font = 'italic 22px brothers-regular';
        context.fillStyle = fillStyle;
    }
    else{
        
        let fillStyle = 'black';
        context.font = `${fontSize}px franklin-gothic-book`;
        context.fillStyle = fillStyle;
    }

    textLines.forEach((line, index) => {
        context.fillText(line, xStart, yStart + index * lineHeight);
    });
}


/*
function splitWordWrap(context, text, fitWidth) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    
    for (const word of words) {
        const testLine = line + (line ? ' ' : '') + word;
        const testWidth = context.measureText(testLine).width;
        
        if (testWidth <= fitWidth) {
            line = testLine;
        } else {
            lines.push(line);
            line = word;
        }
    }
    lines.push(line);
    return lines;
}
*/
drawCardName = function (value) {
    getContext().fillStyle = 'black';
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    getContext().rotate(-6 * Math.PI / 180);

    // Set the initial font size
    var fontSize = 70;

    // Check if the value is 18 characters or more
    if (value.length >= 18) {
        // Calculate the maximum width based on the desired length
        var maxWidth = 500;

        // Calculate the width of the text with the current font size
        getContext().font = 'italic ' + fontSize + 'px brothers-regular';
        var textWidth = getContext().measureText(value).width;

        // Reduce font size if the text width exceeds the maximum width
        while (textWidth > maxWidth && fontSize > 1) {
            fontSize--;
            getContext().font = 'italic ' + fontSize + 'px brothers-regular';
            textWidth = getContext().measureText(value).width;
        }
    }

    // Set the font size and draw the text with black shadow
    getContext().font = 'italic ' + fontSize + 'px brothers-regular';
    writeScaled(value, { x: 228 + 4, y: 200 + 4 });
    
    // Set the font size and draw the text in white
    getContext().fillStyle = 'white';
    writeScaled(value, { x: 228, y: 200 });
    getContext().rotate(6 * Math.PI / 180);
}


drawTeamName = function (value) {
    getContext().font = 'italic 40px brothers-regular';
    getContext().fillStyle = 'black';
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    getContext().rotate(-6 * Math.PI / 180);
    writeScaled(value, { x: 90 +4, y: 140+4 });
    getContext().fillStyle = 'white';
    writeScaled(value, { x: 90, y: 140 });
    getContext().rotate(+6 * Math.PI / 180);
}

drawFooter = function (value) {
    getContext().font = '30px brothers-regular';
    getContext().fillStyle = 'white';
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    writeScaled(value, { x: 140, y: 1013 });
}

drawPositionName = function (value) {
    getContext().font = '50px brothers-regular';
    getContext().fillStyle = 'white';
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    writeScaled(value, { x: 480, y: 1010 });
}

drawKeywords = function (value) {
    drawCardText(value, 1013, 2, true)
}

drawCapacity = function (value, x, y){
    let angle = 90 * Math.PI / 180;
    getContext().translate( canvas.width / 3, canvas.height / 3 );
    getContext().font = 'bold 32px brothers-regular';
    getContext().fillStyle = 'white';
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    getContext().rotate(angle);
    writeScaled(value, { x, y});
    getContext().rotate(-angle);
    getContext().translate( -canvas.width / 3, -canvas.height / 3 );
  
}

drawSkilstraits = function (value, x=248, y=659){
    getContext().font = 'bold 28px brothers-regular';
    getContext().fillStyle = '#b4191e';
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    writeScaled(value, { x, y });
}

drawPlayerDev = function (value, x, y){
    getContext().font = 'bold 28px brothers-regular';
    getContext().fillStyle = '#b4191e';
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    writeScaled(value, { x: 248, y: 856 });
}
drawCardBodyTitle =function (value, y=659 ,x=248 ){
    getContext().font = 'bold 28px brothers-regular';
    getContext().fillStyle = '#b4191e';
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    writeScaled(value, { x, y });
}

drawGoldPrice = function (value, x, y){
    getContext().font = 'bold 40px brothers-regular';
    getContext().fillStyle = 'white';
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    getContext().shadowColor = "black";
    getContext().shadowBlur = 2
    getContext().shadowOffsetX = 2;
    getContext().shadowOffsetY = 2;
    writeScaled(value, { x: 142, y: 975 });
    getContext().shadowColor = "";
    getContext().shadowBlur = 0
    getContext().shadowOffsetX = 0;
    getContext().shadowOffsetY = 0;
}

drawDevelopment = function (primary, secondary) {

    getContext().font = 'bold 26px franklin-gothic-book';
    getContext().fillStyle = 'black';
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    x = 248;
    writeScaled(i18next.t('card.caracteristics.primary')+" : ", { x: x, y: 890 });
    writeScaled(i18next.t('card.caracteristics.secondary')+" : ", { x: x, y: 930 });
    getContext().font = '26px franklin-gothic-book';
    writeScaled(primary, { x: x+115, y: 890 });
    writeScaled(secondary, { x: x+145, y: 930 });
    
    
}

function setSelectedRunemark(radioDiv, runemark, radioGroupName, bgColor) {
    // uncheck all
    {
        var checked = $(radioDiv).find('input:checked');
        for (var i = 0; i < checked.length; i++) {
            checked[i].checked = false;
        }
        var icons = $(radioDiv).find('img');
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.backgroundColor = bgColor;
        }
    }

    if (runemark != null) {
        var queryString = "img[src='" + runemark + "']";
        var img = $(radioDiv).find(queryString);
        if (img.length > 0) {
            var radioButton = $(img[0].parentNode.parentNode).find("input")[0];
            radioButton.checked = true;
            // img[0].style.backgroundColor = "tomato";
            img[0].style.backgroundColor = "#00bc8c";
        }
        else {
            var newDiv =
                addToImageRadioSelector(
                    runemark,
                    radioDiv,
                    radioGroupName,
                    bgColor);
            // $(newDiv).find("img")[0].style.backgroundColor = "tomato";
            $(newDiv).find("img")[0].style.backgroundColor = "#00bc8c";
            $(newDiv).find("input")[0].checked = true;
        }
    }
}


function setModelImage(image) {
    //console.log("setModelImage:" + image);
    $("#fighterImageUrl")[0].value = image;

    //  if (image != null) {
    // TODO: Not sure how to do this. It might not even be possible! Leave it for now...
    //    imageSelect.value = image;
    // }
    // else {
    //    imageSelect.value = null;
    // }
}


function readControls() {
    var data = new Object;
    data.name = getName();
    data.imageUrl = getFighterImageUrl();
    data.imageProperties = getModelImageProperties();
    data.cardName = document.getElementById("cardName").value;
    data.teamName = document.getElementById("teamName").value;
    data.footer = document.getElementById("footer").value;
    data.cardText = document.getElementById("cardText").value;
    data.positionName = document.getElementById("positionName").value;
    data.ma = document.getElementById("ma").value;
    data.st = document.getElementById("st").value;
    data.ag = document.getElementById("ag").value;
    data.pa = document.getElementById("pa").value;
    data.av = document.getElementById("av").value;
    data.p_general = document.getElementById("p_general").checked;
    data.p_agility = document.getElementById("p_agility").checked;
    data.p_devious = document.getElementById("p_devious").checked;
    data.p_strength = document.getElementById("p_strength").checked;
    data.p_passing = document.getElementById("p_passing").checked;
    data.p_mutations = document.getElementById("p_mutations").checked;
    data.s_general = document.getElementById("s_general").checked;
    data.s_agility = document.getElementById("s_agility").checked;
    data.s_devious = document.getElementById("s_devious").checked;
    data.s_strength = document.getElementById("s_strength").checked;
    data.s_passing = document.getElementById("s_passing").checked;
    data.s_mutations = document.getElementById("s_mutations").checked;

    data.playerType = document.getElementById("playerType").value;
    data.playsFor = document.getElementById("playsFor").value;
    data.specialRules = document.getElementById("specialRules").value;
    data.keywords = document.getElementById("keywords").value;


    return data;
}

function drawCardFrame(cardData){
    //set texts for translation
    let skills_traits = i18next.t('card.caracteristics.skills_traits');
    let plays_for=i18next.t('card.caracteristics.plays_for');
    let special_rules=i18next.t('card.caracteristics.special_rules');
    let player_development =i18next.t('card.caracteristics.player_development');
    let agility = i18next.t('card.caracteristics.agility');
    let devious = i18next.t('card.caracteristics.devious');
    let general = i18next.t('card.caracteristics.general');
    let mutations = i18next.t('card.caracteristics.mutations');
    let passing = i18next.t('card.caracteristics.passing');
    let strength = i18next.t('card.caracteristics.strength');
    let MA = i18next.t('card.caracteristics.MA');
    let S = i18next.t('card.caracteristics.S');
    let AG = i18next.t('card.caracteristics.AG');
    let PA = i18next.t('card.caracteristics.PA');
    let AV = i18next.t('card.caracteristics.AV');
    let GP = i18next.t('card.caracteristics.GP');




    playerType = document.getElementById("playerType").value;
    if(playerType == "star"){
        getContext().drawImage(document.getElementById('star_frame'), 0, 0, getCanvas().width, getCanvas().height);
    } else {
        getContext().drawImage(document.getElementById('frame'), 0, 0, getCanvas().width, getCanvas().height);
    }

    if(!document.getElementById("removeBorder").checked){
        getContext().drawImage(document.getElementById('border'), 0, 0, getCanvas().width, getCanvas().height);
    }

    drawCardName(cardData.cardName);
    drawTeamName(cardData.teamName);
    drawFooter(cardData.footer);

    drawGoldPrice(GP);
    
    yStart = (playerType === "star") ? 550 : 700;

    drawCardText(cardData.cardText, yStart, 3);
    
    if(playerType == "star"){   
        
        drawCardBodyTitle(skills_traits.toUpperCase(), 513);     
        drawCardBodyTitle(plays_for.toUpperCase(), 615);   
        playsFor = document.getElementById("playsFor").value;
        drawCardText(playsFor, 650, 1);
        drawCardBodyTitle(special_rules.toUpperCase(), 719);   
        specialRules = document.getElementById("specialRules").value;
        drawCardText(specialRules, 770, 8);
    }
    else{
        // skills & traits
        drawCardBodyTitle(skills_traits.toUpperCase());

        drawCardBodyTitle(player_development.toUpperCase(), 856);
    }

    
    drawKeywords(cardData.keywords);
        

    if(document.getElementById("playerType").value != "star"){
        drawPositionName(cardData.positionName);

        primary = "";
        if(cardData.p_agility){
            primary = primary + agility;
        }
        if(primary!="" && cardData.p_devious){
            primary = primary + ", ";
        }
        if(cardData.p_devious){
            primary = primary + devious;
        }
        if(primary!="" && cardData.p_general){
            primary = primary + ", ";
        }
        if(cardData.p_general){
            primary = primary + general;
        }
        if(primary!="" && cardData.p_mutations){
            primary = primary + ", ";
        }
        if(cardData.p_mutations){
            primary = primary + mutations;
        }
        if(primary!="" && cardData.p_passing){
            primary = primary + ", ";
        }
        if(cardData.p_passing){
            primary = primary + passing;
        }
        if(primary!="" && cardData.p_strength){
            primary = primary + ", ";
        }
        if(cardData.p_strength){
            primary = primary + strength;
        }

        secondary = "";
        if(cardData.s_agility){
            secondary = secondary + agility;
        }
        if(secondary!="" && cardData.s_devious){
            secondary = secondary + ", ";
        }
        if(cardData.s_devious){
            secondary = secondary + devious;
        }
        if(secondary!="" && cardData.s_general){
            secondary = secondary + ", ";
        }
        if(cardData.s_general){
            secondary = secondary + general;
        }
        if(secondary!="" && cardData.s_mutations){
            secondary = secondary + ", ";
        }
        if(cardData.s_mutations){
            secondary = secondary + mutations;
        }
        if(secondary!="" && cardData.s_passing){
            secondary = secondary + ", ";
        }
        if(cardData.s_passing){
            secondary = secondary + passing;
        }
        if(secondary!="" && cardData.s_strength){
            secondary = secondary + ", ";
        }
        if(cardData.s_strength){
            secondary = secondary + strength;
        }
        drawDevelopment(primary, secondary);
    }
    
    if(playerType == "star"){  
        drawCapacity(MA, -108, 208);
        drawCapacity(S, 43, 208);
        drawCapacity(AG, 195, 208);
        drawCapacity(PA, 345, 208);
        drawCapacity(AV, 498, 208);
    }else {

        drawCapacity(MA, -108, 208);
        drawCapacity(S, 43, 210);
        drawCapacity(AG, 195, 208);
        drawCapacity(PA, 347, 208);
        drawCapacity(AV, 500, 208);
    }
    // MA
    drawNumber(cardData.ma, 130, 225, false);
    // ST
    drawNumber(cardData.st, 130, 375, false);
    // AG
    drawNumber(cardData.ag, 130, 530, true);
    // PA
    drawNumber(cardData.pa, 130, 680, true);
    //AV
    drawNumber(cardData.av, 130, 825, true);

}

render = function (cardData) {
    //console.log("Render:");
    //console.log(cardData);
    // First the textured background
    getContext().drawImage(document.getElementById('bg1'), 0, 0, getCanvas().width, getCanvas().height);

    if (cardData.imageUrl) {
        var image = new Image();
        image.onload = function () {
        var position = scalePixelPosition({ x: 100 + cardData.imageProperties.offsetX, y: cardData.imageProperties.offsetY });
        var scale = cardData.imageProperties.scalePercent / 100.0;
        var width = image.width * scale;
        var height = image.height * scale;
        getContext().drawImage(image, position.x, position.y, width, height);
        drawCardFrame(cardData);
        };
    image.src = cardData.imageUrl;
    }
    // next the frame elements

    drawCardFrame(cardData);

    
}

function drawNumber(num,x, y, plus){

    playerType = document.getElementById("playerType").value;
    suffix = "";
    if(playerType == 'star'){
        suffix = "sp"
    }

    if(num<1 || num>11 ) {
        num = '-';
        plus = false;
    }
    if(num>9){
        getContext().drawImage(document.getElementById('sf1'+suffix), x-15, y, 35, 70);
        x = x + 35-15;
        num = num -10;
    }
    elementId = 'sf'+num+suffix;

    if(num == 1) {
        width = 35;
        x = x+9;
    } else {
        width = 53;
    }

    getContext().drawImage(document.getElementById(elementId), x, y, width, 70);
    if (plus){
        getContext().drawImage(document.getElementById('sf+'+suffix), x+width, y, 39, 70);
    }
}

async function writeControls(cardData) {
    console.log(cardData.imageProperties)
    // here we check for base64 loaded image and convert it back to imageUrl
    if (cardData.base64Image != null) {

        // first convert to blob
        const dataToBlob = async (imageData) => {
            return await (await fetch(imageData)).blob();
        };
        const blob = await dataToBlob(cardData.base64Image);
        // then create URL object
        cardData.imageUrl = URL.createObjectURL(blob);
        // Now that's saved, clear out the base64 so we don't reassign
        cardData.base64Image = null;
    } else {
        cardData.imageUrl = null;
    }

    setName(cardData.name);
    setModelImage(cardData.imageUrl);
    setModelImageProperties(cardData.imageProperties);
    
    $("#cardName")[0].value = cardData.cardName;
    $("#teamName")[0].value = cardData.teamName;
    $("#footer")[0].value = cardData.footer;
    $("#positionName")[0].value = cardData.positionName;
    $("#ma")[0].value = cardData.ma;
    $("#st")[0].value = cardData.st;
    $("#ag")[0].value = cardData.ag;
    $("#pa")[0].value = cardData.pa;
    $("#av")[0].value = cardData.av;
    $("#cardText")[0].value = cardData.cardText;

    document.getElementById('p_agility').checked = cardData.p_agility;
    document.getElementById('p_devious').checked = cardData.p_devious;
    document.getElementById('p_general').checked = cardData.p_general;
    document.getElementById('p_mutations').checked = cardData.p_mutations;
    document.getElementById('p_passing').checked = cardData.p_passing;
    document.getElementById('p_strength').checked = cardData.p_strength;

    document.getElementById('s_agility').checked = cardData.s_agility;
    document.getElementById('s_devious').checked = cardData.s_devious;
    document.getElementById('s_general').checked = cardData.s_general;
    document.getElementById('s_mutations').checked = cardData.s_mutations;
    document.getElementById('s_passing').checked = cardData.s_passing;
    document.getElementById('s_strength').checked = cardData.s_strength;

    document.getElementById("playerType").value = cardData.playerType;
    document.getElementById("playsFor").value = cardData.playsFor;
    document.getElementById("specialRules").value = cardData.specialRules;
    document.getElementById("keywords").value = cardData.keywords;


    // render the updated info
    render(cardData);
}

async function onSaveClicked() {
    data = readControls();
    // temp null while I work out image saving
    //console.log(data);
    data.base64Image = await handleImageUrlFromDisk(data.imageUrl)

    // need to be explicit due to sub arrays
    var exportObj = JSON.stringify(data, null, 4);

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "bloodbowl_card_" + data.cardName.replace(/ /g, "_") + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function saveCardAsImage() {
    var element = document.createElement('a');
    data = readControls();
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    element.setAttribute('download', "bloodbowl_card_" + data.cardName + ".png");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

$(document).ready(function () {
    var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    // ctx.stroke();
});


async function fileChange(file) {
    // Function to be triggered when file input changes
    // As readJSONFile is a promise, it must resolve before the contents can be read
    // in this case logged to the console

    var saveJson = function (json) {
        writeControls(json);
    };

    readJSONFile(file).then(json =>
        saveJson(json)
    );

}

onFighterImageUpload = function () {
    image = getModelImage();
    setModelImage(image);
    var cardData = readControls();
    render(cardData);
    saveLatestcardData();
}

function getFighterImageUrl() {
    var imageSelect = $("#fighterImageUrl")[0].value;
    // if (imageSelect.files.length > 0) {
    //return URL.createObjectURL(imageSelect.files[0]);
    // }
    return imageSelect;
}