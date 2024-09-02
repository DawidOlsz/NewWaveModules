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

    if ( technology === 'both' ){
        //$(bannerBody).insertAfter('.plp-categoryWrap:nth-child(' + positionNo + ')');
        $(bannerBody).insertAfter('.plp-categoryWrap[rowsorder="' + positionNo + '"]');
    } else if (technology === 'original'){
        if( window.location.href.includes('original') ){
            //$(bannerBody).insertAfter('.plp-categoryWrap:nth-child(' + positionNo + ')');
            $(bannerBody).insertAfter('.plp-categoryWrap[rowsorder="' + positionNo + '"]');
        }
    } else if (technology === 'vertuo'){
        if( window.location.href.includes('vertuo') ){
            //$(bannerBody).insertAfter('.plp-categoryWrap:nth-child(' + positionNo + ')');
            $(bannerBody).insertAfter('.plp-categoryWrap[rowsorder="' + positionNo + '"]');
        }
    } else {
        console.log('wrong technology in function attributes');
    }
    

}

//Function to copying promotion coses and pushing info about it to GA4
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

//Machines comparator module
function machinesCompartor (compSku){
    //add comprae button if it not existing
    //comparator Exclude skus
    var compExclude = [
        '3694-EU-WH', 
        '3694-EU-BK',
        '3694-EU-RE',
        '4194-EU2-SI-NE',
        '4292-EU'
    ];
    if ( $('.compare').length <= 0 ){
        $('.capsBox').each(function(){
            if ( compExclude.indexOf($(this).attr('data-product-sku')) < 0 ){
                $('<div class="compare" onclick="machinesCompartor(\'' + $(this).attr('data-product-sku') + '\')">Porównaj</div>').appendTo($(this));
            }
        })
    }
//add list to comprare 
    var currentItem = compSku;

    if ( localStorage.machCompareOne.length <= 0 ){
        localStorage.setItem('machCompareOne', currentItem);
    } else if ( localStorage.machCompareTwo.length <= 0 ){
        localStorage.setItem('machCompareTwo', currentItem);
    } else if ( localStorage.machCompareThree.length <= 0 ){
        localStorage.setItem('machCompareThree', currentItem);
    } else {
        localStorage.setItem('machCompareOne', localStorage.machCompareTwo);
        localStorage.setItem('machCompareTwo', localStorage.machCompareThree);
        localStorage.setItem('machCompareThree', currentItem);
    }

//display comparator
    if ( localStorage.machCompareOne.length >= 0 && $('.compWrap').length <= 0 ){
        var comparatorBody = `
        <div class="compWrap">
        <div class="compInnerHead">Porównaj Ekspresy nespresso:</div>
        <div class="compInner">
        <div class="compItem">
        <div class="compList">
        <div class="compMachBodyImg"></div>
        <div class="ListName" AttrName="name">Model</div>
        <div class="ListName" AttrName="sku">SKU</div>
        </div>
        </div>
        </div>
        </div>
        `;
        $(comparatorBody).appendTo('.productsListPLP');
    }
//render machines       
    var toCompare = [
        localStorage.machCompareOne,
        localStorage.machCompareTwo,
        localStorage.machCompareThree
    ]
    $('.compMachBody').remove();
    $(toCompare).each(function(i){
            var actualMach = toCompare[i].toString();
            console.log('actualMach[' + ( i + 1 ) + ']: ' + actualMach);
            $(window.CapsPLPresult).each(function(j){
                if ( window.CapsPLPresult[j].sku === actualMach && actualMach != undefined ){
                    var compareMachBody = `
                    <div class="compMachBody">
                    <div class="compMachBodyImg"><img src="${CapsPLPresult[j].image}"/></div>
                    <div class="compMachBodyName">${CapsPLPresult[j].name}</div>
                    <div class="compMachBodySku">${CapsPLPresult[j].sku}</div>
                    <div class="compMachBodyFeaturesList" id="${CapsPLPresult[j].sku}"></div>
                    <div class="compMachBodyPrice">${CapsPLPresult[j].price}</div>
                    <div class="compMachBodyAddToBag"></div>
                    </div>
                    `;
                    $(compareMachBody).appendTo('.compItem');
                    //features list
                    $(CapsPLPresult[j].features).each(function(g){
                        $('<div class="ListName" AttrName="' + CapsPLPresult[j].features[g].name + '">' + CapsPLPresult[j].features[g].name + '</div>').appendTo('.compList');
                        $('.ListName[AttrName="' + CapsPLPresult[j].features[g].name + '"]:not(:first)').remove();
                        var compareMAchBodyFeaturesList = '';
                        compareMAchBodyFeaturesList += '<div class="ListRow" AttrName="' + CapsPLPresult[j].features[g].name + '">';
                        if ( CapsPLPresult[j].features[g].description === 'undefined ' ){
                            compareMAchBodyFeaturesList += 'X';
                        } else {
                            compareMAchBodyFeaturesList += '' + CapsPLPresult[j].features[g].description + '';
                        }
                        if ( CapsPLPresult[j].features[g].unitOfMeasure === 'undefined ' ){
                            compareMAchBodyFeaturesList += '';
                        } else {
                            compareMAchBodyFeaturesList += ' ' + CapsPLPresult[j].features[g].unitOfMeasure + '';
                        }

                        compareMAchBodyFeaturesList += '</div>';
                        $(compareMAchBodyFeaturesList).appendTo('.compMachBodyFeaturesList[id="' + CapsPLPresult[j].sku + '"]')
                    })
                }
            })
    })
}