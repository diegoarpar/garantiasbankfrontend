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
        &&column.title != 'ubicacionbodega'
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
    if(row["key"].includes("ingreso")||row["key"].includes("envio")||row["key"].includes("validaciones")||row["key"].includes("_id")||row["key"].includes("completitud")||row["key"].includes("idoneidad")
    ||row["key"].includes("datos")||row["key"].includes("ubicacionbodega")){
                return false;
            }
    return true;
}



function getBase64Image(img,width,height) {

    var canvas = document.createElement("canvas");

    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/jpeg");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

}
var downloadPDF= function (pdfName, image, dateList){
         var logo = new Image();
         var doc = new jsPDF('p', 'mm');
         logo.src=document.getElementById("logoTenant").src;
         logo.onload = function(){var dataURI = getBase64Image(logo);return dataURI;}

         doc.addImage(logo.onload(), 'PNG', 0, 0,100,30);
         doc.addImage(image, 'PNG', 40, 35,140,30);
         var y=70;

         for(var i=0;i<dateList.length;i++){
            doc.text(42, y, dateList[i].name+': '+dateList[i].value);
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
function openModal($scope,$uibModal,htmlPath,controller){

        var modalInstance = $uibModal.open({
                templateUrl: htmlPath,
                controller: controller,
                scope: $scope,
                size: 'lg'
            }
        );


}
function setStyleSheet(tenant){


    if(document.getElementById("logoTenant")!=null){
        var link=document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.media = 'screen';
          link.href = 'assets/css/'+tenant+'.css';
          document.getElementsByTagName('head')[0].appendChild(link);

        var logo = document.getElementById("logoTenant");
            logo.src="./assets/image/logos/"+tenant+".png";
    }

}
function getGenericHeader(window){
    var headers= {'Authorization': 'Bearer ' + window.localStorage.getItem('token')+","+window.localStorage.getItem("tenant")};
    return headers;
}
function getUrlServices(rootServices,service){
        switch (service) {
            case "garantias":
                // Blah
                break;
            case "menu":
                return rootServices.url+"menu";
            case "parametric":
                return rootServices.url+"config/garantias-parametricvalues";
            case "parametricSearch":
                return rootServices.url+"config/garantias-parametricsearch";
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
function showWaiteImage(showImage){
        var _document=document;
        if(showImage==true){
            var img = _document.getElementById("waitingImage");
            if(img==null){
                img = document.createElement("IMG");
                img.setAttribute("class","loadingIcon");
                img.src="assets/image/logos/loadingIcon.gif";
                img.id="waitingImage";

                _document.body.appendChild(img);

            }
        }else{
            var img = _document.getElementById("waitingImage");
            if(img!=null){
                _document.body.removeChild(img);

            }
        }

}
function handleSubmitServicePromise(promise,message){
    showWaiteImage(true);
    promise.$promise.then(function successCallback(data) {
            if(message) alert(message);
            showWaiteImage(false);
        }, function errorCallback(response) {
            showWaiteImage(false);
          var message = response.statusText;
          if(response.data)
            if(response.data.message)message+=response.data.message;
          alert(message)


        });
}

function concatStageRow(name,row,subserie,tipodocumento){

            if(row.validaciones==null)row.validaciones={};
            row.validaciones[name]=true;
            row[name]={};
            row[name].general=[];
            row[name].tipoDocumento={};
            for(var i=0;i<subserie.length;i++){
                for(var j=0;j<subserie[i].metadata.length;j++){
                    if(subserie[i].metadata[j]["fieldType"]==name){
                        row[name].general.push(subserie[i].metadata[j]);
                    }
                }
            }
            for(var i=0;i<tipodocumento.length;i++){
                for(var j=0;j<tipodocumento[i].metadata.length;j++){
                    if(row[name].tipoDocumento[tipodocumento[i].key]==null)
                    row[name].tipoDocumento[tipodocumento[i].key]=[];
                    if(tipodocumento[i].metadata[j]["fieldType"]==name){
                        row[name].tipoDocumento[tipodocumento[i].key].push(tipodocumento[i].metadata[j]);
                    }
                }
            }

            return row;

}

function getMenu(){

    var data={};
    data.nodes=[
                 {href:"product-list-portales",label:"Inicio",image:"",controller:""}
                ,{href:"",label:"Bodega",image:"",controller:""}
                ,{href:"",label:"Consultas funcionarios",image:"",controller:""}
                ,{href:"",label:"Administracion",image:"",controller:""}
                ];
    data.nodes[1].nodes=[
                 {href:"",label:"Recepción",image:"",controller:""}
                ,{href:"",label:"Punteo",image:"",controller:""}
                ,{href:"",label:"Consultas y Carga de archivos",image:"",controller:""}
                 ];
    data.nodes[1].nodes[0].nodes=[
                 {href:"product-list-acuse-recibido-garantia",label:"1. Recepción de documentos",image:"",controller:""}
                 ,{href:"product-list-alistamiento-tulas",label:"2. Alistar unidades de carga selladas",image:"",controller:""}
                 ,{href:"carga-directa-bodega",label:"3. Carga Directa y Masiva",image:"",controller:""}

                 ];
    data.nodes[1].nodes[1].nodes=[
                 {href:"product-list-recepcion-tulas-bodega",label:"1. Recepción de unidades de carga",image:"",controller:""}
                 ,{href:"product-list-recepcion-garantia-contenido",label:"2. Validación de completitud",image:"",controller:""}
                 ,{href:"product-list-recepcion-garantia-idoneidad",label:"3. Validación de idoneidad",image:"",controller:""}
                 ,{href:"product-list-recepcion-garantia-datos",label:"4. Validación de datos",image:"",controller:""}
                 ,{href:"administrar-ubicacion-bodega",label:"5. Ubicación en bodega y préstamos",image:"",controller:""}

                 ];
    data.nodes[1].nodes[2].nodes=[
                 {href:"dynamic-search",label:"1. Consultas",image:"",controller:""}
                 ];
    data.nodes[2].nodes=[
                 {href:"",label:"Consultas" ,image:"",controller:""}
                 ];
    data.nodes[2].nodes[0].nodes=[
                                 {href:"dynamic-search-functionary",label:"Consultas funcionarios",image:"",controller:""}
                                 ,{href:"dynamic-search-report",label:"Reportes",image:"",controller:""}
                                 ];
    data.nodes[3].nodes=[
                 {href:"",label:"Administración",controller:""}
                 ];
    data.nodes[3].nodes[0].nodes=[
                 {href:"administrador-usuarios",label:"Gestión de Usuarios",image:"",controller:""}
                 ,{href:"administrador-camposParametricos",label:"Gestión de tablas paramétricas",image:"",controller:""}
                 ,{href:"administrador-archivo",label:"Administrar Archivo",image:"",controller:""}
                 ,{href:"administrador-camposBusqueda",label:"Administrar de Búsqueda",image:"",controller:""}
                 ,{href:"organigrama",label:"Administrar Organigrama",image:"",controller:""}
                 ,{href:"regionales",label:"Administrar Regionales",image:"",controller:""}
                 ,{href:"administrador-reportes",label:"Administrar Reportes",image:"",controller:""}
                 ];

                 return data;
}


function getMetadataFactoryToSearch(data){

    var dataList=[];
    if(data!=null){
        for(var i=0;i<data.length;i++){
            dataList.push({fieldType:data[i].fieldType,label:data[i].fieldLabel,value:data[i].fieldValue,fieldQuery:data[i].condition})
        }

    }
    return dataList;

}


function validateFields($scope,autenticationUser, object,window,document,permission,field){

    if($scope.visibility.get(permission)==null){
    var promise=autenticationUser.userByToken({"token":window.localStorage.getItem('token')});
    promise.$promise.then(function (data){
        if(!!data&&data.length>0){
            var promise2=autenticationUser.showPermissions({"user":data[0].user,"name":object,"value":permission});
            promise2.$promise.then(function (data2){
                for(var i=0;i<data2.length;i++){

                    if(data2[i].value==permission){
                        $scope.visibility.set(permission,true)

                        return;
                    }

                }
                $scope.visibility.set(permission,false)
                deleteNode(document,field);
            });
        }

    }

    );
    }else if($scope.visibility.get(permission)==false){
            deleteNode(document,field);
    }

}

function deleteNode(document,field){
    document.getElementById(field).outerHTML='';
}

function loadSearchParameter($scope){

        var o={};
        if($scope.aditionalFilter!=null){
            o=JSON.parse(JSON.stringify($scope.aditionalFilter));
        }
        for(var i=0;i<$scope.lista.length;i++){
                var fieldKey=$scope.lista[i].value;
                var fieldType=$scope.lista[i].fieldType;
                var fieldQuery=$scope.lista[i].fieldQuery;
                do{ fieldKey=fieldKey.replace("__","."); }while(fieldKey.indexOf("__")>=0);

                if(fieldQuery=='__equal'){
                    o[fieldKey]={"$eq":$scope.lista[i].toSearch};
                }else if(fieldQuery=='__like'){
                    o[fieldKey]={"$regex":"^"+$scope.lista[i].toSearch+".*","$options": "i" };
                }else if(fieldQuery=='__morethan'){
                    o[fieldKey]={"$gte":$scope.lista[i].toSearch};
                }else if(fieldQuery=='__lesstan'){
                    o[fieldKey]={"$lte":$scope.lista[i].toSearch};
                }
                //o[fieldKey]=$scope.lista[i].toSearch;
        }

        if($scope.fondoSelected!=null){
            o["ingreso.empresa.key"]=$scope.fondoSelected.key;
         }
        if($scope.subserieseleccionada!=null){
            o["ingreso.subserie.key"]=$scope.subserieseleccionada.key;
         }

        return o;
}