var jms = null,
    timeHandle = null;
window.onload = function () {
    var radios = document.getElementsByName("level");
    for (var i = 0, j = radios.length; i < j; i++) {
        radios[i].onclick = function () {
            if (jms != null)
                if (jms.landMineCount > 0)
                    if (!confirm("确定结束当前游戏？"))
                        return false;
            var value = this.value;
            init(value, value, value * value / 5 - value, value * value / 5);
            document.getElementById("JMS_main").style.width = value * 40 + 180 + 60 + "px";
        }
    }
    init(10, 10);
};

function init(rowCount, colCount, minLandMineCount, maxLandMineCount) {
    var doc = document,
        landMineCountElement = doc.getElementById("landMineCount"),
        timeShow = doc.getElementById("costTime"),
        beginButton = doc.getElementById("begin");
    if (jms != null) {
        clearInterval(timeHandle);
        timeShow.innerHTML = 0;
        landMineCountElement.innerHTML = 0;
    }
    jms = JMS("landmine", rowCount, colCount, minLandMineCount, maxLandMineCount);
    jms.endCallBack = function () {
        clearInterval(timeHandle);
    };
    jms.landMineCallBack = function (count) {
        landMineCountElement.innerHTML = count;
    };

    //为“开始游戏”按钮绑定事件
    beginButton.onclick = function () {
        jms.play();//初始化

        //显示地雷个数
        landMineCountElement.innerHTML = jms.landMineCount;

        //开始
        jms.begin();

        //更新花费时间
        timeHandle = setInterval(function () {
            timeShow.innerHTML = parseInt((new Date() - jms.beginTime) / 1000);
        }, 1000);
    };
}