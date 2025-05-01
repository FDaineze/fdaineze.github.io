$(document).ready(function () {

    // ------------------------------------------
    //  Funções de Menu
    // ------------------------------------------

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    // ------------------------------------------
    //  Funções de Entrada
    // ------------------------------------------

    //  Dados Brutos - Processar
    // ***********************************

    function criarCabecalho(tabelaObj) {
        tabelaObj.innerHTML =
            '<tr>' +
            '<th>i</th>' +
            '<th>xi</th>' +
            '<th>xi²</th>' +
            '<th>fi</th>' +
            '<th>fri</th>' +
            '<th>xifi</th>' +
            '<th>xi²fi</th>' +
            '<th>Fi</th>' +
            '<th>Fri</th>' +
            '<th>di</th>' +
            '<th>|di|</th>' +
            '<th>|di|fi</th>' +
            '</tr>';
    }

    function atualizarResultados(dados) {
        // ---------------------------------------
        // TABELA DE FREQUENCIA
        // ---------------------------------------
        const tabelaObj = document.querySelector('[data-tabela-frequencia]');
        criarCabecalho(tabelaObj);

        var xi = [],
            fi = [],
            xi2 = [],
            fri = [],
            xifi = [],
            xi2fi = [],
            Fi = [],
            di = [],
            diMed = [],
            diMedfi = [],
            xiSoma = 0,
            fiSoma = 0,
            xi2Soma = 0,
            friSoma = 0,
            xifiSoma = 0,
            xi2fiSoma = 0,
            diMedSoma = 0,
            diMedfiSoma = 0,
            posicao;

        // Organiza os dados conforme xi e fi
        // -----------------------------------
        for (var i = 0; i < dados.length; i++) {
            if (xi.includes(dados[i])) {
                posicao = xi.indexOf(dados[i], 0);
                fi[posicao]++
            } else {
                xi.push(dados[i]);
                posicao = xi.indexOf(dados[i], 0);
                fi[posicao] = 1;
            }
        }

        // Primeira Leitura - Calculo Geral
        // -----------------------------------
        for (var i = 0; i < xi.length; i++) {
            xiSoma += Number(xi[i]);
            fiSoma += fi[i];
            xi2[i] = xi[i] * xi[i];
            xi2Soma += xi2[i];
            xifi[i] = xi[i] * fi[i];
            xifiSoma += xifi[i];
            xi2fi[i] = xi2[i] * fi[i];
            xi2fiSoma += xi2fi[i];
            if (i == 0) {
                Fi[i] = fi[i];
            } else {
                Fi[i] = Fi[i - 1] + fi[i];
            }
        }

        // Calculo de Média
        // -----------------------------------
        var Media = xifiSoma / fiSoma;

        // Segunda Leitura - Relativos
        // É feita para processar os itens que precisam de somatoria
        // E para organizar os dados na tabela
        // -----------------------------------

        for (var i = 0; i < xi.length; i++) {
            ii = i + 1; // ii é apenas visual
            fri[i] = (fi[i] / fiSoma) * 100;
            friSoma += fri[i];
            di[i] = (xi[i] - Media).toFixed(2);
            diMed[i] = Math.abs(di[i]);
            diMedSoma += Number(diMed[i]);
            diMedfi[i] = (diMed[i] * fi[i]).toFixed(2);
            diMedfiSoma += Number(diMedfi[i]);

            tabelaObj.innerHTML +=
                '<tr>' +
                '<td>' + ii + '</td>' +
                '<td>' + xi[i] + '</td>' +
                '<td>' + xi2[i] + '</td>' +
                '<td>' + fi[i] + '</td>' +
                '<td>' + Number(fri[i]).toFixed(1) + '%</td>' +
                '<td>' + xifi[i] + '</td>' +
                '<td>' + xi2fi[i] + '</td>' +
                '<td>' + Fi[i] + '</td>' +
                '<td>' + Fi[i] + '/' + fiSoma + '</td>' +
                '<td>' + di[i] + '</td>' +
                '<td>' + diMed[i] + '</td>' +
                '<td>' + diMedfi[i] + '</td>' +
                '</tr>';
        }

        diMedfiSoma = diMedfiSoma.toFixed(2);
        tabelaObj.innerHTML +=
            '<tr class="tab-freq-soma">' +
            '<td>&sum;</td>' +
            '<td>' + xiSoma + '</td>' +
            '<td>' + xi2Soma + '</td>' +
            '<td>' + fiSoma + '</td>' +
            '<td>' + Number(friSoma).toFixed(1) + '%</td>' +
            '<td>' + xifiSoma + '</td>' +
            '<td>' + xi2fiSoma + '</td>' +
            '<td> - </td>' +
            '<td> - </td>' +
            '<td> - </td>' +
            '<td>' + Number(diMedSoma).toFixed(1) + '</td>' +
            '<td>' + diMedfiSoma + '</td>' +
            '</tr>';
        
        // ---------------------------------------
        // TABELA DE MEDIDAS DE TENDENCIA CENTRAL
        // ---------------------------------------
        
        // Media
        // ---------
        const saidaMedialObj = document.querySelector('[data-saida-media]');
        saidaMedialObj.innerHTML = Media;
        
        var maiorfi = 0,
            maiorpos,
            maiorcont = 0;
        
        for (var i = 0; i < fi.length; i++) {
            if (fi[i] == maiorfi) {
                maiorcont++;
            }
            if (fi[i] > maiorfi) {
                maiorfi = fi[i];
                maiorpos = i;
                maiorcont = 1;
            } 
        }
        
        // Moda
        // ---------
        const saidaModaObj = document.querySelector('[data-saida-moda]');
        if (maiorcont > 1 && maiorfi > 1) {
            saidaModaObj.innerHTML = 'bimodal+';
        }
        if (maiorcont > 1 && maiorfi == 1) {
            saidaModaObj.innerHTML = 'amodal';
        }
        if (maiorcont == 1) {
            saidaModaObj.innerHTML = xi[maiorpos];
        }
        
        // Mediana
        // ---------
        const saidaMedianaObj = document.querySelector('[data-saida-mediana]');
        var base = fiSoma/2,
            linha = 0;
        
        for (var i = 0; i < Fi.length; i++) {
            console.log(Fi[i] + ' / ' + base)
            if (Fi[i] >= base) {
                mediana = xi[i];
                break;
            }
        }
        saidaMedianaObj.innerHTML = mediana;
        
        // ---------------------------------------
        // TABELA DE MEDIDAS DE DISPERSÃO
        // ---------------------------------------
        
        // Desvio Medio
        // ---------
        const saidaDesvioMedioObj = document.querySelector('[data-saida-desvio-medio]');
        var dm = diMedfiSoma/fiSoma;
        saidaDesvioMedioObj.innerHTML = dm.toFixed(2);
        
        // Variancia
        // ---------
        const saidaVariancia = document.querySelector('[data-saida-variancia]');
        var s2 = 
            (xi2fiSoma / fiSoma) - 
            ((xifiSoma / fiSoma) * (xifiSoma / fiSoma));
        saidaVariancia.innerHTML = s2.toFixed(2);
        
        // Desvio Padrao
        // ---------
        const saidaDesvioPadrao = document.querySelector('[data-saida-desvio-padrao]');
        var s = Math.sqrt(s2);
        saidaDesvioPadrao.innerHTML = s.toFixed(2);
        
    }

    function processarDados() {
        var dados = [],
            erros = [],
            valor;
        for (var i = 1; i <= numEntradas; i++) {
            valor = document.getElementById('data-' + i).value;
            if (valor == "") {
                dados.push(0);
            } else {
                if (isNaN(valor)) {
                    erros.push('<span class="erro">"' + valor + '" não é uma entrada válida</span><br>');
                } else {
                    dados.push(valor);
                }
            }
        }

        //dados.sort(); 
	dados.sort(function(a, b) {
	    return a - b;
	});
		
        const object = document.querySelector('[data-rol]');
        object.innerHTML = 'ROL: ';
        for (var i = 0; i < dados.length; i++) {
            if (i != 0) {
                object.innerHTML += ' - '
            }
            object.innerHTML += dados[i];
        }

        const objecterro = document.querySelector('[data-entrada-error]');
        objecterro.innerHTML = '<span class="correto">Nenhum erro até agora :)</span>';
        if (erros != "") {
            objecterro.innerHTML = "";
            for (var i = 0; i < erros.length; i++) {
                objecterro.innerHTML += erros[i];
            }
        }
        atualizarResultados(dados);
    }

    //  Dados Brutos - Atualizar contador
    // ***********************************
    function attEntrada() {
        const object = document.querySelector('[data-entrada]');
        object.innerHTML = numEntradas;
        processarDados();
    }

    //  Dados Brutos - Adicionar campo
    // ***********************************
    function boxAddEntrada() {
        if (numEntradas == 0) {
            numEntradas++;
            const object = document.querySelector('[data-entrada-box]');
            object.innerHTML = '<input type="text" class="campo" id="data-' + numEntradas + '">';
        } else {
            var temp = numEntradas + 1;
            const object = document.getElementById('data-' + numEntradas);
            $('#data-' + numEntradas).after('<input type="text" class="campo" id="data-' + temp + '">');
            numEntradas++;
        }
        attEntrada();
    }

    //  Dados Brutos - Remover campo
    // ***********************************
    function boxRemEntrada() {
        if (numEntradas > 1) {
            document.getElementById('data-' + numEntradas).remove();
            numEntradas--;
            attEntrada();
        }
    }

    //  Dados Brutos - Limpar campo
    // ***********************************
    function resetEntrada() {
        numEntradas = 1;
        const object = document.querySelector('[data-entrada-box]');
        object.innerHTML = '<input type="text" class="campo" id="data-' + numEntradas + '">';
        attEntrada();
    }

    //  Dados Brutos - Criar entrada
    // ***********************************
    function simuleEntrada() {
        resetEntrada();
        var x;
        for (var i = 1; i < 10; i++) {
            x = Math.floor((Math.random() * 30) + 21);
            document.getElementById('data-' + i).value = x;
            boxAddEntrada();
        }
        x = Math.floor((Math.random() * 30) + 21);
        document.getElementById('data-10').value = x;
        attEntrada();
    }

    var numEntradas = 0;
    boxAddEntrada();

    // ------------------------------------------
    //  Funções de Clique
    // ------------------------------------------

    // Links
    // ------------------------------------------
    $('#reset-entrada').on('click', function (e) {
        e.preventDefault();
        resetEntrada();
    });

    $('#simule-entrada').on('click', function (e) {
        e.preventDefault();
        simuleEntrada();
    });

    // Botoes
    // ------------------------------------------
    $('#data-add-entrada').on('click', function () {
        boxAddEntrada();
    });

    $('#data-rem-entrada').on('click', function () {
        boxRemEntrada();
    });

    $('#reset-entrada-2').on('click', function () {
        resetEntrada();
    });

    $('#processar-dados').on('click', function () {
        processarDados();
    });

    $('#content').on('change', '.campo', function () {
        processarDados();
    });

});
