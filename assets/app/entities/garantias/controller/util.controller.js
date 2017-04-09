function txtToJson(txtToJson, $scope) {
    $scope.all_columns = [];
    var head = true;
    var json=[];
    for (var i = 0; i < txtToJson.length; i++) {
        txtToJson[i]=txtToJson[i].replace('"','');
        txtToJson[i]=txtToJson[i].replace(';',',');
        var headrow=txtToJson[0];
        var headcols=txtToJson[0].split(",");

        var jsonO={};

        var row = txtToJson[i];
        var cols= row.split(',');
        for (var j = 0; j < headcols.length; j++) {
            if (head)$scope.all_columns.push({
                "title": "" + cols[j].trim() + "",
                "type": "string",
                "checked": true
            });
            if (cols[j]&&!head) {
                var name=headcols[j];
                var value=cols[j];
                try{name=name.trim();}catch(e){}
                try{value=value.trim();}catch(e){}
                jsonO[name]=value;
            }
        }
        if (!head)
        json.push(jsonO);
        head = false;
    }
    return json;
};

function fillColumns(list, $scope) {
if(!$scope.mapColumns)$scope.mapColumns=[];
if(!$scope.all_columns)$scope.all_columns=[];

    for (var i = 0; i < list.length; i++)
        for (var key in list[i]) {
            if (!$scope.mapColumns[key] && key.indexOf("$") === -1 && key !== "toJSON") {
                $scope.mapColumns[key] = key;
                $scope.all_columns.push({"title": "" + key + "", "type": "string", "checked": true});
            }
        }
};

var update_columns = function ($scope) {
    $scope.columns = [];
    if(!$scope.mapColumns)$scope.mapColumns=[];
    for (var i = 0; i < $scope.all_columns.length; i++) {
        var column = $scope.all_columns[i];
        if (column.title != '_id'&&column.title != 'ingreso'
        &&column.title != 'envio'
        &&column.title != 'validaciones'
        &&column.title != 'completitud'
        &&column.title != 'idoneidad'
        &&column.title != 'datos'
        &&column.title != 'json') {
            if (column.checked) {
                $scope.columns.push($scope.all_columns[i]);
            }
        }else{
            column.checked=false;
        }
    }
};

var rowDetailShow = function(row){
    if(row["key"].includes("$")){
        return false;
    }
    if(row["key"].includes("toJSON")){
            return false;
        }
    if(row["key"].includes("ingreso")||row["key"].includes("envio")||row["key"].includes("validaciones")||row["key"].includes("_id")||row["key"].includes("completitud")||row["key"].includes("idoneidad")||row["key"].includes("datos")){
                return false;
            }
    return true;
}

var generateBarCodePDF = function (code, document, text) {
    var doc = new jsPDF('1', 'mm', [60, 35]);
    doc.text(0, 5, text);
    //var htmlBarcode = document.createElement('div');
    //htmlBarcode.barcode(code, "code128",{output:"svg"});
    $("#bcTarget").barcode(code, "code128", {output: "svg"});
    var canvas = document.createElement('canvas');
    //var canvas = $('micanvas');
    var imgData = $("#bcTarget")[0].childNodes[0].data;
    temp_img2 = new Image();
    temp_img2.src = imgData;
    //temp_img2.src = htmlBarcode.childNodes[0].data;
    canvas.id = 'canvas'
    canvas.visible = false;
    //canvas.display="none";
    document.body.appendChild(canvas);
    canvas.width = 500;
    canvas.height = 500;
    var context = canvas.getContext('2d');
    context.drawImage(temp_img2, 0, 25);

    html2canvas($("#canvas"), {
            onrendered: function (canvas) {
                var imgData = canvas.toDataURL('image/png');
                $("#canvas").hide();
                doc.addImage(imgData, 'PNG', 1, 0);
                doc.save('doc.pdf');
            }
        }
    );
    $("#bcTarget").barcode("", "code128", {output: "svg"});

};