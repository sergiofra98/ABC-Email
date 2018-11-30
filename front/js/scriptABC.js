selectorTab = 0;


//VALIDACION DAR DETALLES


direccionRest = "http://localhost:9999/MasNomina/EnviadorEmail"

globalSucursales = [[1, 117, "DOLORES HIDALGO"], [1, 134, "SILAO"], [1, 2, "CELAYA"], [1, 5, "IRAPUATO"], [1, 7, "LEON"], [1, 97, "GUANAJUATO"], [1, 108, "VALLE DE SANTIAGO"], [1, 116, "SAN MIGUEL DE ALLENDE"], [1, 119, "ACAMBARO"], [1, 120, "MOROLEON"], [1, 135, "SAN FRANCISCO DEL RINCON"], [1, 141, "SALAMANCA"], [1, 47, "ACAPULCO"], [1, 69, "CHILPANCINGO"], [1, 83, "IGUALA"], [1, 107, "TAXCO"], [1, 14, "PACHUCA"], [1, 78, "TULANCINGO"], [1, 70, "CUAUTLA"], [1, 15, "CUERNAVACA"], [1, 71, "HUAUCHINANGO"], [1, 16, "TEHUACAN"], [1, 9, "PUEBLA"], [1, 72, "TEZIUTLAN"], [1, 112, "ATLIXCO"], [1, 143, "PUEBLA FORJADORES"], [1, 3, "QUERETARO"], [1, 18, "SAN JUAN DEL RIO"], [1, 32, "TLAXCALA"], [1, 58, "APIZACO"], [2, 300, "MAS NOMINA MONTERREY"], [2, 38, "MAZATLAN"], [2, 39, "MOCHIS"], [2, 104, "GUAMUCHIL"], [2, 111, "GUASAVE"], [2, 40, "CULIACAN"], [2, 36, "HERMOSILLO"], [2, 37, "CIUDAD OBREGON"], [2, 66, "SAN LUIS RIO COLORADO"], [2, 86, "NOGALES"], [2, 87, "NAVOJOA"], [2, 103, "GUAYMAS"], [2, 113, "CABORCA"], [2, 136, "AGUA PRIETA"], [2, 43, "VICTORIA"], [2, 25, "NUEVO LAREDO"], [2, 41, "MATAMOROS"], [2, 42, "REYNOSA"], [2, 57, "CIUDAD MANTE"], [3, 255, "METROPOLITANA 1"], [3, 256, "METROPOLITANA 2"], [3, 257, "METROPOLITANA 3"], [3, 258, "METROPOLITANA 4"], [3, 99, "LOS ALTOS"], [3, 53, "PUERTO VALLARTA"], [3, 55, "GUADALAJARA"], [3, 73, "OCOTLAN"], [3, 82, "LAGOS DE MORENO"], [3, 84, "TEPATITLAN"], [3, 88, "CIUDAD GUZMAN"], [3, 45, "MORELIA"], [3, 46, "ZAMORA"], [3, 49, "URUAPAN"], [3, 80, "LA PIEDAD"], [3, 91, "APATZINGAN"], [3, 105, "LAZARO CARDENAS"], [3, 106, "ZITACUARO"], [3, 122, "ZACAPU"], [3, 123, "SAHUAYO"], [3, 130, "CIUDAD HIDALGO"], [3, 81, "PATZCUARO"], [3, 34, "TEPIC"], [3, 142, "MU\u00d1OZ"], [3, 8, "SAN LUIS POTOSI"], [3, 98, "MATEHUALA"], [3, 63, "CD. VALLES"], [3, 115, "RIO VERDE"], [3, 19, "ZACATECAS"], [3, 89, "FRESNILLO"], [4, 26, "OAXACA"], [4, 85, "TUXTEPEC"], [4, 93, "SALINA CRUZ"], [4, 94, "JUCHITAN"], [4, 124, "PLAYA DEL CARMEN"], [4, 31, "CHETUMAL"], [4, 33, "CANCUN"], [4, 109, "COZUMEL"], [4, 132, "CARDENAS"], [4, 29, "VILLAHERMOSA"], [4, 44, "TAMPICO"], [4, 131, "ACAYUCAN"], [4, 10, "XALAPA"], [4, 12, "CORDOBA"], [4, 17, "ORIZABA"], [4, 30, "COATZACOALCOS"], [4, 59, "MINATITLAN"], [4, 64, "POZA RICA"], [4, 67, "TUXPAN"], [4, 114, "MARTINEZ DE LA TORRE"], [4, 127, "SAN ANDRES TUXTLA"], [4, 11, "VERACRUZ"], [4, 27, "MERIDA"], [4, 121, "VALLADOLID"]]
globalDivisiones = [[1, "CENTRO"], [2, "NORTE"], [3, "OCCIDENTE"], [4, "SUR"], [5, "VM"], [6, "FISA"], [7, "VM CENTRO"], [8, "VM NORTE"], [9, "VM SUR"], [10, "NORESTE"]]


