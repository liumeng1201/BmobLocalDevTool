function requestDatas(modules, url) {
    var http = modules.oHttp;
    //发起Get请求
    http({url: url, json: true}, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            var tmp = JSON.stringify(body.results);
            if (tmp == null || tmp == undefined || tmp == '') {
                return;
            }
            tmp = tmp.replace(/_id/g, "id");
            tmp = tmp.replace(/_ns/g, "ns");
            tmp = tmp.replace(/createdAt/g, "time");
            var results = JSON.parse(tmp);

            var iOSs = results.iOS;
            for (var i in iOSs) {
                var item = iOSs[i];
                insertData(modules, "GankPosts", item);
            }
            var Androids = results.Android;
            for (var i in Androids) {
                var item = Androids[i];
                insertData(modules, "GankPosts", item);
            }
            var videos = results.休息视频;
            for (var i in videos) {
                var item = videos[i];
                insertData(modules, "GankPosts", item);
            }
            var fronts = results.前端;
            for (var i in fronts) {
                var item = fronts[i];
                insertData(modules, "GankPosts", item);
            }
            var fulis = results.福利;
            for (var i in fulis) {
                var item = fulis[i];
                insertData(modules, "GankPosts", item);
            }
        }
    });
}

function insertData(modules, dbName, dbData) {
    var db = modules.oData;
    db.find({
        "table": dbName,
        "where": {"id": dbData.id}
    }, function (err, data) {
        var resultObject = JSON.parse(data);
        var tmp = resultObject.results;
        if (tmp == null || tmp == undefined || tmp == '') {
            db.insert({
                "table": dbName,
                "data": dbData
            }, function (err, data) {
            });
        }
    });
}

function getHistoryDatas(modules) {
    var http = modules.oHttp;
    //发起Get请求
    http({url: "http://gank.io/api/day/history", json: true}, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            var tmp = JSON.stringify(body.results);
            if (tmp == null || tmp == undefined || tmp == '') {
                return;
            }
            tmp = tmp.replace(/-/g, "/");
            var results = JSON.parse(tmp);

            for (var i in results) {
                var item = results[i];
                var url = "http://gank.io/api/day/" + item;
                requestDatas(modules, url);
            }
        }
    });
}

function onRequest(request, response, modules) {
    /*
     var myDate = new Date();
     var yearMin = 2015;
     var yearMax = myDate.getFullYear();
     for (var year = yearMin; year <= yearMax; year++) {
     for (var month = 1; month <= 12; month++) {
     for (var day = 1; day <= 31; day++) {
     var url = "http://gank.io/api/day/" + year + "/" + month + "/" + day;
     requestDatas(modules, url);
     }
     }
     }*/
    getHistoryDatas(modules);
}
exports.hello = onRequest;