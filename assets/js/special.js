const dataRef = "specialCard";

function defaultCardData() {
    var cardData = new Object;
    cardData.name = "BloodBowl_Special_Card";
    cardData.cardName = "Card Name";
    cardData.cardText = "Body Text";
    cardData.effect = false;
    cardData.effectText = "";
    cardData.duration = false;
    cardData.durationText = "";
    cardData.timing = false;
    cardData.timingText = "";
    cardData.footer = "Footer";
    cardData.imageUrl = null;
    cardData.imageProperties = getDefaultModelImageProperties();
    cardData.fontSizeSelector = 32; // Set the default font size to 32
    
    return cardData;
}

$(document).ready(function () {
    var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    // ctx.stroke();
});

function drawCardText() {
    yStart = 250;
    let context = getContext();
    context.textAlign = "center";
    context.textBaseline = "top";
    var data = readControls();

    let xStart = getCanvas().width/2;
    let defaultFontSize = data.fontSizeSelector;
    let lineHeight = defaultFontSize * 1.2;
    let gapAfterTitle = 60;

    var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    // Create a new image object
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();

    maxLength = 700;

    // Split input value into lines
    context.font = `italic ${defaultFontSize}px franklin-gothic-book`;
    context.fillStyle = 'black';
    lines = splitWordWrap(context, data.cardText, maxLength);

    for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], xStart, yStart);
        yStart += lineHeight;
    }

    // Timing
    if(data.timing){
        // Set the image source to the server path of the image
        img3.src = 'assets/img/special/timing.png';
        timing_y = yStart;
        // When the image is loaded, draw it on the canvas
        img3.onload = function() {
            // Draw the image on the canvas at position (x, y)
            ctx.drawImage(img3, getCanvas().width/2 - 169/2, timing_y);
        };
        yStart += gapAfterTitle;
    }

    // Split input value into lines
    context.font = `normal ${defaultFontSize}px franklin-gothic-book`;
    context.fillStyle = 'black';
    lines = splitWordWrap(context, data.timingText, maxLength);

    for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], xStart, yStart);
        yStart += lineHeight;
    }


    // Duration
    if(data.duration){
        // Set the image source to the server path of the image
        img2.src = 'assets/img/special/duration.png';
        duration_y = yStart;
        // When the image is loaded, draw it on the canvas
        img2.onload = function() {
            // Draw the image on the canvas at position (x, y)
            ctx.drawImage(img2, getCanvas().width/2 - 224/2, duration_y);
        };
        yStart += gapAfterTitle;
    }

    // Split input value into lines
    context.font = `normal ${defaultFontSize}px franklin-gothic-book`;
    context.fillStyle = 'black';
    lines = splitWordWrap(context, data.durationText, maxLength);

    for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], xStart, yStart);
        yStart += lineHeight;
    }

    // Effect
    if(data.effect){
        // Set the image source to the server path of the image
        img1.src = 'assets/img/special/effect.png';
        effect_y = yStart;
        // When the image is loaded, draw it on the canvas
        img1.onload = function() {
            // Draw the image on the canvas at position (x, y)
            ctx.drawImage(img1, getCanvas().width/2 - 156/2, effect_y);
        };
        yStart += gapAfterTitle;
    }

    // Split input value into lines
    context.font = `normal ${defaultFontSize}px franklin-gothic-book`;
    context.fillStyle = 'black';
    lines = splitWordWrap(context, data.effectText, maxLength);

    for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], xStart, yStart);
        yStart += lineHeight;
    }
    
}

getBackgroundImage = function () {
    return document.getElementById('bg1');
}

drawBackground = function () {
    getContext().drawImage(
        getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
}

drawCardName = function (value) {
    getContext().fillStyle = 'black';
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    getContext().rotate(-6 * Math.PI / 180);

    // Set the initial font size
    var fontSize = 70;

    // Check if the value is 18 characters or more
    if (value.length >= 18) {
        // Calculate the maximum width based on the desired length
        var maxWidth = 650;

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
    writeScaled(value, { x: getCanvas().width/2 + 4 - 20, y: 180 + 4 });
    
    // Set the font size and draw the text in white
    getContext().fillStyle = 'white';
    writeScaled(value, { x: getCanvas().width/2 - 20, y: 180 });

    getContext().rotate(6 * Math.PI / 180);
}


drawTeamName = function (value) {
    getContext().font = 'italic 40px brothers-regular';
    getContext().fillStyle = 'black';
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    getContext().rotate(-6 * Math.PI / 180);
    writeScaled(value, { x: 60 +4, y: 125+4 });
    getContext().fillStyle = 'white';
    writeScaled(value, { x: 60, y: 125 });
    getContext().rotate(+6 * Math.PI / 180);
}

drawFooter = function (value) {
    getContext().font = '40px brothers-regular';
    getContext().fillStyle = 'white';
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    writeScaled(value, { x: getCanvas().width/2, y: 1000 });
}


function setModelImage(image) {
    console.log("setModelImage:" + image);
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
    data.footer = document.getElementById("footer").value;
    data.cardText = document.getElementById("cardText").value;
    data.effect = document.getElementById("effectCheckbox").checked;
    data.effectText = document.getElementById("effectText").value;
    data.duration = document.getElementById("durationCheckbox").checked;
    data.durationText = document.getElementById("durationText").value;
    data.timing = document.getElementById("timingCheckbox").checked;
    data.timingText = document.getElementById("timingText").value;
    data.fontSizeSelector = document.getElementById("fontSizeSelector").value;

    return data;
}



function drawCardFrame(cardData){

    drawCardName(cardData.cardName);
    drawFooter(cardData.footer);

    drawCardText();

    if(!document.getElementById("removeBorder").checked){
        getContext().drawImage(document.getElementById('border'), 0, 0, getCanvas().width, getCanvas().height);
    }

}

render = function (cardData) {
    console.log("Render:");
    console.log(cardData);
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

async function writeControls(cardData) {
    if (cardData.base64Image != null) {
        const dataToBlob = async (imageData) => {
            return await (await fetch(imageData)).blob();
        };
        const blob = await dataToBlob(cardData.base64Image);
        cardData.imageUrl = URL.createObjectURL(blob);
        cardData.base64Image = null;
    } else {
        cardData.imageUrl = null;
    }

    setName(cardData.name);
    setModelImage(cardData.imageUrl);
    setModelImageProperties(cardData.imageProperties);

    $("#cardName")[0].value = cardData.cardName;
    $("#footer")[0].value = cardData.footer;
    $("#cardText")[0].value = cardData.cardText;
    $("#effectCheckbox")[0].checked = cardData.effect;
    $("#effectText")[0].value = cardData.effectText;
    $("#durationCheckbox")[0].checked = cardData.duration;
    $("#durationText")[0].value = cardData.durationText;
    $("#timingCheckbox")[0].checked = cardData.timing;
    $("#timingText")[0].value = cardData.timingText;
    $("#fontSizeSelector")[0].value = cardData.fontSizeSelector; // Set the fontSizeSelector value

    render(cardData);
}


async function onSaveClicked() {
    data = readControls();
    // temp null while I work out image saving
    console.log(data);
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
