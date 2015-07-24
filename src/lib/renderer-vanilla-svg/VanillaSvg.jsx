/* jshint esnext: true */

import Vanilla     from './Vanilla';
import HtmlTransform     from './HtmlTransform';
import RendererSvg from '../shapes-svg/RendererSvg';


class Plot {
  render() {
    var {width, height, children, customClass} = this.props;
    if(!width) { width = 250; }
    if(!height) { height = 250; }
    const transform = 'translate(' + (width/2) + ',' + (height/2) + ')';
    const classes = 'layers' + (customClass ? ' ' + customClass : '');

    function renderLayer(layer) { return layer.outerHTML; }
    var el = HtmlTransform.exec(`<svg width=${width} height=${height}>
      <g class="${classes}" transform="${transform}">
        ${children.map(renderLayer)}
      </g>
    </svg>`);
    return el;
  }
}



class Layer {

  static augmentProps(props, i, style, options) {
    props.idx = i; 
    props.key = 'geom_' + i; 
    props.class = 'geom g-' + i;
    props.style = style;
    props.options = options; 
    return props;
  }

  render() {
    var {data, geom, options} = this.props;
    var renderer = RendererSvg[geom];

    var renderItem = function(item, i) {
      var {type, props} = renderer(item);
      props = Layer.augmentProps(props, i, item.style, options);
      return Vanilla.createElement(type, props);
    };

    return Vanilla.createElement('g', {}, data.map(renderItem));
  }
}


export default class VanillaSvg { }
VanillaSvg.Plot = Plot;
VanillaSvg.Layer = Layer;


