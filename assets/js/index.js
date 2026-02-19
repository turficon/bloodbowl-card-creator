window.onload = function () {
    //window.localStorage.clear();
    var cardData = loadCardData(dataRef);
    writeControls(cardData);
    refreshSaveSlots();
}

onAnyChange = function () {
    var cardData = readControls();
    render(cardData);
    saveLatestCardData(dataRef);
}

/*
* data card storage
*/

saveCardDataMap = function(dataRef, newMap) {
    window.localStorage.setItem(dataRef, JSON.stringify(newMap));
}

loadCardDataMap = function(dataRef) {
    var storage = window.localStorage.getItem(dataRef);
    if (storage != null) {
        console.log('load '+dataRef+' data from storage');
        return JSON.parse(storage);
    }
    // Set up the map.
    var map = new Object;
    map = defaultCardData();
    saveCardDataMap(dataRef, map);
    return map;
}
/*
loadLatestCardData = function(dataRef) {
    var latestCardName = window.localStorage.getItem(dataRef);
    if (latestCardName == null) {
        latestCardName = dataRef;
    }
    data = loadCardData(latestCardName);
    if (data) {
        console.log("Loaded data:");
    }
    else {
        console.log("Failed to load data, loading defaults.");
        data = defaultCardData();
    }

    return data;
}
*/
saveLatestCardData = function(dataRef) {
    var cardData = readControls();
    if (!cardData.name) {
        return;
    }
    window.localStorage.setItem(dataRef, cardData.name);
}

loadCardData = function(dataRef) {
    console.log("Loading '" + dataRef + "'...");

    if (!dataRef) {
        return null;
    }

    var data = loadCardDataMap(dataRef);
    if (data) {
        return data;
    }

    return null;
}


onResetToDefault = function() {
    var cardData = defaultCardData();
    writeControls(cardData);
}

refreshSaveSlots = function() {
    // Remove all
    $('select').not("#languageSwitcher").children('option').remove();

    //var cardDataName = readControls().name;

    var map = loadCardDataMap(dataRef);

    for (let [key, value] of Object.entries(map)) {
        var selected = false;
        if (dataRef &&
            key == dataRef) {
            selected = true;
        }
        var newOption = new Option(key, key, selected, selected);
        $('#saveSlotsSelect').append(newOption);
    }
}


getCardDataName = function() {
    return dataRef;
}


validateInput = function(input) {
    // Only allow letters, spaces, and hyphens
    var regex = /^[a-zA-Z\s:-]+$/;
    return regex.test(input);
}

onClearCache = function() {
    window.localStorage.clear();
    location.reload();
    return false;
}

getCanvas = function () {
    return document.getElementById("canvas");
}

getContext = function () {
    return getCanvas().getContext("2d");
}

getLabel = function(element) {
    return $(element).prop("labels")[0];
}

getImage = function(element) {
    return $(element).find("img")[0];
}

getBackgroundImage = function () {
    return document.getElementById('bg1');
}

getSelectedRunemark = function(radioDiv) {
    var checked = $(radioDiv).find('input:checked');
    if (checked.length > 0) {
        return getImage(getLabel(checked[0])).getAttribute("src");
    }
    return null;
}

getName = function() {
    //var textInput = $("#saveNameInput")[0];
    return "BloodBowl_Card";
}

setName = function (name) {
    //var textInput = $("#saveNameInput")[0];
    //textInput.value = name;
}

/*
* image Manipulation
*/


onload2promise = function(obj) {
    return new Promise((resolve, reject) => {
        obj.onload = () => resolve(obj);
        obj.onerror = reject;
    });
}

scalePixelPosition = function (pixelPosition) {
    var scalingFactor = getScalingFactor(getCanvas(), getBackgroundImage());
    var scaledPosition = { x: pixelPosition.x * scalingFactor.x, y: pixelPosition.y * scalingFactor.y };
    return scaledPosition;
}

getScalingFactor = function (canvas, image) {
    return {
        x: canvas.width / image.width,
        y: canvas.height / image.height
    };
}


getModelImage = function() {
    var imageSelect = $("#imageSelect")[0];

    if (imageSelect.files.length > 0) {
        return URL.createObjectURL(imageSelect.files[0]);
    }

    return null;
}

setModelImageProperties = function(modelImageProperties) {
    $("#imageOffsetX")[0].value = modelImageProperties.offsetX;
    $("#imageOffsetY")[0].value = modelImageProperties.offsetY;
    $("#imageScalePercent")[0].value = modelImageProperties.scalePercent;
}

getDefaultModelImageProperties = function() {
    return {
        offsetX: 0,
        offsetY: 0,
        scalePercent: 100
    };
}

getModelImageProperties = function() {
    return {
        offsetX: $("#imageOffsetX")[0].valueAsNumber,
        offsetY: $("#imageOffsetY")[0].valueAsNumber,
        scalePercent: $("#imageScalePercent")[0].valueAsNumber
    };
}

drawImage = function(scaledPosition, scaledSize, image) {
    if (image != null) {
        if (image.complete) {
            getContext().drawImage(image, scaledPosition.x, scaledPosition.y, scaledSize.x, scaledSize.y);
        }
        else {
            image.onload = function () { drawImage(scaledPosition, scaledSize, image); };
        }
    }
}

