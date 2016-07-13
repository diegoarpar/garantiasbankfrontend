/*! Angular-PDF Version: 1.3.0 | Released under an MIT license */
(function() {

  'use strict';

  angular.module('pdf', []).directive('ngPdf', [ '$window', '$timeout', function($window, $timeout) {
    var renderTask = null;
    var pdfLoaderTask = null;
    var debug = false;

    var backingScale = function(canvas) {
      var ctx = canvas.getContext('2d');
      var dpr = window.devicePixelRatio || 1;
      var bsr = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1;

      return dpr / bsr;
    };

    var setCanvasDimensions = function(canvas, w, h) {
      var ratio = backingScale(canvas);
      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
      canvas.style.width = Math.floor(w) + 'px';
      canvas.style.height = Math.floor(h) + 'px';
      canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
      return canvas;
    };
    return {
      restrict: 'E',
      scope: {
        canvasid: "=canvasid",
        currentPdfUrl: '=currentPdfUrl'
      },
      templateUrl: function(element, attr) {
        return attr.templateUrl ? attr.templateUrl : 'partials/viewer.html';
      },
      link: function(scope, element, attrs) {
        $timeout(function () {
          //DOM has finished rendering
        element.css('display', 'block');
        var url = scope.currentPdfUrl;
        var httpHeaders = scope.httpHeaders;
        scope.pdfDoc = null;
        var pageToDisplay = isFinite(attrs.page) ? parseInt(attrs.page) : 1;
        var pageFit = attrs.scale === 'page-fit';
        var scale = attrs.scale > 0 ? attrs.scale : 1;
        var canvasid = scope.canvasid == null ? 'pdf-canvas' :  scope.canvasid ;
        var canvas = document.getElementById(canvasid);

        debug = attrs.hasOwnProperty('debug') ? attrs.debug : false;
        var creds = attrs.usecredentials;
        var ctx = canvas.getContext('2d');
        var windowEl = angular.element($window);

        windowEl.on('scroll', function() {
          scope.$apply(function() {
            scope.scroll = windowEl[0].scrollY;
          });
        });

        PDFJS.disableWorker = true;
        scope.pageNum = pageToDisplay;

        scope.renderPage = function(num) {
          if (renderTask) {
            renderTask._internalRenderTask.cancel();
          }

          scope.pdfDoc.getPage(num).then(function(page) {
            var viewport;
            var pageWidthScale;
            var renderContext;

            if (pageFit) {
              viewport = page.getViewport(1);
              var clientRect = element[0].getBoundingClientRect();
              if(clientRect.height == 0){
                scale = 1;
              }
              else {
                pageWidthScale = clientRect.width / viewport.width;
                scale = pageWidthScale;
              }
            }
            viewport = page.getViewport(scale);

            setCanvasDimensions(canvas, viewport.width, viewport.height);

            renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };

            renderTask = page.render(renderContext);
            renderTask.promise.then(function() {
              if (typeof scope.onPageRender === 'function') {
                scope.onPageRender();
              }
            }).catch(function (reason) {
              console.log(reason);
            });
          });
        };

        scope.goPrevious = function() {
          if (scope.pageToDisplay <= 1) {
            return;
          }
          scope.pageToDisplay = parseInt(scope.pageToDisplay) - 1;
          scope.pageNum = scope.pageToDisplay;
        };

        scope.goNext = function() {
          if (scope.pageToDisplay >= scope.pdfDoc.numPages) {
            return;
          }
          scope.pageToDisplay = parseInt(scope.pageToDisplay) + 1;
          scope.pageNum = scope.pageToDisplay;
        };

        scope.zoomIn = function() {
          renderPDF();
          pageFit = false;
          scale = parseFloat(scale) + 0.2;
          scope.renderPage(scope.pageToDisplay);
          return scale;
        };

        scope.zoomOut = function() {
          renderPDF();
          pageFit = false;
          scale = parseFloat(scale) - 0.2;
          scope.renderPage(scope.pageToDisplay);
          return scale;
        };

        scope.fit = function() {
          renderPDF();  
          pageFit = true;
          scope.renderPage(scope.pageToDisplay);
        }

        scope.changePage = function() {
          renderPDF();  
          scope.renderPage(scope.pageToDisplay);
        };

        scope.rotate = function() {
          if (canvas.getAttribute('class') === 'rotate0') {
            canvas.setAttribute('class', 'rotate90');
          } else if (canvas.getAttribute('class') === 'rotate90') {
            canvas.setAttribute('class', 'rotate180');
          } else if (canvas.getAttribute('class') === 'rotate180') {
            canvas.setAttribute('class', 'rotate270');
          } else {
            canvas.setAttribute('class', 'rotate0');
          }
        };

        function clearCanvas() {
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }

        function renderPDF() {
          clearCanvas();

          var params = {
            'url': url,
            'withCredentials': creds
          };

          if (httpHeaders) {
            params.httpHeaders = httpHeaders;
          }

          if (url && url.length) {
            pdfLoaderTask = PDFJS.getDocument(params, null, null, scope.onProgress);
            pdfLoaderTask.then(
                function(_pdfDoc) {
                  if (typeof scope.onLoad === 'function') {
                    scope.onLoad();
                  }

                  scope.pdfDoc = _pdfDoc;
                  scope.renderPage(scope.pageToDisplay);

                  scope.$apply(function() {
                    scope.pageCount = _pdfDoc.numPages;
                  });
                }, function(error) {
                  if (error) {
                    if (typeof scope.onError === 'function') {
                      scope.onError(error);
                    }
                  }
                }
            );
          }
        }

        scope.$watch('pageNum', function(newVal) {
          scope.pageToDisplay = parseInt(newVal);
          if (scope.pdfDoc !== null) {
            scope.renderPage(scope.pageToDisplay);
          }
        });

        scope.$watch('currentPdfUrl', function(newVal) {
          if (newVal !== '') {
            if (debug) {
              console.log('pdfUrl value change detected: ', scope.currentPdfUrl);
            }
            url = newVal;
            scope.pageNum = scope.pageToDisplay = pageToDisplay;
            if (pdfLoaderTask) {
              pdfLoaderTask.destroy().then(function () {
                renderPDF();
              });
            } else {
              renderPDF();
            }
          }
        });


        });
      }
    };
  } ]);
})();
