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

function delItem(modules, item) {
    var db = modules.oData;
    db.find({
        "table": "GankPosts",
        "where": {"id": item.id}
    }, function (err, data) {
        var resultObject = JSON.parse(data);
        var tmp = resultObject.results;
        for (var j in tmp) {
            var itemDel = tmp[j];
            if (itemDel.objectId != item.objectId) {
                db.remove({
                    "table": "GankPosts",
                    "objectId": itemDel.objectId
                }, function (err, data) {
                    if (err) {
                        console.log("delete " + itemDel.objectId + " failed");
                    } else {
                        console.log("id = " + item.objectId + ", delete " + itemDel.objectId + " success");
                    }
                });
            }
        }
    });
}

function removeRepeat(modules) {
    var db = modules.oData;
    db.find({
        "table": "GankPosts"
    }, function (err, data) {
        var results = (JSON.parse(data)).results;
        for (var i in results) {
            var item = results[i];
            delItem(modules, item);
        }
    });
}

function onRequest(request, response, modules) {
//    getHistoryDatas(modules);
    removeRepeat(modules);
}
exports.hellobak = onRequest;