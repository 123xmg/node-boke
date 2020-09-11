function serializeArrayToJson(from) {
    var result = {};
    var f = from.serializeArray();
    f.forEach(function(item) {
        result[item.name] = item.value;
    })
    return result;
}