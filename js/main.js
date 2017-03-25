/**
 * Created by Валерий on 05.03.2017.
 */

var $settings = {}; // Глобальные настройки
var $servicesList = {  // Список доступных виджетов
    header: ['logo', 'topMenu', 'h1'],
    content: ['text', 'h1', 'h2', 'advBlock'],
    sidebar: ['text', 'calendar', 'advBlock', 'sideMenu'],
    sidebar2: ['text', 'calendar', 'advBlock', 'sideMenu'],
    footer: ['copyright']
};
var $request = {  // Запрос на сервер со всемы выбранными виджетами
    header: [],
    content: [],
    footer: [],
    sidebar: [],
    sidebar2: []
};


$( document ).ready(function() {

    $("html").niceScroll({styler:"fb",cursorcolor:"#000"});

    // Показывает первую страницу
    $('#firstPage').show();

    // Переключатель страниц по кнопкам
    $('.showPage').on('click', function(){
        $('.switchPage').fadeOut(400);
        var page = $(this).data('show');
        $('#'+page).fadeIn(200);
    });

    // Показывает первую страницу при клике на логотип
    $('#logo').on('click', function(){
        $('.switchPage').fadeOut(400);
        $('#firstPage').fadeIn(200);
    });

    // Переключатель класса на странице выбора макета
    $('.service-box ').click(function () {
        $('.service-box').removeClass('active');
        $(this).addClass('active');
    });

    // Валидация названия проекта
    $('#projectName').on('input', function(){
        var text = $(this).val();
        if (text.replace(/\s/g,'').length>3) $('#secondPage button').attr('disabled', false);
        else $('#secondPage button').attr('disabled', true);
    });

    // Сохраняет имя проекта в глобальный конфиг
    $('#secondPage .showPage').on('click', function(){
        $settings.name = $('#projectName').val();
    });

    // Валидация выбора шаблона
    $('#services .service-box').on('click', function(){
        $('#servicesNextBtn').attr('disabled', false);
        $settings.layout = $(this).data('layout');
        $('.stuct-box>div').hide();
        $('.service-block').hide();
        $('#layout-'+$settings.layout).show();
    });

    // Отображение доступных виджетов при клике
    $('#configPage .stuct-box>div>div').on('click', function(){
        $('.service-block').hide();
        $('#configPage .stuct-box>div>div').removeClass('active');
        $(this).addClass('active');
        var block = $(this).data('service');
        $servicesList[block].forEach(function(item) {
         $('#service-'+item).show(200);
        });
    });

    // Открытие попапа при клике на виджет
    $('.service-block').magnificPopup({
        type:'inline',
        midClick: true,
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = "mfp-3d-unfold";
                $('.widget-popup input, .widget-popup textarea').each(function () {
                    $(this).removeClass('hasError');
                });
                $('.widget-popup .addWidget').each(function () {
                    $(this).attr('disabled', false);
                });
                $('.widget-popup .temp-element').remove();
                tempCount = 0;
            },
            afterClose: function() {
                $('.widget-popup input, .widget-popup textarea').each(function () {
                    $(this).val('');
                });
                $("html").css('overflow', 'hidden');
            }
        },
        removalDelay: 500
    });

    // Очистка выбранных виджетов при переходе на предыдущую страницу
    $('#configPagePrevBtn').on('click', function(){
        $('#configPage .stuct-box>div>div').removeClass('active');
        for (var key in $request) $request[key] = [];
    });

    // Удаление класса ошибок при вводе в инпут
    $('.widget-popup').delegate('input, textarea', 'input', function() {
        $(this).removeClass('hasError');
    });

    // Клик на кнопку добавления виджета
    $('.addWidget').on('click', function(){
        var error = false;
        var target = $('#configPage .stuct-box .active').data('service');
        var name = $(this).closest(".widget-popup").attr("id").replace("-popup", "");
        var settings = {};
        $(this).closest(".widget-popup").find('input, textarea').each(function(){
            if($(this).val()==""){
                error = true;
                $(this).addClass('hasError');
            }
            var key = $(this).attr('name');
            if (key.indexOf('[]') + 1) {
                key = key.substring(0, key.length - 2);
                if (!Array.isArray(settings[key])) settings[key] = [];
                settings[key].push($(this).val());
            }
            else{
                settings[key] = $(this).val();
            }
        });
        if (error) return;
        $(this).attr('disabled', true);
        var number = $request[target].length;
        var header =  $(this).closest(".widget-popup").find('h3').text();
        console.log($(this).closest("h3"));
        var fLetter = header.charAt(0);
        $('#configPage .stuct-box .active').append("<div class='widEl ui-state-default' data-number='"+number+"' title='"+header+"'>"+fLetter+"</div>");
        $request[target].push({
            name: name,
            settings: settings
        });
        $.magnificPopup.close();
        console.log($request);
    });

    // Удаление при клике ПКМ
    $('.stuct-box').delegate('.widEl', 'mousedown', function(event) {
        if (event.which === 3) {
            event.preventDefault();
            $(this).remove();
        }
    });

    $( ".stuct-box >div>div" ).sortable();
    $( "#topMenu-popup" ).sortable({
        items: ".big-form-group"
    });
    $(".stuct-box").on("contextmenu", false);


    // Добавление еще одного пункта в попап
    $('.addBigGroup').on('click', function(){
        $(this).closest(".widget-popup")
            .find(".big-form-group:first")
            .clone().addClass('temp-element')
            .insertBefore($(this).parent())
            .find("input, textarea").val("")
            .removeClass('hasError');
    });

    // Удаление пунктов в попапе
    $('.widget-popup').delegate('.deleteBigGroup', 'click', function() {
        if ($(this).closest(".widget-popup").find('.big-form-group').length==1) return false;
        else $(this).parent().remove();
    });

    $('#testGen').on('click', function(){
        var $requestSort = {  // Запрос на сервер со всемы выбранными виджетами
            header: [],
            content: [],
            footer: [],
            sidebar: [],
            sidebar2: []
        };


        var layout = $settings.layout;
        $('#layout-'+layout+'>div').each(function(){
            var target = $(this).data('service');
            $(this).find('.widEl').each(function(){
                var number = $(this).data('number');
                $requestSort[target].push($request[target][number]);
            });
        });


        $.post(
            "/create.php",
            {
                settings: $settings,
                request: $requestSort
            },
            function(data){
                window.open('http://constructor.ml/'+data, '_blank')
            }
        );
    });
});