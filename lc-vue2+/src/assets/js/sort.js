//自由驱动工作室
//作者：林鑫

var Initials=$('.initials');
var LetterBox=$('#letter');
// initials();
function then(){
    var ZM = '';
    $.each($(".sort_letter"),function(i,el){
        if($(el).text() == "热门品牌")return;
        ZM +='<li>'+$(el).text()+'</li>';
    });
    // Initials.find('ul').append('<li>A</li><li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li><li>N</li><li>O</li><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li><li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li><li>Z</li><li>#</li>');
    Initials.find('ul').append(ZM);
    Initials.show();
    // var _h = Initials.height()/Initials.find('ul>li').length;
    // Initials.find('ul>li').height(_h);

    $(".initials ul li").click(function(){
        var _this=$(this);
        var LetterHtml=_this.html();
        LetterBox.html(LetterHtml).fadeIn();

        Initials.css('background','rgba(145,145,145,0.6)');

        setTimeout(function(){
            Initials.css('background','rgba(145,145,145,0)');
            LetterBox.fadeOut();
        },1000);

        var _index = _this.index()
        if(_index==0){
            $('html,body').animate({scrollTop: '0px'}, 300);//点击第一个滚到顶部
        }else if(_index==27){
            var DefaultTop=$('#default').position().top;
            $('html,body').animate({scrollTop: DefaultTop+'px'}, 300);//点击最后一个滚到#号
        }else{
            var letter = _this.text();
            if($('#'+letter).length>0){
                var LetterTop = $('#'+letter).position().top;
                $('html,body').animate({scrollTop: LetterTop-45+'px'}, 300);
            }
        }
    })

    var windowHeight=$(window).height();
    var InitHeight=windowHeight-45;
    Initials.height(InitHeight);
    var LiHeight=InitHeight/26;
    Initials.find('li').height(LiHeight);
}


function initials(callback) {//公众号排序
    var SortList=$(".sort_list");
    var SortBox=$(".sort_box");
    SortList.sort(asc_sort).appendTo('.sort_box');//按首字母排序
    function asc_sort(a, b) {
        return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
    }

    var initials = [];
    var num=0;
    SortList.each(function(i) {
    	if($(this).find('.num_name').text() == "热门品牌")return;
        var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
        if(initial>='A'&&initial<='Z'){
            if (initials.indexOf(initial) === -1)
                initials.push(initial);
        }else{
            num++;
        }

    });

    $.each(initials, function(index, value) {//添加首字母标签
        SortBox.append('<div class="sort_letter" id="'+ value +'">' + value + '</div><div class="cont '+value+'"></div>');
    });
    if(num!=0){SortBox.append('<div class="sort_letter" id="default">#</div>');}

    for (var i =0;i<SortList.length;i++) {//插入到对应的首字母后面
        var letter=makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
        switch(letter){
            case "A":
                $('#A').next(".cont").append(SortList.eq(i));
//              _sort($('#A'));
                break;
            case "B":
                $('#B').next(".cont").append(SortList.eq(i));
//              _sort($('#B'));
                break;
            case "C":
                $('#C').next(".cont").append(SortList.eq(i));
//              _sort($('#C'));
                break;
            case "D":
                $('#D').next(".cont").append(SortList.eq(i));
//              _sort($('#D'));
                break;
            case "E":
                $('#E').next(".cont").append(SortList.eq(i));
//              _sort($('#E'));
                break;
            case "F":
                $('#F').next(".cont").append(SortList.eq(i));
//              _sort($('#F'));
                break;
            case "G":
                $('#G').next(".cont").append(SortList.eq(i));
//              _sort($('#G'));
                break;
            case "H":
                $('#H').next(".cont").append(SortList.eq(i));
//              _sort($('#H'));
                break;
            case "I":
                $('#I').next(".cont").append(SortList.eq(i));
//              _sort($('#I'));
                break;
            case "J":
                $('#J').next(".cont").append(SortList.eq(i));
//              _sort($('#J'));
                break;
            case "K":
                $('#K').next(".cont").append(SortList.eq(i));
//              _sort($('#K'));
                break;
            case "L":
                $('#L').next(".cont").append(SortList.eq(i));
//              _sort($('#L'));
                break;
            case "M":
                $('#M').next(".cont").append(SortList.eq(i));
//              _sort($('#M'));
                break;
            case "N":
                $('#N').next(".cont").append(SortList.eq(i));
//              _sort($('#N'));
                break;
            case "O":
                $('#O').next(".cont").append(SortList.eq(i));
//              _sort($('#O'));
                break;
            case "P":
                $('#P').next(".cont").append(SortList.eq(i));
//              _sort($('#P'));
                break;
            case "Q":
                $('#Q').next(".cont").append(SortList.eq(i));
//              _sort($('#Q'));
                break;
            case "R":
                $('#R').next(".cont").append(SortList.eq(i));
//              _sort($('#R'));
                break;
            case "S":
                $('#S').next(".cont").append(SortList.eq(i));
//              _sort($('#S'));
                break;
            case "T":
                $('#T').next(".cont").append(SortList.eq(i));
//              _sort($('#T'));
                break;
            case "U":
                $('#U').next(".cont").append(SortList.eq(i));
//              _sort($('#U'));
                break;
            case "V":
                $('#V').next(".cont").append(SortList.eq(i));
//              _sort($('#V'));
                break;
            case "W":
                $('#W').next(".cont").append(SortList.eq(i));
//              _sort($('#W'));
                break;
            case "X":
                $('#X').next(".cont").append(SortList.eq(i));
//              _sort($('#X'));
                break;
            case "Y":
                $('#Y').next(".cont").append(SortList.eq(i));
//              _sort($('#Y'));
                break;
            case "Z":
                $('#Z').next(".cont").append(SortList.eq(i));
//              _sort($('#Z'));
                break;
            default:
                $('#default').next(".cont").append(SortList.eq(i));
                break;
        }
        
    };
//  var ttWrap = $(".sort_letter");
//  $.each(ttWrap,function(){
//		_sort($(this));      	
//  })
//  
//  function _sort(v){
//  	var i = v.attr("id");
//  	if(i == "热门品牌")return;
//  	var o = $("."+i).find(".sort_list");
//  	console.log(o)
//  	$.each(o,function(i,el){
//      	$.each(o,function(j,jl){
//      		if($(el).attr("data-id") > $(jl).attr("data-id")){
//      			$(jl).insertBefore($(el));
//      			return false;
//      		}
//      	})
//  	})
//  }

	if(callback){
		callback();
	}
    then();
}
