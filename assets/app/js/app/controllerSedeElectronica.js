app.controller('MainCtrl',['$scope','ngTableParams','$filter', function ($scope,ngTableParams,$filter) {
    $scope.showContent = function($fileContent){
        alert($fileContent);
        var digital = $fileContent.split('\n');
        construirTabla($scope, digital,ngTableParams,$filter);
        //$scope.content = $fileContent;
    };
  }]);

app.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
                    var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
                                            var text=onLoadEvent.target.result;
                                            
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});


app.controller('ProductControlSedeElectronica', ['$scope', 'GarantiasServices','GarantiasService','GarantiasServiceGetGarantias','GarantiasServiceUpdateGarantias' ,'$location','ngTableParams','$filter',
    
    function ($scope, GarantiasServices,GarantiasService,GarantiasServiceGetGarantias,GarantiasServiceUpdateGarantias, $location,ngTableParams,$filter) {
        $scope.all_columns=[]; 
        $scope.columns=[]; 
        $scope.digital=[];
        $scope.digitalu=[];
        $scope.numero=[];
        $scope.rowDetail=[];
        $scope.dateStart = new Date();
        $scope.dateEnd = new Date();
        $scope.createNewUser = function () {
            $location.path('/user-list');
        };
         $scope.reset = function () {
             $scope.digital.selected = {};
        };
        $scope.removeRow = function(index) {
            $scope.digital.splice(index, 1);
            construirTabla($scope, $scope.digital,ngTableParams,$filter);
          };
        $scope.addRow = function() {
            $scope.inserted = {
              id: $scope.digital.length+1
            };
            $scope.digital.push($scope.inserted);
          };
          $scope.addColumn = function(title) {
               
            $scope.inserted = {
              title: title,
              checked:true,
              type:"string"
            };
            $scope.all_columns.push($scope.inserted);
          };
          
          $scope.getTemplate = function (c) {
              if($scope.digital.selected){
                if (c.id === $scope.digital.selected.id) return 'edit';
                 else return 'display';
                }
                else return 'display';
            };

        $scope.editRow = function (c) {
            $scope.digital.selected = angular.copy(c);
        };

        $scope.saveRow = function (idx) {
            
            $scope.digital[idx] = angular.copy($scope.digital.selected);
            $scope.reset();
        };
        
        $scope.completeInfo = function (idx,c) {
            $scope.selectedRow = c;
            $scope.selectedRowIndex = idx;
            $scope.rowDetails=[];
            $scope.rowDetail=[];
            datosFillComplementarios($scope);
            for(var key in c){
                
                        if(!$scope.rowDetails[key] && key.indexOf("$")===-1&&key!=="toJSON"){
                            $scope.rowDetails[key]=key;
                            $scope.rowDetail.push({key:key,value:c[key]});
                        }
                }
            
        };
        
         $scope.generatePlanillaNumber = function () {
             $scope.numero=GarantiasService.getNumber('');
            //GarantiasServices.create($scope.digital);
        };
         $scope.loadPlanillaToTula = function () {
             $scope.mapColumns=[];
             $scope.columns=[];
             $scope.all_columns=[];
            $scope.digital= GarantiasServiceGetGarantias.show({regional:$scope.regional,oficina:$scope.oficina,enviadoTula:"null"});
             $scope.digital.$promise.then(function(data) {
                 $scope.digital=data;
                 fillColumns(data, $scope);
              
            });
               
            
         };
         $scope.catchTula = function () {
              $scope.mapColumns=[];
             $scope.columns=[];
             $scope.all_columns=[];
            $scope.digital= GarantiasServiceGetGarantias.show({tula:$scope.tula,enviadoTula:"true",garantiaRecibida:"null"});
            $scope.digital.$promise.then(function(data) {
                 $scope.digital=data;
                 fillColumns(data, $scope);
              
            });
         };
                 
        $scope.catchGarantias = function () {
            $scope.mapColumns=[];
            $scope.columns=[];
            $scope.all_columns=[];
            $scope.digital= GarantiasServiceGetGarantias.show({tula:$scope.tula,enviadoTula:"true",garantiaRecibida:"true",garantiaIngresada:"null"});
            $scope.digital.$promise.then(function(data) {
                 $scope.digital=data;
                 fillColumns(data, $scope);
              
            });
         };
         
         $scope.sendTula = function () {
            concatTula($scope);
            GarantiasServiceUpdateGarantias.create($scope.digitalu);
            $scope.digital=[];
             $scope.digitalu=[];
         };
         $scope.saveCompleteInfoRow = function () {
            completeRowDetail($scope);
            concatGontenido($scope);
            GarantiasServiceUpdateGarantias.create($scope.digitalu);
             $scope.digital=[];
             $scope.digitalu=[];
         };
         
         $scope.checkInTula = function () {
            concatGarantia($scope);
            GarantiasServiceUpdateGarantias.create($scope.digitalu);
            $scope.digital=[];
             $scope.digitalu=[];
         };
         
         $scope.sendGarantia = function () {
            concatTula($scope);
            GarantiasServiceUpdateGarantias.create($scope.digitalu);
            $scope.digital=[];
             $scope.digitalu=[];
         };
         $scope.createPlanilla = function () {
            concatNumber($scope);
            GarantiasServices.create($scope.digital);
            alert("REGISTRO REALIZADO CON EL ACUSE "+$scope.numero[0].number) ;
             $scope.numero=[];
            $scope.digital=[];
            
        };
        
        $scope.showContent = function($fileContent){
            var jsontext = $fileContent.split('\n');
            jsontext=txtToJson(jsontext, $scope);
            $scope.digital = JSON.parse(jsontext);
        };
      
        $scope.export=function($event, fileName){
            $scope.helper.csv.generate($event, "report.csv");
            $location.href=$scope.helper.csv.link();
            };
             
                 
            $scope.$watch('all_columns', function() {
                update_columns();
              }, true);

              var update_columns = function() {
                $scope.columns = [];
                for (var i = 0; i < $scope.all_columns.length; i++) {
                  var column = $scope.all_columns[i];
                  if (column.checked) {
                    $scope.columns.push($scope.all_columns[i]);
                  }
                }
              };
    }]);

