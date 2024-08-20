function PLPBanner(
    titlePLol, 
    titleENol, 
    titlePLvl, 
    titleENvl, 
    descryptionPLol, 
    descryptionENol, 
    descryptionPLvl, 
    descryptionENvl, 
    promoCodeOL, 
    promoCodeVL, 
    imgSourceOL, 
    imgSourceVL, 
    technology, 
    sellID, 
    positionNo){
    if (window.location.href.includes('pl/en')) {
        if (window.location.href.includes('vertuo')) {
            var pCode = promoCodeVL;
            var pTitle = titleENvl;
            var pDesc = descryptionENvl;
            var pImage = imgSourceVL;
        } else {
            var pCode = promoCodeOL;
            var pTitle = titleENol;
            var pDesc = descryptionENol;
            var pImage = imgSourceOL;
        }
    } else {
        if (window.location.href.includes('vertuo')) {
            var pCode = promoCodeVL;
            var pTitle = titlePLvl;
            var pDesc = descryptionPLvl;
            var pImage = imgSourceVL;
        } else {
            var pCode = promoCodeOL;
            var pTitle = titlePLol;
            var pDesc = descryptionPLol;
            var pImage = imgSourceOL;
        }
    }

                var bannerBody = `<div class="darcheWrap">
                            <div class="darcheWrapInner">
                            <div class="darcheImg">
                            <img class="darcheImgimg" loading="lazy" alt="plp-banner-promo-image" src="${pImage}">
                            </div>
                            <div class="darcheTxt">
                            <div class="darcheTxtTitle">${pTitle}</div>
                            <div class="darcheTxtDescryption">${pDesc}</div><div class="darcheCodes"><div class="darcheCodesCode"><div class="activation-code-sub-container" onclick="copyFunction('${pCode}')"><div class="clip-board-container"><div class="activation-code" id="${pCode}">${pCode}</div><div class="copy-to-clipboard-container"><img width="25" heigh="25" alt="copy-to-clipboard" src="/ecom/medias/sys_master/public/28392225996830/copy.png"></div></div></div></div></div>
                            </div>
                        </div>`;

        //$(bannerBody).insertAfter('.plp-categoryWrap:nth-child(' + positionNo + ')');
        $(bannerBody).insertAfter('.plp-category:nth-child(' + positionNo + ')');


    function copyFunction(promoCodeType) {
        var range = document.createRange();
        range.selectNodeContents(document.getElementById(promoCodeType));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        // GA4
        window.gtmDataObject = window.gtmDataObject || [];
        gtmDataObject.push({
            event: 'local_event', //as is, do not change!!
            event_raised_by: 'Local Market', //as is, do not change!!
            local_event_category: 'local_promotion_tracking', //free to fill field, please use lower case
            local_event_action: 'capsule_listing_page', //free to fill field, please use lower case
            local_event_label: promoCodeType //free to fill field, please use lower case
        });
    }
}