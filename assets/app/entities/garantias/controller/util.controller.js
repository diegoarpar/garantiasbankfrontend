function txtToJson(txtToJson, $scope) {
    $scope.all_columns = [];
    var head = true;
    var json=[];

    for (var i = 0; i < txtToJson.length; i++) {

        txtToJson[i]=txtToJson[i].split('"').join('');
        txtToJson[i]=txtToJson[i].split(';').join(',');
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

var downloadPDF= function (pdfName, image, dateList){
         var doc = new jsPDF('p', 'mm');
         doc.addImage(image, 'PNG', 10, 10);
         var y=41;
         for(var i=0;i<dateList.length;i++){
            doc.text(10, y, dateList[i].name+': '+dateList[i].value);
            y+=10;
         }
         var fileName="sample-file.pdf";
         if(pdfName!=null)fileName=pdfName;
         doc.save(fileName);
}

function construirTabla( $scope, dataSet,ngTableParams,$filter){

    $scope.data = dataSet;
	var table = new ngTableParams({
		page: 1,
		count: 1000

	}, {
		total: dataSet.length,

		getData: function ($defer, params) {
				params.total(dataSet.length);
				$scope.data = params.sorting() ? $filter('orderBy')(dataSet, params.orderBy()) : dataSet;
				$scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : dataSet;
				$scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
				$defer.resolve($scope.data);
		}
	});
    return table;
}
function getGenericHeader(window){
    var headers= {'Authorization': 'Bearer ' + window.localStorage.getItem('token')+","+window.sessionStorage.getItem("tenant")};
    return headers;
}
function getUrlServices(rootServices,service){
        switch (service) {
            case "garantias":
                // Blah
                break;
            case "menu":
                return rootServices.url+"menu";
            case "trd":
            // Blah
                break;
            case "regional":
            // Blah
                break;
            case "metadata":
            // Blah
                break;
        }
}
function handleSubmitServicePromise(promise,message){
    var _document=document;
    var img = document.createElement("IMG");        // Create a <button> element
    img.src="assets/image/logos/alistamientoProcesando.jpg";

    _document.body.appendChild(img);



    promise.$promise.then(function successCallback(data) {
            if(message) alert(message);

             _document.body.removeChild(img);

        }, function errorCallback(response) {

          var message = response.statusText;
          if(response.data)
            if(response.data.message)message+=response.data.message;
          alert(message)
           _document.body.removeChild(img);

        });
}
