let sheet = (function() {
    let style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    return style.sheet;
   })();

   function editToolBar(){
    removeGrowRules();

    /* Remover Elementos */

    function removeElement(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
          element.parentNode.removeChild(element);
        }
      }
      
      function checkScreenWidth() {
        if (window.innerWidth <= 920) {
          removeElement('print');
        }

        if (window.innerWidth <= 420) {
          removeElement('scrollPage');
          removeElement('previous');
          removeElement('next');
        }

        if (window.innerWidth <= 300) {
          removeElement('scrollPage');
          removeElement('previous');
          removeElement('next');
          removeElement('download');
          removeElement('editorFreeText');
          removeElement('editorInk');
        }

      }
      
      checkScreenWidth();
      window.addEventListener('resize', checkScreenWidth);

    removeElement('openFile')
    removeElement('secondaryOpenFile')
    removeElement('secondaryPrint')
    removeElement('secondaryDownload')
    removeElement('viewBookmark')
    removeElement('firstPage')
    removeElement('lastPage')
    removeElement('pageRotateCw')
    removeElement('pageRotateCcw')
    removeElement('viewOutline')
    removeElement('viewAttachments')
    removeElement('viewLayers')
    removeElement('sidebarToggle')
    removeElement('scrollHorizontal')
    removeElement('scrollVertical')
    removeElement('documentProperties')
   }
  

   function changeIcon(elemID, iconUrl){
    let element = document.getElementById(elemID);
    let classNames = element.className;
    classNames = elemID.includes('Toggle')? 'toolbarButton#'+elemID :
   classNames.split(' ').join('.');
    classNames = elemID.includes('view')? '#'+elemID+'.toolbarButton' : '.'+classNames
    classNames+= "::before";
    addCSSRule(sheet, classNames, `content: url(${iconUrl}) !important`, 0)
   }

   function addElemFromSecondaryToPrimary(elemID, parentID){
    let element = document.getElementById(elemID);
    let parent = document.getElementById(parentID);
    element.style.minWidth = "0px";
    element.innerHTML =''
    parent.append(element);
   }

   function removeElement(elemID){
    let element = document.getElementById(elemID);
    element.parentNode.removeChild(element);
   }

   function removeGrowRules(){
    addCSSRule(sheet, '.hiddenSmallView *', 'display:block !important');
    addCSSRule(sheet, '.hiddenMediumView', 'display:block !important');
    addCSSRule(sheet, '.hiddenLargeView', 'display:block !important');
    addCSSRule(sheet, '.visibleSmallView', 'display:block !important');
    addCSSRule(sheet, '.visibleMediumView', 'display:block !important');
    addCSSRule(sheet, '.visibleLargeView', 'display:block !important');
   }

   function addCSSRule(sheet, selector, rules, index) {
    if("insertRule" in sheet) {
    sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else if("addRule" in sheet) {
    sheet.addRule(selector, rules, index);
    }
   }

   window.onload = editToolBar