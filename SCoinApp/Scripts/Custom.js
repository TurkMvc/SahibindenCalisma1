var tpes = ["line", "stackedline", "fullstackedline"];


//Öncelikle kodumun okunamaz olduğundan dolayı özür dilerim :D Yoal javascript ile çıkınca toparlayamadım OOP yeteneği server side dile göre uygun olmadığı için biraz karman çorban oldu :)


var chartInstance;
var data = [{
    date: 1970,
    coinType: "Saudi Arabia",
    value: 192.2
}, {
    date: 1970,
    coinType: "USA",
    value: 533.5
}, {
    date: 1970,
    coinType: "Iran",
    value: 192.6
}, {
    date: 1970,
    coinType: "Mexico",
    value: 24.2
}, {
    date: 1980,
    coinType: "Saudi Arabia",
    value: 509.8
}, {
    date: 1980,
    coinType: "USA",
    value: 480.2
}, {
    date: 1980,
    coinType: "Iran",
    value: 74.3
}, {
    date: 1980,
    coinType: "Mexico",
    value: 107.2
}, {
    date: 1990,
    coinType: "Saudi Arabia",
    value: 342.6
}, {
    date: 1990,
    coinType: "USA",
    value: 416.6
}, {
    date: 1990,
    coinType: "Iran",
    value: 162.8
}, {
    date: 1990,
    coinType: "Mexico",
    value: 146.3
}, {
    date: 1990,
    coinType: "Russia",
    value: 515.9
}, {
    date: 2000,
    coinType: "Saudi Arabia",
    value: 456.3
}, {
    date: 2000,
    coinType: "USA",
    value: 352.6
}, {
    date: 2000,
    coinType: "Iran",
    value: 191.3
}, {
    date: 2000,
    coinType: "Mexico",
    value: 171.2
}, {
    date: 2000,
    coinType: "Russia",
    value: 323.3
}, {
    date: 2008,
    coinType: "Saudi Arabia",
    value: 515.3
}, {
    date: 2008,
    coinType: "USA",
    value: 304.9
}, {
    date: 2008,
    coinType: "Iran",
    value: 209.9
}, {
    date: 2008,
    coinType: "Mexico",
    value: 157.7
}, {
    date: 2008,
    coinType: "Russia",
    value: 488.5
}, {
    date: 2009,
    coinType: "Saudi Arabia",
    value: 459.5
}, {
    date: 2009,
    coinType: "USA",
    value: 325.3
}, {
    date: 2009,
    coinType: "Iran",
    value: 202.4
}, {
    date: 2009,
    coinType: "Mexico",
    value: 147.5
}, {
    date: 2009,
    coinType: "Russia",
    value: 494.2
}
];
var sCoin;
var bitCoin;
var EthCoin;
function SendRequest(url, options) {

    var _options = $.extend(true, {
        dataType: "json",
        data: {},
        callbackFunction: null,
        errorFunction: null,
        contentType: null,
        type: "POST",
        async: true
    }, options);

    $.ajax({
        type: _options.type,
        async: _options.async,
        dataType: _options.dataType,
        url: url,
        data: JSON.stringify(_options.data),
        success: function (responseData) {
            if (_options.callbackFunction) _options.callbackFunction(responseData);
        },
        error: function (responseData) {

            if (_options.errorFunction) _options.errorFunction();

        },
        done: function (responseData) {

        }
    });
}
function FindAllCoins(time) {
    result = words.filter(word => word.length > 6);
}
function GetParseChart(dataSource) {
    chartInstance = $("#generalChart").dxChart({
        palette: "violet",
        dataSource: dataSource,
        commonSeriesSettings: {
            argumentField: "date",
            valueField: "value",
            type: "bar"
        },
        seriesTemplate: {
            nameField: "coinType",
            customizeSeries: function (valueFromNameField) {
                return valueFromNameField === 2009 ? { type: "line", label: { visible: true }, color: "#ff3f7a" } : {};
            }
        },
        title: {
            text: "Coin Production"
        },
        "export": {
            enabled: true
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 3,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                return {
                    text: arg.seriesName + " -> " + arg.valueText + " $"
                };
            }
        },
        onLegendClick: function (e) {
            var series = e.target;
            if (series.isVisible()) {
                series.hide();
            } else {
                series.show();
            }
        }
    }).dxChart("instance");

}
function GetSCoin() {
    $.get("https://devakademi.sahibinden.com/history", function (data) {
        var oldItmes = chartInstance._dataSource._items;
        for (var i in data) {

            oldItmes.push({
                date: new Date(data[i].date),
                coinType: "SCoin",
                value: data[i].value
            });
        }

        chartInstance.option({ dataSource: oldItmes });
    });
}
function ConvertDate(day, month, year) {
    return new Date(year, month, day);
}
function GetBitCoin() {
    //

    $.get("https://api.coindesk.com/v1/bpi/historical/close.json?index=[USD/CNY]&start=2017-01-01&end=2017-12-10", function (data) {
        var oldItmes = chartInstance._dataSource._items;
        var jObjectData = JSON.parse(data);
        for (var key in jObjectData.bpi) {
            var dateArr = key.split("-");
            oldItmes.push({
                date: new Date(dateArr[0], dateArr[1], dateArr[2]),
                coinType: "BitCoin",
                value: jObjectData.bpi[key]
            });
        }

        chartInstance.option({ dataSource: oldItmes });
    });
}
function onLoadHandler(domObject) {
    console.log(domObject);
}
function Any(arr, date) {
    for (var i in arr) {
        if (arr[i].date == date) {
            return true;
        }
    }
    return false;
}
function GetEthereumCoins() {
    $.get("/api/Coins/GetEthereum", function (jObjectData) {
        var oldItmes = chartInstance._dataSource._items;
        var newArray = oldItmes.concat(jObjectData);

        chartInstance.option({ dataSource: newArray });

    });
}
function DateString(time) {
    var date = new Date(time);
    return (date.toLocaleDateString() + " " + date.toLocaleTimeString());
}
function GetCurrentPrice() {
    $.get("https://devakademi.sahibinden.com/ticker", function (jObjectData) {
        $($("#sCoinRow td")[1]).text(jObjectData.value + " $");
        $($("#sCoinRow td")[2]).text(DateString(jObjectData.date));
        sCoin = jObjectData.value;
        var coin = MyCoin("sCoin");
        $($("#sCoinRow td")[3]).text(coin.Total);
        $($("#sCoinRow td")[4]).text(coin.Spend + " $");
        $($("#sCoinRow td")[5]).text((coin.Total * sCoin) + " $");

        $($("#sCoinRow td")[6]).text(Kazanc(coin.Spend, (coin.Total * sCoin)) + "%");

    });
    $.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD", function (jObjectData) {
        $($("#ethCoinRow td")[1]).text(jObjectData.USD + " $");;
        $($("#ethCoinRow td")[2]).text(DateString(new Date()));
        EthCoin = jObjectData.USD;

        var coin = MyCoin("ethCoin");
        $($("#ethCoinRow td")[3]).text(coin.Total);
        $($("#ethCoinRow td")[4]).text(coin.Spend + " $");
        $($("#ethCoinRow td")[5]).text((coin.Total * EthCoin) + " $");
        $($("#ethCoinRow td")[6]).text(Kazanc(coin.Spend, (coin.Total * EthCoin)) + "%");
    });
    $.get("https://api.coindesk.com/v1/bpi/currentprice.json", function (data) {
        var jObjectData = JSON.parse(data);
        $($("#bitCoinRow td")[1]).text(jObjectData.bpi.USD.rate + " $");
        $($("#bitCoinRow td")[2]).text(DateString(jObjectData.time.updated));
        bitCoin = jObjectData.bpi.USD.rate_float;

        var coin = MyCoin("bitCoin");
        $($("#bitCoinRow td")[3]).text(coin.Total);
        $($("#bitCoinRow td")[4]).text(coin.Spend + " $");
        $($("#bitCoinRow td")[5]).text((coin.Total * bitCoin) + " $");
        $($("#bitCoinRow td")[6]).text(Kazanc(coin.Spend, (coin.Total * bitCoin)) + "%");
    });
}
function CoinAlim_Click(rowId) {
    var currentCoin;
    if (rowId == "sCoinRow") {
        currentCoin = sCoin;
    } else if (rowId == "bitCoinRow") {
        currentCoin = bitCoin;
    } else if (rowId == "ethCoinRow") {
        currentCoin = EthCoin;
    }
    var adet = $("#" + rowId + " input").val();
    if (confirm(adet + " Tane almak istediğinize emin misiniz?")) {
        CoinAl(adet, rowId.replace("Row", ""), currentCoin);
    }
}
function CoinAl(adet, key, currentCoin) {
    var myCoins = JSON.parse(sessionStorage.getItem(key));
    if (!myCoins) {
        myCoins = { Total: 0, Spend: 0 };
    }
    myCoins.Total = parseInt(myCoins.Total) + parseInt(adet);
    myCoins.Spend = parseInt(myCoins.Spend) + (adet * currentCoin);
    sessionStorage.setItem(key, JSON.stringify(myCoins));
    GetCurrentPrice();
}
function Kazanc(harcanan, suankiDeger) {
    var fark = suankiDeger - harcanan;
    var kazanc = fark * 100 / harcanan;
    return Math.round(kazanc * 100) / 100;
}
function MyCoin(key) {
    var myCoins = JSON.parse(sessionStorage.getItem(key));
    if (!myCoins) {
        myCoins = { Total: 0, Spend: 0 }
    }
    return myCoins;

}
GetParseChart([]);

GetSCoin();
GetBitCoin();
GetEthereumCoins();
GetCurrentPrice();
setInterval(GetCurrentPrice, 5000);