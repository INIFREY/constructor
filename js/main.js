/**
 * Created by Валерий on 05.03.2017.
 */

var $settings = {}; // Глобальные настройки
var $servicesList = {  // Список доступных виджетов
    header: ['logo', 'topMenu'],
    content: ['text'],
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
            },
            afterClose: function() {
                $('.widget-popup input').each(function () {
                    $(this).val('');
                });

            }
        },
        removalDelay: 500
    });

    // Очистка выбранных виджетов при переходе на предыдущую страницу
    $('#configPagePrevBtn').on('click', function(){
        $('#configPage .stuct-box>div>div').removeClass('active');
        for (var key in $request) $request[key] = [];
    });

    // Клик на кнопку добавления виджета
    $('.addWidget').on('click', function(){
        var error = false;
        var target = $('#configPage .stuct-box .active').data('service');
        var name = $(this).closest(".widget-popup").attr("id").replace("-popup", "");
        var settings = {};
        $(this).closest(".widget-popup").find('input').each(function(){
            if($(this).val()==""){
                error = true;
                $(this).addClass('hasError');
            }
            var key = $(this).attr('name');
            settings[key] = $(this).val();
            // TODO: Обозначить добавленные виджеты на макет и сделать их сортировку
        });
        if (error) return;
        $request[target].push({
            name: name,
            settings: settings
        });
        $.magnificPopup.close();
        console.log($request);
    });

    $('#testGen').on('click', function(){

        $.post(
            "/create.php",
            {
                settings: $settings,
                request: $request
            },
            function(data){
                window.open('http://constructor.ml/'+data, '_blank')
            }
        );
    });
});