//COSAS FUNCIONALES DE LA PAGINA
function sortTable(column, type) {
    $('#tablaRegistros .fa-caret-down').hide()
    $('#tablaRegistros tr>th:eq(' + column + ') .fa-caret-down').show()
    $('#tablaRegistros .fa-caret-down').removeClass('rotarSort')

    var order = $('#tablaRegistros tr>th:eq(' + column + ')').data('order');
    order = order === 'ASC' ? 'DESC' : 'ASC';
    $('#tablaRegistros tr>th:eq(' + column + ')').data('order', order);
    if (order === 'DESC') {
        $('#tablaRegistros tr>th:eq(' + column + ') .fa-caret-down').addClass('rotarSort')
    }

    $('.table tbody tr').sort(function (a, b) {
        a = $(a).find('td:eq(' + column + ')').text();
        b = $(b).find('td:eq(' + column + ')').text();

        return order === 'ASC' ? a.localeCompare(b) : b.localeCompare(a);
    }).appendTo('.table tbody');
}

$(document).ready(function () {
    getDivisionesSucursales();
    llenarSelectDivision();
    getRegistros();
    $('#tablaRegistros .fa-caret-down').hide()

});

function getDivisionesSucursales() {
    /*$.getJSON({
        url: direccionRest + "/getDivisiones",
        data: {},
        cache: false,
        type: "GET",
        success: function (data) {
            globalDivisiones = data;
            llenarSelectDivision()
        },
        error: function (xhr) {
            console.log(xhr)
        }
    });

    $.getJSON({
        url: direccionRest + "/getSucursales",
        data: {},
        cache: false,
        type: "GET",
        success: function (data) {
            globalSucursales = data;
        },
        error: function (xhr) {

        }
    });*/
}

function habilitarCombos(elem) {
    if (elem.value == "2") {
        $('#selectDivision').prop('disabled', false);
        $('#selectSucursal').prop('disabled', true)

        $('#selectDivision').html('<option value="" selected disabled hidden>Selecione...</option>')
        $('#selectSucursal').html('<option value="" selected disabled hidden>No disponible</option>')
        llenarSelectDivision()

    }
    else if (elem.value == "3") {
        $('#selectDivision').prop('disabled', false);
        $('#selectSucursal').prop('disabled', false);

        $('#selectDivision').html('<option value="" selected disabled hidden>Selecione...</option>')
        $('#selectSucursal').html('<option value="" selected disabled hidden>Seleccione una Division</option>')

        llenarSelectDivision()
    }
    else {
        $('#selectDivision').prop('disabled', true);
        $('#selectSucursal').prop('disabled', true)

        $('#selectDivision').html('<option value="" selected disabled hidden>No disponible</option>')
        $('#selectSucursal').html('<option value="" selected disabled hidden>No disponible</option>')

        
        $('#selectDivision').val('')
        $('#selectSucursal').val('')

    }
}

function llenarSelectDivision() {
    if ($('#selectTipo').val() == "2") {
        append = '<option value="" selected disabled hidden>Seleccione...</option>';
    }
    else {
        append = '<option value="" selected disabled hidden>Seleccione un tipo...</option>';

    }
    for (let i = 0; i < globalDivisiones.length; i++) {
        append += '<option value="' + globalDivisiones[i][0] + '">' + globalDivisiones[i][1] + '</option>'
    }

    $('#selectDivision').html(append)

}

