// 根据id来获取元素
function $(id) {
    return document.getElementById(id);
  }
  
  // 创建div, className是其类名
  function creatediv(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
  }
  var clock = null;
  var state = 0;
  var speed = 4;
  var flag = false;
  
  //点击开始游戏按钮 开始游戏
  function start() {
    if (!flag) {
      init();
    } else {
      alert('游戏已经开始，无须再次点击！');
    }
  }
  
  /*
   *    初始化 init
   */
  function init() {
    flag = true;
    for (var i = 0; i < 4; i++) {
      createrow();
    }
    // 添加onclick事件
    $('main').onclick = function (ev) {
      ev = ev || event;
      judge(ev);
    };
  
    // 定时器 每30毫秒调用一次move()
    clock = window.setInterval('move()', 30);
  }
  
  // 判断是否点击黑块、白块
  function judge(ev) {
    if (
      ev.target.className.indexOf('black') == -1 &&
      ev.target.className.indexOf('cell') !== -1
    ) {
      ev.target.parentNode.pass1 = 1; //定义属性pass，表示此行row的白块已经被点击
    }
  
    if (ev.target.className.indexOf('black') !== -1) {
      //点击目标元素 类名中包含 black 说明是黑块
      ev.target.className = 'cell';
      ev.target.parentNode.pass = 1; //定义属性pass，表明此行row的黑块已经被点击
      score();
    }
  }
  
  // 判断游戏是否结束
  
  function over() {
    var rows = con.childNodes;
    if (rows.length == 5 && rows[rows.length - 1].pass !== 1) {
      fail();
    }
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].pass1 == 1) {     
        fail();
      }
    }
  }
  
  // 游戏结束
  function fail() {
    clearInterval(clock);
    flag = false;
    confirm('你的最终得分为 ' + parseInt($('score').innerHTML));
    var con = $('con');
    con.innerHTML = '';
    $('score').innerHTML = 0;
    con.style.top = '-408px';
    speed = 2;
  }
  
  // 创造一个<div class="row">并且有四个子节点<div class="cell">
  function createrow() {
    var con = $('con');
    var row = creatediv('row'); //创建div className=row
    var arr = creatcell(); //定义div cell的类名,其中一个为cell black
    if (con.firstChild == null) {
      con.appendChild(row);
     }else {
      con.insertBefore(row, con.firstChild);
    }
    for (var i = 0; i < 4; i++) {
      row.appendChild(creatediv(arr[i])); //添加row的子节点 cell
    }
  }
  
  // 创建一个类名的数组，其中一个为cell black, 其余为cell
  function creatcell() {
    var temp = ['cell', 'cell', 'cell', 'cell'];
    var i = Math.floor(Math.random() * 4); //随机产生黑块的位置 Math.random()函数参数 0~1的随机数
    temp[i] = 'cell black';
    console.log(temp[0],temp[1],temp[2],temp[3]);
    return temp;
  }
  
  //让黑块动起来
  function move() {
    var con = $('con');
    var top = parseInt(window.getComputedStyle(con, null)['top']);
  
    if (speed + top > 0) {
      top = 0;
    } else {
      top += speed;
    }
    con.style.top = top + 'px'; //不断移动top值，使它动起来
    over();
    if (top == 0) {
      console.log(con.childNodes.length);
      createrow();
      con.style.top = '-102px';
      
      delrow();
      // clearInterval(clock);
    }
  }
  
  // 加速函数
  function speedup() {
    speed += 2;
    if (speed == 8) {
      alert('你超神了');
    }
  }
  
  //删除某行
  function delrow() {
    var con = $('con');
    if (con.childNodes.length == 6) {
      con.removeChild(con.lastChild);
    }
  }
  
  // 记分
  function score() {
    var newscore = parseInt($('score').innerHTML) + 1; //分数加一
    $('score').innerHTML = newscore; //修改分数
    if (newscore % 10 == 0) {
      //当分数是10 的倍数时使用加速函数，越来越快
      speedup();
    }
  }