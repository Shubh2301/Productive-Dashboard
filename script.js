function OpenCards() {
    var AllElem = document.querySelectorAll('.elem');
    var fullElemPage = document.querySelectorAll('.fullElem');
    var AllFullElemBackBtn = document.querySelectorAll('.fullElem .back');

    AllElem.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
        })
    })
    AllFullElemBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'
        })
    })
}
OpenCards();