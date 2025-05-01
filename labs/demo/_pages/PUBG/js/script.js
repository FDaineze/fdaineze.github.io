$(document).ready(function () {
    /*  Efeito de rolagem e fechamento do menu ao clicar
    ---------------------------------------------------- */
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        /* Fecha o nav mobile ao clique */
        if ($('.navbar-toggle').css('display') != 'none') {
            $('.navbar-toggle').trigger("click");
        }

        /* Navega suavemente até o link */
        var id = $(this).attr('href'),
            targetOffset = $(id).offset().top;

        $('html, body').animate({
            scrollTop: targetOffset
        }, 500);
    });
    $('a[data-md^="janela"]').on('click', function (e) {
        if ($('.navbar-collapse').css('display') != 'none') {
            $('.navbar-toggle').trigger("click");
        }
    });
    /*  API Modal (por https://github.com/jimmyfilips)
    ---------------------------------------------------- */
    // Ao carregar o html ele cria style básico
    // gerando o alinhamento e tamanho necessário
    const body = document.querySelector('body'); 
    $('body').prepend(
        '<style type="text/css">' +
        '.md-box{' +
        'background-color: rgba(0,0,0,.8);' +
        'position:fixed;' +
        'display:none;' +
        'left:0;' +
        'top:0;' +
        'align-items:center;' +
        'justify-content:center;' +
        'width:100vw;' +
        'min-height:100vh;' +
        '}' +
        '.md-content {' +
        'display:none;' +
        'text-align:center;' +
        '}' +
        '</style>'
    );
    // Estruturação
    $('.md-box').each(function (i, obj) {
        // Separa o id do objeto em questão
        var id = $(obj).attr("data-id");
        // Separa o objeto
        const object = document.querySelector('[data-id=' + id + ']');
        // Salva seu conteudo
        const mdcontent = object.innerHTML;
        // Retira o conteúdo original
        object.innerHTML = '';
        // Monta a nova estrutura dividindo em box e content
        object.innerHTML +=
            '<div class="md-content container" ' +
            'data-id="' + id + '">' +
            mdcontent + '</div>';
    });
    // Função clique - abrir o modal
    $('[data-md]').click(function (ev) {
        ev.preventDefault();
        var id = $(this).attr("data-md");
        $('.md-box').hide();
        $('.md-content').hide();
        $('.md-box[data-id=' + id + ']').css({
            'display': 'flex'
        });
        $('.md-content[data-id=' + id + ']').css({
            'display': 'inline-block'
        });
    });
    // Função clique - fechar pelo "X"
    $('[data-close]').click(function (ev) {
        ev.preventDefault();
        $('.md-box').hide();
        $('.md-content').hide();
    });
    // Função clique - impedir fechar ao clicar no modal
    $(".md-content").click(function () {
        event.stopPropagation();
    });
    // Função clique - fechar pelo fundo
    $('.md-box').click(function () {
        $(this).hide();
        $('.md-content').hide();
    });
});