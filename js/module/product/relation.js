function relatiionMore(){
    var relation = document.querySelector(".xans-product-relationlist");
    if(!relation){
        return;
    }
   var list = relation.querySelectorAll(".prdList__item");
    var btnMore = relation.querySelector(".btnMore");
    for(var i = 0; i < list.length; i++){
        var target = list[i];
        target.setAttribute('data-index', i);
        if(target.getAttribute('data-index') >= 5){
            target.classList.add("hidden");            
        }
    }
    
    if(list.length <= 5) btnMore.style.display = "none";
    btnMore.addEventListener('click', function() {
        $(list).removeClass('hidden');
        btnMore.style.display = "none";
    });
}
relatiionMore();