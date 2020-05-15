import car from '../../Img/car.png';

const UIMarker = (props: any) => {

  const Window: any = window;
  const { AMapUI } = Window;

  const map = props.__map__;

  AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier: any, $: any) {
    if (!PathSimplifier.supportCanvas) {
      alert('当前环境不支持 Canvas！');
      return;
    }

    //just some colors
    var colors = [
      "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00",
      "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707",
      "#651067", "#329262", "#5574a6", "#3b3eac"
    ];

    var pathSimplifierIns = new PathSimplifier({
      zIndex: 100,
      //autoSetFitView:false,
      map: map, //所属的地图实例

      getPath: function (pathData: any, pathIndex: any) {
        return pathData.path;
      },
      getHoverTitle: function (pathData: any, pathIndex: any, pointIndex: any) {

        if (pointIndex >= 0) {
          //point 
          return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
        }

        return pathData.name + '，点数量' + pathData.path.length;
      },
      renderOptions: {
        pathLineStyle: {
          dirArrowStyle: true
        },
        getPathStyle: function (pathItem: any, zoom: any) {

          var color = colors[pathItem.pathIndex % colors.length],
            lineWidth = Math.round(4 * Math.pow(1.1, zoom - 3));

          return {
            pathLineStyle: {
              strokeStyle: color,
              lineWidth: lineWidth
            },
            pathLineSelectedStyle: {
              lineWidth: lineWidth + 2
            },
            pathNavigatorStyle: {
              fillStyle: color
            }
          };
        }
      }
    });

    Window.pathSimplifierIns = pathSimplifierIns;

    $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);

    $.getJSON('https://a.amap.com/amap-ui/static/data/big-routes.json', function (d: any) {
      $('#loadingTip').remove();
      // 全路径
      // pathSimplifierIns.setData(d);
      // 单条路径
      pathSimplifierIns.setData([d[1]]);

      // initRoutesContainer(d);

      function onload() {
        pathSimplifierIns.renderLater();
      }

      function onerror(e: any) {
        alert('图片加载失败！');
      }

      var navg2 = pathSimplifierIns.createPathNavigator(0, {
        loop: true,
        speed: 500000,
        pathNavigatorStyle: {
          width: 16,
          height: 32,
          content: PathSimplifier.Render.Canvas.getImageContent(car, onload, onerror),
          strokeStyle: null,
          fillStyle: null
        }
      });

      navg2.start();
    });
  });
  return (null)
}

export default UIMarker