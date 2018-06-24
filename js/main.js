'use strict'



function onInit() {
    renderGallery();
}


function renderGallery() {
    var strHTML = ''
    var images = getImagsForDisplay();
    images.map(function (img) {
        strHTML +=
            `<div class="cell btn" onclick="onInitCanvas(${img.id})" style="background-image: url('${img.url}')"></div>`
    });

    document.querySelector('.gallery').innerHTML += strHTML;
}



function onInitCanvas(id) {

    createCanvas();
    createGmeme(id);
    gCurrLine = gMeme.txts[0];
    drawImage();
    hideGallery();
}


function hideGallery() {

    var elGallery = document.querySelector('.gallery').classList.add('hide');
    var elCanvasContainer = document.querySelector('.canvas-container').classList.remove('hide');
    var elReturnBtn = document.querySelector('.btn-return').classList.remove('hide');

}


function createCanvas() {

    gElCanvas = document.querySelector('.canvas');
    gElCanvas.width = 350
    gElCanvas.height = 350
    gCtx = gElCanvas.getContext('2d')
}



function drawImage() {

    var img = new Image()
    img.onload = function () {

        var ratio = getImgRatio(img);
        gElCanvas.height = img.height * ratio;
        gCtx.drawImage(img, 0, 0, img.width * ratio, img.height * ratio)
        drawText();

    }

    img.src = `meme-imgs/${gMeme.selectedImgId}.jpg`;
}


function drawText() {

    gMeme.txts.forEach(function (txt) {
        gCtx.font = `${txt.size}px ${txt.font}`;
        gCtx.fillStyle = txt.color;
        gCtx.strokeStyle = 'black';
        gCtx.strokeText(txt.line, txt.location.x, txt.location.y);
        gCtx.fillText(txt.line, txt.location.x, txt.location.y);
        if (gCurrLine.line === txt.line) {
            markLine();
        }

    });

}



function returnToGallery() {

    var elGallery = document.querySelector('.gallery').classList.remove('hide');
    var elReturnBtn = document.querySelector('.btn-return').classList.add('hide');
    var elCanvasContainer = document.querySelector('.canvas-container').classList.add('hide')

}


function changeIcon(eIcon) {
    eIcon.classList.toggle("change");

}

function toggleMenu() {

    var mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('open')
}



function downloadMeme(elLink) {
    var img = new Image()
    img.onload = function () {

        var ratio = getImgRatio(img);
        gCtx.drawImage(img, 0, 0, img.width * ratio, img.height * ratio)
        drawText();
        elLink.href = gElCanvas.toDataURL()
        elLink.download = `${gMeme.selectedImgId}.jpg`;
    }

    img.src = `meme-imgs/${gMeme.selectedImgId}.jpg`;
}



function clearTextBox() {
    document.querySelector('.text').value = '';
}