function llenarSelectSucursal() {
    if ($('#selectTipo').val() == "3") {
        let vacio = false;
        division = $('#selectDivision').val()

        append = '<option value="" selected disabled hidden>Seleccione...</option>';
        for (let i = 0; i < globalSucursales.length; i++) {
            if (parseInt(globalSucursales[i][0]) == division) {
                vacio = true
                append += '<option value="' + globalSucursales[i][1] + '">' + globalSucursales[i][2] + '</option>'
            }
        }

        if (!vacio) {
            append = '<option value="null" selected disabled hidden>Sin Resultados</option>'
        }

        $('#selectSucursal').html(append)
    }
}

function arreglarCargador() {
    $('#cargadorModal .fas').addClass('fa-sync-alt')
    $('#cargadorModal .fas').addClass('rotar')
    $('#cargadorModal .fas').removeClass('fa-check')
    $('#cargadorModal h4').html('Cargando')

}

function arreglarExito() {
    $('#cargadorModal .fas').removeClass('fa-sync-alt')
    $('#cargadorModal .fas').removeClass('rotar')
    $('#cargadorModal .fas').addClass('fa-check')
    $('#cargadorModal h4').html('Listo')

}


//AHORA SÍ DEL ABC

//ARREGLAR MODALES
function modalEliminarRegistro(id) {
    $("#botonEliminar").attr("onclick", "eliminarRegistro(" + id + ")");
    $('#modalEliminar #modalFooter button').prop('disabled', false)

    $.getJSON({
        url: direccionRest + "/getCorreo",
        data: {
            'id_reporte': id
        },
        cache: false,
        type: "GET",
        success: function (data) {
            $('#emailAEliminar').html(data)
            $('#modalEliminar').modal()

        },
        error: function (xhr) {
            console.log(xhr)
        }
    });
}

function modalAgregarRegistro() {
    habilitarCombos(1)
    $('#modalFooter').show()

    $('#botonAplicarModal').html('Agregar')
    $("#botonAplicarModal").attr("onclick", "agregarRegistro()");

    $('#labelModalAC').html('Agregar Registro')

    $('#formAltaEmail').show()
    $('#cargadorModal').hide()

    $('#nombre').val("")
    $('#apellidoPat').val("")
    $('#apellidoMat').val("")
    $('#correo').val("")
    $('#selectTipo').val("")
    $('#selectDivision').val("0")

    $('#alertValidacion').hide();
    $('#formAltaEmail input, #formAltaEmail select').removeClass('formInvalido')

    $('#modalAC').modal()
}

function modalEditarRegistro(id) {
    habilitarCombos(1)
    $('#modalFooter').show()
    arreglarCargador()
    $('#cargadorModal h4').html('Cargando')
    $('#formAltaEmail').hide()
    $('#cargadorModal').show()


    $('#botonAplicarModal').html('Aplicar')
    $("#botonAplicarModal").attr("onclick", "editarRegistro(" + id + ")");
    $('#labelModalAC').html('Modificar Registro')

    $('#alertValidacion').hide();
    $('#formAltaEmail input, #formAltaEmail select').removeClass('formInvalido')

    $('#modalAC').modal()

    $.getJSON({
        url: direccionRest + "/getRegistro",
        data: {
            'id_reporte': id
        },
        cache: false,
        type: "GET",
        success: function (data) {
            console.log(data)
            $('#nombre').val(data[0][0])
            $('#apellidoPat').val(data[0][1])
            $('#apellidoMat').val(data[0][2])
            $('#correo').val(data[0][3])
            $('#selectTipo').val(data[0][8])


            if (data[0][8] == "2") {
                $('#selectDivision').prop('disabled', false);
                $('#selectSucursal').prop('disabled', true);

                $('#selectDivision').val(data[0][4])
                llenarSelectSucursal()
            }
            else if (data[0][8] == "3") {
                $('#selectDivision').prop('disabled', false);
                $('#selectSucursal').prop('disabled', false);

                $('#selectDivision').val(data[0][4])
                llenarSelectSucursal()
                $('#selectSucursal').val(data[0][5])
            }
            else {
                $('#selectDivision').prop('disabled', true);
                $('#selectSucursal').prop('disabled', true);

                $('#selectDivision').val("null")
                $('#selectSucursal').val("null")
            }

            $('#formAltaEmail').show()
            $('#cargadorModal').hide()


        },
        error: function (xhr) {
            console.log(xhr)
        }
    });
}