drawImageSrc = function(scaledPosition, scaledSize, imageSrc) {
    if (imageSrc != null) {
        var image = new Image();
        image.onload = function () { drawImage(scaledPosition, scaledSize, image); };
        image.src = imageSrc;
    }
}

drawModel = function(imageUrl, imageProps) {
    if (imageUrl != null) {
        var image = new Image();
        image.onload = function () {
            var position = scalePixelPosition({ x: 590 + imageProps.offsetX, y: imageProps.offsetY });
            var scale = imageProps.scalePercent / 100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);

            URL.revokeObjectURL(image.src);
        };
        image.src = imageUrl;
    }
}

getBase64Image = function(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL;
}


getBase64ImgFromUrl = async function (imgUrl) {
    let img = new Image();
    let imgpromise = onload2promise(img); // see comment of T S why you should do it this way.
    img.src = imgUrl;
    await imgpromise;
    var imgData = getBase64Image(img);
    return imgData;
}

handleImageUrlFromDisk =async function (imageUrl) {
    if (imageUrl &&
        imageUrl.startsWith("blob:")) {
        // The image was loaded from disk. So we can load it later, we need to stringify it.
        imageUrl = await getBase64ImgFromUrl(imageUrl);
    }

    return imageUrl;
}

addToImageCheckboxSelector = function(imgSrc, grid, bgColor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'mr-0');
    div.innerHTML = `
    <label for="checkbox-${imgSrc}">
        <img src="${imgSrc}" width="50" height="50" alt="" style="background-color:${bgColor};">
    </label>
    <input type="checkbox" style="display:none;" id="checkbox-${imgSrc}" onchange="onTagRunemarkSelectionChanged(this, '${bgColor}')">
    `;
    grid.appendChild(div);
    return div;
}


/*
* Word manipulation
*/

writeValue = function (ctx, value, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = { x: pos.x / scale.x, y: pos.y / scale.y };

    ctx.save();
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, pos.x, pos.y);
    ctx.restore();
};

writeScaled = function (value, pixelPos) {
    var scaledPos = scalePixelPosition(pixelPos);
    writeValue(getContext(), value, scaledPos);
}

drawCardElementFromInput = function (inputElement, pixelPosition) {
    var value = inputElement.value;
    writeScaled(value, pixelPosition);
}

drawCardElementFromInputId = function (inputId, pixelPosition) {
    drawCardElementFromInput(document.getElementById(inputId), pixelPosition);
}


printAtWordWrap = function(context, text, x, y, lineHeight, fitWidth) {

    var lines = text.split('\n');
    lineNum = 0;
    for (var i = 0; i < lines.length; i++) {
        fitWidth = fitWidth || 0;
        if (fitWidth <= 0) {
            context.fillText(lines[i], x, y + (lineNum * lineHeight));
            lineNum++;
        }
        var words = lines[i].split(' ');
        var idx = 1;
        while (words.length > 0 && idx <= words.length) {
            var str = words.slice(0, idx).join(' ');
            var w = context.measureText(str).width;
            if (w > fitWidth) {
                if (idx == 1) {
                    idx = 2;
                }
                context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineNum * lineHeight));
                lineNum++;
                words = words.splice(idx - 1);
                idx = 1;
            }
            else {
                idx++;
            }
        }
        if (idx > 0) {
            context.fillText(words.join(' '), x, y + (lineNum * lineHeight));
            lineNum++;
        }

    }

}

splitWordWrap = function(context, text, fitWidth) {
    // this was modified from the print version to only return the text array
    return_array = [];
    var lines = text.split('\n');
    lineNum = 0;
    for (var i = 0; i < lines.length; i++) {
        fitWidth = fitWidth || 0;
        if (fitWidth <= 0) {
            return_array.push(lines[i]);
            lineNum++;
        }
        var words = lines[i].split(' ');
        var idx = 1;
        while (words.length > 0 && idx <= words.length) {
            var str = words.slice(0, idx).join(' ');
            var w = context.measureText(str).width;
            if (w > fitWidth) {
                if (idx == 1) {
                    idx = 2;
                }
                return_array.push(words.slice(0, idx - 1).join(' '));
                lineNum++;
                words = words.splice(idx - 1);
                idx = 1;
            }
            else {
                idx++;
            }
        }
        if (idx > 0) {
            return_array.push(words.join(' '));
            lineNum++;
        }

    }
    return return_array;
}

readJSONFile = async function (file) {
    // Function will return a new Promise which will resolve or reject based on whether the JSON file is read and parsed successfully
    return new Promise((resolve, reject) => {
        // Define a FileReader Object to read the file
        let fileReader = new FileReader();
        // Specify what the FileReader should do on the successful read of a file
        fileReader.onload = event => {
            // If successfully read, resolve the Promise with JSON parsed contents of the file
            resolve(JSON.parse(event.target.result))
        };
        // If the file is not successfully read, reject with the error
        fileReader.onerror = error => reject(error);
        // Read from the file, which will kick-off the onload or onerror events defined above based on the outcome
        fileReader.readAsText(file);
    });
}

