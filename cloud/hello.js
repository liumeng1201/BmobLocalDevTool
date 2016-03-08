function onRequest(request, response, modules) {
    var http = modules.oHttp;
    var db = modules.oData;
    var dbName = "GankPosts";
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
                            db.find({
                                "table": dbName,
                                "where": {"id": item.id}
                            }, function (err, data) {
                                var resultObject = JSON.parse(data);
                                var tmp = resultObject.results;
                                if (tmp == null || tmp == undefined || tmp == '') {
                                    db.insert({
                                        "table": dbName,
                                        "data": item
                                    }, function (err, data) {
                                    });
                                }
                            });
                        }
                        var Androids = results.Android;
                        for (var i in Androids) {
                            var item = Androids[i];
                            db.find({
                                "table": dbName,
                                "where": {"id": item.id}
                            }, function (err, data) {
                                var resultObject = JSON.parse(data);
                                var tmp = resultObject.results;
                                if (tmp == null || tmp == undefined || tmp == '') {
                                    db.insert({
                                        "table": dbName,
                                        "data": item
                                    }, function (err, data) {
                                    });
                                }
                            });
                        }
                        var videos = results.休息视频;
                        for (var i in videos) {
                            var item = videos[i];
                            db.find({
                                "table": dbName,
                                "where": {"id": item.id}
                            }, function (err, data) {
                                var resultObject = JSON.parse(data);
                                var tmp = resultObject.results;
                                if (tmp == null || tmp == undefined || tmp == '') {
                                    db.insert({
                                        "table": dbName,
                                        "data": item
                                    }, function (err, data) {
                                    });
                                }
                            });
                        }
                        var fronts = results.前端;
                        for (var i in fronts) {
                            var item = fronts[i];
                            db.find({
                                "table": dbName,
                                "where": {"id": item.id}
                            }, function (err, data) {
                                var resultObject = JSON.parse(data);
                                var tmp = resultObject.results;
                                if (tmp == null || tmp == undefined || tmp == '') {
                                    db.insert({
                                        "table": dbName,
                                        "data": item
                                    }, function (err, data) {
                                    });
                                }
                            });
                        }
                        var fulis = results.福利;
                        for (var i in fulis) {
                            var item = fulis[i];
                            db.find({
                                "table": dbName,
                                "where": {"id": item.id}
                            }, function (err, data) {
                                var resultObject = JSON.parse(data);
                                var tmp = resultObject.results;
                                if (tmp == null || tmp == undefined || tmp == '') {
                                    db.insert({
                                        "table": dbName,
                                        "data": item
                                    }, function (err, data) {
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}
exports.hello = onRequest;