//VALIDACION MODAL

function validarModal() {
    if (validarEmail($("#formAltaEmail #correo").val().trim()) != ""
        && $("#formAltaEmail #nombre").val().trim() != ""
        && $("#formAltaEmail #apellidoPat").val().trim() != ""
        && $("#formAltaEmail #selectTipo").val() != "") {

        if ($("#formAltaEmail #selectTipo").val() == "1") {
            return true;
        }
        if ($("#formAltaEmail #selectTipo").val() == "2") {
            if ($("#formAltaEmail #selectDivision").val() === null) {
                return false;
            }
            else {
                return true;
            }

        }
        if ($("#formAltaEmail #selectTipo").val() == "3") {
            if ($("#formAltaEmail #selectDivision").val() === null &&
                $("#formAltaEmail #selectProducto").val() === null) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    else {
        return false;
    }


}

function validarEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//FUNCIONES CONMETODOS AL BACK
function agregarRegistro() {
    $('#alertValidacion').hide();
    $('#formAltaEmail input, #formAltaEmail select').removeClass('formInvalido')

    if (validarModal()) {
        arreglarCargador()
        $('#cargadorModal h4').html('Agregando')
        $('#formAltaEmail').hide()
        $('#modalFooter').hide()
        $('#cargadorModal').show()

        $.getJSON({
            url: direccionRest + "/agregarRegistro",
            data: {
                'correo': $("#formAltaEmail #correo").val().trim(),
                'nombre': $("#formAltaEmail #nombre").val().trim(),
                'apellido_pat': $("#formAltaEmail #apellidoPat").val().trim(),
                'apellido_mat': $("#formAltaEmail #apellidoMat").val().trim(),
                'id_reporte': $("#formAltaEmail #selectTipo").val(),
                'id_division': $("#formAltaEmail #selectDivision").val(),
                'id_sucursal': $("#formAltaEmail #selectSucursal").val()
            },
            cache: false,
            type: "GET",
            success: function (data) {
                arreglarExito();
                getRegistros();
                setTimeout(function () {
                    if ($('#modalAC').hasClass('show')) {
                        $('#modalAC').modal('hide');
                    }
                }, 2000);
            },
            error: function (xhr) {
                console.log(xhr)
            }
        });
    }
    else {
        $('#alertValidacion').show();
        tipoReporte = $('#selectTipo').val()
        $('#formAltaEmail input, #formAltaEmail select').each(function () {
            console.log($(this))
            if ($(this)[0].value == "") {
                if ($(this).attr('id') === 'selectDivision') {
                    if (tipoReporte === '2' || tipoReporte === '3') {
                        $(this).addClass("formInvalido")
                    }
                }
                else if ($(this).attr('id') === 'selectSucursal') {
                    if (tipoReporte === '3') {
                        if ($(this)[0].value != null) {
                            $(this).addClass("formInvalido")
                        }
                        else {
                            $('#selectDivision').addClass("formInvalido")
                        }
                    }
                }
                else if ($(this).attr('id') === 'correo') {
                    if (!validarEmail($(this)[0].value)) {
                        $(this).addClass("formInvalido")
                    }
                }
                else {
                    if ($(this).attr('id') != 'apellidoMat') {
                        $(this).addClass("formInvalido")
                    }
                }
            }
        });
    }
}

function editarRegistro(id) {
    $('#alertValidacion').hide();
    $('#formAltaEmail input, #formAltaEmail select').removeClass('formInvalido')

    if (validarModal()) {
        arreglarCargador()
        $('#cargadorModal h4').html('Aplicando')
        $('#formAltaEmail').hide()
        $('#cargadorModal').show()
        $('#modalFooter').hide()

        $.getJSON({
            url: direccionRest + "/modificarRegistro",
            data: {
                'id_cor': id,
                'correo': $("#formAltaEmail #correo").val().trim(),
                'nombre': $("#formAltaEmail #nombre").val().trim(),
                'apellido_pat': $("#formAltaEmail #apellidoPat").val().trim(),
                'apellido_mat': $("#formAltaEmail #apellidoMat").val().trim(),
                'id_reporte': $("#formAltaEmail #selectTipo").val(),
                'id_division': $("#formAltaEmail #selectDivision").val(),
                'id_sucursal': $("#formAltaEmail #selectSucursal").val()
            },
            cache: false,
            type: "GET",
            success: function (data) {
                getRegistros()
                arreglarExito()
                setTimeout(function () {
                    if ($('#modalAC').hasClass('show')) {
                        $('#modalAC').modal('hide');
                    }
                }, 2000);
            },
            error: function (xhr) {
                console.log(xhr)
            }
        });
    }
    else {
        $('#alertValidacion').show();
        $('#formAltaEmail input, #formAltaEmail select').each(function () {
            console.log($(this))
            if ($(this)[0].value == "") {
                $(this).addClass("formInvalido")
            }
        });
    }
}

function eliminarRegistro(id) {
    $('#modalEliminar #modalFooter button').prop('disabled', true)
    $('#modalFooter button')
    $.getJSON({
        url: direccionRest + "/eliminarRegistro",
        data: {
            'id_cor': id
        },
        cache: false,
        type: "GET",
        success: function (data) {
            getRegistros()
            arreglarExito()
            setTimeout(function () {
                getRegistros();
                if ($('#modalEliminar').hasClass('show')) {
                    $('#modalEliminar').modal('hide');
                }
            }, 100);
        },
        error: function (xhr) {
            console.log(xhr)
        }
    });
}

//FUNCION PARA OBTENER TODOS LOS REGISTROS

function getRegistros() {
    let temp;
    $.getJSON({
        url: direccionRest + "/getRegistrosCorreos",
        data: {},
        cache: false,
        type: "GET",
        success: function (data) {
            if (!data.length) {
                $('#noResultados').show()
                $('#tablaCuerpoRegistros').hide()
                return;
            }
            append = "";
            $('#tablaCuerpoRegistros').show()
            $('#noResultados').hide()



            for (let i = 0; i < data.length; i++) {
                append += '<tr>'
                append += '<td scope="row">' + data[i][0] + " " + data[i][1] + " " + data[i][2] + '</td>'
                append += '<td scope="row">' + data[i][3] + '</td>'
                switch (data[i][7]) {
                    case 1: {
                        append += '<td scope="row">Nacional</td>'
                        break;
                    }
                    case 2: {
                        append += '<td scope="row">Divisional</td>'
                        break;
                    }
                    case 3: {
                        append += '<td scope="row">Supervisor</td>'
                        break;
                    }
                }
                if (data[i][4] == null) {
                    append += '<td scope="row">-</td>'
                }
                else {
                    append += '<td scope="row">' + globalDivisiones.find(function (elem) { return elem[0] == data[i][4] })[1] + '</td>'
                }

                if (data[i][5] == null) {
                    append += '<td scope="row">-</td>'
                }
                else {
                    temp = globalSucursales.find(function (elem) { return elem[1] == data[i][5] })
                    if (temp != undefined) {
                        append += '<td scope="row">' + temp[2] + '</td>'
                    }
                    else {
                        append += '<td scope="row">' + temp + '</td>'

                    }
                }
                append += '<td scope="row">' + data[i][6] + '</td>'
                append += '<td scope="row"><button class="btn btn-link" onclick="modalEditarRegistro(' + data[i][8] + ')"><i class="fas fa-edit"></i></button>'
                append += '<button class="btn btn-link" onclick="modalEliminarRegistro(' + data[i][8] + ')"><i class="fas fa-user-minus"></i></button></td>'
                append += '</tr>'
            }

            $('#tablaCuerpoRegistros').html(append)

        },
        error: function (xhr) {
            console.log(xhr)
        }
    });
}