function txtToJson(txtToJson, $scope){
    $scope.all_columns=[];
    var head=false;
    var str="[";
    for(var i=1; i<txtToJson.length;i++){
        str+="{";
        str+="\"id\":\""+i+"\",";
        for(var j=0;j<txtToJson[i].split(',').length;j++){
            if(!head)$scope.all_columns.push({"title": ""+txtToJson[0].split(',')[j].trim()+"","type": "string","checked": true});
            if(txtToJson[0].split(',')[j]){
            str+="\""+txtToJson[0].split(',')[j].trim()+"\":\"";
            str+=txtToJson[i].split(',')[j].trim();
             str+="\",";
         }
        } 
        head=true;
        str=str.substr(0,str.length-1);
        str+="},";
    }
    str=str.substr(0,str.length-1);
    str+="]";
    
    return str;
    
}
function concatNumber($scope){
    for(var i=0;i<$scope.digital.length;i++){
        $scope.digital[i].acuse=$scope.numero[0].number;
    }
}
function concatTula($scope){
    var cont=0;
    for(var i=0;i<$scope.digital.length;i++){
        if($scope.digital[i].enviadoTula){
            
            $scope.digital[i].tula=$scope.tula;
            $scope.digital[i].fechaEnvioTula=new Date();
            $scope.digitalu[cont]=($scope.digital[i]);
            cont++;
        }
    }
}
function concatTula($scope){
    var cont=0;
    for(var i=0;i<$scope.digital.length;i++){
        if($scope.digital[i].enviadoTula){
            
            $scope.digital[i].tula=$scope.tula;
            $scope.digital[i].fechaEnvioTula=new Date();
            $scope.digitalu[cont]=($scope.digital[i]);
            cont++;
        }
    }
}
function concatGontenido($scope){
    var cont=0;
    $scope.selectedRow.fechaGarantiaIngresada=new Date();
    $scope.selectedRow.garantiaIngresada=true;
    $scope.digitalu[cont]=$scope.selectedRow;
    $scope.selectedRow={};
   
}
function fillColumns (list, $scope){
            for(var i=0;i<list.length;i++)
                for(var key in list[i]){
                        if(!$scope.mapColumns[key] && key.indexOf("$")===-1&&key!=="toJSON"){
                            $scope.mapColumns[key]=key;
                            $scope.all_columns.push({"title": ""+key+"","type": "string","checked": true});        
                        }
                }
        };
function concatGarantia($scope){
    var cont=0;
    for(var i=0;i<$scope.digital.length;i++){
        if($scope.digital[i].garantiaRecibida){
            $scope.digital[i].fechaRecepcionGarantia=new Date();
            $scope.digitalu[cont]=($scope.digital[i]);
            cont++;
        }
    }
}
function construirTabla($scope, digital,ngTableParams,$filter){
     //digital=ReportServicesTelefonica.show({processName:"NINGUNA",dateStart:$scope.dateStart.toDateString(),dateEnd:$scope.dateStart.toDateString()});
        
           $scope.data = digital;
            $scope.tablaGarantias = new ngTableParams({
                page: 1,
                count: 2000,
                sorting: {firstname:'asc'}
            }, {
                total: digital.length, 
                
                getData: function ($defer, params) {
                        params.total(digital.length);
                        $scope.data = params.sorting() ? $filter('orderBy')(digital, params.orderBy()) : digital;
                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : digital;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        $defer.resolve($scope.data);
                }
            });
    
}

function datosFillComplementarios($scope){
    $scope.datosCoplementarios=[];
    if($scope.rowDetail.tipoGarantia==6210||true){//hipotecaria
        $scope.datosCoplementarios[0]={key:"pagareOriginalPrendiaria",value:$scope.rowDetail["pagareOriginalPrendiaria"]?$scope.rowDetail["pagareOriginalPrendiaria"]:false};
        $scope.datosCoplementarios[1]={key:"cartaInstrucciones",value:$scope.rowDetail["cartaInstrucciones"]?$scope.rowDetail["cartaInstrucciones"]:false};
        $scope.datosCoplementarios[2]={key:"copiaMeritoEjecutivo",value:$scope.rowDetail["copiaMeritoEjecutivo"]?$scope.rowDetail["copiaMeritoEjecutivo"]:false};
        $scope.datosCoplementarios[3]={key:"folioMatriculaInmobiliaria",value:$scope.rowDetail["folioMatriculaInmobiliaria"]?$scope.rowDetail["folioMatriculaInmobiliaria"]:false};
        $scope.datosCoplementarios[4]={key:"tieneHuella",value:$scope.rowDetail["tieneHuella"]?$scope.rowDetail["tieneHuella"]:false};
        
    }else if($scope.rowDetail.tipoGarantia==6210){//prendaria
        
        
    }if($scope.rowDetail.tipoGarantia==6210){//personal
        
        
    }if($scope.rowDetail.tipoGarantia==6210){//especial
        
        
    }
}

function completeRowDetail($scope){
    for(var i=0;i<$scope.datosCoplementarios.length;i++)
            $scope.selectedRow[$scope.datosCoplementarios[i].key]=$scope.datosCoplementarios[i].value;
    
}