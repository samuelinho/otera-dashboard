let plantillaItem="";
let plantillaPopup="";

$(document).ready( function () {
    leerPlantillas();
});

function leerPlantillas() {
    $.get("item.html").then(function(text, status, xhr){
        plantillaItem = text;
        $.get("popup.html").then(function(text, status, xhr){
            plantillaPopup = text;
            leerJson();
        });
    });

}

function leerJson() {
    $.getJSON('datos.json', function (data) {
        $("#header").append(data.nome);
        document.title = data.nome;
        items = data.items;
        $.each(items, function( index, item ){
            if (item.tipo==="item") {
                procesarItem(item);
            }
            if (item.tipo==="cat") {
                procesarCategoria(item);
            }
        });
    });
}

function procesarCategoria(item) {
    let plantilla = engadirCategoriaItem(item);
    popup = engadirPopup(plantilla, item);
    $.each(item.items, function (index, item) {
        let elemento = cubrirPlantillaItem(item, false);
        popup.find("#popup_items").append(elemento);
    });
}

function procesarItem(item) {
    let elemento = cubrirPlantillaItem(item, false);
    $("#contenedor").append(elemento);
}

function cubrirPlantillaItem(item, ecategoria) {
    let plantilla = plantillaItem;
    plantilla = plantilla.replaceAll("{{nome}}", item.nome);
    plantilla = plantilla.replaceAll("{{descricion}}", item.descricion);
    plantilla = plantilla.replaceAll("{{cor}}", item.cor);
    if(!ecategoria) {
        plantilla = plantilla.replaceAll("{{ligazon}}", "onclick=\"openTab('"+item.ligazon+"')\"");
    } else {
        plantilla = plantilla.replaceAll("{{ligazon}}", "onclick=\"$('#" + item.nome + "').modal()\"");
    }
    plantilla = plantilla.replaceAll("{{icona}}", item.icona);
    return plantilla;
}

function engadirCategoriaItem(item) {
    let elemento = cubrirPlantillaItem(item,true);
    $("#contenedor").append(elemento);
    return elemento;
}

function engadirPopup(plantilla, item) {
    plantilla = plantillaPopup;
    plantilla = plantilla.replaceAll("{{id}}", item.nome);
    $("#popup_container").append(plantilla);
    return $("#"+item.nome);
}

function openTab(url) {
    //window.location.href = url;
    window.open(url, '_blank');
}
