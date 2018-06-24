'use strict'

var gElCanvas;
var gCtx;
var gMeme;
var gCurrLine;

var gImgs = [{ id: 1, url: 'meme-imgs/1.jpg', keywords: ['happy'] },
{ id: 2, url: 'meme-imgs/2.jpg', keywords: ['happy'] },
{ id: 3, url: 'meme-imgs/3.jpg', keywords: ['happy'] },
{ id: 4, url: 'meme-imgs/4.jpg', keywords: ['happy'] },
{ id: 5, url: 'meme-imgs/5.jpg', keywords: ['happy'] },
{ id: 6, url: 'meme-imgs/6.jpg', keywords: ['happy'] },
{ id: 7, url: 'meme-imgs/7.jpg', keywords: ['happy'] },
{ id: 8, url: 'meme-imgs/8.jpg', keywords: ['happy'] },
{ id: 9, url: 'meme-imgs/9.jpg', keywords: ['happy'] },
{ id: 10, url: 'meme-imgs/10.jpg', keywords: ['happy'] },
{ id: 11, url: 'meme-imgs/11.jpg', keywords: ['happy'] },
{ id: 12, url: 'meme-imgs/12.jpg', keywords: ['happy'] },
{ id: 13, url: 'meme-imgs/13.jpg', keywords: ['happy'] },
{ id: 14, url: 'meme-imgs/14.jpg', keywords: ['happy'] },
{ id: 15, url: 'meme-imgs/15.jpg', keywords: ['happy'] },
{ id: 16, url: 'meme-imgs/16.jpg', keywords: ['happy'] },
{ id: 17, url: 'meme-imgs/17.jpg', keywords: ['happy'] },
{ id: 18, url: 'meme-imgs/18.jpg', keywords: ['happy'] },
{ id: 19, url: 'meme-imgs/19.jpg', keywords: ['happy'] },
{ id: 20, url: 'meme-imgs/20.jpg', keywords: ['happy'] },
{ id: 21, url: 'meme-imgs/21.jpg', keywords: ['happy'] },
{ id: 22, url: 'meme-imgs/22.jpg', keywords: ['happy'] },
{ id: 23, url: 'meme-imgs/23.jpg', keywords: ['happy'] },
{ id: 24, url: 'meme-imgs/24.jpg', keywords: ['happy'] },
{ id: 25, url: 'meme-imgs/25.jpg', keywords: ['happy'] },
]



function getImagsForDisplay() {
    return gImgs;
}


function createGmeme(id) {

    gMeme = {
        selectedImgId: id,
        txts: [{
            line: '',
            size: 50,
            font: 'Impact',
            align: 'left',
            color: 'white',
            location: { x: gElCanvas.width / 5, y: gElCanvas.height / 4 }
        }]
    }

}

function drawMeme(isDownload) {

    drawImage();

}


function getImgRatio(img) {

    var hRatio = gElCanvas.width / img.width;
    var vRatio = gElCanvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);

    return ratio;
}


function changeFont(font) {
    gCurrLine.font = font;
    drawMeme();
}


function DeleteLine() {
    clearStroke();
    var index = getCurrLineIdx();
    gCurrLine = gMeme.txts[index - 1];
    gMeme.txts.splice(index, 1);
    switchLine();
    drawMeme();

}


function getCurrLineIdx() {

    var index = gMeme.txts.findIndex(text => text.line == gCurrLine.line);
    return index;

}


function getNewLineXcurr() {
    if (gMeme.txts.length >= 1) {
        var lastLineX = gMeme.txts[gMeme.txts.length - 1].location.x
        return lastLineX;

    } else {
        lastLineX = gElCanvas.width / 5;
        return lastLineX;
    }
}


function getNewLineYcurr() {
    if (gMeme.txts.length >= 1) {
        var lastLineY = gMeme.txts[gMeme.txts.length - 1].location.y
        lastLineY = lastLineY + 50;
        return lastLineY
    } else {
        lastLineY = gElCanvas.height / 4;
        return lastLineY;
    }
}


function addLine() {

    clearTextBox();
    var newLine = {
        line: '',
        size: 50,
        font: 'Impact',
        align: 'left',
        color: 'white',
        location: {
            x: getNewLineXcurr(),
            y: getNewLineYcurr()
        }

    }
    gCurrLine = newLine;
    gMeme.txts.push(newLine);


}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


function switchLine() {

    var index = getCurrLineIdx();

    if (index === -1) { return };
    if (index === gMeme.txts.length - 1) {
        gCurrLine = gMeme.txts[0];
        clearStroke();
        markLine();
        drawMeme();

    } else {
        gCurrLine = gMeme.txts[index + 1];
        clearStroke();
        drawMeme();

    }

}


function markLine() {

    gCtx.strokeStyle = 'red';
    gCtx.strokeText(gCurrLine.line, gCurrLine.location.x, gCurrLine.location.y);

}

function clearStroke() {
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(gCurrLine.line, gCurrLine.location.x, gCurrLine.location.y);
}



function moveLine(size) {
    if (size === 20 || size === -20) {
        gCurrLine.location.y = gCurrLine.location.y + size;
        drawMeme();
    } else {
        gCurrLine.location.x = gCurrLine.location.x + size;
        drawMeme();
    }
}

function changeText(input) {

    gMeme.txts.forEach(txt => {
        if (txt.line === gCurrLine.line) {
            gCurrLine.line = input;
            drawMeme();
        }
    });

}



function resizeTxt(size) {

    gCurrLine.size = gCurrLine.size + size;
    clearCanvas();
    clearStroke();
    drawMeme();

}

function changeTxtColor(color) {

    gCurrLine.color = color;
    drawMeme();
}
